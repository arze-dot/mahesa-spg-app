"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/asset.delete]";

export interface IRq_DeleteAsset {
    id: string;
}

export interface IRs_DeleteAsset {
    message: string;
    status: number;
    data: null;
}

export async function API_DeleteAsset(data: IRq_DeleteAsset) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "DELETE",
            maxBodyLength: Infinity,
            url: ENDPOINTS.asset.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/asset");

        const result: IRs_DeleteAsset = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Edit Asset",
            token: null,
        };
    }
}
