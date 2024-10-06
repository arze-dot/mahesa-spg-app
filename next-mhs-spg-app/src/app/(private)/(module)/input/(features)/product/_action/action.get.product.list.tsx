'use server';

import { API_GetProductList, IRs_GetProductList } from '@/api/features/api.product.list';

export async function ACT_GetProductList() {
    try {
        const response: IRs_GetProductList = await API_GetProductList({});
        return response.data;
    } catch (error) {
        return {
            status: 500,
            message: "Failed get product data",
            data: []
        }
    }
}
