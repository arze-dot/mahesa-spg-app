'use client'

import React from 'react'
import { cn } from '@/lib/helper/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { SchemaEditEmployee } from '../../_action/schema/schema.edit.employee';
import { ACT_EditEmployee } from '../../_action/action.edit.employee';

type T_InputEmployee = {
    name: string
    address: string
    latitude: string
    longitude: string
    area_code: string
    user_id: number
    created_by: number
    updated_by: number
    image: string
}

const CE_FormEditEmployee = ({ id, defaultValues }: { id: string, defaultValues: T_InputEmployee }) => {
    const router = useRouter()
    const {
        register,
        formState: { isValid, isLoading, isSubmitting, errors },
        handleSubmit,
        watch,
    } = useForm<z.infer<typeof SchemaEditEmployee>>({
        resolver: zodResolver(SchemaEditEmployee),
        defaultValues: {
            id: id,
            name: defaultValues.name || "",
            address: defaultValues.address || "",
            latitude: defaultValues.latitude || "",
            longitude: defaultValues.longitude || "",
            area_code: defaultValues.area_code || "",
            user_id: 1,
            created_by: 1,
            updated_by: 1,
            image: defaultValues.image || "",
        },
        mode: 'onTouched',
    });
    const isDisabled = isSubmitting || isLoading || !isValid;

    const onSubmit = async (data: T_InputEmployee) => {
        try {

            const employeeData = {
                ...data,
                id: id,
                created_by: 1,
                updated_by: 1,
                code: data?.name
            };

            const createEmployeeResponse: any = await ACT_EditEmployee(employeeData);

            if (createEmployeeResponse.status === 201) {
                toast.success('Berhasil mengubah employee 1');
                router.push('/input/product')

            } else {
                toast.error('Gagal mengubah employee 1');
            }
        } catch (error) {
            return error
        }
    };
    return (
        <div className='pb-40'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Nama Employee</label>
                    <input {...register('name')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan nama employee' />
                    {errors['name'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['name']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Alamat Employee</label>
                    <input {...register('address')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan kode employee' />
                    {errors['address'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['address']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='grid grid-cols-2 gap-x-5'>
                    <section className='space-y-2'>
                        <label className='text-soft-black'>Longtitude</label>
                        <input {...register('longitude')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan longitude employee' />
                        {errors['longitude'] && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors['longitude']?.message?.toString()}
                            </p>
                        )}
                    </section>
                    <section className='space-y-2'>
                        <label className='text-soft-black'>Latitude</label>
                        <input {...register('latitude')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan latitude employee' />
                        {errors['latitude'] && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors['latitude']?.message?.toString()}
                            </p>
                        )}
                    </section>
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Kode Area</label>
                    <select {...register('area_code')} className='w-full p-2.5 rounded bg-white'>
                        <option value="">Kode Area</option>
                        <option value="PMU">PMU</option>
                        <option value="PMM">PMM</option>
                        <option value="PMA">PMA</option>
                        <option value="PMS">PMS</option>
                    </select>
                    {errors['area_code'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['area_code']?.message?.toString()}
                        </p>
                    )}
                </section>
                <button
                    type='submit'
                    disabled={isDisabled}
                    className={cn(
                        isDisabled ? 'cursor-not-allowed bg-gray-200' : 'bg-kimbo-red ',
                        'w-full p-2.5 cursor-pointer rounded text-white font-semibold'
                    )}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CE_FormEditEmployee