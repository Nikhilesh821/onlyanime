"use client"
import React from 'react'
import Post from './Post'
import PostSkeleton from '@/components/skeletons/PostSkeleton'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { getPost } from './actions'


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

const Posts = ({isSubscribed,admin}:{isSubscribed:boolean,admin:User}) => {

    const {data:posts,isLoading}=useQuery({
        queryKey:["posts"],
        queryFn:async ()=>await getPost()
    })
    return (
        <div>
            {
                !isLoading && posts?.map((post)=>(
                    <Post key={post.id} post={post} admin={admin} isSubscribed={isSubscribed} />
                ))
            }
            {
                isLoading && (
                    <div className='mt-10 px-3 flex flex-col gap-10'>
                        {[...Array(4)].map((_, i) => (
                            <PostSkeleton key={i} />
                        ))}
                    </div>
                )
            }
            {!isLoading && posts?.length === 0 && (
                <div className='mt-10 px-3'>
                    <div className='flex flex-col items-center space-y-3 w-full'>
                        <p className={'text-2xl font-semibold text-gray-600 ' + (inria2.className)}>No Posts Yet.</p>
                        <p className={'text-center ' + (inria.className)}>
                            Stay tuned for more posts from <span style={{ color: "#EF47BC" }} className='text-xl font-bold px-1 text-white'>OnlyAnime.</span> Subscribe to access exclusive content
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
    
}

export default Posts
