import React from "react";



const Productinput: React.FC = () => {

    return (
        <div className="flex items-center">
            <div className="bg-gray-300 p-6 rounded-lg h-[363px] w-[398px]">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Placeholder"
                        className="w-20 h-20 bg-white rounded"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nama Produk"
                        className="w-full px-3 py-2 border border-gray-400 rounded"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Jenis Produk"
                        className="w-full px-3 py-2 border border-gray-400 rounded"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Kode Produk"
                        className="w-full px-3 py-2 border border-gray-400 rounded"
                    />
                </div>

                <div className="flex justify-center">
                    <button className="bg-red-600 text-white px-4 py-2 rounded">SELESAI</button>
                </div>
            </div>
        </div>
    );
};

export default Productinput;