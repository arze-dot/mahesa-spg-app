import axios from "axios";
import { API_URL_OUTLET } from "../../config/constant";
import { Cookies } from "react-cookie";

const ACT_DETAIL_OUTLET = async (id: string) => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.get(API_URL_OUTLET + `/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_DETAIL_OUTLET;
