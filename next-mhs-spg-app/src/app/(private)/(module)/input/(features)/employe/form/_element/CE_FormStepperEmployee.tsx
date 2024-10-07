'use client'
import React from 'react'
import CE_FormProfile from './form/CE_FormProfile'
import { useFormContext } from '@/lib/context/MultiFormContext';
import { cn } from '@/lib/helper/cn';

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

const RenderForm = ({ formStep }: { formStep: number }) => {
    switch (formStep) {
        case 0:
            return <CE_FormProfile />
        case 1:
            return <div>Form Outlet</div>
        case 2:
            return <div>Form Asset</div>
        default:
            return <CE_FormProfile />
    }
}

const CE_FormStepperEmployee = () => {
    const { currentStep, setCurrentStep } = useFormContext();
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
            <RenderForm formStep={currentStep} />
        </div>
    )
}

export default CE_FormStepperEmployee