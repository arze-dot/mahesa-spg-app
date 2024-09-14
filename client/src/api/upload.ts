import axios from "axios";
import { API_URL_UPLOAD } from "../config/constant";
import { Cookies } from "react-cookie";

const ACT_UPLOAD = async (file: File, key?: any) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')
    const formData = new FormData();

    formData.append(key, file);



    return await axios.post(API_URL_UPLOAD, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    });
};

export default ACT_UPLOAD;
