
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import Sidebar from '@/components/Sidebar'

const BaseLayout = async({ children }: { children: React.ReactNode, renderRightPanel?: Boolean }) => {
    
    const {isAuthenticated}=getKindeServerSession()
    if(!isAuthenticated){
        return redirect('/')
    }
    return (
        <div className='flex max-w-2xl lg:max-w-7xl mx-auto relative'>
            <Sidebar/>
            <div className='w-full flex flex-col border-r'>
                {children}
            </div>
        </div>
    )
}

export default BaseLayout
