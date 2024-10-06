"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/asset.list]";

export type IRq_GetAssetList = object;
export type T_Asset = {
    id: number;
    outlet_id: number;
    name: string;
    code: string;
    date_in: Date | string;
    date_expired: Date | string;
    image?: number | null;
    created_at: Date | string;
    updated_at: Date | string;
    created_by?: number | null;
    updated_by?: number | null;
};

export interface IRs_GetAssetList {
    status: number;
    message: string;
    data: T_Asset[] | [];
}

export async function API_GetAssetList(
    data: IRq_GetAssetList | null | undefined
) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: ENDPOINTS.asset.list,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });

        const result: IRs_GetAssetList = response.data;
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
            message: "Failed get asset data",
            data: null,
        };
    }
}
