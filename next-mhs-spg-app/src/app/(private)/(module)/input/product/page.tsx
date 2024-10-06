import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ACT_GetProductList } from './_action/action.get.product.list'
import { T_Product } from '@/api/features/api.report.list'
import { ICONPACK } from '@/registry/icons'
import { ACT_DeleteProduct } from './_action/action.delete.product'
import toast from 'react-hot-toast'
import CE_ButtonDelete from './_element/CE_ButtonDelete'

const ProductPage = async () => {
    const products: any = await ACT_GetProductList() || []

    return (
        <div className='relative'>
            <div className='bg-gradient-to-r from-kimbo-red/95 to-orange-600 w-full h-max p-5'>
                <section className='w-full flex justify-between items-center space-x-3 text-white'>
                    <h1 className='font-base text-lg'>Product</h1>
                    <Link href='/input/product/form' className="bg-gray-600/30 hover:bg-gray-600/50 p-1.5 rounded cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                    </Link>
                </section>
            </div>
            {/* Product Report */}
            <div className={'p-3 space-y-3'}>
                <input type='text' placeholder='Cari produk' className='rounded w-full p-2.5 ' />
                <section className='grid grid-cols-1 gap-2'>
                    {products?.map((product: T_Product) =>
                        <article key={product.id} className='bg-white rounded flex justify-between space-x-3 p-2.5'>
                            <section className='flex space-x-4'>
                                <Image src={product?.image ? (`https://api-spg.mahesamegahmandiri.com${product?.image}`) : ""} alt='Icon' width={100} height={100} className='size-16 aspect-square bg-gray-50 object-cover rounded' />
                                <section>
                                    <p className='text-md text-soft-black'>{product?.name}</p>
                                    <p className='text-xs font-light'>{product?.code as string}</p>
                                </section>
                            </section>
                            <section className='flex justify-center items-center space-x-5'>
                                <CE_ButtonDelete id={String(product?.id)} />
                                <Link href={'/input/product/edit/' + product?.id}>
                                    <Image src={ICONPACK.pencil} alt='' width={16} height={16} />
                                </Link>
                            </section>
                        </article>
                    )}
                    <article className={!products?.length ? 'bg-white flex flex-col justify-center items-center space-y-3 p-12' : 'hidden'}>
                        <Image src={'/assets/no-data.png'} alt='Icon' width={80} height={80} className='s p-2 bg-gray-50 rounded-lg aspect-square' />
                        <p className='text-md text-gray-400  text-center'>
                            Tidak ada data produk ditemukan
                        </p>
                        <Link className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded' href={'/input'}>+ Tambah Produk</Link>
                    </article>
                </section>
            </div>
        </div>
    )
}

export default ProductPage