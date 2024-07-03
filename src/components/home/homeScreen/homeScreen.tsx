
import BaseLayout from '@/components/BaseLayout'
import React from 'react'
import UserProfile from './UserProfile'
import Posts from './Posts'
import prisma from '@/db/prisma'
import { getUserProfile } from '@/app/update-profile/actions'
import { notFound } from 'next/navigation'

const HomeScreen = async() => {
  const admin=await prisma.user.findUnique({
    where:{
      email:process.env.ADMIN_EMAIL
    }
  })
  const user=await getUserProfile()
  if(!user) return notFound()
  return (
    
      <BaseLayout >
      <UserProfile/>
      <Posts admin={admin!} isSubscribed={user?.isSubscribed}/>
      </BaseLayout>
    
  )
}

export default HomeScreen
