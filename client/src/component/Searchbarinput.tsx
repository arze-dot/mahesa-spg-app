import React from 'react';
import { Icon } from '@iconify/react';

const SearchBarinput: React.FC = () => {


    return (
        <form className='w-[358px] h-[40px] relative drop-shadow-md content-start' >
            <div className="relative">
                <input type="search" placeholder='Type Here' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ' />
                <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 text-[18px]'>
                    <Icon icon="material-symbols:search" /> </button>

            </div>
        </form>
    )
};

export default SearchBarinput;

