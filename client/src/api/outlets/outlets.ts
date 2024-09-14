import axios from "axios";
import { Cookies } from "react-cookie";
import { API_URL_OUTLET } from "../../config/constant";

const ACT_GET_OUTLET = async () => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.get(API_URL_OUTLET, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_GET_OUTLET;
