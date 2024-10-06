'use server';

import { API_GetAssetList } from '@/api/features/asset/api.asset.list';

export async function ACT_GetAssetList() {
    try {
        const response: any = await API_GetAssetList({});
        return response.data;
    } catch (error) {
        return {
            status: 500,
            message: "Failed get assets data",
            data: []
        }
    }
}
