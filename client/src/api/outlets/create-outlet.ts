import axios from "axios";
import { API_URL_OUTLET } from "../../config/constant";
import { Cookies } from "react-cookie";

interface CreateOutletInput {
    name: string,
    code: string,
    user_id: number,
    area_code: string,
    longitude: string,
    latitude: string,
    address: string,
    image: string,
    created_by: number,
    updated_by: number
}

const ACT_CREATE_OUTLET = async (input: CreateOutletInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')


    return await axios.post(API_URL_OUTLET, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_CREATE_OUTLET;
