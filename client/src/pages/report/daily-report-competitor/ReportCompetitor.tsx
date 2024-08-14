import React from 'react';
import { Icon } from '@iconify/react';


const ReportCompetitor: React.FC = () => {
    return (
        <div className="max-w-sm bg-[#AFAFAF] p-6 rounded-lg shadow-lg">
            <h2 className="text-[14px] font-bold mb-4 underline">REPORT PRODUK KOMPETITOR</h2>

            <div className="mb-4">
                <label htmlFor="storeName" className="block text-gray-700 text-sm font-bold mb-2">Nama Toko</label>
                <div className="relative">
                    <input
                        type="text"
                        id="storeName"
                        placeholder="Cari Nama Toko"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Icon icon="material-symbols:search" />
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">Nama Produk</label>
                <input
                    type="text"
                    id="productName"
                    placeholder="Nama Produk"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="originalPrice" className="block text-gray-700 text-sm font-bold mb-2">Harga Asli</label>
                <input
                    type="text"
                    id="originalPrice"
                    placeholder="Harga asli"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="discountPrice" className="block text-gray-700 text-sm font-bold mb-2">Harga Diskon</label>
                <input
                    type="text"
                    id="discountPrice"
                    placeholder="Harga diskon"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>

            <div className="text-center">
                <button className="w-full mt-5 bg-[#AC1919] text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                    SELESAI
                </button>
            </div>
        </div>
    );
};
export default ReportCompetitor;

// Repeat similarly for DailyCompetitor.tsx
