"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { ENDPOINTS } from "../endpoints";
import { cookies } from "next/headers";

const identity = "[api/product.create]";

export interface IRq_CreateProduct {
    name: string;
    type: string;
    code: string;
    image: string;
    created_by: number;
    updated_by: number;
}

export interface IRs_CreateProduct {
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

export async function API_CreateProduct(data: IRq_CreateProduct) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.product.create,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_CreateProduct = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Product",
            data: null,
        };
    }
}
