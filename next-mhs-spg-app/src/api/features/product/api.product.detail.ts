"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/product.detail]";

export interface IRq_DetailProduct {
    id: string;
}

export interface IRs_DetailProduct {
    message: string;
    status: number;
    data: any;
}

export async function API_DetailProduct(data: IRq_DetailProduct) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "GET",
            maxBodyLength: Infinity,
            url: ENDPOINTS.product.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/product");

        const result: IRs_DetailProduct = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Edit Product",
            token: null,
        };
    }
}
