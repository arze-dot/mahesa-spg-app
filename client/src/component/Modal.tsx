import React, { ReactNode, useState } from "react";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-show"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg modal-content-show w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-end">
                    <button
                        className="text-black bg-gray-200 rounded px-3 py-1"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                <div className="mt-3">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
