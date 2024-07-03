"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign } from 'lucide-react'
import { centToDollars, cn } from '@/lib/utils'
import ZoomedImage from './ZoomedImage'
import { Button } from './ui/button'
import Link from 'next/link'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleProductArchive } from '@/app/secret-dashboard/actions'
import toast from 'react-hot-toast'

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



const Product = ({ product,adminView=false }: { product: any,adminView?:Boolean }) => {

    const queryClient=useQueryClient()
    const {mutate:toggleArchive,isPending}=useMutation({
        mutationKey:["toggleArchive"],
        mutationFn: async ()=>await toggleProductArchive(product.id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getAllProducts"]})
            toast.success(`Product ${product.isArchived?"Unarchive":"archived"}`)
            product.archived=!product.archived
        },
        onError:(error)=>{
            toast.error(error.message)
        },
    })

    return (
        <Card className='flex flex-col w-full'>
            <CardHeader className='px-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className={'text-lg font-medium ' + (inria2.className)}>
                    {product.name}
                </CardTitle>
                <div>
                    <DollarSign className={'inline w-4 h-4 text-muted-foreground'} />
                    <span className={inria.className}>
                        {centToDollars(product.price)}
                    </span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-4'>
                <ZoomedImage imgSrc={product.image} className='h-60 w-30 rounded-lg object-cover' />
                <div className='flex justify-center mt-auto'>
                    {adminView ? (
                        <Button disabled={isPending} onClick={()=>toggleArchive()} className='w-full font-bold !rounded-full' variant={"outline"}>
                            {product.isArchived?"Unarchive":"Archive"}
                        </Button>
                    ) :
                        <Button className={'!rounded-full text-md font-bold w-full ' + (inria2.className)}>
                            <Link className='rounded-full' href={`/merch/${product.id}`}>
                                Buy
                            </Link>
                        </Button>
                    }
                </div>
            </CardContent>
            <div className='px-6 py-2'>
                {
                    adminView ? (
                        <span className={`text-sm font-medium ${product.isArchived ? "text-slate-500" : "text-primary"} `+(inria2.className)}>
                            {product.isArchived ? "Archived" : "Live"}
                        </span>
                    ) : <span className={'text-sm font-medium text-primary '+(inria2.className)}>
                        In Stock
                    </span>
                }
            </div>

        </Card>
    )
}

export default Product
