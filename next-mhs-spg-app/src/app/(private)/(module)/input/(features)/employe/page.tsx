import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ICONPACK } from '@/registry/icons'
import CE_ButtonDelete from './_element/CE_ButtonDelete'
import { T_Outlet } from '@/api/features/outlet/api.outlet.list'
import { ACT_GetEmployeeList } from './_action/action.get.employee.list'
import { T_Employee } from '@/api/features/employee/api.employee.list'

const OutletPage = async () => {
    const employees: any = await ACT_GetEmployeeList() || []

    if (!employees) {
        return <>Loading..</>
    }

    return (
        <div className='pb-16'>
            {/* employees */}
            <div className={'p-3 space-y-3'}>
                <input type='text' placeholder='Cari pekerja' className='rounded w-full p-2.5 ' />
                <section className='grid grid-cols-1 gap-2'>
                    {employees?.length && employees?.map((epmloyee: T_Employee) =>
                        <article key={epmloyee?.id} className='bg-white rounded flex justify-between space-x-3 p-2.5'>
                            <section className='flex space-x-4'>
                                <Image src={epmloyee?.avatar ? (`https://api-spg.mahesamegahmandiri.com${epmloyee?.avatar}`) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s"} alt='Icon' width={100} height={100} className='size-16 aspect-square bg-gray-50 object-cover rounded' />
                                <section>
                                    <p className='text-md text-soft-black'>{epmloyee?.full_name}</p>
                                    <p className='text-xs font-light'>{epmloyee?.employee_status as string}</p>
                                    <p className='text-xs font-light'>{epmloyee?.email as string}</p>
                                </section>
                            </section>
                            <section className='flex justify-center items-center space-x-5'>
                                <CE_ButtonDelete id={String(epmloyee?.id)} />
                                <Link href={'/input/epmloyee/form/' + epmloyee?.id}>
                                    <Image src={ICONPACK.pencil} alt='' width={16} height={16} />
                                </Link>
                            </section>
                        </article>
                    )}
                    <article className={!employees?.length ? 'bg-white flex flex-col justify-center items-center space-y-3 p-12' : 'hidden'}>
                        <Image src={'/assets/no-data.png'} alt='Icon' width={80} height={80} className='s p-2 bg-gray-50 rounded-lg aspect-square' />
                        <p className='text-md text-gray-400  text-center'>
                            Tidak ada data produk ditemukan
                        </p>
                        <Link href={'/input/outlet'} className='bg-kimbo-red/90 text-white p-1 px-2.5 text-sm rounded'>+ Tambah Outlet</Link>
                    </article>
                </section>
            </div>
        </div>
    )
}

export default OutletPage