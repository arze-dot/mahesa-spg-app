'use server';

import { API_CreateOutlet, IRq_CreateOutlet } from '@/api/features/outlet/api.outlet.create';

export async function ACT_CreateOutlet(data: IRq_CreateOutlet) {
    try {
        const response = await API_CreateOutlet(data);
        return response
    } catch (error) {
        return error
    }
}
