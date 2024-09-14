import axios from "axios";
import { API_URL_USER } from "../../config/constant";
import { Cookies } from "react-cookie";

const ACT_DETAIL_USERS = async (id: string) => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.get(API_URL_USER + `/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_DETAIL_USERS;
