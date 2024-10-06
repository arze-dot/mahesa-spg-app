'use client'

import React, { useCallback, useState } from 'react'
import { cn } from '@/lib/helper/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Webcam from 'react-webcam';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { SchemaEditOutlet } from '../../_action/schema/schema.edit.outlet';
import { ACT_EditOutlet } from '../../_action/action.edit.outlet';
import { ACT_UploadOutletImage } from '../../_action/action.upload.outlet.image';

type T_InputOutlet = {
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

const CE_FormEditOutlet = ({ id, defaultValues }: { id: string, defaultValues: T_InputOutlet }) => {
    const router = useRouter()
    const {
        register,
        formState: { isValid, isLoading, isSubmitting, errors },
        handleSubmit,
        watch,
    } = useForm<z.infer<typeof SchemaEditOutlet>>({
        resolver: zodResolver(SchemaEditOutlet),
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


    console.log(watch())

    const isDisabled = isSubmitting || isLoading || !isValid;
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

    const onSubmit = async (data: T_InputOutlet) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('product', file);
                console.log(file)
                const uploadResponse = await ACT_UploadOutletImage(formData);
                console.log(uploadResponse)

                if (uploadResponse?.status === 201 || uploadResponse?.status === 200) {
                    const imageUrl = uploadResponse?.files?.product;
                    const outletData = {
                        ...data,
                        id: id,
                        image: imageUrl,
                        created_by: 1,
                        updated_by: 1,
                        code: data?.name
                    };

                    const createOutletResponse: any = await ACT_EditOutlet(outletData);
                    console.log(createOutletResponse)
                    if (createOutletResponse.status === 201) {
                        toast.success('Berhasil mengubah outlet 1');
                        router.push('/input/product')

                    } else {
                        toast.error('Gagal mengubah outlet 1');
                    }
                } else {
                    toast.error('Gagal mengupload gambar 3');
                }
            } catch (error) {
                return error
            }
        } else {
            const productData = {
                ...data,
                id: id,
                image: defaultValues?.image,
                created_by: 1,
                updated_by: 1,
                code: data?.name
            };

            const createOutletResponse: any = await ACT_EditOutlet(productData);
            console.log(createOutletResponse)
            if (createOutletResponse.status === 201) {
                toast.success('Berhasil mengubah outlet 2');
                router.push('/input/product')

            } else {
                toast.error('Gagal mengubah outlet 2');
            }
        }
    };
    return (
        <div className='pb-20'>
            <section className='space-y-2 py-3'>
                <label className='text-soft-black'>Nama Outlet</label>
                {/* Picture Section */}
                <div className="w-full">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Outlet" className="w-full h-full bg-white rounded" />
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
                    <label className='text-soft-black'>Nama Outlet</label>
                    <input {...register('name')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan nama outlet' />
                    {errors['name'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['name']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Alamat Outlet</label>
                    <input {...register('address')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan kode outlet' />
                    {errors['address'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['address']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='grid grid-cols-2 gap-x-5'>
                    <section className='space-y-2'>
                        <label className='text-soft-black'>Longtitude</label>
                        <input {...register('longitude')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan longitude outlet' />
                        {errors['longitude'] && (
                            <p className="mt-2 text-xs text-red-500">
                                {errors['longitude']?.message?.toString()}
                            </p>
                        )}
                    </section>
                    <section className='space-y-2'>
                        <label className='text-soft-black'>Latitude</label>
                        <input {...register('latitude')} className='w-full p-2.5 rounded bg-white' type='textareas' placeholder='Masukan latitude outlet' />
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

export default CE_FormEditOutlet