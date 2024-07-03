import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Inria_Sans, Inria_Serif } from 'next/font/google';
import Image from 'next/image';
import React from 'react'

interface TeamProps {
    name: string;
    position: string;
    image: string;
    description: string
}
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

const teamList: TeamProps[] = [
    {
        name: 'Andrew Devin',
        position: 'Backend Dev',
        image: '/avatar/avatar1.avif',
        description: 'Andrew ensured that our client should get smooth and seamless experience and no customer should feel unhappy.'
    },
    {
        name: 'Michelle Bae',
        position: 'Designer',
        image: '/avatar/avatar2.avif',
        description: 'Michelle is our expert Ui/Ux designer and ensures that no customer should feel uneasy while viewing our content,'
    },
    {
        name: 'Stuart Harper',
        position: 'Frontend Developer',
        image: '/avatar/avatar3.avif',
        description: 'Stuart is our one of the best frontend engineer who plays a very crucial role in providing quality content to our customers.'
    },
    {
        name: 'Charlie Seth',
        position: 'Cloud Engineer',
        image: '/avatar/avatar4.avif',
        description: 'Charlie is one of those people who works behind the scenes and do not get much spotlight but without him we are nothing.'
    }
]

const Team = () => {
    return (
        <section className="container py-15">

            <p className={'text-2xl md:text-5xl text-center tracking-tight underline-offset-4 font-bold ' + (inria2.className)}>
                Meet Out <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Team</span>
            </p>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 mt-20 gap-8 gap-y-10'>
                {
                    teamList.map(({ description, image, name, position }) => (
                        <Card className='bg-muted/50 relative mt-7 flex flex-col justify-center items-center' key={name}>
                            <CardHeader className='my-8 flex justify-center items-center pb-2'>
                                <Image src={image} width={100} height={100} alt='Team Member' className='absolute -top-12 rounded-full aspect-square object-cover' />
                                <CardTitle className={'text-center '+(inria2.className)}>
                                    {name}
                                </CardTitle>
                                <CardDescription className={'text-primary '+(inria2.className)}>
                                    {position}
                                </CardDescription>
                                <CardContent className={'text-center  pb-4 px-2 '+(inria.className)}>
                                    <p>
                                        {description}
                                    </p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>

        </section>
    )
}

export default Team
