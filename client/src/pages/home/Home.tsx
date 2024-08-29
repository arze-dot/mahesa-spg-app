import React from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../component/SearchBar';

const Home: React.FC = () => {
    return (<div className="min-h-screen p-4">
        <div className="flex items-center justify-between bg-white overflow-y-auto">
            <div className="flex items-center space-x-3">
                <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div className="text-lg font-semibold">
                    Hi, Andi <span className="text-yellow-500">👋</span>
                </div>
            </div>
            <div>
                <button className="p-2 bg-[#ADAAAA] rounded-md">
                    <Icon icon="carbon:notification" />        </button>
            </div>
        </div>

        <div className="flex flex-col items-center my-4">
            <img src="/images/Kimbo-logo.png" alt="Kimbo Logo" className="w-79" />
            <div className="text-red-600 text-xl font-bold">Berbagi Nikmat!</div>
        </div>

        <div className="flex flex-col items-center mb-10">
            <Searchbar />

        </div>

        <div className="px-4 mb-6 mt-5 overflow-y-auto ">
            <h2 className="text-lg font-semibold mb-4">Grafik Area</h2>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-2 w-[339px] gap-4 p-4 rounded-md bg-[#ADAAAA] overflow-x-auto">
                    <div className="bg-white w-[150px] rounded-md shadow text-center p-2">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-green-600">
                                93%
                            </div>
                            <svg className="absolute inset-0 w-full h-full">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    strokeWidth="8"
                                    stroke="#e2e8f0"
                                    fill="none"
                                ></circle>
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    strokeWidth="8"
                                    stroke="#10b981"
                                    fill="none"
                                    strokeDasharray="293"
                                    strokeDashoffset="20"
                                ></circle>
                            </svg>
                        </div>
                        <div className="text-red-600 font-bold">PMM</div>
                        <div className="mt-2 text-left">
                            <div className="flex justify-between">
                                <span className="text-red-600">Total Produk</span>
                                <span>1000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-600">Terjual</span>
                                <span>930</span>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sisa Produk</span>
                                <span>70</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-[150px] rounded-md shadow text-center p-2">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-red-600">
                                35%
                            </div>
                            <svg className="absolute inset-0 w-full h-full">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    strokeWidth="8"
                                    stroke="#e2e8f0"
                                    fill="none"
                                ></circle>
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    strokeWidth="8"
                                    stroke="#ef4444"
                                    fill="none"
                                    strokeDasharray="293"
                                    strokeDashoffset="190"
                                ></circle>
                            </svg>
                        </div>
                        <div className="text-red-600 font-bold">PMS</div>
                        <div className="mt-2 text-left">
                            <div className="flex justify-between">
                                <span className="text-red-600">Total Produk</span>
                                <span>1000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-600">Terjual</span>
                                <span>350</span>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sisa Produk</span>
                                <span>650</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 mb-4 p-4">
                <h2 className="text-lg font-semibold ">Karyawan</h2>
                <div className="p-4 flex items-center">
                    <div className="text-4xl mr-4"><Icon icon="ic:baseline-people-alt" /></div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <div className="text-lg font-semibold">Total Karyawan</div>
                            <div className="text-xl font-bold mt-5">30</div>
                        </div>
                        <div className="text-gray-500 text-sm">
                            18 Orang Sudah Absen
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 p-4 gap-6 bg-gray-100 h-100">
                <div className="bg-white rounded-lg shadow-md p-2">
                    <div className="bg-gray-300 h-32 rounded-md mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">Outlet Terdaftar</h3>
                    <p className="text-gray-500">Total</p>
                    <p className="text- font-bold">50</p>
                    <a href="/dashboard/input/Outletlist" className="text-blue-500 hover:underline mt-2 block">
                        Lihat Semua Outlet &gt;
                    </a>
                </div>

                <div className="bg-white rounded-lg shadow-md  p-2">
                    <div className="bg-gray-300 h-32 rounded-md mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">Produk Terdaftar</h3>
                    <p className="text-gray-500">Total</p>
                    <p className=" font-bold">112</p>
                    <a href="/dashboard/input/product" className="text-blue-500 hover:underline mt-2 block">
                        Lihat Semua Produk &gt;
                    </a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-2">
                    <div className="bg-gray-300 h-32 rounded-md mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">Aset Terdaftar</h3>
                    <p className="text-gray-500">Total</p>
                    <p className="text-2xl font-bold">89</p>
                    <a href="/dashboard/input/asset" className="text-blue-500 hover:underline mt-2 block">
                        Lihat Semua Aset &gt;
                    </a>
                </div>

                <div className="bg-white rounded-lg shadow-md p-2">
                    <div className="bg-gray-300 h-32 rounded-md mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">Karyawan Terdaftar</h3>
                    <p className="text-gray-500">Total</p>
                    <p className=" font-bold">100</p>
                    <a href="/dashboard/input/employee" className="text-blue-500 hover:underline mt-2 block">
                        Lihat Semua Karyawan &gt;
                    </a>
                </div>
            </div>
        </div>

    </div>
    );
}

export default Home;
