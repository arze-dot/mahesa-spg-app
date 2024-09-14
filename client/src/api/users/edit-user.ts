import axios from "axios";
import { API_URL_USER } from "../../config/constant";
import { Cookies } from "react-cookie";

interface UpdateUserInput {
    id: string,
    full_name: string,
    nik: string,
    email: string,
    phone: string,
    address: string,
    birth_date: string,
    employee_status: string,
    gender: string,
    username: string,
    password: string,
    password_confirmation: string
}

const ACT_UPDATE_USER = async (input: UpdateUserInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')


    return await axios.put(API_URL_USER + `/${input.id}`, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_UPDATE_USER;
