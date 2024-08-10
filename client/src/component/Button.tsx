import React from 'react';

interface ButtonProps {
    isLoading: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    isLoading,
    onClick,
    children,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="w-full h-12 bg-golden text-deep-red font-semibold rounded-lg flex justify-center items-center"
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
