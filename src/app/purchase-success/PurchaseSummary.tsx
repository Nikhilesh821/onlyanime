"use client"

import ZoomedImage from '@/components/ZoomedImage'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { centToDollars, cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { getMerchandiseStatus } from './actions'
import { notFound, useSearchParams } from 'next/navigation'
import { LoaderPinwheelIcon } from 'lucide-react'


const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})


const inria = Inria_Serif({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
function PurchaseSummary() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId") || ""
    const { data: order, isLoading } = useQuery({
        queryKey: ["checkProductPaidStatus"],
        queryFn: async () => await getMerchandiseStatus(orderId)
    })

    if (isLoading) {
        return (
            <div className='mt-20 w-full flex justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <LoaderPinwheelIcon className='w-10 h-10 animate-spin text-muted-foreground' />
                    <h3 className={'text-2xl font-bold ' + (inria2.className)}>
                        Verifying Your Payment..
                    </h3>
                    <p className={inria.className}>
                        Please Wait...
                    </p>
                </div>
            </div>
        )
    }
    if (!order) return notFound()

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-6'>
            <ZoomedImage imgSrc={order?.product.image} className='h-96 w-96 rounded-lg my-5' />
            <p className={'text-2xl mb-2 md:text-5xl text-center tracking-tight underline-offset-4 font-bold ' + (inria2.className)}>
                Purchase<span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Successful</span>
            </p>
            <p className={'text-center text-md mb-6 ' + (inria.className)}>
                Your order is being processed and you will receive a confirmation email shortly. If you do not receive an email within 24 hours, please contact us with your order ID
            </p>
            <p className={'text-muted-foreground ' + (inria2.className)}>
                Order ID: <span className={inria.className} style={{ color: "#EF47BC" }}>{orderId}</span>
            </p>
            <Card className='w-full my-5 mx-4'>
                <CardHeader>
                    <CardTitle className={"text-xl " + (inria2.className)}>
                        Order Summary
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-between'>
                        <p className={inria2.className}>{order.product.name}</p>
                        <p className={inria.className}>$ {centToDollars(order.product.price)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className={inria2.className}>Size: <span className={inria.className}>{order.size === "md" ? "M" : order.size === "sm" ? "S" : "L"} </span></p>
                        <p className={inria2.className}>Quantity: 1</p>
                    </div>
                    <div className='mt-4'>
                        <h3 className={'font-semibold text-lg ' + (inria2.className)}>
                            Shipping Address
                        </h3>
                        <p className={inria2.className}>Address: <span className={inria.className}>{order.shippingAddress?.address} </span></p>
                        <p className={inria2.className}>City: <span className={inria.className}>{order.shippingAddress?.city} </span></p>
                        <p className={inria2.className}>State: <span className={inria.className}>{order.shippingAddress?.state} </span></p>
                        <p className={inria2.className}>Postal Code: <span className={inria.className}>{order.shippingAddress?.postalCode} </span></p>
                        <p className={inria2.className}>Country: <span className={inria.className}>{order.shippingAddress?.country} </span></p>
                    </div>
                </CardContent>
            </Card>
            <p className={'text-center text-md mb-6 text-muted-foreground text-lg ' + (inria.className)}>
                Thanks for trusting us with your purchase
            </p>
            <div className='flex justify-center'>
                <Link href={'/merch'} className={cn(buttonVariants(), inria2.className, "font-semibold text-md")}>
                    Continue Shopping
                </Link>
            </div>
        </div>
    )
}

export default PurchaseSummary
