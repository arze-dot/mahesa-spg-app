'use server';

import { API_DetailOutlet, IRq_DetailOutlet } from '@/api/features/outlet/api.outlet.detail';

export async function ACT_DetailOutlet(data: IRq_DetailOutlet) {
    try {
        const response = await API_DetailOutlet(data);
        return response
    } catch (error) {
        return error
    }
}
