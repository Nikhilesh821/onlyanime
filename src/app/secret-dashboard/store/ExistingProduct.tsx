"use client"

import Product from '@/components/Product'
import ProductSkeleton from '@/components/skeletons/ProductSkeleton'
import { useQuery } from '@tanstack/react-query'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import React from 'react'
import { getAllProducts } from '../actions'

const isLoading = false
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
const ExistingProduct = () => {
    const {data:products,isLoading}=useQuery({
        queryKey:['getAllProducts'],
        queryFn:async()=>await getAllProducts()
    })
    return (
        <>
            <p className={'text-2xl md:text-5xl my-5 uppercase text-center font-bold ' + (inria2.className)}>
                <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'> Existing </span>Product
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {products?.map((product)=>
                <Product adminView key={product.id} product={product}>

                </Product>
                )}
            </div>

            {!isLoading && products?.length === 0 && (
                <div className='mt-10 px-3'>
                    <div className='flex flex-col justify-center mt-10 p-6 items-center bg-secondary rounded-lg shadow-md w-full'>
                        <p className={'text-2xl font-semibold text-gray-600 ' + (inria2.className)}>No Products Found</p>
                        <p className={'text-center ' + (inria.className)}>
                            Please add new products to see them here on <span style={{ color: "#EF47BC" }} className='text-xl font-bold px-1 text-white'>OnlyAnime</span>
                        </p>
                    </div>
                </div>
            )}

            {
                isLoading &&
                (
                    <div className='flex flex-wrap gap-10 justify-center'>
                        {
                            [...Array(4)].map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default ExistingProduct
