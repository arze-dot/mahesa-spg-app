import axios from "axios";
import { API_URL_ATTENDANCE } from "../../config/constant";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

interface AttendanceInput {
    outlet_id: number;
    before_img?: string;  // Optional
    after_img?: string;   // Optional
}

const ACT_CREATE_ATTENDANCE = async (input: AttendanceInput) => {

    const cookies = new Cookies();
    const token = cookies.get('auth'); // Just the token without 'Bearer'

    // Decode the JWT to extract user_id
    const decodedToken: any = jwtDecode(token);
    const user_id = decodedToken.user_id;  // Extract user_id from the token

    const fullInput = {
        ...input,
        user_id // Add user_id from JWT to the request body
    };

    try {
        const response = await axios.post(`${API_URL_ATTENDANCE}`, fullInput, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  // Handle the success case
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error creating attendance:', error.response?.data);
            throw error.response?.data;  // Handle errors from the API
        } else {
            console.error('Unexpected error:', error);
            throw error;
        }
    }
};

export default ACT_CREATE_ATTENDANCE;
