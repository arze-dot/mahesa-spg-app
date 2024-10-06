'use server';

import { IRq_DeleteAsset } from '@/api/features/asset/api.asset.delete';
import { API_DetailAsset } from '@/api/features/asset/api.asset.detail';

export async function ACT_DetailAsset(data: IRq_DeleteAsset) {
    try {
        const response = await API_DetailAsset(data);
        return response
    } catch (error) {
        return error
    }
}
