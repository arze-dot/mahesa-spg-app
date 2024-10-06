"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/asset.create]";

export interface IRq_CreateAsset {
    name: string;
    code: string;
    date_in: string;
    date_expired: string;
    image: string;
    created_by: number;
    updated_by: number;
}

export interface IRs_CreateAsset {
    message: string;
    status: number;
    data: {
        name: string;
        code: string;
        image: string;
        created_by: number;
        updated_by: number;
        updated_at: Date | string;
        created_at: Date | string;
        id: number;
    };
}

export async function API_CreateAsset(data: IRq_CreateAsset) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.asset.create,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_CreateAsset = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Asset",
            data: null,
        };
    }
}
