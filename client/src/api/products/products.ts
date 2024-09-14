import axios from "axios";
import { Cookies } from "react-cookie";
import { API_URL_PRODUCT } from "../../config/constant";

const ACT_GET_PRODUCT = async () => {
    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.get(API_URL_PRODUCT, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    });
};

export default ACT_GET_PRODUCT;
