'use client'
import React, { useState } from 'react'
import CE_OutletAsyncSelect from '../CE_OutletAsyncSelect'
import { useFieldArray } from 'react-hook-form';

const CE_FormOutlet = ({ register, errors, setValue, control }: { register: any, errors: any, setValue: any, control: any }) => {
    const { fields, append, remove } = useFieldArray({
        name: "outlets",
        control
    });

    return (
        <div className='space-y-5 bg-white p-3'>
            <h1 className='font-semibold'>Outlet</h1>
            <hr />
            {fields.map((field, index) => {
                const errorForField = errors?.posts?.[index]?.name;
                return (
                    <div className="space-y-3" key={field.id}>
                        <CE_OutletAsyncSelect register={register} setValue={setValue} indexId={`outlets.${index}`} />
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Nama Outlet</label>
                            <input  {...register(`outlets.${index}.name` as const)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='text' placeholder='Masukan nama outlet' />
                            {errors[`outlets.${index}.name`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors[`outlets.${index}.name`]?.message?.toString()}
                                </p>
                            )}
                        </section>
                        <section className='space-y-2'>
                            <label className='text-soft-black'>Alamat</label>
                            <input   {...register(`outlets.${index}.address` as const)} className='w-full p-2.5 rounded bg-white border border-gray-100' type='textareas' placeholder='Masukan alamat outlet' />
                            {errors[`outlets.${index}.address`] && (
                                <p className="mt-2 text-xs text-red-500">
                                    {errors[`outlets.${index}.address`]?.message?.toString()}
                                </p>
                            )}
                            <p>{errorForField?.message ?? <>&nbsp;</>}</p>
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
                        id: "",
                        outlet_id: "",
                        name: "",
                        code: "",
                        date_in: "",
                        date_expired: "",
                        image: "",
                        created_at: "",
                        updated_at: "",
                        created_by: 1,
                        updated_by: 1
                    })
                }
            >
                + Tambah
            </button>
        </div >
    )
}

export default CE_FormOutlet