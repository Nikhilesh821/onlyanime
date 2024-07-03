"use server"

import prisma from "@/db/prisma"
import { centToDollars } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


type PostArgs = {
    isPublic: boolean,
    mediaUtl?: string,
    mediaType: string,
    text: string,

}
export async function createPost({ isPublic, mediaUtl, mediaType, text }: PostArgs) {
    const admin = await checkAdmin()
    if (!admin) {
        throw new Error("Unauthorized")
    }

    const newPost = await prisma.post.create({
        data: {
            isPublic,
            mediaUtl,
            mediaType,
            text,
            userId: admin.id
        }
    })

    return { success: true, post: newPost }
}

export async function getAllProducts() {
    const isAdmin = await checkAdmin()

    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    const products = await prisma.product.findMany()
    return products

}

type productArgs = {
    name: string,
    image: string,
    price: string,

}
export async function addNewProduct({ name, image, price }: productArgs) {
    const isAdmin = await checkAdmin()

    if (!isAdmin) {
        throw new Error("Unauthorized")
    }

    if (!name || !image! || !price) {
        throw new Error("All fields are required")
    }

    const priceInCents = Math.round(parseFloat(price) * 100)
    if (isNaN(priceInCents)) {
        throw new Error("Invalid price")
    }
    const newProduct = await prisma.product.create({
        data: {
            name,
            image,
            price: priceInCents
        }
    })

    return { success: true, product: newProduct }
}

export async function toggleProductArchive(productId: string) {
    const isAdmin = await checkAdmin()
    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
        throw new Error("Product not found")
    }
    const updatedProduct = await prisma.product.update({
        where: { id: productId }, data: {
            isArchived: !product.isArchived
        }
    })
    return { success: true, product: updatedProduct }
}




export async function getDashboardData() {
    const totalRevenuePromise = Promise.all([
        prisma.order.aggregate({
            _sum: {
                price: true
            }
        }),
        prisma.subscription.aggregate({
            _sum: {
                price: true
            }
        }),
    ])

    const totalSalesPromise = prisma.order.count()
    const totalSubscriptionsPromise = prisma.subscription.count()

    const recentSalesPromise = prisma.order.findMany({
        take: 6,
        orderBy: {
            orderDate: "desc"
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                },
            },
            price: true,
            orderDate: true
        }
    })
    const recentSubscriptionsPromise=prisma.subscription.findMany({
        take: 6,
        orderBy: {
            startDate: "desc"
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                },
            },
            price: true,
            startDate: true
        }
    })

    //run all promises in parallel
    const [totalRevenueResult,totalSales,totalSubscriptions,recentSales,recentSubscriptions]=await Promise.all([
        totalRevenuePromise,
        totalSalesPromise,
        totalSubscriptionsPromise,
        recentSalesPromise,
        recentSubscriptionsPromise,
    ])

    const totalRevenue=(totalRevenueResult[0]._sum.price||0)+(totalRevenueResult[1]._sum.price||0)
    return {
        totalRevenue:centToDollars(totalRevenue),
        totalSales,
        totalSubscriptions,
        recentSales,
        recentSubscriptions
    }
}

async function checkAdmin() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const isAdmin = user?.email === process.env.ADMIN_EMAIL
    if (!user || !isAdmin) return false

    return user
}