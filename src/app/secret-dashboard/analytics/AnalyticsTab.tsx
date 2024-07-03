import { Avatar } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { centToDollars } from '@/lib/utils'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { DollarSign } from 'lucide-react'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React from 'react'
import { getDashboardData } from '../actions'


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
const AnalyticsTab = async() => {
    const {totalRevenue,totalSales,totalSubscriptions}=await getDashboardData()
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className={'text-md font-medium ' + (inria2.className)}>Total Revenue</CardTitle>
                        <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className={'text-2xl font-bold '+(inria.className)}>
                            $ {totalRevenue}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className={'text-md font-medium ' + (inria2.className)}>Sales</CardTitle>
                        <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className={'text-2xl font-bold '+(inria.className)}>
                            + {totalSales}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className={'text-md font-medium ' + (inria2.className)}>Subscriptions</CardTitle>
                        <DollarSign className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className={'text-2xl font-bold '+(inria.className)}>
                            + {totalSubscriptions}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className='flex flex-wrap gap-5 my-5'>
                <RecentSubscriptions />
                <RecentSales />
            </div>
        </>
    )
}

export default AnalyticsTab

const RecentSubscriptions = async() => {
    const {recentSubscriptions}=await getDashboardData()
    return (
        <Card className='flex-1'>
            <CardHeader className='px-3'>
                <CardTitle>
                    Recent Subscriptions
                </CardTitle>
            </CardHeader>
            <CardContent className='grid gap-8 px-3'>
                {
                    recentSubscriptions.length == 0 && <p className={'text-sm text-muted-foreground '+(inria2.className)}>No Recent Subscriptions</p>
                }
                {
                    recentSubscriptions.map((subscription) => (
                        <div className={'flex items-center gap-2 '+(inria2.className)} key={subscription.user.email}>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage className='object-cover' alt='avatar' src={subscription.user.image || '/avatar/avatar1.avif'} />
                                <AvatarFallback>
                                    {subscription.user.name[0]||""}
                                </AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className={'text-xs font-medium leading-none '+(inria.className)}>
                                    {subscription.user.name}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {subscription.user.email}
                                </p>
                            </div>
                            <div className={'ml-auto font-medium '}>
                                + ${centToDollars(subscription.price)}
                            </div>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}

const RecentSales = async () => {
    const {recentSales} = await getDashboardData()
    return (
        <Card className='flex-1'>
            <CardHeader className='px-3'>
                <CardTitle>
                    Recent Sales
                </CardTitle>
            </CardHeader>
            <CardContent className='grid gap-8 px-3'>
                {
                    recentSales.length == 0 && <p className={'text-sm text-muted-foreground '+(inria2.className)}>No Recent Sales</p>
                }
                {
                    recentSales.map((order) => (
                        <div className={'flex items-center gap-2 '+(inria2.className)} key={order.user.email}>
                            <Avatar className='hidden h-9 w-9 sm:flex'>
                                <AvatarImage className='object-cover' alt='avatar' src={order.user.image || '/avatar/avatar1.avif'} />
                                <AvatarFallback>
                                    {order.user.name[0] ||""}
                                </AvatarFallback>
                            </Avatar>
                            <div className='grid gap-1'>
                                <p className={'text-xs font-medium leading-none '+(inria.className)}>
                                    {order.user.name}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    {order.user.email}
                                </p>
                            </div>
                            <div className={'ml-auto font-medium '}>
                                + ${centToDollars(order.price)}
                            </div>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}