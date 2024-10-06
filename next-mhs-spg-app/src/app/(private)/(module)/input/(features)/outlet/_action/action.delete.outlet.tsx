'use server';

import { API_DeleteOutlet, IRq_DeleteOutlet } from '@/api/features/outlet/api.outlet.delete';

export async function ACT_DeleteOutlet(data: IRq_DeleteOutlet) {
    try {
        const response = await API_DeleteOutlet(data);
        return response
    } catch (error) {
        return error
    }
}
