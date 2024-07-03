interface FeatureProps {
    title: string;
    description: string;
    image: string
}


const features: FeatureProps[] = [
    {
        title: 'Watch Anime',
        description: 'Watch all the trending and exclusive anime posters. Choose what you like.',
        image: '/gifs/gif1.gif'
    },
    {
        title: 'Become a Weeb',
        description: 'Still living a normal life of a anime watcher? Follow our content to get the recognized as a weeb',
        image: '/gifs/gif2.gif'
    },
    {
        title: 'Download Anime',
        description: 'Download what you want and use wherever you feel like. We give you the access to use all our content for commercial use',
        image: '/gifs/gif3.gif'
    },
    {
        title: 'Download Anime',
        description: 'Download what you want and use wherever you feel like. We give you the access to use all our content for commercial use',
        image: '/gifs/gif3.gif'
    },
    {
        title: 'Download Anime',
        description: 'Download what you want and use wherever you feel like. We give you the access to use all our content for commercial use',
        image: '/gifs/gif3.gif'
    },
    {
        title: 'Exclusive Rewards',
        description: 'Get a chance to win exclusive rewards and many other gift hampers and goodies',
        image: '/gifs/gif4.gif'
    }
]

const featureList: string[] = [
    "Exclusive Content",
    "Behind-the-scenes",
    "Exclusive T-shirts",
    "Gift Hampers",
    "Weeb Badges",
    "Exclusive Posts"
]

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Inria_Sans, Inria_Serif } from 'next/font/google';
import Image from 'next/image';
import React from 'react'

const inria2 = Inria_Sans({
    display: 'swap',
    subsets: ['latin'],
    weight: ["300", "400", "700"]
})

const inria=Inria_Serif({
    display:'swap',
    subsets:['latin'],
    weight:["300" ,"400","700"]
})
const Features = () => {
    return (
        <section className='container py-18 sm:mt-32 sm:mb-24 space-y-8'>
            <p className={"text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center " + (inria2.className)}>
                OnlyAnime <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Features</span>
            </p>
            <div className='flex flex-wrap md:justify-center gap-4'>
                {
                    featureList.map(feature=>(
                        <Badge key={feature} className={'p-2 px-4 rounded-lg text-md '+(inria2.className)} variant={'secondary'}>
                            {feature}
                        </Badge>
                    ))
                }
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    features.map(({title,description,image})=>(
                        <Card className='flex flex-col' key={title}>
                            <CardHeader>
                                <CardTitle style={{fontWeight:"bold"}} className={"text-2xl "+( inria2.className)}>
                                    {title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className={inria.className}>
                            {description} 
                            </CardContent>
                            <CardFooter className='mt-auto'>
                                <Image src={image} alt='image' width={300} height={32} className=' rounded-lg lg:w-[300px\ mx-auto select-none pointer-events-none'/>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </section>
    )
}

export default Features
