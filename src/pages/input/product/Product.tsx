import React from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';


const Product: React.FC = () => {
    return (
        <div>
            <div className='py-1 relative place-items-start justify-center mb-12'>
                <Searchbar />
            </div>

            <div className='flex items-center justify-between p-2 rounded-lg mb-1'>
                <h1 className='text-lg font-bold'>Daftar produk</h1>
                <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
                    <Icon icon="mdi:plus" className="text-black" />
                </div>
            </div>

            <div className="item">
                <div className='p-4 mb-4 h-[598px] w-[363px] rounded-lg bg-[#AFAFAF] shadow-sm overflow-y-auto'>
                    <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center">
                        <img className="w-12 h-12 rounded-md mr-4" alt="Placeholder" src="https://via.placeholder.com/150" />
                        <div className="flex-grow">
                            <div className="font-bold">Sosis Ayam</div>
                            <div className="text-gray-500">Jenis produk</div>
                        </div>
                        <div className="flex-shrink-0 flex space-x-2">
                            <Icon icon="mdi:pencil" className="text-gray-500 cursor-pointer" />
                            <Icon icon="mdi:delete" className="text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Product;

// Repeat similarly for Product.tsx, Asset.tsx, Employee.tsx
