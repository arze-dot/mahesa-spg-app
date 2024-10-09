'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const CE_Header = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className='h-12 sticky w-full top-0 bg-white shadow-sm flex justify-between items-center p-2 space-x-2 z-50'>
            <button className='rounded flex items-center space-x-2'>
                <h1 className='capitalize text-md font-normal'>{pathname.replaceAll('/', ' ')}</h1>
            </button>
            <Link href={`${pathname}/form`} className="bg-gray-300/30 hover:bg-gray-200/20 p-1 rounded cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </Link>
        </div>
    )
}

export default CE_Header