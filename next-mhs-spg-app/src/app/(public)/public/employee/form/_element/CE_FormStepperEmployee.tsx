'use client'

import React from 'react'
import CE_FormProfile from './form/CE_FormProfile'
import { useFormContext } from '@/lib/context/MultiFormContext';
import { cn } from '@/lib/helper/cn';
import CE_FormAsset from './form/CE_FormAsset';
import CE_FormOutlet from './form/CE_FormOutlet';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SchemaCreateEmployee } from '../../_action/schema/schema.create.employee';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ACT_CreateEmployee } from '../../_action/action.create.employee';
import { IRq_CreateEmployee } from '@/api/features/employee/api.employee.create';

const FORMS: { id: number, label: string }[] = [
    {
        id: 0,
        label: 'Personal Info',
    },
    {
        id: 1,
        label: 'Outlet',
    },
    {
        id: 2,
        label: 'Asset',
    }
]

const RenderForm = ({ formStep, errors, register, setValue, control }: { formStep: number, register: any, errors: any, setValue: any, control: any }) => {
    switch (formStep) {
        case 0:
            return <CE_FormProfile register={register} errors={errors} />
        case 1:
            return <CE_FormOutlet register={register} errors={errors} setValue={setValue} control={control} />
        case 2:
            return <CE_FormAsset register={register} errors={errors} setValue={setValue} control={control} />
    }
}

const CE_FormStepperEmployee = () => {
    const router = useRouter()
    const { currentStep, setCurrentStep, updateFormValues } = useFormContext();

    const {
        register,
        formState: { isLoading, isSubmitting, errors },
        handleSubmit,
        watch,
        setValue,
        control
    } = useForm<z.infer<typeof SchemaCreateEmployee>>({
        resolver: zodResolver(SchemaCreateEmployee),
        defaultValues: {
            full_name: "",
            nik: "",
            email: "",
            phone: "",
            address: "",
            birth_date: "",
            employee_status: "",
            gender: "",
            areaCode: "",
            role: "USER",
            username: "123123",
            password: "kimbo123",
            password_confirmation: "kimbo123",
            outlets: [],
            assets: []
        },
        mode: 'onTouched',
    });

    const isDisabled = isSubmitting || isLoading
    const onSubmit = async (data: IRq_CreateEmployee) => {
        console.log("JALAN", data)
        try {
            const employeeData = {
                ...data,
                username: data?.email
            };

            const createEmployeeResponse: any = await ACT_CreateEmployee(employeeData);
            console.log({ createEmployeeResponse })

            if (createEmployeeResponse.status === 201) {
                toast.success('Berhasil membuat data karywan');

                updateFormValues(data);
                setCurrentStep((prev) => prev + 1);
                router.push('/input/employe')
            } else {
                toast.error('Gagal membuat data karywan');
            }
        } catch (error) {
            console.log({ error })
            return error
        }
    };

    const handleNext = () => {
        if (currentStep >= 2) return
        setCurrentStep((prev) => prev + 1);
    };
    const handlePrevious = () => {
        if (currentStep < 1) return
        setCurrentStep((prev) => prev - 1);
    };

    console.log(watch())
    console.log(errors)

    return (
        <div className='space-y-3'>
            <ol className="bg-white p-2.5 flex items-center w-full text-sm text-gray-500 font-medium sm:text-base">
                {FORMS?.map((step: { id: number, label: string }, index: number) =>
                    <li key={step?.id} onClick={() => setCurrentStep(index)} className={cn(currentStep === index ? "" : "",
                        "flex md:w-full items-center text-gray-600 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-8 ")}>
                        <div className="flex items-center whitespace-nowrap after:content-['/'] sm:after:hidden after:mx-2">
                            <span className={cn(currentStep === index ? "bg-kimbo-red text-white border-red-200" : "border-gray-200 ",
                                "w-6 h-6 bg-gray-100 border rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10"
                            )}>
                                {index + 1}
                            </span>
                            {step?.label}
                        </div>
                    </li>
                )}
            </ol>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 pb-20'>
                <RenderForm formStep={currentStep} register={register} errors={errors} setValue={setValue} control={control} />
                <button
                    type='submit'
                    disabled={isDisabled}
                    className={cn(
                        currentStep >= 2 ? "visible" : "hidden",
                        isDisabled ? 'cursor-not-allowed bg-gray-200' : 'bg-kimbo-red',
                        'w-full p-2.5 cursor-pointer rounded text-white font-semibold'
                    )}
                >
                    Submit
                </button>
                <button
                    type='button'
                    disabled={isDisabled}
                    onClick={() => handleNext()}
                    className={cn(
                        currentStep < 2 ? "visible" : "hidden",
                        isDisabled ? 'cursor-not-allowed bg-gray-200' : 'bg-kimbo-red ',
                        'w-full p-2.5 cursor-pointer rounded text-white font-semibold'
                    )}
                >
                    Lanjutkan
                </button>
                <button
                    type='button'
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

export default CE_FormStepperEmployee