import axios from "axios";
import { API_URL_PRODUCT } from "../../config/constant";
import { Cookies } from "react-cookie";

interface UpdateProductInput {
    id: string,
    name: string,
    code: string,
    image: string,
    created_by: number,
    updated_by: number
}

const ACT_EDIT_PRODUCT = async (input: UpdateProductInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.put(API_URL_PRODUCT + `/${input.id}`, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_EDIT_PRODUCT;
