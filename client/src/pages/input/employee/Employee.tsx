import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Searchbar from '../../../component/SearchBar';
import { URL } from '../../../config/url_constant';
import ACT_GET_USERS from '../../../api/users/users';
import { useNavigate } from 'react-router-dom';
import ACT_DELETE_USER from '../../../api/users/delete-user';

const Employee: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const result = await ACT_GET_USERS();
    setData(result.data.data);
    setFilteredData(result.data.data); // Initialize filteredData with full data
  };

  useEffect(() => {
    getUsers();
  }, []);

  const employeeStatusLang = (status: string) => {
    if (status === 'full_time') return 'Karyawan Tetap';
    if (status === 'contract') return 'Karyawan Kontrak';
    if (status === 'internship') return 'Karyawan Magang';
  };

  const deleteEmployee = async (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus karyawan ?')) {
      await ACT_DELETE_USER(id)
        .then((res) => {
          if (res.status === 200) {
            alert('Karyawan berhasil dihapus');
            getUsers();
          }
        })
        .catch((err) => {
          console.log(err);
          alert('Terjadi kesalahan dalam penghapusan karyawan');
        });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();

    const filtered = data.filter((item) =>
      item.full_name.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <div className='py-1 relative place-items-start justify-center mb-6'>
        <Searchbar placeholder='Cari Karyawan' onChange={handleSearch} />
      </div>

      <div className='flex items-center justify-between p-2 rounded-lg mb-1'>
        <h1 className='text-lg font-bold'>Daftar Karyawan</h1>
        <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
          <a href={URL.INPUT.EMPLOYEE.CREATE}>
            <Icon icon="mdi:plus" className="text-black" />
          </a>
        </div>
      </div>

      <div className="item">
        <div className='p-4 mb-4 h-[598px] w-[363px] rounded-3xl bg-[#AFAFAF] shadow-sm overflow-y-auto'>
          {filteredData.length === 0 ? (
            <div>Data karyawan kosong</div>
          ) : (
            filteredData.map((item: any, index) => (
              <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center" key={index}>
                <div className='w-12 h-12 rounded-full mr-4 bg-red-800 text-[20px] font-bold text-white flex items-center justify-center'>
                  {item.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="font-bold">{item.full_name}</div>
                  <div className="text-gray-500 text-[12px]">{employeeStatusLang(item.employee_status)}</div>
                </div>
                <div className="flex-shrink-0 flex space-x-2">
                  <Icon
                    icon="mdi:pencil"
                    className="text-gray-500 cursor-pointer"
                    onClick={() => navigate('/dashboard/input/edit-employee/' + item.id)}
                  />
                  <Icon
                    icon="mdi:delete"
                    className="text-gray-500 cursor-pointer"
                    onClick={() => deleteEmployee(item.id)}
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

export default Employee;
