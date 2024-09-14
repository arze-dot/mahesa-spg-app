import React from 'react';
import { Icon } from '@iconify/react';
import { URL } from '../../config/url_constant';

const Input: React.FC = () => {
    return (
        <div className='flex flex-col items-center h-screen'>
            {/* LOGO NOT CONFIRMED */}
            {/* <img src="/images/Kimbo-logo.png" alt="" className='-mt-8 -my-12 relative' /> */}
            <div className='p-4 rounded-md mt-2 bg-[#AFAFAF] w-[350px]'>
                <div className="text-center rounded-t-lg py-2">
                    <h1 className="text-[#AC1919] text-[24px] font-bold mt-5">INPUT MENU</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 ">
                    <a href="/dashboard/input/outlet" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:shop" />
                        <div className='font-semibold text-[14px]'>Data Outlet</div>
                    </a>
                    <a href="/dashboard/input/product" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="fluent-mdl2:product-variant" />
                        <div className='font-semibold text-[14px]'>Data Produk</div>
                    </a>
                    <a href="/dashboard/input/asset" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="material-symbols:dataset-outline" />
                        <div className='font-semibold text-[14px]'>Data Aset</div>
                    </a>
                    <a href={URL.INPUT.EMPLOYEE.INDEX} className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] pt-[8px] text-[#AC1919]' icon="bi:people" />
                        <div className='font-semibold text-[14px]'>Data Karyawan</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Input;
