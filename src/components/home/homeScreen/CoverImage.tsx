import prisma from '@/db/prisma'
import { Heart, ImageIcon, VideoIcon } from 'lucide-react'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import Image from 'next/image'
import React from 'react'


const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})
const CoverImage = async ({adminName}:{adminName:string}) => {
    const imageCount = await prisma.post.count({
        where: {
            mediaType: "image"
        }
    })
    const videoCount = await prisma.post.count({
        where: {
            mediaType: "video"
        }
    })

    const totalLikes = await prisma.post.aggregate({
        _sum: {
            likes: true
        }
    })

    const formatNumber=(num:number)=>{
        if(num>=1000000)
            return (num/1000000).toFixed(1).replace(/\.0$/,"")+"M"
        
        if(num>=1000)
            return (num/1000).toFixed(1).replace(/\.0$/,"")+"K"
        
        return num.toString()
    }

    return (
        <div className='h-60 overflow-hidden relative'>
            <Image fill className='h-full w-full object-cover select-none pointer-events-none' src={'/featured/anime2.jpg'} alt='Cover Image' />
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-500 to-transparent'
                aria-hidden="true" />
            <div className='flex  justify-between items-center absolute top-0 left-0 px-2 py-1 z-20 w-full'>
                <div className='flex items-center gap-2'>
                    <div className='flex flex-col text-white'>
                        <p className={'font-bold ' + (inria2.className)}>{adminName}</p>
                        <div className='flex gap-2 items-center'>
                            <div className='flex items-center gap-1'>
                                <ImageIcon className='w-4 h-4' />
                                <span className={'font-bold ' + (inria2.className)}>{imageCount}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <VideoIcon className='w-4 h-4' />
                                <span className={'font-bold ' + (inria2.className)}>{videoCount}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <Heart className='w-4 h-4' />
                                <span className={'font-bold ' + (inria2.className)}>{formatNumber(totalLikes._sum.likes || 0)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CoverImage
