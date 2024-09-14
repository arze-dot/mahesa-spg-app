import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../../component/InputField";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfilePicture from "../../../component/ProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../component/Button";
import ACT_DETAIL_USERS from "../../../api/users/detail-user";
import ACT_UPDATE_USER from "../../../api/users/edit-user";

const EditEmployee: React.FC = () => {


    const { id } = useParams()

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        full_name: '',
        nik: '',
        email: '',
        phone: '',
        address: '',
        birth_date: '',
        employee_status: 'full_time',
        gender: 'M'
    })

    useEffect(() => {
        getData()
    }, [id])

    const getData = async () => {
        if (id)
            await ACT_DETAIL_USERS(id).then((res) => {
                setData(res.data.data)
            }).catch((err) => {
                console.log(err)
                alert('Gagal memuat data')
            })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if (id) {
            setLoading(true)
            const input = {
                ...data,
                id: id,
                password_confirmation: data.password
            }

            await ACT_UPDATE_USER(input).then((res) => {
                if (res.status === 200) {
                    alert('Update user berhasil')
                    navigate('/dashboard/input')
                }

            }).catch(err => {
                console.error(err)
                alert('Gagal membuat karyawan')
            })
            setLoading(false)
        }
    }
    return (
        <div className="rounded-md min-h-screen flex items-center justify-center">
            <div className="bg-[#AFAFAF] rounded-3xl shadow-lg p-5 w-96 pb-[75px] mt-10">
                <div className="flex justify-center mb-6 -mt-[100px]">
                    <ProfilePicture name={data.full_name} />
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Nama Karyawan</h2>
                <form>

                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <InputField
                            type='text'
                            name='username'
                            onChange={handleChange}
                            value={data.username}
                            placeholder=""
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <InputField
                            type='text'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            placeholder=""
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                            Nama
                        </label>
                        <InputField
                            icon={<Icon icon={'iconamoon:profile'} fontSize={20} />}
                            type='text'
                            name='full_name'
                            onChange={handleChange}
                            value={data.full_name}
                            placeholder=""
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nik" className="block text-gray-700 text-sm font-bold mb-2">
                            NIK
                        </label>
                        <InputField
                            icon={<Icon icon={'heroicons:identification'} fontSize={20} />}
                            type='text'
                            name='nik'
                            onChange={handleChange}
                            value={data.nik}
                            placeholder=""
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <InputField
                            icon={<Icon icon={'ic:outline-email'} fontSize={20} />}
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            placeholder=""
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telepon" className="block text-gray-700 text-sm font-bold mb-2">
                            Telepon
                        </label>
                        <InputField
                            icon={<Icon icon={'ph:phone-bold'} fontSize={20} />}
                            type='tel'
                            name='phone'
                            onChange={handleChange}
                            value={data.phone}
                            placeholder="081234567890"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="alamat" className="block text-gray-700 text-sm font-bold mb-2">
                            Alamat
                        </label>
                        <InputField
                            icon={<Icon icon={'mdi:addr'} fontSize={20} />}
                            as="textarea"
                            name='address'
                            placeholder=""
                            value={data.address}
                            onChangeTextArea={(e: ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, address: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tanggal_lahir" className="block text-gray-700 text-sm font-bold mb-2">
                            Tanggal Lahir
                        </label>
                        <InputField
                            icon={<Icon icon={'lets-icons:date-today-duotone-line'} fontSize={20} />}
                            type='date'
                            name='birth_date'
                            placeholder=""
                            onChange={handleChange}
                            value={data.birth_date}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status_karyawan" className="block text-gray-700 text-sm font-bold mb-2">
                            Status Karyawan
                        </label>
                        <InputField
                            icon={<Icon icon={'fluent:status-12-regular'} fontSize={20} />}
                            as="select"
                            name='employee_status'
                            placeholder=""
                            onChangeSelect={(e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, employee_status: e.target.value })}
                            value={data.employee_status}
                        >
                            <option value="full_time">Tetap</option>
                            <option value="contract">Kontrak</option>
                            <option value="internship">Magang</option>
                        </InputField>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="jenis_kelamin" className="block text-gray-700 text-sm font-bold mb-2">
                            Jenis Kelamin
                        </label>
                        <InputField
                            icon={<Icon icon={'icons8:gender'} fontSize={20} />}
                            as="select"
                            name='gender'
                            placeholder=""
                            onChangeSelect={(e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, gender: e.target.value })}
                            value={data.gender}
                        >
                            <option value="M">Pria</option>
                            <option value="F">Wanita</option>
                        </InputField>
                    </div>

                    <div className="flex items-center justify-center mt-6 w-full">
                        <Button isLoading={loading} onClick={handleSubmit} color="red">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditEmployee;