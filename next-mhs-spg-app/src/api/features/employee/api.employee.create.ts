"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { logger } from "@/lib/logger";

const identity = "[api/employee.create]";

type T_OutletInput = {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    code: string;
    area_code: string;
    created_by: number;
    updated_by: number;
    user_id: number;
    image: string | null;
};

type T_AssetsInput = {
    id: number;
    outlet_id: number;
    name: string;
    code: string;
    date_in: string;
    date_expired: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    created_by: number;
    updated_by: number;
};

export interface IRq_CreateEmployee {
    full_name: string;
    nik: string;
    email: string;
    phone: string;
    address: string;
    birth_date: string;
    employee_status: string;
    gender: string;
    areaCode: string;
    role: string;
    username: string;
    password: string;
    password_confirmation: string;
    outlets: T_OutletInput[];
    assets: T_AssetsInput[];
}

export interface IRs_CreateEmployee {
    status: number;
    message: string;
    user: {
        id: number;
        full_name: string;
        nik: string;
        email: string;
        phone: string;
        address: string;
        birth_date: string;
        employee_status: string;
        gender: string;
        role: string;
        username: string;
        updated_at: string;
        created_at: string;
    };
}

export async function API_CreateEmployee(data: IRq_CreateEmployee) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.inputData,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_CreateEmployee = { status: 201, ...response.data };
        logger(
            identity,
            "RES",
            result?.message,
            response?.status
        )(result).info();

        return result;
    } catch (error: any) {
        console.log(identity, error);
        logger(
            identity,
            "RES",
            error?.response?.data?.responseDesc,
            error?.response?.status
        )(error?.response).error();
        return {
            status: 500,
            message: "Failed Create Employee",
            data: null,
        };
    }
}
