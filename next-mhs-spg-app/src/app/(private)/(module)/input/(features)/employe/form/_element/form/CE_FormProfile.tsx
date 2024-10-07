'use client'
import React from 'react'
import { SchemaCreateEmployee } from '../../../_action/schema/schema.create.employee';
import { cn } from '@/lib/helper/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ACT_CreateEmployee } from '../../../_action/action.create.employee';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/lib/context/MultiFormContext';

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


const CE_FormProfile = () => {
    const router = useRouter()
    const {
        register,
        formState: { isLoading, isSubmitting, errors },
        handleSubmit,
    } = useForm<z.infer<typeof SchemaCreateEmployee>>({
        resolver: zodResolver(SchemaCreateEmployee),
        defaultValues: {
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            area_code: "",
            user_id: 1,
            created_by: 1,
            updated_by: 1,
            image: "",
        },
        mode: 'onTouched',
    });

    const isDisabled = isSubmitting || isLoading
    const onSubmit = async (data: T_InputEmployee) => {
        try {
            const employeeData = {
                ...data,
                created_by: 1,
                updated_by: 1,
                code: data?.name
            };
            console.log(employeeData)
            const createEmployeeResponse: any = await ACT_CreateEmployee(employeeData);
            if (createEmployeeResponse.status === 201) {
                toast.success('Berhasil membuat employee');

                updateFormValues(data);
                setCurrentStep((prev) => prev + 1);
                router.push('/input/employee')


            } else {
                toast.error('Gagal membuat employee');
            }
        } catch (error) {
            return error
        }
    };

    const { currentStep, setCurrentStep, updateFormValues } = useFormContext();
    const handlePrevious = () => {
        if (currentStep < 1) return
        setCurrentStep((prev) => prev - 1);
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 bg-white p-3'>
                <h1 className='font-semibold'>Personal Data</h1>
                <hr />
                <section className='space-y-2'>
                    <label className='text-soft-black'>Nama Employee</label>
                    <input {...register('name')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan nama employee' />
                    {errors['name'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['name']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>NIK</label>
                    <input {...register('address')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan kode employee' />
                    {errors['address'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['address']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Email</label>
                    <input {...register('longitude')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='email' placeholder='Masukan longitude employee' />
                    {errors['longitude'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['longitude']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Telepon</label>
                    <input {...register('latitude')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='tel' placeholder='Masukan latitude outlet' />
                    {errors['latitude'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['latitude']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Alamat</label>
                    <input {...register('latitude')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='textareas' placeholder='Masukan latitude outlet' />
                    {errors['latitude'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['latitude']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Tanggal Lahir</label>
                    <input {...register('latitude')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='date' placeholder='Masukan latitude outlet' />
                    {errors['latitude'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['latitude']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Kode Area</label>
                    <select {...register('area_code')} className='w-full p-2.5 rounded bg-white border border-gray-100'>
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="m">Pria</option>
                        <option value="f">Wanita</option>
                    </select>
                    {errors['area_code'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['area_code']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Jenis Kelamin</label>
                    <select {...register('area_code')} className='w-full p-2.5 rounded bg-white border border-gray-100'>
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
                    Lanjutkan
                </button>
                <button
                    type='button'
                    disabled={isDisabled}
                    onClick={() => handlePrevious()}
                    className={cn(
                        'w-full p-2.5 cursor-pointer rounded text-soft-black'
                    )}
                >
                    Kembali
                </button>
            </form>
        </div>
    )
}

export default CE_FormProfile