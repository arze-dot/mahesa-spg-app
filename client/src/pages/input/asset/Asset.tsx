import React from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';


const Asset: React.FC = () => {
  return <div>
    <div className='py-10 relative content-start justify-center'><Searchbar />

    </div>

    <h1 className='text-justify font-bold '>Daftar asset</h1>
    <div className="item">
      <div className='p-4 mb-4 h-[598px] w-[363px] rounded-lg bg-[#AFAFAF] shadow-sm"' >
        <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center">
          <img className="w-12 h-12 rounded-md mr-4" alt="Placeholder" src="https://via.placeholder.com/150" />
          <div className="flex-grow">
            <div className="font-bold">Meja Bulat</div>
            <div className="text-gray-500">mb-12213</div>
          </div>
          <div className="flex-shrink-0 flex space-x-2">
            <Icon icon="mdi:pencil" className="text-gray-500 cursor-pointer" />
            <Icon icon="mdi:delete" className="text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Asset;

// Repeat similarly for Product.tsx, Asset.tsx, Employee.tsx
