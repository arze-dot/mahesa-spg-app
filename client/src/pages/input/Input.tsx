import React from 'react';
import { Icon } from '@iconify/react';

const Input: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white">
            <a href="/dashboard/input/outlet" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:shop" />
                <div className='font-semibold text-[20px]'>Outlet</div>
            </a>
            <a href="/dashboard/input/product" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="fluent-mdl2:product-variant" />
                <div className='font-semibold text-[20px]'>Product</div>
            </a>
            <a href="/dashboard/input/asset" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="material-symbols:dataset-outline" />
                <div className='font-semibold text-[20px]'>Asset</div>
            </a>
            <a href="/dashboard/input/employee" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] pt-[8px] text-[#AC1919]' icon="bi:people" />
                <div className='font-semibold text-[20px]'>Employee</div>
            </a>
        </div>
    );
};

export default Input;
