import React, { useEffect, useState } from 'react';
import SearchBar from '../../../component/SearchBar';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import ACT_GET_OUTLET from '../../../api/outlets/outlets';
import { URL } from '../../../config/url_constant';
import ACT_DELETE_OUTLET from '../../../api/outlets/delete-outlet';


const Outlet: React.FC = () => {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  const getUsers = async () => {
    const result = await ACT_GET_OUTLET()

    setData(result.data.data.data)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const deleteOutlet = async (id: string) => {
    if (confirm('Apakah anda yakin ingin menghapus outlet ?')) {
      await ACT_DELETE_OUTLET(id).then((res) => {
        if (res.status === 200) {
          alert('Outlet berhasil dihapus')
          getUsers()
        }
      }).catch((err) => {
        console.log(err)
        alert('Terjadi kesalahan dalam penghapusan outlet')
      })
    }
  }

  return (
    <div>
      <div className='py-1 relative place-items-start justify-center mb-12'>
        <SearchBar />
      </div>

      <div className='flex items-center justify-between p-2 rounded-lg mb-1'>
        <h1 className='text-lg font-bold'>Daftar Outlet</h1>
        <div className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 cursor-pointer">
          <a href={URL.INPUT.OUTLET.CREATE}>
            <Icon icon="mdi:plus" className="text-black" />
          </a>
        </div>
      </div>

      <div className="item">
        <div className="item">
          <div className='p-4 mb-4 h-[598px] w-[363px] rounded-3xl bg-[#AFAFAF] shadow-sm overflow-y-auto'>

            {
              data.map((item: any, index) => {
                return (
                  <div className="border border-black p-4 mb-4 rounded-lg bg-white shadow-sm flex items-center justify-center gap-4" key={index}>
                    {
                      item.image ?
                        <img src={'https://api-spg.mahesamegahmandiri.com' + item.image} className='w-[100px] h-[70px] rounded-lg border-2 ' /> :
                        <div className='w-[100px] h-[70px] rounded-lg bg-red-800 text-[10px] font-bold text-white flex items-center justify-center'>
                          No Image
                        </div>
                    }
                    <div className="flex-grow">
                      <div className="font-bold text-[14px]">{item.name}</div>
                      <div className="text-gray-500 text-[12px]">{item.address}</div>
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <Icon icon="mdi:pencil" className="text-gray-500 cursor-pointer" onClick={() => navigate('/dashboard/input/edit-outlet/' + item.id)} />
                      <Icon icon="mdi:delete" className="text-gray-500 cursor-pointer" onClick={() => deleteOutlet(item.id)} />
                    </div>
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};


export default Outlet;

