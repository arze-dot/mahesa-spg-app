import React from "react";

const Assetinput: React.FC = () => {

return (         
<div className="flex items-center justify-center min-h-screen">
    <div className="bg-gray-300 p-6 rounded-lmd w-80">
        <div className="flex justify-center mb-4">
            <img
                src="https://via.placeholder.com/120"
                alt="Placeholder"
                className="w-28 h-28 bg-white rounded-full"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Aset</label>
            <input
                type="text"
                placeholder="Tulis Nama Aset"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Aset</label>
            <input
                type="text"
                placeholder="Kode Aset"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Masuk</label>
            <input
                type="date"
                className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
        </div>

        <div className="flex justify-center">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">SELESAI</button>
        </div>
    </div>
</div>
);
};

export default Assetinput;