import React, { useState, useEffect, useCallback, useRef } from 'react';
import ACT_GET_OUTLET from '../../../api/outlets/outlets';
import ACT_UPLOAD from '../../../api/upload';
import SearchSelectInput from '../../../component/SearchSelectInput';
import Button from '../../../component/Button';
import Webcam from 'react-webcam';
import ACT_CREATE_ATTENDANCE from '../../../api/reports/attendance';
import { Cookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const DailyReportAttendance: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [outlets, setOutlets] = useState<any[]>([]);
    const [data, setData] = useState({
        outlet_id: 0,
        before_img: '',
        after_img: ''
    });

    const [useWebcam, setUseWebcam] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const [beforeImage, setBeforeImage] = useState<File | null>(null);
    const [afterImage, setAfterImage] = useState<File | null>(null);

    const cookies = new Cookies();
    const token = cookies.get('auth'); // Just the token without 'Bearer'

    // Decode the JWT to extract user_id
    const decodedToken: any = jwtDecode(token);
    const user_id = decodedToken.user_id;  // Extract user_id from the token


    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        const result = await ACT_GET_OUTLET();
        setOutlets(result.data.data);
    };

    const handleSelectOutlet = (selectedOption: any) => {
        setData({ ...data, outlet_id: selectedOption.value });
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


            const now = new Date();
            const hour = now.getHours();
            if (hour < 12) {
                setBeforeImage(file);
            } else {
                setAfterImage(file);
            }
        }
        setUseWebcam(false);
    }, [data.before_img]);
    console.log(afterImage, 'afterImage')
    console.log(beforeImage, 'beforeImage')

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const now = new Date();
            const hour = now.getHours();
            let beforeImgUrl = data.before_img;
            let afterImgUrl = data.after_img;

            if (beforeImage && hour < 12) {
                const uploadResponse = await ACT_UPLOAD(beforeImage, 'report');
                if (uploadResponse.status === 201 || uploadResponse.status === 200) {
                    beforeImgUrl = uploadResponse.data.files.report;
                } else {
                    throw new Error('Gagal mengupload gambar sebelum');
                }
            }

            if (afterImage && hour >= 12) {
                const uploadResponse = await ACT_UPLOAD(afterImage, 'report');
                if (uploadResponse.status === 201 || uploadResponse.status === 200) {
                    afterImgUrl = uploadResponse.data.files.report;
                } else {
                    throw new Error('Gagal mengupload gambar sesudah');
                }
            }

            // Prepare the attendance data for submission
            const attendanceData = {
                outlet_id: data.outlet_id,
                before_img: beforeImgUrl,
                after_img: afterImgUrl
            };

            // Send the data using ACT_CREATE_ATTENDANCES
            await ACT_CREATE_ATTENDANCE(attendanceData);

            console.log('Attendance successfully submitted');
        } catch (error) {
            console.error('Error submitting attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen flex flex-col items-center'>
            <div className="bg-[#AFAFAF] p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">ATTENDANCE</h2>

                {/* Nama Toko (Outlet Search) */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">NAMA TOKO</label>
                    <SearchSelectInput
                        placeholder="Cari Nama Toko"
                        options={outlets
                            .filter((item: any) => item.outlet.users.some((user: any) => user.id === user_id))
                            .map((item: any) => ({ label: item.outlet.name, value: item.outlet.id }))}
                        onChange={handleSelectOutlet}
                    />
                </div>

                {/* Webcam Input */}
                <h3 className="text-md font-bold mb-2">AMBIL GAMBAR</h3>
                <div className="flex justify-center mb-6">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Outlet"
                            className="w-[100%] h-auto bg-white rounded-md object-cover"
                        />
                    ) : (
                        <div className="w-[100%] h-auto bg-white rounded-md flex items-center justify-center"></div>
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
                </div>

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

                <div className="flex items-center justify-center mt-6 w-full">
                    <Button isLoading={loading} onClick={handleSubmit} color="red">
                        Simpan Kehadiran
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DailyReportAttendance;
