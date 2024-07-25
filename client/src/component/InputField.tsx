import React from 'react';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    placeholder,
    value,
    onChange,
    showPasswordToggle,
    showPassword,
    togglePasswordVisibility,
}) => {
    return (
        <div className="relative w-full mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full h-12 bg-white rounded-lg px-4 py-2 text-black"
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
        </div>
    );
};

export default InputField;
