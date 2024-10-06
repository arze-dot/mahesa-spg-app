'use server';

import { API_DeleteAsset, IRq_DeleteAsset } from '@/api/features/asset/api.asset.delete';

export async function ACT_DeleteAsset(data: IRq_DeleteAsset) {
    try {
        const response = await API_DeleteAsset(data);
        return response
    } catch (error) {
        return error
    }
}
