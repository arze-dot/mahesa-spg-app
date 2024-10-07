"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/employee.list]";

export type T_Employee = {
    id: number;
    username: string;
    created_at: string;
    updated_at: string;
    created_by?: number;
    updated_by?: number;
    avatar?: string;
    nik: string;
    email: string;
    phone: string;
    address: string;
    birth_date: string;
    employee_status: string;
    gender: string;
    full_name: string;
    role: string;
};

export type IRq_GetEmployeeList = object;
export interface IRs_GetEmployeeList {
    status: number;
    message: string;
    data: T_Employee[] | [];
}

export async function API_GetEmployeeList(
    data: IRq_GetEmployeeList | null | undefined
) {
    console.log(data);
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: ENDPOINTS.employee.list,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });

        const result: IRs_GetEmployeeList = response.data;
        logger(
            identity,
            "RES",
            result?.message,
            response?.status
        )(result).info();

        return result;
    } catch (error: any) {
        logger(
            identity,
            "RES",
            error?.response?.data?.responseDesc,
            error?.response?.status
        )(error?.response).error();
        return {
            message: "Failed get employee data",
            data: null,
        };
    }
}
