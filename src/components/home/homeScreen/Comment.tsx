import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Prisma } from '@prisma/client'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React from 'react'

const inria = Inria_Serif({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})


type CommentWithUser = Prisma.CommentGetPayload<{
    include: {
        user: true
    }
}>
const Comment = ({ comment }: { comment: CommentWithUser }) => {
    return (
        <div className='flex gap-2 border-b py-2 mb-4'>
            <Avatar>
                <AvatarImage src={comment.user.image || "/avatar/avatar1.avif"} className='object-cover'/>
                <AvatarFallback className={inria.className}>
                    {comment.user.name[0]}
                </AvatarFallback>
            </Avatar>
            <div className='flex flex-col w-full'>
                <div className='flex justify-between items-center'>
                    <span className={'semi-bold text-md mb-1 text-muted-foreground '+(inria2.className)}>
                        {comment.user.name}
                    </span>
                    <span className={'text-sm text-muted-foreground '+(inria.className)}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <p className={'text-sm leading-tight '+(inria.className)}>
                    {comment.text}
                </p>
            </div>
        </div>
    )
}

export default Comment
