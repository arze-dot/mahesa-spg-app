import axios from "axios";
import { API_URL_LOGIN } from "../config/constant";

const ACT_LOGIN = async (username: string, password: string) => {
    return await axios.post(API_URL_LOGIN, {
        username: username,
        password: password
    }, {
        headers: {
            'Content-type': 'application/json'
        }
    });
};

export default ACT_LOGIN;
