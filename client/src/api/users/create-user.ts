import axios from "axios";
import { API_URL_REGISTER } from "../../config/constant";
import { Cookies } from "react-cookie";

interface CreateUserInput {
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

const ACT_CREATE_USERS = async (input: CreateUserInput) => {

    const cookies = new Cookies()
    const token = 'Bearer ' + cookies.get('auth')


    return await axios.post(API_URL_REGISTER, input, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    });
};

export default ACT_CREATE_USERS;
