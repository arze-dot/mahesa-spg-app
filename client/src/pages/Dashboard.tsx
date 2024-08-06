import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Dashboard: React.FC = () => {
    const { pathname } = useLocation()
    console.log(pathname)
    const active = true
    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="absolute top-0 w-full">
                <img src="/images/dashboard-wave-top.png" alt="wave top" />
                <p className='absolute top-0 w-full'>testing 1</p>
            </div>
            <div className="flex-1 p-4 mt-[120px]">
                <Outlet />
            </div>
            <div className="flex justify-around bg-gray-200 p-2">
                <a href="/dashboard" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname === '/dashboard' ? 'text-[#AC1919]' : ''} `} icon="material-symbols:home" />
                    <div className="text-xs">Home</div>
                </a>
                <a href="/dashboard/input" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname === '/dashboard/input' ? 'text-[#AC1919]' : ''} `} icon="ph:plus-fill" />
                    <div className="text-xs">Input</div>
                </a>
                <a href="/dashboard/report" className="text-center flex flex-col items-center">
                    <Icon className={`text-2xl ${pathname === '/dashboard/report' ? 'text-[#AC1919]' : ''} `} icon="mdi:report-box-multiple" />
                    <div className="text-xs">Report</div>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
