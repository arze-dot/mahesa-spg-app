import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <main className='bg-white h-screen flex flex-col justify-center items-center space-y-3 p-12'>
            <Image src={'/assets/no-data.png'} alt='Icon' width={80} height={80} className='s p-2 bg-gray-50 rounded-lg aspect-square' />
            <h1 className='text-xl font-semibold'>404</h1>
            <p className='text-md text-gray-400  text-center'>
                Halaman tidak dapat ditemukan
            </p>
            <Link className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded' href={'/home'}>Kembali ke Beranda</Link>
        </main>
    )
}

export default NotFoundPage