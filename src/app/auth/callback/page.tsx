"use client"

import { useQuery } from '@tanstack/react-query'
import { LoaderPinwheelIcon } from 'lucide-react'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React, { useEffect } from 'react'
import { checkAuthStatus } from './actions'
import { useRouter } from 'next/navigation'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

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


const Page = () => {
    const { user,isLoading }=useKindeBrowserClient()
    const router = useRouter()
    const { data } = useQuery({
        queryKey: ["authCheck"],
        queryFn: async () => await checkAuthStatus()
    })

    useEffect(() => {
        const stripeUrl=localStorage.getItem("stripeLink")
        if(stripeUrl &&user?.email &&!isLoading){
            localStorage.removeItem('stripeLink')
            window.location.href=stripeUrl+"?prefilled_email=" +user.email
        }
        else if(!user &&isLoading){
            router.push('/')
        }
    }, [ router,isLoading,user])
    return (
        <div className='mt-20 w-full flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <LoaderPinwheelIcon className='w-10 h-10 animate-spin text-muted-foreground' />
                <h3 className={'text-2xl font-bold ' + (inria2.className)}>
                    Redirecting..
                </h3>
                <p className={inria.className}>
                    Please Wait...
                </p>
            </div>
        </div>
    )
}

export default Page
