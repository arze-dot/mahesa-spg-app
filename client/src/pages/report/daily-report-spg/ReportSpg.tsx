import React from 'react';
import { Icon } from '@iconify/react';


const ReportSpg: React.FC = () => {
    return (<div className='item'>
        <div className="bg-[#AFAFAF] p-6 rounded-lg shadow-lgl h-[550px] w-[363px] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">REPORT SALES</h2>

            
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">NAMA SALES</label>
                <input
                    type="text"
                    placeholder="Ketik Nama Sales"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

        
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">NAMA TOKO</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari Nama Toko"
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                    <button className="absolute right-2 top-3">
                    <Icon icon="material-symbols:search" />
                    </button>
                </div>
            </div>

            
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">TANGGAL MASUK</label>
                <input
                    type="date"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">TANGGAL MASUK</label>
                <select className="w-full p-2 border border-gray-400 rounded-md">
                    <option>Kode Area</option>
                    {/* Add your area codes here */}
                </select>
            </div>

            
            <h3 className="text-md font-bold mb-2">STOK AWAL</h3>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VMSB</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KMBHO</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VSSB</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KHMBK</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VMAB</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KMBR</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KMBK</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KMBP</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KSBR</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KHMB</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KBCO</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KGPK</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KGCL</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KGPO</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KPBO</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KPKO</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KPMJ</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KPBK</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VCAY</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VBBW</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VMBG</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KHDA</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KHBS</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">KGBS</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VSBP 50</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">VMB 50</label>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="w-full p-2 border border-gray-400 rounded-md"
                />
            </div>

            <div className="text-center">
                <button className="w-full mt-5 bg-[#AC1919] text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                    SELESAI
                </button>
            </div>
        </div>
    </div>
    );
}

export default ReportSpg;

// Repeat similarly for DailyCompetitor.tsx
