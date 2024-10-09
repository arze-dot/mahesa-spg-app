'use server';

import { API_DeleteEmployee, IRq_DeleteEmployee } from '@/api/features/employee/api.employee.delete';

export async function ACT_DetailEmployee(data: IRq_DeleteEmployee) {
    try {
        const response = await API_DeleteEmployee(data);
        return response
    } catch (error) {
        return error
    }
}
