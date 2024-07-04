import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { DollarSign } from 'lucide-react'
import { centToDollars, cn } from '@/lib/utils'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import ZoomedImage from './ZoomedImage'
import { Product } from '@prisma/client'

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
const SuggestedProduct = ({product}:{product:Product}) => {
    return (
        <Card className='flex flex-col '>
            <CardHeader className='px-2 flex flex-row justify-between space-y-0 pb-0'>
                <CardTitle className='text-sm font-medium'>
                    <p className={'w-28 text-ellipsis overflow-hidden text-nowrap '+(inria2.className)}>
                        {product.name}
                    </p>
                </CardTitle>
                <div>
                    <DollarSign className='inline h-4 w-4 text-muted-foreground'/>
                    <span className={'text-sm '+(inria.className)}>
                        {centToDollars(product.price)}
                    </span>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-1 gap-3 p-2'>
                <ZoomedImage imgSrc={product.image} className='h-44 object-cover rounded-lg'/>
                <div className='flex justify-center mt-auto'>
                <Link href={`/merch/${product.id}`} className={cn(buttonVariants(), inria2.className, "font-semibold rounded-full w-full text-md md:text-lg")}>
                    Buy
                </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default SuggestedProduct
