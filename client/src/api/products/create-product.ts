import axios from "axios";
import { API_URL_PRODUCT } from "../../config/constant";
import { Cookies } from "react-cookie";

interface CreateProductInput {
    name: string,
    code: string,
    image: string,
    created_by: number,
    updated_by: number
}

const ACT_CREATE_PRODUCT = async (input: CreateProductInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.post(API_URL_PRODUCT, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_CREATE_PRODUCT;
