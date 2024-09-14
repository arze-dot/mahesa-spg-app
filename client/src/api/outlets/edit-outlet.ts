import axios from "axios";
import { API_URL_OUTLET } from "../../config/constant";
import { Cookies } from "react-cookie";

interface UpdateOutletInput {
    id: string,
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

const ACT_EDIT_OUTLET = async (input: UpdateOutletInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')


    return await axios.put(API_URL_OUTLET + `/${input.id}`, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_EDIT_OUTLET;
