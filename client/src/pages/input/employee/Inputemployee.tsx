import React, { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../../component/InputField";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProfilePicture from "../../../component/ProfilePicture";
import ACT_CREATE_USERS from "../../../api/users/create-user";
import { useNavigate } from "react-router-dom";
import Button from "../../../component/Button";
import SearchSelectInput from "../../../component/SearchSelectInput";
import ACT_GET_OUTLET from "../../../api/outlets/outlets";
import ACT_GET_ASSET from "../../../api/assets/assets";

const InputEmployee: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const [data, setData] = useState({
        full_name: '',
        nik: '',
        email: '',
        phone: '',
        address: '',
        birth_date: '',
        employee_status: 'full_time',
        gender: 'M',
        areaCode: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const [outlet, setOutlet] = useState([
        {
            name: '',
            address: '',
            latitude: '',
            longitude: '',
        }
    ])

    const handleChangeOutlet = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        setOutlet(prevOutlets =>
            prevOutlets.map((outlet, i) =>
                i === index ? { ...outlet, [name]: value } : outlet
            )
        );
    };

    const [asset, setAsset] = useState([
        {
            name: '',
            code: '',
            date_in: '',
            date_expired: ''
        }
    ]);

    const handleChangeAsset = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        setAsset(prevAssets =>
            prevAssets.map((asset, i) =>
                i === index ? { ...asset, [name]: value } : asset
            )
        );
    };

    const addAsset = () => {
        setAsset([...assets, {
            name: '',
            code: '',
            date_in: '',
            date_expired: ''
        }]);

        setAssetDisabled([...assetDisabled, false])
    };

    const deleteAsset = (index: number) => {
        setAsset(prevAssets => prevAssets.filter((_, i) => i !== index));
        setAssetDisabled(prevAsetDisabled => prevAsetDisabled.filter((_, i) => i !== index))
    };


    const handleSubmit = async () => {
        setLoading(true)
        const input = {
            ...data,
            role: 'USER',
            username: data.email,
            password: 'kimbo123',
            password_confirmation: 'kimbo123',
            outlets: outlet.map((item) => {
                return {
                    ...item,
                    code: 'CODE-1',
                    area_code: data.areaCode,
                    created_by: 1,
                    updated_by: 1,
                    user_id: 1,
                    image: null
                }
            }),
            assets: asset.map((item) => {
                return {
                    ...item,
                    created_by: 1,
                    updated_by: 1,
                    image: null
                }
            })
        }

        await ACT_CREATE_USERS(input).then((res) => {
            if (res.status === 201) {
                alert(res.data.message)
                navigate('/dashboard/input')
            }

        }).catch(err => {
            console.error(err)
            alert('Gagal membuat karyawan')
        })
        setLoading(false)
    }

    const addOutlet = () => {
        setOutlet([...outlet, {
            name: '',
            address: '',
            latitude: '',
            longitude: '',
        }])
        setOutletDisabled([...outletDisabled, false])
    }

    const deleteOutlet = (index: number) => {
        // Filter out the outlet at the given index
        setOutlet(prevOutlets => prevOutlets.filter((_, i) => i !== index));
        setOutletDisabled(prevOutletDisabled => prevOutletDisabled.filter((_, i) => i !== index))
    };

    const [outlets, setOutlets] = useState<any[]>([]);
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        fetchOutlets();
        fetchAssets();
    }, []);

    const fetchOutlets = async () => {
        const result = await ACT_GET_OUTLET();
        setOutlets(result.data.data);
    };

    const fetchAssets = async () => {
        const result = await ACT_GET_ASSET();
        setAssets(result.data.data);
    };

    const [outletDisabled, setOutletDisabled] = useState([false])
    const handleOutlet = (e: any, index: number) => {
        console.log(e)
        const dataOutlet = outlets.find((item) => item.id === e.value)
        setOutlet(prevOutlets =>
            prevOutlets.map((outlet, i) =>
                i === index ? { ...dataOutlet } : outlet
            )
        );
        setOutletDisabled(prev => prev.map((_, i) => i === index ? true : false))
    }


    const [assetDisabled, setAssetDisabled] = useState([false])
    const handleAsset = (e: any, index: number) => {
        const dataAssets = assets.find((item) => item.id === e.value)
        setAsset(prevAssets =>
            prevAssets.map((data, i) =>
                i === index ? { ...dataAssets } : data
            )
        );
        setAssetDisabled(prev => prev.map((_, i) => i === index ? true : false))
    }

    const FORMS = [
        {
            id: 'data-karyawan',
            label: "Data Karyawan",
            fields: [],
        },
        {
            id: 'data-outlet',
            label: "Outlet",
            fields: [],
        },
        {
            id: 'data-asset',
            label: "Asset",
            fields: [],
        },
    ]

    const [stepper, setStepper] = useState<{ current: number }>({ current: 1, })

    const handleNext = () => {
        if (stepper.current >= FORMS.length) return
        setStepper((prev) => ({ current: prev.current + 1 }))
    }

    const handleBack = () => {
        if (stepper.current <= 1) return
        setStepper((prev) => ({ current: prev.current - 1 }))
    }

    return (
        <div className="rounded-md min-h-screen flex items-center justify-center">
            <div className="bg-[#AFAFAF] rounded-3xl shadow-lg p-5 w-96 pb-[75px] mt-10">
                <div className="flex justify-center mb-6 -mt-[100px]">
                    <ProfilePicture name={data.full_name} />
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Nama Karyawan</h2>
                {JSON.stringify(stepper)}
                <button onClick={() => handleBack()}>Kembali</button>
                <button onClick={() => handleNext()}>Selanjutnya</button>


                <form className="hidden">
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

                    <div className="mb-4">
                        <label htmlFor="kode_area" className="block text-gray-700 text-sm font-bold mb-2">
                            Kode Area
                        </label>
                        <InputField
                            as="select"
                            name='areaCode'
                            placeholder=""
                            onChangeSelect={(e: ChangeEvent<HTMLSelectElement>) => setData({ ...data, areaCode: e.target.value })}
                            value={data.areaCode}
                        >
                            <option value="PMU">PMU</option>
                            <option value="PMM">PMM</option>
                            <option value="PMA">PMA</option>
                            <option value="PMS">PMS</option>
                        </InputField>
                    </div>


                    <div className="font-bold my-4">
                        OUTLET
                    </div>
                    {
                        outlet.map((item, index) => {
                            return (

                                <div key={index}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold mb-1">CARI TOKO</label>
                                        <SearchSelectInput
                                            placeholder="Cari Nama Toko"
                                            options={outlets.map((item: any) => ({ label: item.name, value: item.id }))}
                                            onChange={(selectedOption: any) => handleOutlet(selectedOption, index)}
                                        />
                                    </div>

                                    {/* Outlet Name */}
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nama Outlet
                                        </label>
                                        <InputField
                                            disabled={outletDisabled[index]}
                                            icon={<Icon icon={'iconamoon:profile'} fontSize={20} />}
                                            type='text'
                                            name='name'
                                            onChange={(e) => handleChangeOutlet(e, index)}
                                            value={item.name}
                                            placeholder="Nama Outlet"
                                        />
                                    </div>

                                    {/* Outlet Address */}
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                            Alamat
                                        </label>
                                        <InputField
                                            disabled={outletDisabled[index]}
                                            icon={<Icon icon={'mdi:addr'} fontSize={20} />}
                                            as="textarea"
                                            name='address'
                                            placeholder="Alamat Outlet"
                                            value={item.address}
                                            onChangeTextArea={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                setOutlet(prevOutlets =>
                                                    prevOutlets.map((outlet, i) =>
                                                        i === index ? { ...outlet, address: e.target.value } : outlet
                                                    )
                                                )}
                                        />
                                    </div>

                                    {/* Coordinates */}
                                    <div className="mb-4">
                                        <label htmlFor="coordinates" className="block text-gray-700 text-sm font-bold mb-2">
                                            Titik Koordinat
                                        </label>
                                        <div className="flex space-x-2">
                                            <InputField
                                                disabled={outletDisabled[index]}
                                                icon={<Icon icon={'iconamoon:location-pin'} fontSize={20} />}
                                                type='text'
                                                name='latitude'
                                                onChange={(e) => handleChangeOutlet(e, index)}
                                                value={item.latitude}
                                                placeholder="Lat"
                                            />
                                            <InputField
                                                disabled={outletDisabled[index]}
                                                icon={<Icon icon={'iconamoon:location-pin'} fontSize={20} />}
                                                type='text'
                                                name='longitude'
                                                onChange={(e) => handleChangeOutlet(e, index)}
                                                value={item.longitude}
                                                placeholder="Long"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center mb-6 w-full">
                                        <Button isLoading={false} onClick={() => deleteOutlet(index)} color="black">
                                            Hapus Outlet
                                        </Button>
                                    </div>

                                </div>
                            )
                        })
                    }

                    <div className="flex items-center justify-center mb-6 w-full">
                        <Button isLoading={false} onClick={addOutlet} color="golden">
                            Tambah Outlet
                        </Button>
                    </div>


                    <hr className="border-4" />

                    <div className="font-bold my-4">
                        ASSETS
                    </div>

                    {
                        asset.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="mb-4">

                                        <div className="mb-4">
                                            <label className="block text-sm font-bold mb-1">CARI ASSET</label>
                                            <SearchSelectInput
                                                placeholder="Cari Nama Asset"
                                                options={assets.map((item: any) => ({ label: item.name, value: item.id }))}
                                                onChange={(selectedOption: any) => handleAsset(selectedOption, index)}
                                            />
                                        </div>
                                        <label htmlFor="asset_name" className="block text-gray-700 text-sm font-bold mb-2">
                                            Nama Asset
                                        </label>
                                        <InputField
                                            disabled={assetDisabled[index]}
                                            icon={<Icon icon={'mdi:warehouse'} fontSize={20} />}
                                            type='text'
                                            name='name'
                                            onChange={(e) => handleChangeAsset(e, index)}
                                            value={item.name}
                                            placeholder="Nama Asset"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="asset_code" className="block text-gray-700 text-sm font-bold mb-2">
                                            Kode Asset
                                        </label>
                                        <InputField
                                            disabled={assetDisabled[index]}
                                            icon={<Icon icon={'mdi:barcode'} fontSize={20} />}
                                            type='text'
                                            name='code'
                                            onChange={(e) => handleChangeAsset(e, index)}
                                            value={item.code}
                                            placeholder="Kode Asset"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="asset_code" className="block text-gray-700 text-sm font-bold mb-2">
                                            Tanggal Masuk
                                        </label>
                                        <InputField
                                            disabled={assetDisabled[index]}
                                            icon={<Icon icon={'mdi:calendar-check'} fontSize={20} />}
                                            type='date'
                                            name='date_in'
                                            onChange={(e) => handleChangeAsset(e, index)}
                                            value={item.date_in}
                                            placeholder="Tanggal Masuk"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="asset_code" className="block text-gray-700 text-sm font-bold mb-2">
                                            Tanggal Expired
                                        </label>
                                        <InputField
                                            disabled={assetDisabled[index]}
                                            icon={<Icon icon={'mdi:calendar-remove'} fontSize={20} />}
                                            type='date'
                                            name='date_expired'
                                            onChange={(e) => handleChangeAsset(e, index)}
                                            value={item.date_expired}
                                            placeholder="Tanggal Expired"
                                        />
                                    </div>

                                    <div className="flex items-center justify-center mb-6 w-full">
                                        <Button isLoading={false} onClick={() => deleteAsset(index)} color="black">
                                            Hapus Asset
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="flex items-center justify-center mb-6 w-full">
                        <Button isLoading={false} onClick={addAsset} color="golden">
                            Tambah Asset
                        </Button>
                    </div>


                    <hr className="border-4" />

                    <div className="flex items-center justify-center mt-6 w-full">
                        <Button isLoading={loading} onClick={handleSubmit} color="red">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default InputEmployee;