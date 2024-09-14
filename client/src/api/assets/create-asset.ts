import axios from "axios";
import { API_URL_ASSET } from "../../config/constant";
import { Cookies } from "react-cookie";

interface CreateAsetInput {
    name: string,
    code: string,
    image: string,
    date_in: string,
    date_expired: string,
    created_by: number,
    updated_by: number
}

const ACT_CREATE_ASSET = async (input: CreateAsetInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.post(API_URL_ASSET, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_CREATE_ASSET;
