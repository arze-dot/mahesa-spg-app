"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../endpoints";
import { cookies } from "next/headers";

const identity = "[api/product.edit]";

export interface IRq_EditProduct {
    id: string;
    name: string;
    type: string;
    code: string;
    image: string;
    created_by: number;
    updated_by: number;
}

export interface IRs_EditProduct {
    message: string;
    status: number;
    data: {
        id: number;
        name: string;
        code: string;
        image: string;
        created_by: number;
        updated_by: number;
        updated_at: Date | string;
        created_at: Date | string;
    };
}

export async function API_EditProduct(data: IRq_EditProduct) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.product.delete + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_EditProduct = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Product",
            token: null,
        };
    }
}
