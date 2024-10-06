'use server';

import { API_DetailProduct, IRq_DetailProduct } from '@/api/features/api.product.detail';

export async function ACT_DetailProduct(data: IRq_DetailProduct) {
    try {
        const response = await API_DetailProduct(data);
        return response
    } catch (error) {
        return error
    }
}
