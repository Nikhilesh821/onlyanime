
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getUserProfile } from '../update-profile/actions'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HomeIcon, LayoutDashboard, MoonIcon, ShirtIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import LogoutButton from '@/components/LogoutButton'
import { Inria_Serif } from 'next/font/google'

const inria = Inria_Serif({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

const BaseLayout = async ({ children }: { children: React.ReactNode, renderRightPanel?: Boolean }) => {

    const { isAuthenticated } = getKindeServerSession()
    if (!isAuthenticated) {
        return redirect('/')
    }
    return (
        <div className='flex w-full mx-auto relative'>
            <Sidebar />
            <div className='w-full bg-black flex flex-col border-r'>
                {children}
            </div>
        </div>
    )
}


const Sidebar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userProfile = await getUserProfile()

    const isAdmin = process.env.ADMIN_EMAIL === user?.email
    return (
        <div className='flex lg:w-1/5 flex-col bg-black gap-3 px-2 border-r sticky left-0 top-0 h-screen'>
            <Link href={'/update-profile'} className='max-w-fit'>
                <Avatar className='w-10 h-10 ml-1 md:ml-2 lg:ml-3 mt-3'>
                    <AvatarImage className='rounded-full h-10 w-10 object-cover' src={userProfile?.image || '/avatar/avatar1.avif'} />
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar>
            </Link>
            <nav className='flex flex-col'>
                <Link href={'/'} className='flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary lg:px-4 lg:py-2 py-2 rounded-lg justify-center lg:justify-normal'>
                    <HomeIcon className='w-6 h-6' />
                    <span className={'hidden lg:block text-xl ' + (inria.className)}>Home</span>
                </Link>

                <Link href={'/merch'} className='flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary lg:px-4 lg:py-2 py-2 rounded-lg justify-center lg:justify-normal'>
                    <ShirtIcon className='w-6 h-6' />
                    <span className={'hidden lg:block text-xl ' + (inria.className)}>Merchandise</span>
                </Link>
                {isAdmin && (
                    <Link className='flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary lg:px-4 lg:py-2 py-2 rounded-lg justify-center lg:justify-normal ' href={'/secret-dashboard'}>
                        <LayoutDashboard className='w-6 h-6' />
                        <span className={'hidden lg:block text-xl ' + (inria.className)}>Dashboard</span>
                    </Link>
                )}

                <DropdownMenu>
                    <div className='flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-4 py-2 rounded-lg justify-center lg:justify-normal'>
                        <DropdownMenuTrigger className='flex items-center gap-2'>
                            <PersonIcon className="w-6 h-6" />
                            <span className={'hidden lg:block text-xl ' + (inria.className)}>
                                Settings
                            </span>
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent>
                        <DropdownMenuLabel className={"px-2 py-2 " + inria.className}>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={process.env.STRIPE_BILLING_PORTAL_LINK_DEV + "?prefilled_email=" + user?.email}>
                            <DropdownMenuItem className={" px-2 py-2 rounded-lg hover:bg-primary-foreground " + (inria.className)}>
                                Billing
                            </DropdownMenuItem>
                        </Link>
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex ml-1 lg:ml-3 flex-wrap gap-2 mt-2 md:mt-2">

                </div>
            </nav>
        </div>
    )
}

export default BaseLayout
