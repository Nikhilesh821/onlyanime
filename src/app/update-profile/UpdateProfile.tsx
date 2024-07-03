"use client"

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from './actions'
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


const UpdateProfile = () => {
    const [mediaUrl, setMediaUrl] = useState("")
    const [name, setName] = useState("")
    const [profileImage, setProfileImage] = useState()

    const { data: userProfile } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => await getUserProfile()
    })

    const { mutate: updateProfile, isPending } = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: updateUserProfile,
        onSuccess:()=>{
            toast.success("Profile Updated Successfully")
        },
        onError:(error)=>{
            toast.error(error.message)
        }

    })

    const handleUpdateProfile=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        updateProfile({name,  image: mediaUrl})
    }
    useEffect(()=>{
        if(userProfile){
            setName(userProfile?.name)
        }
    },[userProfile])
    return (
        <div className='px-2 md:px-10 my-10'>
            <Card>
                <CardHeader>
                    <CardTitle className={'text-xl md:text-2xl ' + (inria2.className)}>
                        Update Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className=' flex justify-center'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage className='object-cover' src={mediaUrl|| userProfile?.image || "/avatar/avatar1.avif"} />
                            <AvatarFallback>
                                CN
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <form onSubmit={(e)=>handleUpdateProfile(e)}>
                        <Label className={"md:text-xl text-lg " + inria2.className}>
                            Name
                        </Label>
                        <Input onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' value={name} className={'my-2 py-5 text-lg md:text-md ' + (inria.className)} />
                        <Label className={"md:text-xl text-lg " + inria2.className}>
                            Email
                        </Label>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className={'w-full mt-2 ' + (inria.className)} type='button'>
                                    <Input className='py-5 md:text-lg text-md' placeholder='Enter Your Email'
                                        disabled
                                        value={userProfile?.email}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className={'text-sm ' + (inria.className)}>
                                        For security reasons, your email cannot be changed
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <CldUploadWidget onSuccess={(result, { widget }) => {
                            setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url)
                            widget.close()
                        }} signatureEndpoint={'/api/sign-image'}>
                            {({ open }) => {
                                return (
                                    <Button onClick={() => open()} variant={"outline"} type="button" className={'w-full mt-4 text-lg md:text-xl py-5 mb-4 font-semibold ' + (inria2.className)}>
                                        Upload Image
                                    </Button>
                                )
                            }}
                        </CldUploadWidget>
                        <Button disabled={isPending} className={'w-full text-lg md:text-xl py-5 font-semibold ' + (inria.className)} type='submit'>
                            {isPending? 'Updating...' : 'Update Profile'}

                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default UpdateProfile
