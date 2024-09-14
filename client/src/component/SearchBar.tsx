import React, { ChangeEvent } from 'react';
import { Icon } from '@iconify/react';

interface SearchBarProps {
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange, value }) => {

    return (
        <form className='w-[358px] h-[40px]relative drop-shadow-md content-start bg-white border-t-[1px] rounded-xl ' >
            <div className="flex items-center justify-start w-full">
                <button className='ml-3'>
                    <Icon icon="material-symbols:search" fontSize={24} color='#828282' />
                </button>
                <input type="search" placeholder={placeholder} className='w-full p-4 rounded-xl bg-white outline-none' value={value} onChange={onChange} />
            </div>
        </form>
    )
};

export default SearchBar;

