import React from 'react'
import HeroSection from './HeroSection'
import { Inria_Sans } from 'next/font/google'
import { CldVideoPlayer } from 'next-cloudinary';
import TodaysHiglights from './TodaysHiglights';
import Image from 'next/image'
import MasonaryGrid from './MasonaryGrid';
import Features from './Features';
import Testimonials from './Testimonials';
import PricingPage from '@/components/Pricing';
import Team from './Team';

const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const AuthScreen = () => {
    return (
        <div className='flex flex-col'>
            <HeroSection />
            <div className="mb-20 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <p className={"text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center " + (inria2.className)}>
                        Today <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Selection</span>
                    </p>
                    <div className='flex flex-col gap-10 mt-10'>
                        <TodaysHiglights />
                        <div className='mt-10'>
                            <p className={'text-2xl md:text-5xl text-center tracking-tight underline-offset-4 font-bold ' + (inria2.className)}>
                                Meets The <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Stars</span> Of Our Weebs
                            </p>
                            <MasonaryGrid />
                        </div>
                        <Features />
                        <Testimonials />
                        <PricingPage/>
                        <Team/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen
