import BaseLayout from '@/components/BaseLayout'
import Product from '@/components/Product'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React from 'react'
import ProductCheckout from './ProductCheckout'
import prisma from '@/db/prisma'
import { notFound } from 'next/navigation'


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
const page = async ({ params }: { params: { id: string } }) => {
    const currentProduct=await prisma.product.findUnique({where:{id:params.id}})
    if(!currentProduct || currentProduct.isArchived)
        return notFound()
    const products=await prisma.product.findMany({where:{isArchived:false,id:{not:params.id}}})
    return (
        <BaseLayout renderRightPanel={false}>
            <div className='px-3 md:px-7 mt-10'>
                <ProductCheckout product={currentProduct}/>

                <p className={'text-2xl md:text-4xl mb-5 text-center tracking-tight underline-offset-4 font-bold ' + (inria2.className)}>
                    More Products from <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>OnlyAnime</span>
                </p>
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {
                        products.map((product)=>(
                            <Product key={product.id} product={product}/>
                        ))
                    }
                    </div>
            </div>
        </BaseLayout>
    )
}

export default page
