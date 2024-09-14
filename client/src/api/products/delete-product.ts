import axios from "axios";
import { API_URL_PRODUCT } from "../../config/constant";
import { Cookies } from "react-cookie";

const ACT_DELETE_PRODUCT = async (id: string) => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.delete(API_URL_PRODUCT + `/${id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_DELETE_PRODUCT;
