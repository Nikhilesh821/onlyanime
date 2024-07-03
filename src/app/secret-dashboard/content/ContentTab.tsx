"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import Image from 'next/image'
import React, { useState } from 'react'
import 'next-cloudinary/dist/cld-video-player.css';
import { Checkbox } from '@/components/ui/checkbox'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { TriangleAlert } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createPost } from '../actions'
import toast from 'react-hot-toast'


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
const ContentTab = () => {
    const [text, setText] = useState<string>("")
    const [mediaType, setMediaType] = useState<"image" | "video">("video")
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [mediaUrl, setMediaUrl] = useState<string>("")

    const { isPending, mutate } = useMutation({
        mutationKey: ['createPost'],
        mutationFn: async () => createPost({ text, isPublic, mediaType, mediaUtl: mediaUrl }),
        onSuccess: () => {
            toast.success("Post Created Successfully")
            setText("")
            setIsPublic(false)
            setMediaType("video")
            setMediaUrl("")
        },
        onError: (error) => {
            toast.error("An Error Occurred "+error.message)
        }
    })
    return (
        <>
            <p className={'text-2xl md:text-5xl my-5 uppercase text-center font-bold ' + (inria2.className)}>
                <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Share </span>Post
            </p>
            <form onSubmit={(e) => {
                e.preventDefault()
                mutate()
            }}>
                <Card className='w-full max-w mx-auto'>
                    <CardHeader>
                        <CardTitle className={'text-2xl ' + (inria2.className)}>New Post</CardTitle>
                        <CardDescription className={"text-md " + inria.className}>
                            Share your exclusive content with your audience. Select only one video/image at a time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-2 mb-4'>
                            <Label className={"text-xl " + (inria2.className)} htmlFor='content'>
                                Content
                            </Label>
                            <Textarea className={'resize-none mt-2 text-md ' + (inria.className)} id='content' placeholder="Share today's exclusive" required onChange={(e) => setText(e.target.value)} />
                        </div>

                        <Label className={"text-xl " + (inria2.className)} >
                            Media Type
                        </Label>
                        <RadioGroup className='mt-2' defaultValue={"video"} value={mediaType} onValueChange={(value: "image" | "video") => setMediaType(value)} >
                            <div className='flex items-center mt-1 space-x-2'>
                                <RadioGroupItem value='video' id='video' />
                                <Label className={'text-lg ' + (inria.className)} htmlFor='video'>Video</Label>
                            </div>
                            <div className='flex items-center mt-1 space-x-2'>
                                <RadioGroupItem value='image' id='image' />
                                <Label className={'text-lg ' + (inria.className)} htmlFor='image'>Image</Label>
                            </div>
                        </RadioGroup>
                        <CldUploadWidget signatureEndpoint="/api/sign-image"
                            onSuccess={(result, { widget }) => {
                                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url)
                                widget.close()

                            }}>
                            {({ open }) => {
                                return (
                                    <Button type='button' variant={"outline"} className={'mt-4 text-lg w-full py-5 rounded-full font-bold ' + (inria2.className)} onClick={() => open()}>
                                        Upload
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        {mediaUrl && mediaType === "image" && (
                            <div className='flex justify-center relative w-full mt-5 h-96'>
                                <Image fill src={mediaUrl} alt='Uploaded Media' className='object-cover rounded-lg' />
                            </div>
                        )}
                        {mediaUrl && mediaType === "video" && (
                            <div className='flex justify-center relative rounded-xl w-full mt-5 mx-auto'>
                                <CldVideoPlayer className='rounded-lg' width={960} height={540} src={mediaUrl} />
                            </div>
                        )}

                        <div className='flex items-center gap-2 mt-5'>
                            <Checkbox
                                id='public'
                                onCheckedChange={(e) => setIsPublic(e as boolean)}

                            />
                            <Label htmlFor='public' className={'text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ' + (inria.className)}>
                                Mark as public
                            </Label>
                        </div>

                        <Alert variant={"default"} className={'!text-yellow-500 mt-4 ' + (inria.className)}>
                            <TriangleAlert className='h-6 w-6 !text-yellow-500' />
                            <AlertTitle className={'text-yellow-500 font-bold ' + (inria2.className)}>Warning</AlertTitle>
                            <AlertDescription>Public posts will be visible to all users.</AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isPending} type="submit" className={'w-full py-5 rounded-full text-lg font-bold ' + (inria2.className)}>
                            {isPending ? "Creating Post..." : "Create Post"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default ContentTab
