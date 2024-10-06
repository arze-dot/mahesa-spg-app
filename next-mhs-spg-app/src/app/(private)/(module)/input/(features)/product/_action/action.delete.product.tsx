'use server';

import { API_DeleteProduct, IRq_DeleteProduct } from '@/api/features/product/api.product.delete';

export async function ACT_DeleteProduct(data: IRq_DeleteProduct) {
    try {
        const response = await API_DeleteProduct(data);
        return response
    } catch (error) {
        return error
    }
}
