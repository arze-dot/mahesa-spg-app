'use server';

import { API_CreateEmployee, IRq_CreateEmployee } from '@/api/features/employee/api.employee.create';

export async function ACT_CreateEmployee(data: IRq_CreateEmployee) {
    try {
        const response = await API_CreateEmployee(data);
        return response
    } catch (error) {
        return error
    }
}
