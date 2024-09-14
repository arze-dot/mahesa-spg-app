import axios from "axios";
import { API_URL_ASSET } from "../../config/constant";
import { Cookies } from "react-cookie";

interface UpdateAssetInput {
    id: string,
    name: string,
    code: string,
    image: string,
    date_in: string,
    date_expired: string,
    created_by: number,
    updated_by: number
}

const ACT_EDIT_ASSET = async (input: UpdateAssetInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')


    return await axios.put(API_URL_ASSET + `/${input.id}`, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_EDIT_ASSET;
