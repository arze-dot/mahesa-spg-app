"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/outlet.list]";

export type T_UserOutlet = {
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
    pivot: {
        outlet_id: number;
        user_id: number;
    };
};
export type T_Outlet = {
    outlet: {
        id: number;
        name: string;
        code: string;
        created_at: string;
        updated_at: string;
        created_by?: number;
        updated_by?: number;
        user_id: number;
        area_code?: string;
        longitude: string;
        latitude: string;
        address: string;
        image?: string;
        users: T_UserOutlet[];
    };
    assets: any[];
};

export type IRq_GetOutletList = object;
export interface IRs_GetOutletList {
    status: number;
    message: string;
    data: T_Outlet[] | [];
}

export async function API_GetOutletList(
    data: IRq_GetOutletList | null | undefined
) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: ENDPOINTS.outlet.list,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });

        const result: IRs_GetOutletList = response.data;
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
            message: "Failed get outlet data",
            data: null,
        };
    }
}
