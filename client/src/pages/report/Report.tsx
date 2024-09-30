import React from 'react';
import { Icon } from '@iconify/react';

const Report: React.FC = () => {
    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='p-4 rounded-md mt-2 bg-[#AFAFAF] w-[350px]'>
                <div className="text-center rounded-t-lg py-2">
                    <h1 className="text-[#AC1919] text-[24px] font-bold mt-5">REPORT MENU</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                    <a href="/dashboard/report/daily-report-before-after" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:people" />
                        <div className='font-semibold text-[14px] w-fit '>Daily Report Before After</div>
                    </a>
                    <a href="/dashboard/report/daily-spg" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:people" />
                        <div className='font-semibold text-[14px] w-fit '>Daily Report SPG</div>
                    </a>
                    <a href="/dashboard/report/daily-competitor" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                        <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:shop" />
                        <div className='font-semibold text-[14px] w-fit '>Competitor Product</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Report;
