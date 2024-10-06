'use server';

import { API_CreateProduct, IRq_CreateProduct } from '@/api/features/api.product.create';

export async function ACT_EditProduct(data: IRq_CreateProduct) {
    try {
        const response = await API_CreateProduct(data);
        return response
    } catch (error) {
        return error
    }
}
