import BaseLayout from '@/components/BaseLayout'
import Product from '@/components/Product'
import prisma from '@/db/prisma'
import { Inria_Sans } from 'next/font/google'

const inria2 = Inria_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ["300", "400", "700"]
})

const Page = async() => {
  const products=await prisma.product.findMany({where:{isArchived:false}})
  
  return (
    <BaseLayout renderRightPanel={false}>
      <div className='px-4 md:px-10 my-10'>
        <p className={'text-3xl mb-5 md:text-5xl text-center tracking-tight underline-offset-4 font-bold ' + (inria2.className)}>
          Our <span style={{ color: "#EF47BC" }} className='font-bold px-1 text-white'>Products</span>
        </p>
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 justify-items-center'>
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

export default Page
