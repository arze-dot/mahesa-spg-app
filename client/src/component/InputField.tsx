import { Icon } from '@iconify/react/dist/iconify.js';
import React, { ReactNode } from 'react';

interface InputFieldProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeTextArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
    icon: ReactNode;
    name?: string;
    as?: 'textarea' | 'select'
    children?: ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    placeholder,
    value,
    onChange,
    onChangeTextArea,
    showPasswordToggle,
    showPassword,
    togglePasswordVisibility,
    icon,
    name,
    as,
    children,
    onChangeSelect
}) => {
    return (
        <div className="relative w-full mb-4">
            {
                !as &&
                <>
                    <div className='absolute top-[14px] left-3'>
                        {icon}
                    </div>
                    <input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        name={name}
                        className={`w-full h-12 bg-white rounded-lg py-2 text-black ${icon ? 'pl-10 px-4' : 'px-4 '}`}
                    />
                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute top-3 right-4 text-deep-red font-bold"
                        >
                            {showPassword ? 'hide' : 'show'}
                        </button>
                    )}
                </>
            }

            {
                as === 'textarea' &&
                <>
                    <div className='absolute top-[14px] left-3'>
                        {icon}
                    </div>
                    <textarea
                        name={name}
                        value={value}
                        onChange={onChangeTextArea}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </>
            }
            {
                as === 'select' &&
                <>
                    <div className='absolute top-[14px] left-3'>
                        {icon}
                    </div>
                    <select
                        name={name}
                        onChange={onChangeSelect}
                        value={value}
                        className={`shadow appearance-none border rounded w-full py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${icon ? 'px-3 pl-10' : 'px-3'}`}
                    >
                        {
                            children
                        }
                    </select>
                </>
            }
        </div>
    );
};

export default InputField;
