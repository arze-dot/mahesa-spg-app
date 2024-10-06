"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../endpoints";
import { cookies } from "next/headers";

const identity = "[api/report.list]";

export type IRq_GetProductList = object;
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

export interface IRs_GetProductList {
    status: number;
    message: string;
    data: T_Product[] | [];
}

export async function API_GetProductList(
    data: IRq_GetProductList | null | undefined
) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: ENDPOINTS.product.list,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });

        const result: IRs_GetProductList = response.data;
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
            message: "Failed get product data",
            data: null,
        };
    }
}
