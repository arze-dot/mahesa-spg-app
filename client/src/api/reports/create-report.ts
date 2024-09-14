import axios from "axios";
import { API_URL_REPORT } from "../../config/constant";
import { Cookies } from "react-cookie";

interface CreateReportSpgInput {
    user_id: number,
    outlet_id: number,
    product_id: number,
    attendance_date: string,
    first_stock: number,
    sell_in: number
}

const ACT_CREATE_REPORT_SPG = async (input: CreateReportSpgInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')

    return await axios.post(API_URL_REPORT, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_CREATE_REPORT_SPG;
