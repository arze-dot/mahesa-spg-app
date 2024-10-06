"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../endpoints";
import { cookies } from "next/headers";

const identity = "[api/report.list]";

export interface IRq_GetReportList {}
export type T_Product = {
    id: number;
    name: string;
    code: string;
    image: string;
    created_at: Date | string;
    updated_at: Date | string;
    created_by: number;
    updated_by: number;
};

export type T_Report = {
    id: number;
    user_id: number;
    outlet_id: number;
    attendance_date: string;
    product_id: number;
    first_stock: number;
    sell_in: number;
    created_at: Date | string;
    updated_at: Date | string;
    product: T_Product;
};

export interface IRs_GetReportList {
    status?: number;
    message: string;
    data: T_Report[] | null;
}

export async function API_GetReportList(
    data: IRq_GetReportList | null | undefined
) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: ENDPOINTS.report.list,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });

        const result: IRs_GetReportList = response.data;
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
            message: "Failed get report data",
            data: [],
        };
    }
}
