"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/outlet.detail]";

export interface IRq_DetailOutlet {
    id: string;
}

export interface IRs_DetailOutlet {
    message: string;
    status: number;
    data: any;
}

export async function API_DetailOutlet(data: IRq_DetailOutlet) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "GET",
            maxBodyLength: Infinity,
            url: ENDPOINTS.outlet.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/outlet");

        const result: IRs_DetailOutlet = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Detail Outlet",
            token: null,
        };
    }
}
