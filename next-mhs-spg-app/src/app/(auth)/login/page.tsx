import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ICONPACK } from '@/registry/icons'
import CE_LoginForm from './_element/client.login.form'

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <section className='w-full h-full px-4 py-5 space-y-8'>
                <Link href={'/'} className='rounded border border-gray-100'>
                    <Image src={ICONPACK.chevron.left} alt='Back' width={24} height={24} />
                </Link>
                <Image className='object-contain' src='/assets/kimbo-logo.png' alt='Kimbo Logo' width={100} height={100} />
                <h1 className='text-2xl font-bold text-soft-black pb-2'>Welcome back!<br /> Glad to see you. Again!</h1>
                <CE_LoginForm />
            </section>
            <Link className='p-5' href='/forgot-password'>Forgot your password?</Link>
        </div >
    )
}

export default LoginPage