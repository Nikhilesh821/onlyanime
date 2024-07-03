import Image from 'next/image'
import React from 'react'
import {Inria_Sans, Inria_Serif} from 'next/font/google'
import AuthButtons from './AuthButtons'

const inria=Inria_Serif({
    display:'swap',
    subsets:['latin'],
    weight:["300" ,"400","700"]
})


const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})


const HeroSection = () => {
    return (
        <div className='flex h-screen w-full'>
            <div className={"flex-1 flex overflow-hidden bg-slate-800 relative justify-center items-center z-10 bg-noise"}>
                <Image className='absolute -left-1/4  opacity-5 -bottom-52 lg:scale-150 xl:scale-150 scale-[2] pointer-events-none select-none' src={'/logos/logo.svg'} alt='logo' fill />
                <div className='flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-center font-semibold'>
                    <Image className='mt-20 w-[420px] x-0 pointer-events-none select-none' src={'/logos/logot.svg'} alt='OnlyAnime Logo' width={764.75} height={157.75} />
                    <h1 className={'text-2xl mt-4 font-serif md:text-3xl text-balance text-gray-400 '+(inria.className)}>
                        Hey! It is <span style={{color:"#EF47BC"}} className={'px-2 font-bold text-white '+(inria.style.fontWeight)}>NOT</span>
                        what it looks like
                    </h1>
                    <p className={'text-2xl font-serif text-gray-400 md:text-3xl mb-32 leading-snug text-balance '+(inria.className)}>
                        Made for <span style={{color:"#EF47BC"}} className='font-bold px-1 text-white'>Weebs</span> NOT OTHERS
                    </p>
                    <AuthButtons/>
                </div>
            </div>
            <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
                <Image className='object-cover h-full pointer-events-none' src={'/featured/anime12.jpeg'} alt='Anime' fill />
            </div>
        </div>
    )
}

export default HeroSection
