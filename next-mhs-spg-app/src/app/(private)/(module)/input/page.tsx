import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DUMMY_SERVICE = [
    {
        id: 'input-outlet',
        label: 'Input Data Outlet',
        icon: ICONPACK.store,
        path: '/input/outlet'
    },
    {
        id: 'input-product',
        label: 'Input Data Product',
        icon: ICONPACK.box,
        path: '/input/product'
    },
    {
        id: 'input-asset',
        label: 'Input Data Asset',
        icon: ICONPACK.wheat,
        path: '/input/asset'
    },
    {
        id: 'input-employee',
        label: 'Input Data Karyawan',
        icon: ICONPACK.users,
        path: '/input/employe'
    }
]

const InputPage = () => {
    return (
        <div className='relative h-screen'>
            <div className='fixed top-0 left-0 bg-gradient-to-r from-kimbo-red/95 to-orange-600 w-full h-min p-5'>
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
            <section className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-5 pt-24'>
                {DUMMY_SERVICE?.map((service) =>
                    <Link href={service?.path} key={service?.id} className='size-full p-5 flex flex-col justify-center items-center bg-white/90'>
                        <Image src={service?.icon} alt='Icon' width={42} height={42} className=' bg-gray-50 p-2.5 rounded-full aspect-square' />
                        <p className='text-md text-gray-400  text-center'>
                            {service?.label}
                        </p>
                    </Link>
                )}
            </section>
        </div>
    )
}

export default InputPage