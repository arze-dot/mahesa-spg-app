'use server';

import { API_EditAsset, IRq_EditAsset } from "@/api/features/asset/api.asset.update";


export async function ACT_EditAsset(data: IRq_EditAsset) {
    try {
        const response = await API_EditAsset(data);
        return response
    } catch (error) {
        return error
    }
}
