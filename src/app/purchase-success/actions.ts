"use server"

import prisma from "@/db/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function getMerchandiseStatus(orderId:string) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        throw new Error("Unauthorized")
    }
    const order = await prisma.order.findUnique({
        where:{id:orderId},
        select:{
            product:true,
            isPaid:true,
            size:true,
            shippingAddress:true
        }
    })
    if(!order){
        throw new Error("Order not found")
    }
    return order

}