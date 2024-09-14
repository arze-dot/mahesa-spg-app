import React, { useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import InputField from '../../../component/InputField';
import Button from '../../../component/Button';
import ACT_UPLOAD from '../../../api/upload';
import { useNavigate, useParams } from 'react-router-dom';
import ACT_DETAIL_PRODUCT from '../../../api/products/detail-product';
import ACT_EDIT_PRODUCT from '../../../api/products/edit-product';

const EditProduct: React.FC = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [useWebcam, setUseWebcam] = useState<boolean>(false);
    const webcamRef = React.useRef<Webcam>(null);

    const [data, setData] = useState({
        name: '',
        type: '',
        code: '',
        image: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
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
        if (id) {
            try {
                let uploadResponse = null
                let imageUrl = data.image
                if (file) {
                    uploadResponse = await ACT_UPLOAD(file, 'product');
                    if (uploadResponse.status === 201 || uploadResponse.status === 200) {
                        imageUrl = uploadResponse.data.files.product;
                    } else {
                        throw new Error('Gagal mengupload gambar');
                    }
                } else {
                    setLoading(false);
                }
                const productData = {
                    ...data,
                    id: id,
                    image: imageUrl,
                    created_by: 1,
                    updated_by: 1
                };

                const updateProductRespons = await ACT_EDIT_PRODUCT(productData);

                if (updateProductRespons.status === 200) {
                    alert('Berhasil mengupdate produk');
                    navigate('/dashboard/input/product');
                } else {
                    throw new Error('Gagal mengupdate produk');
                }

            } catch (error) {
                console.error(error);
                alert('Gagal mengupdate produk');
            } finally {
                setLoading(false);
            }


        }
    };



    useEffect(() => {
        getData()
    }, [id])

    const getData = async () => {
        if (id)
            await ACT_DETAIL_PRODUCT(id).then((res) => {
                setData(res.data.data)
                setImageSrc('https://api-spg.mahesamegahmandiri.com' + res.data.data.image)
            }).catch((err) => {
                console.log(err)
                alert('Gagal memuat data')
            })
    }

    return (
        <div className="flex items-start justify-start h-screen ">
            <div className="bg-gray-300 p-6 rounded-lg h-[363px] w-[398px]">
                {/* Picture Section */}
                <div className="flex justify-center mb-4">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Product" className="w-20 h-20 bg-white rounded" />
                    ) : (
                        <div className="w-20 h-20 bg-white rounded" />
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
                        type='text'
                        name='name'
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Nama Produk"
                    />
                </div>

                <div className="mb-4">
                    <InputField
                        type='text'
                        name='code'
                        onChange={handleChange}
                        value={data.code}
                        placeholder="Kode Produk"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <Button isLoading={loading} onClick={handleSubmit} color="red">
                        Simpan Perubahan
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
