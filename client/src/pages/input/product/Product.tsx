import React from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';


const Product: React.FC = () => {
    return (
        <div>
            <div className="item">
            <div className='py-10 relative content-start justify-center'><Searchbar /> </div>
                <div className='flex-row gap-5'>
                    <h1 className='text-justify font-bold basis-1/4'>Daftar Produk</h1>
                </div>
                <div className='p-2 mb-4 h-[598px] w-[363px] rounded-lg bg-[#AFAFAF] shadow-sm" justify-evenly' >
                    <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center">
                        <img className="w-12 h-12 rounded-md mr-4" alt="Placeholder" src="https://via.placeholder.com/150" />
                        <div className="flex-grow">
                            <div className="font-bold">sosis ayam</div>
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
    )
};

export default Product;

// Repeat similarly for Product.tsx, Asset.tsx, Employee.tsx
