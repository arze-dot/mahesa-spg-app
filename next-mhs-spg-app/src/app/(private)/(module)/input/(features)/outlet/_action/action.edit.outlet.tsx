'use server';

import { API_EditOutlet, IRq_EditOutlet } from '@/api/features/outlet/api.outlet.update';

export async function ACT_EditOutlet(data: IRq_EditOutlet) {
    try {
        const response = await API_EditOutlet(data);
        return response
    } catch (error) {
        return error
    }
}
