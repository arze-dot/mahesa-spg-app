import React from 'react';
import { Icon } from '@iconify/react';

const SearchBarinput: React.FC = () => {


    return (
        <form className='w-[358px] h-[40px] relative drop-shadow-md content-start' >
            <div className="relative">
                <input type="search" placeholder='Type Here' className='w-full p-4 border-t-[1px] rounded-xl bg-[#DADADA] ' />
                <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 text-[18px]'>
                    <Icon icon="material-symbols:search" /> </button>

            </div>
        </form>
    )
};

export default SearchBarinput;

