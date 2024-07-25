import React from 'react';
import { Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="flex-1 p-4">
                <Outlet />
            </div>
            <div className="flex justify-around bg-gray-200 p-2">
                <a href="/dashboard" className="text-center flex flex-col items-center">
                    {/* <Icon icon={homeIcon} className="text-2xl" /> */}
                    <div className="text-xs">Home</div>
                </a>
                <a href="/dashboard/input" className="text-center flex flex-col items-center">
                    {/* <Icon icon={inputIcon} className="text-2xl" /> */}
                    <div className="text-xs">Input</div>
                </a>
                <a href="/dashboard/report" className="text-center flex flex-col items-center">
                    {/* <Icon icon={reportIcon} className="text-2xl" /> */}
                    <div className="text-xs">Report</div>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;
