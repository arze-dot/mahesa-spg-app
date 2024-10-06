import React, { useEffect, useState } from 'react';
import SearchBar from '../../../component/SearchBar';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ACT_GET_OUTLET from '../../../api/outlets/outlets';
import { URL } from '../../../config/url_constant';
import ACT_DELETE_OUTLET from '../../../api/outlets/delete-outlet';
import Modal from '../../../component/Modal';

const Outlet: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    setLoading(true);
    try {
      const result = await ACT_GET_OUTLET();
      setData(result.data.data);
      setFilteredData(result.data.data); // Initialize filteredData with all data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteOutlet = async (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus outlet ?')) {
      await ACT_DELETE_OUTLET(id)
        .then((res) => {
          if (res.status === 200) {
            alert('Outlet berhasil dihapus');
            getUsers();
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Terjadi kesalahan dalam penghapusan outlet');
        });
    }
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    // Filter the data based on the search term
    const filtered = data.filter((item: any) =>
      item.outlet.name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };


  const [open, setOpen] = useState<boolean>(false)
  const [openData, setOpenData] = useState({})
  const handleOpenData = (data: any) => {
    setOpen(true)
    setOpenData(data)
  }
  return (
    <div>
      <div className="py-1 relative place-items-start justify-center mb-12">
        <SearchBar placeholder="Cari outlet" onChange={handleSearch} />
      </div>

      <div className="flex items-center justify-between p-2 rounded-lg mb-1">
        <h1 className="text-lg font-bold">Daftar Outlet</h1>
        <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
          <a href={URL.INPUT.OUTLET.CREATE}>
            <Icon icon="mdi:plus" className="text-black" />
          </a>
        </div>
      </div>

      <div className="item">
        <div className="p-4 mb-4 h-[598px] w-[363px] rounded-3xl bg-[#AFAFAF] shadow-sm overflow-y-auto">
          {loading ? (
            <div>Loading...</div>
          ) : filteredData.length === 0 ? (
            <div>No results found.</div>
          ) : (
            filteredData.map((item: any, index) => (
              <div
                className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center justify-center gap-4"
                key={index}
                onClick={() => handleOpenData(data)}
              >
                {item.image ? (
                  <img
                    src={'https://api-spg.mahesamegahmandiri.com' + item.image}
                    className="w-[100px] h-[70px] rounded-lg border-2"
                    alt={item.outlet_name}
                  />
                ) : (
                  <div className="w-[100px] h-[70px] rounded-lg bg-red-800 text-[10px] font-bold text-white flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="flex-grow"
                  onClick={() => handleOpenData(data)}>
                  <div className="font-bold text-[14px]">{item.outlet.name}</div>
                  <div className="text-gray-500 text-[12px]">{item.outlet.address}</div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
      ÷
    </div>
  );
};

export default Outlet;
