'use client'

import React, { useState } from 'react'
import Image from 'next/image';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ICONPACK } from '@/registry/icons';
import { FormLoginSchema } from '../_action/schema/schema.login';
import { ACT_Login } from '../_action/action.login';
import { cn } from '@/lib/helper/cn';

type LoginData = {
    username: string,
    password: string,
}

const CE_LoginForm = () => {
    const router = useRouter()
    const {
        register,
        formState: { isValid, isLoading, isSubmitting, errors },
        handleSubmit,
    } = useForm<z.infer<typeof FormLoginSchema>>({
        resolver: zodResolver(FormLoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const isDisabled = isSubmitting || isLoading || !isValid;
    const onSubmit = async (data: LoginData) => {
        toast.loading('Mengirim data', { position: 'bottom-center', duration: 500 });
        try {
            const result = await ACT_Login(data);
            if (result?.status) {
                toast.success('Berhasil login', { position: 'bottom-center', duration: 1000 });
                router.push('/home')
            } else {
                toast.error('Login gagal, periksa kembali username dan password anda', { position: 'bottom-center', duration: 2000 });
            }
        } catch (error) {
            return error
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-y-5 rounded-full'>
            <section>
                <input {...register('username')} className='w-full p-2.5 rounded bg-light-gray' type='text' placeholder='Username' />
                {errors['username'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['username']?.message?.toString()}
                    </p>
                )}
            </section>
            <section>
                <section className='relative'>
                    <input {...register('password')} className='w-full p-2.5 rounded bg-light-gray' type={showPassword ? 'text' : 'password'} placeholder='Enter password' />
                    <Image
                        id="toogle-show-password"
                        src={showPassword ? ICONPACK.eye.show : ICONPACK.eye.hide}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-3 top-3 cursor-pointer '
                        alt='Back'
                        width={18}
                        height={18}
                    />
                </section>
                {errors['password'] && (
                    <p className="mt-2 text-xs text-red-500">
                        {errors['password']?.message?.toString()}
                    </p>
                )}
            </section>
            <section className='flex justify-end space-x-2'>
                <input type='checkbox' />
                <label className='text-gray-500'>Remember Me</label>
            </section>
            <button
                disabled={isDisabled}
                className={cn(
                    isDisabled ? 'cursor-not-allowed bg-gray-200' : 'bg-kimbo-red ',
                    'p-2.5 cursor-pointer rounded text-white font-semibold'
                )}
            >
                Sign In
            </button>
        </form>
    )
}

export default CE_LoginForm

