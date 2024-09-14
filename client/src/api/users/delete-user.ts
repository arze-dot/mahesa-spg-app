import axios from "axios";
import { API_URL_USER } from "../../config/constant";
import { Cookies } from "react-cookie";

const ACT_DELETE_USER = async (id: string) => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.delete(API_URL_USER + `/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_DELETE_USER;
