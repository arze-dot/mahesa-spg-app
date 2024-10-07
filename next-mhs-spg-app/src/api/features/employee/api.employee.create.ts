"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/employee.create]";

export interface IRq_CreateEmployee {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    area_code: string;
    code: string;
    user_id: number;
    created_by: number;
    updated_by: number;
    image: string;
}

export interface IRs_CreateEmployee {
    message: string;
    status: number;
    data: {
        name: string;
        address: string;
        latitude: string;
        longitude: string;
        area_code: string;
        code: string;
        user_id: number;
        created_by: number;
        updated_by: number;
        image: string;
        id: number;
    };
}

export async function API_CreateEmployee(data: IRq_CreateEmployee) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.employee.create,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_CreateEmployee = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Employee",
            data: null,
        };
    }
}
