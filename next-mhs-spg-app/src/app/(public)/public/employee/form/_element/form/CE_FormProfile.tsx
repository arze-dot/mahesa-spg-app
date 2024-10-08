'use client'

import React from 'react'

const CE_FormProfile = ({ register, errors }: { register: any, errors: any }) => {
    return (
        <div className='space-y-5 bg-white p-3'>
            <h1 className='font-semibold'>Personal Data</h1>
            <hr />
            <section className='space-y-2'>
                <label className='text-soft-black'>Nama Employee</label>
                <input {...register('full_name')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan nama karyawan' />
                {errors['name'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['name']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>NIK</label>
                <input {...register('nik')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan NIK karyawan' />
                {errors['nik'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['nik']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Email</label>
                <input {...register('email')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='email' placeholder='Masukan email karyawan' />
                {errors['email'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['email']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Telepon</label>
                <input {...register('phone')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='tel' placeholder='Masukan nomor telepon karayawan' />
                {errors['phone'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['phone']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Alamat</label>
                <input {...register('address')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='textareas' placeholder='Masukan alamat karywan' />
                {errors['address'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['address']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Tanggal Lahir</label>
                <input {...register('birth_date')} className='w-full p-2.5 rounded bg-white border border-gray-100' type='date' placeholder='Masukan tanggal lahir karyawan' />
                {errors['birth_date'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['birth_date']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Status karyawan</label>
                <select {...register('employee_status')} className='w-full p-2.5 rounded bg-white border border-gray-100'>
                    <option value="">Pilih Status Karyawan</option>
                    <option value="full_time">Tetap</option>
                    <option value="contract">Kontrak</option>
                    <option value="internship">Magang</option>
                </select>
                {errors['employee_status'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['employee_status']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Jenis Kelamin</label>
                <select {...register('gender')} className='w-full p-2.5 rounded bg-white border border-gray-100'>
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="m">Pria</option>
                    <option value="f">Wanita</option>
                </select>
                {errors['gender'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['gender']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='space-y-2'>
                <label className='text-soft-black'>Kode Area</label>
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
        </div>
    )
}

export default CE_FormProfile