"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/employee.detail]";

export interface IRq_DetailEmployee {
    id: string;
}

export interface IRs_DetailEmployee {
    message: string;
    status: number;
    data: any;
}

export async function API_DetailEmployee(data: IRq_DetailEmployee) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "GET",
            maxBodyLength: Infinity,
            url: ENDPOINTS.employee.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/employee");

        const result: IRs_DetailEmployee = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Detail Employee",
            token: null,
        };
    }
}
