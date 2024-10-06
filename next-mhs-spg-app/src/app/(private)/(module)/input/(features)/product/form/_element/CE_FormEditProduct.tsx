'use client'

import React, { useCallback, useState } from 'react'
import { cn } from '@/lib/helper/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Webcam from 'react-webcam';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { SchemaEditProduct } from '../../_action/schema/schema.edit.product';
import { ACT_UploadProductImage } from '../../_action/action.upload.product.image';
import { ACT_EditProduct } from '../../_action/action.edit.product';

type T_InputProduct = {
    name: string
    type: string
    code: string
    image: string
    created_by: number,
    updated_by: number
}

const CE_FormEditProduct = ({ id, defaultValues }: { id: string, defaultValues: T_InputProduct }) => {
    const router = useRouter()
    const {
        register,
        formState: { isValid, isLoading, isSubmitting, errors },
        handleSubmit,
        watch,
    } = useForm<z.infer<typeof SchemaEditProduct>>({
        resolver: zodResolver(SchemaEditProduct),
        defaultValues: {
            id: id,
            name: defaultValues.name || "",
            type: defaultValues.type || "",
            code: defaultValues.code || "",
            image: defaultValues.image || "",
            created_by: 1,
            updated_by: 1
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

    const onSubmit = async (data: T_InputProduct) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append('product', file);
                console.log(file)
                const uploadResponse = await ACT_UploadProductImage(formData);
                console.log(uploadResponse)

                if (uploadResponse?.status === 201 || uploadResponse?.status === 200) {
                    const imageUrl = uploadResponse?.files?.product;
                    const productData = {
                        ...data,
                        id: id,
                        image: imageUrl,
                        created_by: 1,
                        updated_by: 1
                    };

                    const createProductResponse: any = await ACT_EditProduct(productData);
                    console.log(createProductResponse)
                    if (createProductResponse.status === 201) {
                        toast.success('Berhasil mengubah produk 1');
                        router.push('/input/product')

                    } else {
                        toast.error('Gagal mengubah produk 1');
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
                updated_by: 1
            };

            const createProductResponse: any = await ACT_EditProduct(productData);
            console.log(createProductResponse)
            if (createProductResponse.status === 201) {
                toast.success('Berhasil mengubah produk 2');
                router.push('/input/product')

            } else {
                toast.error('Gagal mengubah produk 2');
            }
        }
    };
    return (
        <div>    <section className='space-y-2'>
            <label className='text-soft-black'>Nama Produk</label>
            {/* Picture Section */}
            <div className="w-full">
                {imageSrc ? (
                    <img src={imageSrc} alt="Product" className="w-full h-full bg-white rounded" />
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
                    <label className='text-soft-black'>Nama Produk</label>
                    <input {...register('name')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan nama produk' />
                    {errors['name'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['name']?.message?.toString()}
                        </p>
                    )}
                </section>
                <section className='space-y-2'>
                    <label className='text-soft-black'>Kode Produk</label>
                    <input {...register('code')} className='w-full p-2.5 rounded bg-white' type='text' placeholder='Masukan kode produk' />
                    {errors['code'] && (
                        <p className="mt-2 text-xs text-red-500">
                            {errors['code']?.message?.toString()}
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

export default CE_FormEditProduct