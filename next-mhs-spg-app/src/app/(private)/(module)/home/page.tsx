import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ACT_GetReportList } from './_action/action.get.report.list'
import { T_Report } from '@/api/features/api.report.list'

const DUMMY_USER = {
    id: 'USR_001',
    firstname: "Moana",
    lastname: "Armadila",
    possition: "SPG Area Manager",
    profilePicture: '/assets/sample-profile-picture.jpg'
}

const QUICK_FEATURE = [
    {
        id: 'input-product',
        label: "Tambah Produk",
        path: '/input/product/form',
        icon: ICONPACK.plus
    },
    {
        id: 'report-bf',
        label: "Report Before After",
        path: '/report/before-after/form',
        icon: ICONPACK.pencil
    },
    {
        id: 'daily-report',
        label: "SPG Daily Report",
        path: '/report/daily/form',
        icon: ICONPACK.store
    }
    , {
        id: 'competitor-product-report',
        label: "Product Competitor",
        path: '/input/product',
        icon: ICONPACK.box
    }
]

const Homepage = async () => {
    const reports: any = await ACT_GetReportList() || []
    return (
        <div>
            {/* Hero Header */}
            <div className='relative h-60'>
                <div className='relative'>
                    <div className='bg-gradient-to-r from-kimbo-red/95 to-orange-600 w-full h-48 p-5 pt-8 rounded-b-md'>
                        <section className='w-full flex justify-between items-center space-x-3 text-white'>
                            <section>
                                <h1 className='text-xl font-semibold'>Hi,{DUMMY_USER.firstname} <span className="text-yellow-500">👋</span></h1>
                                <h2 className='text-sm font-light'>{DUMMY_USER.possition}</h2>
                            </section>
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
                        <section className='absolute -bottom-12 right-3 w-[95%] h-auto bg-white rounded-md p-3 px-5 flex flex-col space-y-3'>
                            <h1 className='w-full font-semibold text-sm text-soft-black'>Works</h1>
                            <div className='flex justify-between space-x-3 w-full items-start'>
                                {QUICK_FEATURE?.map((feature) =>
                                    <article key={feature?.id} className='w-full flex flex-col justify-start items-center text-center space-y-1 p-1.5 aspect-square'>
                                        <Image src={feature?.icon} alt='Icon' width={22} height={22} />
                                        <p className='text-xs text-gray-500'>{feature?.label}</p>
                                    </article>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            {/* Infomational */}
            <div className='p-3 space-y-2'>
                <h1 className='w-full font-semibold text-sm text-soft-black'>Informasi</h1>
                <article className='bg-gradient-to-r from-red-500 to-orange-500 flex space-x-3 rounded text-white'>
                    <Image src={'/assets/info-3.png'} alt='Icon' width={100} height={100} className='h-full object-contain' />
                    <section className='p-2.5 px-1'>
                        <p className='text-md font-semibold'>Libur Hari Raya 2025</p>
                        <p className='text-xs font-light text-ellipsis line-clamp-3'>Berdasarkan ketetapan SKB 3 Menteri tentang Hari Libur Nasional dan Cuti Bersama 2024, Idul Adha 2024 diperingati pada 17 Juni 2024. Meski demikian, penetapan resmi Hari Raya Idul Adha 2024 oleh pemerintah harus menunggu hasil sidang isbat. Baca artikel detiknews, "Tanggal Libur Peringatan Idul Adha 2024, Cek SKB 3 Menteri"</p>
                    </section>
                </article>
            </div>
            {/* Product Report */}
            <div className='p-3 space-y-2'>
                <h1 className='w-full font-semibold text-sm text-soft-black'>Report Product</h1>
                <input type='text' placeholder='Cari produk' className='w-full p-2.5 border border-gray-100' />
                <section className='grid grid-cols-1 gap-2'>
                    {reports?.length && reports?.map((report: T_Report) =>
                        <article key={report.id} className='bg-white flex space-x-3 p-2.5'>
                            <Image src={`https://api-spg.mahesamegahmandiri.com${report?.product?.image}`} alt='Icon' width={100} height={100} className='size-16 aspect-square bg-gray-50 object-cover rounded' />
                            <section>
                                <p className='text-md text-soft-black'>{report?.product?.name}</p>
                                <p className='text-xs font-light'>{report?.product?.updated_at as string}</p>
                            </section>
                        </article>
                    )}
                    <article className='bg-white flex flex-col justify-center items-center space-y-3 p-12'>
                        <Image src={'/assets/no-data.png'} alt='Icon' width={80} height={80} className='s p-2 bg-gray-50 rounded-lg aspect-square' />
                        <p className='text-md text-gray-400  text-center'>
                            Tidak ada data produk ditemukan
                        </p>
                        <Link className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded' href={'/input'}>+ Tambah Produk</Link>
                    </article>
                </section>
            </div>

            {/* Activity Report */}
            <div className='p-3 space-y-4'>
                <div className='bg-white p-3 space-y-2'>
                    <h1 className='w-full font-semibold text-sm text-soft-black'>Activity</h1>
                    <section className='grid grid-cols-1 gap-4 divide-y'>
                        {[1, 2, 3, 4, 5].map((report) =>
                            <article key={report} className='flex space-x-3 p-1'>
                                <Image src={ICONPACK.bookCheck} alt='Icon' width={22} height={22} className='size-10 p-2.5 bg-gray-50 rounded-full aspect-square' />
                                <section>
                                    <p className='text-md text-soft-black'>Report produk sosis sapi freeze</p>
                                    <p className='text-xs font-light'>05 October 2024 10:00 Am</p>
                                </section>
                            </article>
                        )}
                    </section>
                    <article className='bg-white flex flex-col justify-center items-center space-y-3 p-12'>
                        <Image src={'/assets/no-data.png'} alt='Icon' width={80} height={80} className='s p-2 bg-gray-50 rounded-lg aspect-square' />
                        <p className='text-md text-gray-400  text-center'>
                            Belum ada report aktifitas hari ini
                        </p>
                        <Link className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded' href={'/input'}>+ Buat Laporan</Link>
                    </article>
                </div>


            </div>
        </div>
    )
}

export default Homepage