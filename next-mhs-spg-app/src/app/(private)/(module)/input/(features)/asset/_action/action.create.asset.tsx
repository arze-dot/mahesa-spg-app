'use server';

import { API_CreateAsset, IRq_CreateAsset } from '@/api/features/asset/api.asset.create';

export async function ACT_CreateAsset(data: IRq_CreateAsset) {
    try {
        const response = await API_CreateAsset(data);
        return response
    } catch (error) {
        return error
    }
}
