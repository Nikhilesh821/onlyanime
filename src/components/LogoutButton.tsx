"use client"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Inria_Serif } from 'next/font/google'
import React from 'react'

const inria = Inria_Serif({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

const LogoutButton = () => {
    return (
        <LogoutLink>
            <DropdownMenuItem className={" px-2 py-2 rounded-lg hover:bg-primary-foreground " + (inria.className)}>
                LogOut
            </DropdownMenuItem>
        </LogoutLink>
    )
}

export default LogoutButton
