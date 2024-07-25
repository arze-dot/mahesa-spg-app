import React from 'react';
import { Icon } from '@iconify/react';

const Input: React.FC = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white">
            <a href="/dashboard/input/outlet" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={outletIcon} className="text-4xl mb-2" /> */}
                <div>Outlet</div>
            </a>
            <a href="/dashboard/input/product" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={productIcon} className="text-4xl mb-2" /> */}
                <div>Product</div>
            </a>
            <a href="/dashboard/input/asset" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={assetIcon} className="text-4xl mb-2" /> */}
                <div>Asset</div>
            </a>
            <a href="/dashboard/input/employee" className="bg-gray-100 p-4 rounded shadow text-center">
                {/* <Icon icon={employeeIcon} className="text-4xl mb-2" /> */}
                <div>Employee</div>
            </a>
        </div>
    );
};

export default Input;
