import React, { useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import InputField from '../../../component/InputField';
import Button from '../../../component/Button';
import ACT_UPLOAD from '../../../api/upload';
import ACT_CREATE_ASSET from '../../../api/assets/create-asset';
import { useNavigate } from 'react-router-dom';

const InputAsset: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [useWebcam, setUseWebcam] = useState<boolean>(false);
    const webcamRef = React.useRef<Webcam>(null);

    const [data, setData] = useState({
        name: '',
        code: '',
        date_in: '',
        date_expired: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();

        if (imageSrc) {
            setImageSrc(imageSrc);

            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const file = new File([ab], 'capture.png', { type: mimeString });
            setFile(file);
        }
        setUseWebcam(false);
    }, [webcamRef]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (file) {
            try {
                const uploadResponse = await ACT_UPLOAD(file, 'asset');

                if (uploadResponse.status === 201 || uploadResponse.status === 200) {
                    const imageUrl = uploadResponse.data.files.asset;

                    const assetData = {
                        ...data,
                        image: imageUrl,
                        created_by: 1,
                        updated_by: 1,
                    };

                    const createAssetResponse = await ACT_CREATE_ASSET(assetData);

                    if (createAssetResponse.status === 201) {
                        alert('Berhasil membuat aset');
                        navigate('/dashboard/input/asset');
                    } else {
                        throw new Error('Gagal membuat aset');
                    }
                } else {
                    throw new Error('Gagal mengupload gambar');
                }
            } catch (error) {
                console.error(error);
                alert('Gagal membuat aset');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            alert('Tolong upload gambar');
        }
    };

    return (
        <div className="flex items-start justify-center min-h-screen">
            <div className="bg-gray-300 p-6 rounded-lg w-100">
                {/* Picture Section */}
                <div className="flex justify-center mb-4">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Asset" className="w-28 h-28 bg-white rounded-full" />
                    ) : (
                        <div className="w-28 h-28 bg-white rounded-full" />
                    )}
                </div>

                {/* Webcam and File Upload */}
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

                {/* Input Fields */}
                <div className="mb-4">
                    <InputField
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Nama Aset"
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        type="text"
                        name="code"
                        onChange={handleChange}
                        value={data.code}
                        placeholder="Kode Aset"
                    />
                </div>

                <div className="mb-4">
                    Tanggal Masuk
                    <InputField
                        type="date"
                        name="date_in"
                        onChange={handleChange}
                        value={data.date_in}
                        placeholder="Tanggal Masuk"
                    />
                </div>

                <div className="mb-4">
                    Tanggal Expired
                    <InputField
                        type="date"
                        name="date_expired"
                        onChange={handleChange}
                        value={data.date_expired}
                        placeholder="Tanggal Masuk"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button isLoading={loading} onClick={handleSubmit} color="red">
                        Simpan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InputAsset;
