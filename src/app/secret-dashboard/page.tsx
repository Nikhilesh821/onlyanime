import BaseLayout from '@/components/BaseLayout'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentTab from './content/ContentTab'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import StoreTab from './store/StoreTab'
import AnalyticsTab from './analytics/AnalyticsTab'


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
const page = () => {
    return (
        <div>
            <BaseLayout renderRightPanel={false}>
                <Tabs defaultValue="content" className="w-full mx-auto my-10 px-2 md:px-10">
                    <TabsList className='flex flex-col justify-around rounded-lg md:rounded-full md:flex-row w-full md:w-3.4 px-auto h-auto'>
                        <TabsTrigger value="content" className={' px-10  my-1 py-2 w-full rounded-lg md:rounded-full text-lg mx-2 md:w-auto '+(inria2.className)}>Content</TabsTrigger>
                        <TabsTrigger value="Store" className={' rounded-lg md:rounded-full my-1 w-full px-10 py-2 text-lg mx-2 md:w-auto '+(inria2.className)}>Store</TabsTrigger>
                        <TabsTrigger value="Analytics" className={' my-1 px-10 py-2 w-full rounded-lg md:rounded-full text-lg mx-2 md:w-auto '+(inria2.className)}>Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                        <ContentTab/>
                    </TabsContent>
                    <TabsContent value="Store">
                        <StoreTab/>
                    </TabsContent>
                    <TabsContent value="Analytics">
                        <AnalyticsTab/>
                    </TabsContent>
                </Tabs>

            </BaseLayout>
        </div>
    )
}

export default page
