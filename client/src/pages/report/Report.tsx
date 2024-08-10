import React from 'react';
import { Icon } from '@iconify/react';

const Report: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white">
            <a href="/dashboard/report/daily-spg" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] pt-[8px] text-[#AC1919]' icon="bi:people" />
                <div className='font-semibold text-[20px]'>Daily Report SPG</div>
            </a>
            <a href="/dashboard/report/daily-competitor" className="bg-[#D3AA4A] flex flex-col items-center justify-center gap-2 border border-black p-4 rounded shadow text-center">
                <Icon className='h-[68px] w-[68px] text-[#AC1919]' icon="bi:shop" />
                <div className='font-semibold text-[20px]'>Daily Report Competitor Product</div>
            </a>
        </div>
    );
};

export default Report;
