import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { LayoutDashboard, ShirtIcon } from 'lucide-react'
import { Inria_Serif } from 'next/font/google'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent } from './ui/dropdown-menu'
import { ModeToggle } from './ModeToggle'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import LogoutButton from './LogoutButton'
import { getUserProfile } from '@/app/update-profile/actions'

const inria = Inria_Serif({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})


const Sidebar = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const userProfile = await getUserProfile()

    const isAdmin = process.env.ADMIN_EMAIL === user?.email
    return (
        <div className='flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen'>
            <Link href={'/update-profile'} className='max-w-fit'>
                <Avatar className='w-10 h-10 '>
                    <AvatarImage className='rounded-full h-10 w-10 object-cover lg:ml-3 ml-2 mt-4 ' src={userProfile?.image || '/avatar/avatar1.avif'} />
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
                        <Link href={process.env.STRIPE_BILLING_PORTAL_LINK_DEV+"?prefilled_email=" + user?.email}>
                            <DropdownMenuItem className={" px-2 py-2 rounded-lg hover:bg-primary-foreground " + (inria.className)}>
                                Billing
                            </DropdownMenuItem>
                        </Link>
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </nav>
        </div>
    )
}

export default Sidebar
