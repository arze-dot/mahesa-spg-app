'use client'
import React, { useState } from 'react'
import CE_AssetAsyncSelect from '../CE_AssetAsyncSelect'
import { useFieldArray } from 'react-hook-form';

const CE_FormAsset = ({ register, errors, setValue, control }: { register: any, errors: any, setValue: any, control: any }) => {
    const { fields, append, remove } = useFieldArray({
        name: "assets",
        control
    });

    return (
        <div className='space-y-3 p-2.5 bg-white'>
            <h1 className='font-semibold'>Asset</h1>
            <hr />
            {fields.map((field, index) => {
                return (
                    <div className="space-y-3" key={field.id}>
                        <CE_AssetAsyncSelect register={register} setValue={setValue} indexId={`assets.${index}`} />
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Nama Asset</label>
                            <input {...register(`assets.${index}.name`)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan nama employee' />
                            {errors[`assets.${index}.name`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors[`assets.${index}.name`]?.message?.toString()}
                                </p>
                            )}
                        </section>
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Kode Asset</label>
                            <input {...register(`assets.${index}.code`)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan kode asset' />
                            {errors[`assets.${index}.name`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors[`assets.${index}.name`]?.message?.toString()}
                                </p>
                            )}
                        </section>
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Tangal Masuk</label>
                            <input {...register(`assets.${index}.date_in`)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='date' placeholder='Masukan tanggal masuk asset' />
                            {errors[`assets.${index}.date_in`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors['date_in']?.message?.toString()}
                                </p>
                            )}
                        </section>
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Tanggal Expired</label>
                            <input {...register(`assets.${index}.date_in`)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='date' placeholder='Masukan tanggal expired asset' />
                            {errors[`assets.${index}.date_expired`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors[`assets.${index}.date_expired`]?.message?.toString()}
                                </p>
                            )}
                        </section>
                        <button
                            type="button"
                            className="bg-gray-200 text-gray-500  hover:bg-gray-300 rounded-lg p-2 w-full"
                            onClick={() => remove(index)}
                        >
                            Hapus
                        </button>
                    </div>
                );
            })}

            <button
                type="button"
                className="w-full bg-gray-50 p-2.5 border border-gray-200 cursor-pointer rounded"
                onClick={() =>
                    append({
                        name: "",
                        address: "",
                        latitude: "",
                        longitude: "",
                        code: "",
                        area_code: "",
                        created_by: 1,
                        updated_by: 1,
                        user_id: "",
                        image: "",
                    })
                }
            >
                + Tambah
            </button>

        </div>
    )
}

export default CE_FormAsset