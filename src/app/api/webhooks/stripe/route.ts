import prisma from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend"
import WelcomeEmail from "@/emails/WelcomeEmail";
import ReceiptEmail from "@/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY)

const webHooksSecret = process.env.NODE_ENV === "development" ? process.env.STRIPE_WEBHOOK_SECRET_DEV_KEY : process.env.STRIPE_WEBHOOK_SECRET_LIVE_KEY;
export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("stripe-signature")

    if (!signature) {
        return new Response("Invalid signature", { status: 400 })
    }
    let event
    //verify the event by using the secret
    try {
        event = stripe.webhooks.constructEvent(body, signature, webHooksSecret!)
    } catch (error: any) {
        return new Response(error.message, { status: 400 })
    }

    const data = event.data
    const eventType = event.type
    try {
        switch (eventType) {
            case "checkout.session.completed": {
                const session = await stripe.checkout.sessions.retrieve((data.object as Stripe.Checkout.Session).id, {
                    expand: ["line_items", "customer_details"]
                })
                const customerId = session.customer as string
                const customerDetails = session.customer_details as Stripe.Checkout.Session.CustomerDetails
                const lineItems = session.line_items?.data || []
                if (customerDetails.email) {
                    const user = await prisma.user.findUnique({
                        where: { email: customerDetails.email }
                    })
                    if (!user) {
                        throw new Error("User not found")
                    }
                    if (!user.customerId || user.customerId != customerId) {
                        await prisma.user.update({
                            where: { id: user.id },
                            data: { customerId }
                        })
                    }
                    for (const item of lineItems) {
                        const priceId = item.price?.id
                        const isSubscription = item.price?.type === "recurring"
                        if (isSubscription) {
                            let endDate = new Date()
                            if (priceId === process.env.STRIPE_PREMIUM_YEARLY_PLAN_PRICE_ID) {
                                endDate.setFullYear(endDate.getFullYear() + 1)
                            }
                            else if (priceId === process.env.STRIPE_PREMIUM_MONTHLY_PLAN_PRICE_ID) {
                                endDate.setMonth(endDate.getMonth() + 1)
                            }
                            else {
                                throw new Error("Invalid subscription plan")
                            }

                            //upsert means update and insert so it create a new one if the record doesn't exist and updates the record if exist
                            const subscription = await prisma.subscription.upsert({
                                where: { userId: user.id },
                                update: {
                                    planId: priceId,
                                    startDate: new Date(),
                                    endDate: endDate,
                                    price: item.amount_total || 0
                                },
                                create: {
                                    userId: user.id,
                                    planId: priceId!,
                                    price: item.amount_total,
                                    startDate: new Date(),
                                    endDate: endDate,
                                }
                            })
                            await prisma.user.update({
                                where: { id: user.id },
                                data: {
                                    isSubscribed: true
                                }
                            })
                            if (process.env.NODE_ENv !== "production") {
                                await resend.emails.send({
                                    from: "OnlyAnime <onboarding@resend.dev>",
                                    to: [customerDetails.email],
                                    subject: "Subcription Confirmation",
                                    react: WelcomeEmail({
                                        userEmail: customerDetails.email,
                                        userName: user.name,
                                        subscriptionStartDate: subscription.startDate,
                                        subscriptionEndDate: subscription.endDate,
                                    })
                                })
                            }

                        }
                        else {
                            //one time payment integration
                            const { orderId, size } = session.metadata as { orderId: string, size: string }
                            const shippingDetails = session.shipping_details?.address
                            const updatedOrder = await prisma.order.update({
                                where: { id: orderId },
                                data: {
                                    isPaid: true,
                                    size,
                                    shippingAddress: {
                                        create: {
                                            address: shippingDetails?.line2 || "",
                                            city: shippingDetails?.city || "",
                                            postalCode: shippingDetails?.postal_code || "",
                                            country: shippingDetails?.country || "",
                                            state: shippingDetails?.state,
                                        }
                                    },

                                },
                                select: {
                                    id: true,
                                    product: true,
                                    size: true,
                                    shippingAddress: true,
                                }
                            })
                            //send a success email to the user
                            if (process.env.NODE_ENv !== "production") {
                                await resend.emails.send({
                                    from: "OnlyAnime <onboarding@resend.dev>",
                                    to: [customerDetails.email],
                                    subject: "order Confirmation",
                                    react: ReceiptEmail({
                                        orderDate: new Date(),
                                        orderNumber: updatedOrder.id,
                                        productImage: updatedOrder.product.image,
                                        productName: updatedOrder.product.name,
                                        productSize: updatedOrder.size,
                                        shippingAddress: updatedOrder.shippingAddress!,
                                        userName: user.name!,
                                    })

                                })
                            }

                        }
                    }
                }

                break
            }
            case "customer.subscription.deleted": {
                const subscription = await stripe.subscriptions.retrieve((data.object as Stripe.Subscription).id)

                const user = await prisma.user.findUnique({
                    where: { customerId: subscription.customer as string }
                })
                if (user) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: {
                            isSubscribed: false
                        }
                    })
                }
                else {
                    throw new Error("User not found for subscription deleted event")
                }
                break
            }
            default:
                console.log(`Unhandled event type: ${eventType}`)
                break
        }
    } catch (error) {

    }
    return NextResponse.json({})



}