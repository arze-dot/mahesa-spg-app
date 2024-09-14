import React from 'react';

interface ButtonProps {
    isLoading: boolean;
    onClick: () => void;
    children: React.ReactNode;
    color?: "red" | "golden"
}

const Button: React.FC<ButtonProps> = ({
    isLoading,
    onClick,
    children,
    color
}) => {

    const colorVariant = () => {
        if (color === 'red') return 'bg-[#AC1919] text-white'
        if (color === 'golden') return 'bg-golden text-deep-red'

        return 'bg-golden text-deep-red'
    }
    return (
        <button
            onClick={onClick}
            type='button'
            disabled={isLoading}
            className={`w-full h-12  font-semibold rounded-lg flex justify-center items-center ${colorVariant()}`}
        >
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
