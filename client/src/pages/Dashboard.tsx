import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Breadcrumb from '../component/Breadcrumbs';

const Dashboard: React.FC = () => {
    const { pathname } = useLocation()
    return (
        <div className="flex flex-col h-screen bg-[#E0E0E0] max-w-[390px] m-auto relative">
            <div className="fixed top-[-5px] w-full z-50">
                <img src="/images/dashboard-wave-top.png" alt="wave top" />
                <div className='absolute top-0 w-full'>
                    <Breadcrumb />
                </div>
            </div>
            <div className="flex-1 p-4 mt-[120px]">
                <Outlet />
            </div>
            <div className="fixed bottom-0 w-full max-w-[390px] flex justify-around bg-white p-2 rounded-tl-xl rounded-tr-xl">
                <a href="/dashboard" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname === '/dashboard' ? 'text-[#AC1919]' : 'text-[#828282]'} `} icon="material-symbols:home" />
                    <div className="text-xs">Home</div>
                </a>
                <a href="/dashboard/input" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname.includes('input') ? 'text-[#AC1919]' : 'text-[#828282]'} `} icon="ph:plus-fill" />
                    <div className="text-xs">Input</div>
                </a>
                <a href="/dashboard/report" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname.includes('report') ? 'text-[#AC1919]' : 'text-[#828282]'} `} icon="mdi:report-box-multiple" />
                    <div className="text-xs">Report</div>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
