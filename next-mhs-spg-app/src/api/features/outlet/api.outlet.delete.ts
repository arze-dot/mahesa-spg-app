"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/outlet.delete]";

export interface IRq_DeleteOutlet {
    id: string;
}

export interface IRs_DeleteOutlet {
    message: string;
    status: number;
    data: null;
}

export async function API_DeleteOutlet(data: IRq_DeleteOutlet) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "DELETE",
            maxBodyLength: Infinity,
            url: ENDPOINTS.outlet.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/outlet");

        const result: IRs_DeleteOutlet = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Delete Outlet",
            token: null,
        };
    }
}
