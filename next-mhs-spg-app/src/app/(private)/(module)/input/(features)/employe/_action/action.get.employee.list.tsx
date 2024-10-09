'use server';

import { API_GetEmployeeList } from '@/api/features/employee/api.employee.list';

export async function ACT_GetEmployeeList() {
    try {
        const response: any = await API_GetEmployeeList({});
        return response.data;
    } catch (error) {
        return {
            status: 500,
            message: "Failed get employee data",
            data: []
        }
    }
}
