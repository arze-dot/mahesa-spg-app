import React from 'react';
import { Icon } from '@iconify/react';

const Outletinput: React.FC = () => {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-300 p-6 rounded-lg w-96">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Placeholder"
                        className="w-20 h-20 bg-white rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                        type="text"
                        placeholder="Ketik nama outlet"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <textarea
                        placeholder="Ketik alamat outlet"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titik Koordinat</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Ketik Lat"
                            className="w-1/2 px-3 py-2 border border-gray-400 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Ketik Long"
                            className="w-1/2 px-3 py-2 border border-gray-400 rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <select
                        className="w-full px-3 py-2 border border-gray-400 rounded-md" >
                        <option value="">Kode Area</option>
                        <option value="area1">Area 1</option>
                        <option value="area2">Area 2</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button className="bg-red-600 text-white px-4 py-2 rounded">SELESAI</button>
                </div>
            </div>
        </div>
    );
};

export default Outletinput;