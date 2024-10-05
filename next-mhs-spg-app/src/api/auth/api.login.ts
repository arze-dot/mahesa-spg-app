"use server";

import axios from "axios";
import { Rq_headers } from "../common.headers";
import { logger } from "@/lib/logger";
import { ENDPOINTS } from "../endpoints";
import { boolean } from "zod";

const identity = "[api/auth.login]";
export interface IRq_Login {
    username: string;
    password: string;
}

export interface IRs_Login {
    status: boolean;
    message: string;
    token: string | null;
}

export async function API_Login(data: IRq_Login) {
    try {
        const response = await axios({
            method: "post",
            maxBodyLength: Infinity,
            url: ENDPOINTS.auth.login,
            headers: {
                ...Rq_headers,
            },
            data: data,
        });

        const result: IRs_Login = response.data;
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
            status: false,
            message: "Failed Login",
            token: null,
        };
    }
}
