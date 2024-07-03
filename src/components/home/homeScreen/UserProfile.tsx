import React from 'react'
import CoverImage from './CoverImage'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link';
import { Inria_Sans, Inria_Serif } from 'next/font/google';
import { Button } from '@/components/ui/button';
import prisma from '@/db/prisma';
import { getUserProfile } from '@/app/update-profile/actions';



const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const UserProfile = async() => {
    const admin=await prisma.user.findUnique({
        where: {
            email:process.env.ADMIN_EMAIL
        },
    })
    const isSubscribe=false;
    const currentUser= await getUserProfile()
    return (
        <div className='flex flex-col'>
            <CoverImage adminName={admin?.name!} />
            <div className='flex flex-col p-4 z-20'>
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                    <Avatar className='w-20 h-20 border-2 rounded-full border-gray-400 -mt-14'>
                        <AvatarImage className='rounded-full h-20 w-20 object-cover' src={admin?.image|| '/avatar/avatar1.avif'} />
                        <AvatarFallback>
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex">
                        {!currentUser?.isSubscribed? (
                            <Button  className="btn text-primary-foreground flex gap-10 rounded-full">
                            <Link href="/pricing">
                            <span className={'uppercase font-semibold tracking-wide '+(inria2.className)}>subscribe</span>
                            </Link>
                            </Button>
                        ):<Button variant={"outline"} className="btn btn-outline flex gap-10 rounded-full">
                        <span className={'uppercase font-semibold tracking-wide '+(inria2.className)}>subscribed</span>
                        </Button>
                    }
                    </div>
                </div>
                <div className='flex flex-col mt-2'>
                    <p className={'text-lg font-semibold '+(inria2.className)}>
                        {admin?.name}
                    </p>
                    <p className={'text-sm mt-2 md:text-md '+(inria2.className)}>
                        Discover daily content of weebs along with their insights. Subscribe now to gain access to exclusive content and become part of the community.
                    </p>
                </div>
            </div>
            <div aria-hidden="true" className='h-2 w-full bg-muted' />
        </div>
    )
}

export default UserProfile
