import React from "react";

const Inputemployee: React.FC = () => {

    return (
        <div className="rounded-md min-h-screen flex items-center justify-center">
            <div className="bg-[#AFAFAF] rounded-md shadow-lg p-8 w-96">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full w-24 h-24 bg-gray-300" />
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Nama Karyawan</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="nama"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nik" className="block text-gray-700 text-sm font-bold mb-2">
                            NIK
                        </label>
                        <input
                            type="text"
                            id="nik"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telepon" className="block text-gray-700 text-sm font-bold mb-2">
                            Telepon
                        </label>

                        <input
                            type="tel"
                            id="telepon"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="081122"
                        />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="alamat" className="block text-gray-700 text-sm font-bold mb-2">
                            Alamat
                        </label>

                        <textarea
                            id="alamat"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tanggal_lahir" className="block text-gray-700 text-sm font-bold mb-2">
                            Tanggal Lahir
                        </label>
                        <input
                            type="date"
                            id="tanggal_lahir"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status_karyawan" className="block text-gray-700 text-sm font-bold mb-2">
                            Status Karyawan
                        </label>
                        <select
                            id="status_karyawan"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="tetap">Tetap</option>
                            <option value="kontrak">Kontrak</option>
                            <option value="magang">Magang</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="jenis_kelamin" className="block text-gray-700 text-sm font-bold mb-2">
                            Jenis Kelamin
                        </label>
                        <select
                            id="jenis_kelamin"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="pria">Pria</option>
                            <option value="wanita">Wanita</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Inputemployee;