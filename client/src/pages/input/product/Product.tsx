import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';
import { URL } from '../../../config/url_constant';
import { useNavigate } from 'react-router-dom';
import ACT_GET_PRODUCT from '../../../api/products/products';
import ACT_DELETE_PRODUCT from '../../../api/products/delete-product';

const Product: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const navigate = useNavigate();

    const getData = async () => {
        const result = await ACT_GET_PRODUCT();
        setData(result.data.data);
        setFilteredData(result.data.data); // Initialize filteredData with full data
    };

    useEffect(() => {
        getData();
    }, []);

    const deleteProduct = async (id: string) => {
        if (confirm('Apakah anda yakin ingin menghapus produk ?')) {
            await ACT_DELETE_PRODUCT(id)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Produk berhasil dihapus');
                        getData();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert('Terjadi kesalahan dalam penghapusan produk');
                });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <div className='py-1 relative place-items-start justify-center mb-12'>
                <Searchbar placeholder='Cari Produk' onChange={handleSearch} />
            </div>

            <div className='flex items-center justify-between p-2 rounded-lg mb-1'>
                <h1 className='text-lg font-bold'>Daftar produk</h1>
                <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
                    <a href={URL.INPUT.PRODUCT.CREATE}>
                        <Icon icon="mdi:plus" className="text-black" />
                    </a>
                </div>
            </div>

            <div className="item">
                <div className='p-4 mb-4 h-[598px] w-[363px] rounded-3xl bg-[#AFAFAF] shadow-sm overflow-y-auto'>
                    {filteredData.length === 0 ? (
                        <div>No products found.</div>
                    ) : (
                        filteredData.map((item: any, index) => (
                            <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center justify-center gap-4" key={index}>
                                {item.image ? (
                                    <img
                                        src={'https://api-spg.mahesamegahmandiri.com' + item.image}
                                        className='w-[100px] h-[70px] rounded-lg border-2'
                                    />
                                ) : (
                                    <div className='w-[100px] h-[70px] rounded-lg bg-red-800 text-[10px] font-bold text-white flex items-center justify-center'>
                                        No Image
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <div className="font-bold text-[14px]">{item.name}</div>
                                    <div className="text-gray-500 text-[12px]">{item.code}</div>
                                </div>
                                <div className="flex-shrink-0 flex space-x-2">
                                    <Icon
                                        icon="mdi:pencil"
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => navigate('/dashboard/input/edit-product/' + item.id)}
                                    />
                                    <Icon
                                        icon="mdi:delete"
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => deleteProduct(item.id)}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
