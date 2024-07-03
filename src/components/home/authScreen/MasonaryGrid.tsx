"use client"

import Image from 'next/image'
import { useState } from 'react'
const MasonaryGrid = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [mousePointer, setMousePointer] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (hoverIndex === index) {
            const rect = (e.target as HTMLDivElement).getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setMousePointer({ x: x, y: y })
        }
    }

    return (
        <div className='p-5 sm:p-8'>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">
                {
                    [...Array(16)].map((_, index) => (
                        <div className='relative overflow-hidden rounded-md' key={index}
                            onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)} onMouseMove={(e) => handleMouseMove(e, index)}>
                            <Image className="cursor-pointer hover:scale-150 translate-transform duration-500 ease-in-out" style={{ transformOrigin: `${mousePointer.x}% ${mousePointer.y}%` }} src={`/featured/anime${index + 3}.jpeg`} alt='anime' width={500} height={600} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MasonaryGrid
