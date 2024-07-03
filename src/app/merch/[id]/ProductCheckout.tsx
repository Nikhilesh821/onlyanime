"use client"

import ZoomedImage from '@/components/ZoomedImage'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { centToDollars } from '@/lib/utils'
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import { DollarSign } from 'lucide-react'
import { Product } from '@prisma/client'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { createCheckoutSessionAction } from './actions'
import { useRouter } from 'next/navigation'

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

const ProductCheckout = ({ product }: { product: Product }) => {
    const router=useRouter()
    const {mutate:createCheckOutSession,isPending}=useMutation({
        mutationKey:["createCheckOutSession"],
        mutationFn:createCheckoutSessionAction,
        onSuccess:({url})=>{
            if(url){
                
                router.push(url)
            }
            else{
                toast.error("Error creating checkout session. Please try again later")
            }
        },
        onError:(error)=>{
            console.log(error)
            toast.error(error.message)
        }
    })
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const handleBuyProduct=()=>{
        if(!selectedSize){
            return toast.error("Please select a size")
        }
        createCheckOutSession({productId:product.id,size:selectedSize})
    }
    return (
        <div className='flex flex-col md:flex-row gap-5 mb-10'>
            <ZoomedImage imgSrc={product.image} className='object-cover rounded-lg' />
            <div className='w-full'>
                <h1 className={'text-2xl md:text-4xl font-bold ' + (inria2.className)}>
                    {product.name}
                </h1>
                <div>
                    <DollarSign className='inline h-4 w-4 text-muted-foreground' />
                    <span className={'text-sm ' + (inria.className)}>
                        {centToDollars(product.price)}
                    </span>
                </div>
                <div className='flex flex-row gap-2 items-center mt-2'>
                <Label className={' inline-block text-md '+(inria2.className)}>
                    Size
                </Label>
                <Select onValueChange={setSelectedSize}>
                    <SelectTrigger className={'w-[180px] focus:ring-0 '+(inria.className)}>
                        <SelectValue className={inria.className} placeholder={"Select "} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className={inria.className} value='sm'>
                            Small
                        </SelectItem>
                        <SelectItem className={inria.className} value='md'>
                            Medium
                        </SelectItem>
                        <SelectItem className={inria.className} value='lg'>
                            Large
                        </SelectItem>
                    </SelectContent>
                </Select>
                </div>
                
                <Button disabled={isPending} variant={"default"} className='mt-5 text-primary-foreground px-8 font-bold py-5 rounded-full' size={'sm'} onClick={handleBuyProduct}>
                    {isPending?"Processing":"Buy Now"}
                </Button>

            </div>
        </div>
    )
}

export default ProductCheckout
