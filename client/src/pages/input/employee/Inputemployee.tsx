import React, { ChangeEvent, useState } from "react";

const InputEmployee: React.FC = () => {

    const [data, setData] = useState({
        full_name: '',
        nik: '',
        email: '',
        phone: '',
        address: '',
        birth_date: '',
        employee_status: '',
        gender: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    console.log(data)
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
                            name='full_name'
                            onChange={handleChange}
                            value={data.full_name}
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
                            name='nik'
                            onChange={handleChange}
                            value={data.nik}
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
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telepon" className="block text-gray-700 text-sm font-bold mb-2">
                            Telepon
                        </label>

                        <input
                            type="tel"
                            name='phone'
                            onChange={handleChange}
                            value={data.phone}
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
                            name='address'
                            value={data.address}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, address: e.target.value })}
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
                            name='birth_date'
                            onChange={handleChange}
                            value={data.birth_date}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status_karyawan" className="block text-gray-700 text-sm font-bold mb-2">
                            Status Karyawan
                        </label>
                        <select
                            name='employee_status'
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, employee_status: e.target.value })}
                            value={data.employee_status}
                            id="status_karyawan"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="full_time">Tetap</option>
                            <option value="contract">Kontrak</option>
                            <option value="internship">Magang</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="jenis_kelamin" className="block text-gray-700 text-sm font-bold mb-2">
                            Jenis Kelamin
                        </label>
                        <select
                            id="jenis_kelamin"
                            name='gender'
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, gender: e.target.value })}
                            value={data.gender}
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

export default InputEmployee;