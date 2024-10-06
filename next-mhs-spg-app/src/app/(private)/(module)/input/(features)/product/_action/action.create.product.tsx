'use server';

import { API_CreateProduct, IRq_CreateProduct } from '@/api/features/product/api.product.create';

export async function ACT_CreateProduct(data: IRq_CreateProduct) {
    try {
        const response = await API_CreateProduct(data);
        return response
    } catch (error) {
        return error
    }
}
