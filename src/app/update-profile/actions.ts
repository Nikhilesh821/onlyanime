"use server"

import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) return null
    const currentUser = await prisma.user.findUnique({ where: { id: user.id } })
    return currentUser

}

export async function updateUserProfile({ name, image }: { name: string, image: string }) {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) throw new Error("unAuthorized")
        const updateFields:Partial<User>={
    }
    if(name){
        updateFields.name=name
    }
    if(image){
        updateFields.image=image
    }
    const updatedUser=await prisma.user.update({
        where:{id:user.id},
        data:updateFields
    })
    revalidatePath('/update-profile')

    return {success:true,user:updatedUser}


}