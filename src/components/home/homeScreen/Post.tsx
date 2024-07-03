"use client"

import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Post as PostType, Prisma, User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from 'lucide-react'
import { CldVideoPlayer } from 'next-cloudinary'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DeletePost, commentOnPost, likePostAction } from './actions'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import Comment from './Comment'

type PostWithComments = Prisma.PostGetPayload<{ include: { comments: { include: { user: true } }, likesList: true } }>
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


const Post = ({ post, isSubscribed, admin }: { post: PostWithComments, isSubscribed: Boolean, admin: User }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [comment,setComment]=useState("")
    const { user } = useKindeBrowserClient()
    const queryClient = useQueryClient()

    const {mutate:deletePost}=useMutation({
        mutationKey:["deletePost"],
        mutationFn:async()=>await DeletePost(post.id),
        
        onSuccess: () => {
            toast.success("Post deleted")
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const { mutate: likePost } = useMutation({
        mutationKey: ['likePost'],
        mutationFn: async () => {
            post.likes += isLiked ? -1 : 1;
            setIsLiked(!isLiked)
            await likePostAction(post.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const {mutate:addComment,isPending}=useMutation({
        mutationKey: ['addComment'],
        mutationFn: async () => await commentOnPost(post.id,comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            toast.success("Comment Added")
            setComment("")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleCommentSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!comment) return
        addComment()

    }
    useEffect(() => {
        if (post.likesList && user?.id) {
            setIsLiked(post.likesList.length > 0)
        }
    }, [post.likesList, user?.id])
    return (
        <div className='flex flex-col gap-3 p-2 border-t'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage className='w-12 h-12 object-cover rounded-full' src={admin.image || "/avatar/avatar1.avif"} />
                        <AvatarFallback>
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <span className={'font-semibold text-sm md:text-md ' + (inria2.className)}>
                        {admin.name}
                    </span>
                </div>
                <div className='flex gap-2 items-center'>
                    <p className={'text-zinc-400 items-center ' + (inria.className)}>
                        17.06.2024
                    </p>
                    {
                        admin.id == user?.id && (
                            <Trash onClick={() => deletePost()} className='w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer' />
                        )
                    }
                </div>
            </div>
            <p className={' md:text-md ' + (inria.className)}>
                {post.text}
            </p>
            {(post.isPublic || isSubscribed) && post.mediaUtl && post.mediaType === "image" && (
                <div className='relative w-full pb-[56.25%] rounded-lg overflow-hidden'>
                    <Image className='rounded-lg object-cover' fill alt="post Image" src={post.mediaUtl} />
                </div>
            )}

            {(post.isPublic || isSubscribed) && post.mediaUtl && post.mediaType === "video" && (
                <div className='w-full mx-auto rounded-lg'>
                    <CldVideoPlayer width={960} height={540} className='rounded-lg' src={post.mediaUtl} />
                </div>
            )}
            {!isSubscribed && !post.isPublic && (
                <div className='w-full bg-slate-700 relative h-96 rounded-md bg-of flex flex-col justify-center items-center px-5 overflow-hidden  '>
                    <LockKeyholeIcon className='w-16 h-16 text-zinc-400 mb-20 z-0' />
                    <div className='opacity-60 absolute top-0 w-full h-full bg-stone-800' />
                    <div className='flex flex-col gap-2 z-10 border p-2 border-gray-600 w-full rounded-xl'>
                        <div className='flex gap-1 items-center'>
                            <ImageIcon className='w-4 h-4 text-gray-300' />
                            <span className={'font-semibold text-gray-300 text-sm md:text-md ' + (inria2.className)}>
                                Private Post
                            </span>
                        </div>
                        <Button className={'rounded-full  text-md font-bold w-full ' + (inria2.className)}>
                            <Link href={'/pricing'}>
                                Subscribe To Unlock
                            </Link>
                        </Button>

                    </div>
                </div>
            )}
            <div className='flex gap-4'>
                <div className='flex gap-1 items-center'>
                    <Heart className={'w-5 h-5 cursor-pointer ' + (isLiked ? " text-red-700 fill-red-700" : "")} onClick={() => {
                        if (!isSubscribed) return
                        likePost()
                    }} />
                    <span className={'text-sm text-primary tracking-tighter ' + (inria.className)}>
                        {post.likes}
                    </span>
                </div>

                <div className='flex gap-1 items-center'>
                    <Dialog>
                        <DialogTrigger>
                            <MessageCircle className='w-5 h-5 cursor-pointer' />
                        </DialogTrigger>
                        {isSubscribed && (
                            <DialogContent className='sm:mx-w[225px]'>
                                <DialogHeader>
                                    <DialogTitle className={" text-xl md:text-2xl " + inria2.className}>
                                        Comments
                                    </DialogTitle>
                                </DialogHeader>
                                <ScrollArea className='h-[400px] w-full rounded-md p-4'>
                                    {post.comments.map(comment=>(
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                    {post.comments.length === 0 && (
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <p className={'text-zinc-400 text-md md:text-lg ' + (inria.className)}>
                                                No Comments yet
                                            </p>
                                        </div>
                                    )}
                                </ScrollArea>
                                <form onSubmit={handleCommentSubmit}>
                                    <Input onChange={(e)=>setComment(e.target.value)} value={comment} className={"rounded-full py-5  text-md " + (inria.className)} placeholder="Add a comment" />
                                    <DialogFooter>
                                        <Button disabled={isPending} type='submit' className={'mt-4 md:text-lg text-md  rounded-full ' + (inria.className)}>
                                            {isPending?"Commenting...":"comment"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        )}
                    </Dialog>
                    <span className={'text-sm text-primary tracking-tighter ' + (inria.className)}>
                        {post.comments.length ? post.comments.length : 0}
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Post
