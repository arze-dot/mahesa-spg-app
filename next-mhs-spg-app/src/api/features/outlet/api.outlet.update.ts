"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";

const identity = "[api/outlet.edit]";

export interface IRq_EditOutlet {
    id: string;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    area_code: string;
    code: string;
    user_id: number;
    created_by: number;
    updated_by: number;
    image: string;
}

export interface IRs_EditOutlet {
    message: string;
    status: number;
    data: {
        name: string;
        address: string;
        latitude: string;
        longitude: string;
        area_code: string;
        code: string;
        user_id: number;
        created_by: number;
        updated_by: number;
        image: string;
        id: number;
    };
}

export async function API_EditOutlet(data: IRq_EditOutlet) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "POST",
            maxBodyLength: Infinity,
            url: ENDPOINTS.outlet.delete + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
            data: data,
        });

        const result: IRs_EditOutlet = { status: 201, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Create Outlet",
            data: null,
        };
    }
}
