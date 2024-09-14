import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Icon } from '@iconify/react';
import InputField from '../../../component/InputField';
import Button from '../../../component/Button';
import { useNavigate } from 'react-router-dom';
import ACT_UPLOAD from '../../../api/upload';
import ACT_CREATE_OUTLET from '../../../api/outlets/create-outlet';

const InputOutlet: React.FC = () => {


    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [useWebcam, setUseWebcam] = useState<boolean>(false);
    const webcamRef = React.useRef<Webcam>(null);

    const [data, setData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        area_code: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();

        if (imageSrc) {
            setImageSrc(imageSrc);

            // Convert base64 to a file object
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const file = new File([ab], 'capture.png', { type: mimeString });

            // Set the file to the state
            setFile(file);
        }
        setUseWebcam(false)
    }, [webcamRef]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        console.log('test')
        setLoading(true);
        if (file) {
            try {
                const uploadResponse = await ACT_UPLOAD(file, 'outlet');

                if (uploadResponse.status === 201 || uploadResponse.status === 200) {
                    // Step 2: Get the image URL from upload response
                    const imageUrl = uploadResponse.data.files.outlet;

                    // Step 3: Add image URL to the outlet data
                    const outletData = {
                        ...data,
                        code: data.name,
                        user_id: 1,
                        created_by: 1,
                        updated_by: 1,
                        image: imageUrl
                    };

                    // Step 4: Create the outlet
                    const createOutletResponse = await ACT_CREATE_OUTLET(outletData);

                    if (createOutletResponse.status === 201) {
                        // Step 5: Success case
                        alert('Berhasil menginput outlet');
                        navigate('/dashboard/input/outlet');
                    } else {
                        throw new Error('Gagal menginput outlet');
                    }
                } else {
                    throw new Error('Upload file gagal');
                }
            } catch (error) {
                console.error(error);
                alert('Gagal menginput outlet');
            } finally {
                setLoading(false);
            }
        }

        setLoading(false)

    };


    return (
        <div className="rounded-md min-h-screen flex items-start justify-start">
            <div className="bg-[#AFAFAF] rounded-3xl shadow-lg p-5 w-96 pb-[75px]">
                {/* Picture Section */}
                <div className="flex justify-center mb-6">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Outlet" className="w-20 h-20 bg-white rounded-md" />
                    ) : (
                        <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center">
                        </div>
                    )}
                </div>

                {/* File or Webcam Selection */}
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        onClick={() => setUseWebcam(!useWebcam)}
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                    >
                        {useWebcam ? 'Stop Kamera' : 'Gunakan Kamera'}
                    </button>
                    <label className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        Upload Gambar
                    </label>
                </div>

                {/* Webcam View */}
                {useWebcam && (
                    <div className="mb-4">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="w-full h-64 bg-gray-200"
                        />
                        <button
                            onClick={capture}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full"
                        >
                            Ambil Gambar
                        </button>
                    </div>
                )}

                <form>
                    {/* Outlet Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Nama Outlet
                        </label>
                        <InputField
                            icon={<Icon icon={'iconamoon:profile'} fontSize={20} />}
                            type='text'
                            name='name'
                            onChange={handleChange}
                            value={data.name}
                            placeholder="Nama Outlet"
                        />
                    </div>

                    {/* Outlet Address */}
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                            Alamat
                        </label>
                        <InputField
                            icon={<Icon icon={'mdi:addr'} fontSize={20} />}
                            as="textarea"
                            name='address'
                            placeholder="Alamat Outlet"
                            value={data.address}
                            onChangeTextArea={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({ ...data, address: e.target.value })}
                        />
                    </div>

                    {/* Coordinates */}
                    <div className="mb-4">
                        <label htmlFor="coordinates" className="block text-gray-700 text-sm font-bold mb-2">
                            Titik Koordinat
                        </label>
                        <div className="flex space-x-2">
                            <InputField
                                icon={<Icon icon={'iconamoon:location-pin'} fontSize={20} />}
                                type='text'
                                name='latitude'
                                onChange={handleChange}
                                value={data.latitude}
                                placeholder="Lat"
                            />
                            <InputField
                                icon={<Icon icon={'iconamoon:location-pin'} fontSize={20} />}
                                type='text'
                                name='longitude'
                                onChange={handleChange}
                                value={data.longitude}
                                placeholder="Long"
                            />
                        </div>
                    </div>

                    {/* Area Code */}
                    <div className="mb-4">
                        <label htmlFor="area_code" className="block text-gray-700 text-sm font-bold mb-2">
                            Kode Area
                        </label>
                        <InputField
                            icon={<Icon icon={'fluent:status-12-regular'} fontSize={20} />}
                            as="select"
                            name='area_code'
                            placeholder="Pilih Kode Area"
                            onChangeSelect={handleSelectChange}
                            value={data.area_code}
                        >
                            <option value="">Kode Area</option>
                            <option value="PMU">PMU</option>
                            <option value="PMM">PMM</option>
                            <option value="PMA">PMA</option>
                            <option value="PMS">PMS</option>
                        </InputField>
                    </div>

                    <div className="flex items-center justify-center mt-6 w-full">
                        <Button isLoading={loading} onClick={() => handleSubmit()} color="red">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InputOutlet;
