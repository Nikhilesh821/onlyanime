"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary'
import { Inria_Sans, Inria_Serif } from 'next/font/google'
import Image from 'next/image'
import React, { useState } from 'react'
import { addNewProduct } from '../actions'
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
const AddNewProductForm = () => {
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState("")
    const [imageUrl, setImageUrl] = useState<string>("")
    const queryClient=useQueryClient()
    const { mutate: createProduct, isPending } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async () => addNewProduct({ name, image: imageUrl, price }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["getAllProducts"]}) //used for refecthing the data using the queryKey from the db so that it automatically gets the product after uploading
            toast.success("Product Added")
            setName("")
            setPrice("")
            setImageUrl("")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return (
        <>
            <p className={'text-2xl md:text-5xl my-5 uppercase text-center font-bold ' + (inria2.className)}>
                Add<span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'> New </span>Product
            </p>
            <form onSubmit={(e) => {
                e.preventDefault()
                createProduct()
            }}>
                <Card className='w-full max-w mx-auto'>
                    <CardHeader>
                        <CardTitle className={'text-2xl ' + (inria2.className)}>New Merchandise</CardTitle>
                        <CardDescription className={"text-md " + inria.className}>
                            Add a new product to your store. Select only an image.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-2 mb-4'>
                            <Label className={"text-xl " + (inria2.className)} htmlFor='name'>
                                Name
                            </Label>
                            <Input
                                className={"text-md py-6 " + inria.className}
                                id='name'
                                type='text'
                                placeholder='OnlyAnime Special'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2 mb-4'>
                            <Label className={"text-xl " + (inria2.className)} htmlFor='price'>
                                Price ($)
                            </Label>
                            <Input
                                className={"text-md py-6 " + inria.className}
                                min={10}
                                id='price'
                                type='number'
                                placeholder='$ 14.99'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <CldUploadWidget signatureEndpoint="/api/sign-image"
                            onSuccess={(result, { widget }) => {
                                setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url)
                                widget.close()

                            }}>
                            {({ open }) => {
                                return (
                                    <Button type='button' variant={"outline"} className={'mt-4 text-lg w-full py-5 rounded-full font-bold ' + (inria2.className)} onClick={() => open()}>
                                        Upload
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        {imageUrl && (
                            <div className='flex justify-center relative w-full mt-5 h-96'>
                                <Image fill src={imageUrl} alt='Uploaded Media' className='object-cover rounded-lg' />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button disabled={isPending} className={'w-full py-5 rounded-full text-lg font-bold ' + (inria2.className)} type='submit'>
                            {isPending ? 'Adding...' : 'Add Product'}

                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}

export default AddNewProductForm
