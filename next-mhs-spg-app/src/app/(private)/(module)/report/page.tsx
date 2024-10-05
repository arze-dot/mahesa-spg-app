import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DUMMY_SERVICE = [
    {
        id: 'before-after',
        label: 'Daily Report Before After',
        icon: ICONPACK.store,
        path: '/outlet/creation'
    },
    {
        id: 'spg',
        label: 'Daily Report SPG',
        icon: ICONPACK.box,
        path: '/product/creation'
    },
    {
        id: 'competitor-product',
        label: 'Product Competitor',
        icon: ICONPACK.wheat,
        path: '/asset/creation'
    },
]

const ReportPage = () => {
    return (
        <div>
            <div className='relative'>
                <div className='bg-gradient-to-r from-kimbo-red/95 to-orange-600 w-full h-min p-5'>
                    <section className='w-full flex justify-between items-center space-x-3 text-white'>
                        <h1 className='font-base text-lg'>Services</h1>
                        <Link href='/home' className="bg-gray-600/30 hover:bg-gray-600/50 p-1.5 rounded cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-bell">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            </svg>
                        </Link>
                    </section>
                </div>
                <section className='grid grid-cols-2 gap-5 w-full p-5'>
                    {DUMMY_SERVICE?.map((service) =>
                        <Link href={service?.path} key={service?.id} className='size-44 flex flex-col justify-center items-center bg-white/90'>
                            <Image src={service?.icon} alt='Icon' width={42} height={42} className=' bg-gray-50 p-2.5 rounded-full aspect-square' />
                            <p className='text-md text-gray-400  text-center'>
                                {service?.label}
                            </p>
                        </Link>
                    )}
                </section>
            </div>
        </div>
    )
}

export default ReportPage