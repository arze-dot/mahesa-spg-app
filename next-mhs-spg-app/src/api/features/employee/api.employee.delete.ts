"use server";

import axios from "axios";
import { Rq_headers } from "../../common.headers";
import { ENDPOINTS } from "../../endpoints";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const identity = "[api/employee.delete]";

export interface IRq_DeleteEmployee {
    id: string;
}

export interface IRs_DeleteEmployee {
    message: string;
    status: number;
    data: null;
}

export async function API_DeleteEmployee(data: IRq_DeleteEmployee) {
    const token = cookies().get("token")?.value;
    try {
        const response = await axios({
            method: "DELETE",
            maxBodyLength: Infinity,
            url: ENDPOINTS.employee.edit + `/${data?.id}`,
            headers: {
                ...Rq_headers,
                Authorization: "Bearer " + token,
            },
        });
        revalidatePath("/input/employee");

        const result: IRs_DeleteEmployee = { status: 200, ...response.data };
        return result;
    } catch (error: any) {
        return {
            status: 500,
            message: "Failed Delete Employee",
            token: null,
        };
    }
}
