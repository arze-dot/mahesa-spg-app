import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';
import { useNavigate } from 'react-router-dom';
import ACT_GET_ASSET from '../../../api/assets/assets';
import ACT_DELETE_ASSET from '../../../api/assets/delete-asset';
import { URL } from '../../../config/url_constant';

const Asset: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const result = await ACT_GET_ASSET();
      setData(result.data.data);
      setFilteredData(result.data.data); // Initialize filteredData with all data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteAsset = async (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus asset ?')) {
      await ACT_DELETE_ASSET(id)
        .then((res) => {
          if (res.status === 200) {
            alert('Asset berhasil dihapus');
            getData(); // Refresh data after deletion
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Terjadi kesalahan dalam penghapusan asset');
        });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    // Filter the data based on the search term (by name or code)
    const filtered = data.filter((item: any) =>
      item.name.toLowerCase().includes(searchValue) ||
      item.code.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className='py-1 relative place-items-start justify-center mb-12'>
        <Searchbar placeholder='Cari asset' onChange={handleSearch} />
      </div>

      <div className='flex items-center justify-between p-2 rounded-lg mb-1'>
        <h1 className='text-lg font-bold'>Daftar Asset</h1>
        <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
          <a href={URL.INPUT.ASSET.CREATE}>
            <Icon icon="mdi:plus" className="text-black" />
          </a>
        </div>
      </div>

      <div className="item">
        <div className='p-4 mb-4 h-[598px] w-[363px] rounded-3xl bg-[#AFAFAF] shadow-sm overflow-y-auto'>
          {loading ? (
            <div>Loading...</div>
          ) : filteredData.length === 0 ? (
            <div>Data aset kosong</div>
          ) : (
            filteredData.map((item: any, index) => (
              <div
                className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center justify-center gap-4"
                key={index}
              >
                {item.image ? (
                  <img
                    src={'https://api-spg.mahesamegahmandiri.com' + item.image}
                    className='w-[100px] h-[70px] rounded-lg border-2'
                    alt={item.name}
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
                    onClick={() => navigate('/dashboard/input/edit-asset/' + item.id)}
                  />
                  <Icon
                    icon="mdi:delete"
                    className="text-gray-500 cursor-pointer"
                    onClick={() => deleteAsset(item.id)}
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

export default Asset;
