"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/asset.detail]";

export interface IRq_DetailAsset {
    id: string;
}

export interface IRs_DetailAsset {
    message: string;
    status: number;
    data: any;
}

export async function API_DetailAsset(data: IRq_DetailAsset) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "GET",
            maxBodyLength: Infinity,
            url: ENDPOINTS.asset.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/asset");

        const result: IRs_DetailAsset = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Edit Asset",
            token: null,
        };
    }
}
