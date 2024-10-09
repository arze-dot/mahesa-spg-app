'use client'

import React, { useCallback, useState } from 'react'
import { cn } from '@/lib/helper/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Webcam from 'react-webcam';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ACT_EditAsset } from '../../_action/action.edit.asset';
import { ACT_UploadAssetImage } from '../../_action/action.upload.asset.image';
import { SchemaEditAsset } from '../../_action/schema/schema.edit.asset';

type T_InputAsset = {
    name: string
    code: string
    date_in: string
    date_expired: string
    image: string
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
}

const CE_FormEditAsset = ({ id, defaultValues }: { id: string, defaultValues: T_InputAsset }) => {
    const router = useRouter()
    const {
        register,
        formState: { isLoading, isSubmitting, errors },
        handleSubmit,
    } = useForm<z.infer<typeof SchemaEditAsset>>({
        resolver: zodResolver(SchemaEditAsset),
        defaultValues: {
            id: id,
            name: defaultValues.name || "",
            code: defaultValues.code || "",
            date_in: defaultValues.date_in || "",
            date_expired: defaultValues.date_expired || "",
            image: defaultValues.image || "",
            created_by: defaultValues.created_by || 1,
            updated_by: defaultValues.updated_by || 1,
            created_at: (defaultValues.created_at),
            updated_at: (defaultValues.updated_at)
        },
        mode: 'onTouched',
    });

    const isDisabled = isSubmitting || isLoading
    const defaultImage = `https://api-spg.mahesamegahmandiri.com${defaultValues?.image || ""}`

    const [imageSrc, setImageSrc] = useState<string | null>(defaultImage,);
    const [file, setFile] = useState<File | null>(null);
    const [useWebcam, setUseWebcam] = useState<boolean>(false);
    const webcamRef = React.useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setImageSrc(imageSrc);

            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const file = new File([ab], 'capture.png', { type: mimeString });
            setFile(file);
        }
        setUseWebcam(false);
    }, [webcamRef]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const onSubmit = async (data: T_InputAsset) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('asset', file);
                const uploadResponse = await ACT_UploadAssetImage(formData);

                if (uploadResponse?.status === 201 || uploadResponse?.status === 200) {
                    const imageUrl = uploadResponse?.files?.asset;
                    const dataAsset = {
                        ...data,
                        id: id,
                        image: imageUrl,
                        created_by: 1,
                        updated_by: 1,
                        outlet_id: 1
                    };

                    const createResponse: any = await ACT_EditAsset(dataAsset);
                    if (createResponse.status === 201) {
                        toast.success('Berhasil mengubah asset 1');
                        router.push('/input/asset')

                    } else {
                        toast.error('Gagal mengubah asset 1');
                    }
                } else {
                    toast.error('Gagal mengupload gambar 3');
                }
            } catch (error) {
                return error
            }
        } else {
            const Data = {
                ...data,
                id: id,
                image: defaultValues?.image,
                created_by: 1,
                updated_by: 1,
                outlet_id: 1,
                created_at: defaultValues?.created_at,
                updated_at: defaultValues?.updated_at,
            };

            const createResponse: any = await ACT_EditAsset(Data);
            if (createResponse.status === 201) {
                toast.success('Berhasil mengubah asset 2');
                router.push('/input/asset')

            } else {
                toast.error('Gagal mengubah asset 2');
            }
        }
    };

    return (
        <div className='pb-20'>
            <section className='space-y-2 py-5'>
                <label className='text-soft-black'>Nama Produk</label>
                {/* Picture Section */}
                <div className="w-full">
                    {imageSrc ? (
                        <img src={imageSrc} alt="" className="w-full h-full bg-white rounded" />
                    ) : (
                        <div className="w-full h-60 bg-white border text-sm text-gray-300 flex justify-center items-center">Ukuran file max 2mb</div>
                    )}
                </div>
                {/* Webcam and File Upload */}
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={() => setUseWebcam(!useWebcam)}
                        className="bg-blue-500 w-full text-white px-3 py-2 rounded"
                    >
                        {useWebcam ? 'Stop Kamera' : 'Gunakan Kamera'}
                    </button>
                    <label className="bg-green-500 w-full text-white text-center flex justify-center items-center rounded cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        Upload Gambar
                    </label>
                </div>
                {/* Webcam View */}
                {useWebcam && (
                    <div className="mb-4">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-64 bg-gray-200"
                        />
                        <button
                            onClick={capture}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full"
                        >
                            Ambil Gambar
                        </button>
                    </div>
                )}
            </section>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Nama Asset</label>
                    <input {...register('name')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan nama asset' />
                    {errors['name'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['name']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Kode Asset</label>
                    <input {...register('code')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan kode asset' />
                    {errors['code'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['code']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Tangal Masuk</label>
                    <input {...register('date_in')} className='w-full p-2.5 rounded bg-white' type='date' placeholder='Masukan tanggal masuk asset' />
                    {errors['date_in'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['date_expired']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Tanggal Expired</label>
                    <input {...register('date_expired')} className='w-full p-2.5 rounded bg-white' type='date' placeholder='Masukan tanggal expired asset' />
                    {errors['date_expired'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['date_expired']?.message?.toString()}
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

export default CE_FormEditAsset