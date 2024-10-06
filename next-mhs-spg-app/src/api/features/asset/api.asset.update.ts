"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/asset.edit]";

export interface IRq_EditAsset {
    id: string;
    name: string;
    code: string;
    date_in: string;
    date_expired: string;
    image: string;
    created_by: number;
    updated_by: number;
    outlet_id: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface IRs_EditAsset {
    message: string;
    status: number;
    data: {
        id: number;
        name: string;
        code: string;
        date_in: string;
        date_expired: string;
        image: string;
        created_by: number;
        updated_by: number;
        updated_at: Date | string;
        created_at: Date | string;
    };
}

export async function API_EditAsset(data: IRq_EditAsset) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "PUT",
            maxBodyLength: Infinity,
            url: ENDPOINTS.asset.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_EditAsset = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Asset",
            data: null,
        };
    }
}
