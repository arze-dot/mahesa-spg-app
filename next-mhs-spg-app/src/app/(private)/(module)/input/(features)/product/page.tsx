import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ACT_GetProductList } from './_action/action.get.product.list'
import { T_Product } from '@/api/features/api.report.list'
import { ICONPACK } from '@/registry/icons'
import CE_ButtonDelete from './_element/CE_ButtonDelete'

const ProductPage = async () => {
    const products: any = await ACT_GetProductList() || []

    if (!products) {
        return <>Loading..</>
    }

    return (
        <div className=''>
            {/* Product Report */}
            <div className={'p-3 space-y-3'}>
                <input type='text' placeholder='Cari produk' className='rounded w-full p-2.5 ' />
                <section className='grid grid-cols-1 gap-2'>
                    {products?.length && products?.map((product: T_Product) =>
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
                                <Link href={'/input/product/form/' + product?.id}>
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
                        <Link href={'/input/product'} className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded'>+ Tambah Produk</Link>
                    </article>
                </section>
            </div>
        </div>
    )
}

export default ProductPage