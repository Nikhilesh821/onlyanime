"use client"
import React, { useState } from 'react'
import { Inria_Sans } from 'next/font/google'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from '@/components/ui/button';

const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const AuthButtons = () => {
    const [loading,setLoading]=useState(false)
    return (
        <div className='flex gap-3 justify-evenly md:flex-row flex-1 flex-col'>
            <RegisterLink className='flex-1' onClick={()=>setLoading(true)}>
                <Button disabled={loading} variant={ "secondary"} className={" text-xl btn-active py-5 rounded-xl w-full px-2 " + (inria2.className)}>Sign Up</Button>

            </RegisterLink>
            <LoginLink className='flex-1'  onClick={()=>setLoading(true)}>
                <Button disabled={loading} className={" text-xl rounded-xl w-full px-2 " + (inria2.className)}>Sign In</Button>
            </LoginLink>

        </div>
    )
}

export default AuthButtons
