"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../endpoints";
import { cookies } from "next/headers";

const identity = "[api/upload.file]";

export interface IRq_UploadFile {
    file: File;
    key?: any;
}

export interface IRs_UploadFile {
    message: string;
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

export async function API_UploadFile(data: FormData) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios.post(ENDPOINTS.upload, data, {
            headers: {
                ...Rq_headers,
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        });

        return { status: 201, ...response.data };
    } catch (error: any) {
        logger(
            identity,
            "RES",
            error?.response?.data?.responseDesc,
            error?.response?.status
        )(error?.response).error();

        return {
            status: false,
            message: "Failed upload file",
            token: null,
        };
    }
}
