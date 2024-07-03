"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ModeToggle() {
    const { setTheme } = useTheme()
    return (
        <div className="flex ml-1 lg:ml-3 flex-wrap gap-2 mt-2 md:mt-2">
            <Button className="w-11 h-10 bg-primary-foreground hover:bg-gray-400"  size={"icon"} onClick={() => setTheme("light")}>
                <SunIcon className="text-primary" width={24} height={24} />
            </Button>
            <Button className="w-11 h-10 bg-primary-foreground hover:bg-gray-400"  size={"icon"} onClick={() => setTheme("dark")}>
                <MoonIcon className="text-primary" width={24} height={24} />
            </Button>
            
        </div>
    )
}
