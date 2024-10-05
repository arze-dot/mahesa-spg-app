'use client'
import React from 'react'
import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import Link from 'next/link'

const CE_Header = () => {
    return (
        <div className='h-12 sticky w-full top-0 bg-white/80 shadow-sm flex justify-start items-center p-2 space-x-2'>
            <Link href={'/'} className='rounded'>
                <Image src={ICONPACK.arrowLeft} alt='Back' width={18} height={18} />
            </Link>
            <h1>Back</h1>
        </div>
    )
}

export default CE_Header