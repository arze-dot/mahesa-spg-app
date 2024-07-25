import React from 'react';
import { Icon } from '@iconify/react';

const Report: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white">
            <a href="/dashboard/report/daily-spg" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={spgIcon} className="text-4xl mb-2" /> */}
                <div>Daily Report SPG</div>
            </a>
            <a href="/dashboard/report/daily-competitor" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={competitorIcon} className="text-4xl mb-2" /> */}
                <div>Daily Report Competitor Product</div>
            </a>
        </div>
    );
};

export default Report;
