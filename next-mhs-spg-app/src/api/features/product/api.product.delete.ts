"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/product.delete]";

export interface IRq_DeleteProduct {
    id: string;
}

export interface IRs_DeleteProduct {
    message: string;
    status: number;
    data: null;
}

export async function API_DeleteProduct(data: IRq_DeleteProduct) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "DELETE",
            maxBodyLength: Infinity,
            url: ENDPOINTS.product.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/product");

        const result: IRs_DeleteProduct = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Edit Product",
            token: null,
        };
    }
}
