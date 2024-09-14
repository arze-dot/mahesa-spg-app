import React, { useState, useEffect } from 'react';
import ACT_GET_USERS from '../../../api/users/users';
import ACT_GET_OUTLET from '../../../api/outlets/outlets';
import ACT_GET_PRODUCT from '../../../api/products/products';
import SearchSelectInput from '../../../component/SearchSelectInput';
import { useNavigate } from 'react-router-dom';
import ACT_CREATE_REPORT_SPG from '../../../api/reports/create-report';
import Button from '../../../component/Button';

const ReportSpg: React.FC = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState({
        user_id: 0,
        outlet_id: 0,
        product_id: 0,
        attendance_date: '',
        first_stock: 0,
        sell_in: 0
    });

    const [employees, setEmployees] = useState<any[]>([]);
    const [outlets, setOutlets] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetchEmployees();
        fetchOutlets();
        fetchProducts();
    }, []);

    const fetchEmployees = async () => {
        const result = await ACT_GET_USERS();
        setEmployees(result.data.data);
    };

    const fetchOutlets = async () => {
        const result = await ACT_GET_OUTLET();
        setOutlets(result.data.data);
    };

    const fetchProducts = async () => {
        const result = await ACT_GET_PRODUCT();
        setProducts(result.data.data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true)

        await ACT_CREATE_REPORT_SPG(data).then((res) => {
            if (res.status === 201) {
                alert('Berhasil membuat report')
                navigate('/dashboard')
            }

        }).catch(err => {
            console.error(err)
            alert('Gagal membuat report')
        })
        setLoading(false)
    }

    return (
        <div className='h-screen'>
            <div className="bg-[#AFAFAF] p-6 rounded-lg shadow-lgl h-fit w-[363px] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">REPORT SALES</h2>

                {/* Nama Sales */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">NAMA SALES</label>
                    <SearchSelectInput
                        placeholder="Cari Nama Sales"
                        options={employees.map((item: any) => ({ label: item.full_name, value: item.id }))}
                        onChange={(selectedOption: any) => setData({ ...data, user_id: selectedOption.value })}
                    />
                </div>

                {/* Nama Toko */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">NAMA TOKO</label>
                    <SearchSelectInput
                        placeholder="Cari Nama Toko"
                        options={outlets.map((item: any) => ({ label: item.name, value: item.id }))}
                        onChange={(selectedOption: any) => setData({ ...data, outlet_id: selectedOption.value })}
                    />
                </div>

                {/* Tanggal Masuk */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">TANGGAL MASUK</label>
                    <input
                        type="date"
                        name="attendance_date"
                        value={data.attendance_date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>

                {/* Nama Product */}
                <h3 className="text-md font-bold mb-2">STOK AWAL</h3>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">PRODUK</label>
                    <SearchSelectInput
                        placeholder="Cari Nama Produk"
                        options={products.map((item: any) => ({ label: item.name, value: item.id }))}
                        onChange={(selectedOption: any) => setData({ ...data, product_id: selectedOption.value })}
                    />
                </div>

                {/* Stok In */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">STOK IN</label>
                    <input
                        type="number"
                        name="first_stock"
                        value={data.first_stock}
                        onChange={handleChange}
                        placeholder="Ketik disini"
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>

                {/* Stok Out */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">STOK OUT</label>
                    <input
                        type="number"
                        name="sell_in"
                        value={data.sell_in}
                        onChange={handleChange}
                        placeholder="Ketik disini"
                        className="w-full p-2 border border-gray-400 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center mt-6 w-full">
                    <Button isLoading={loading} onClick={handleSubmit} color="red">
                        Simpan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportSpg;
