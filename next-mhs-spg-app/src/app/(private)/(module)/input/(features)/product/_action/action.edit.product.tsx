'use server';

import { API_CreateProduct, IRq_CreateProduct } from '@/api/features/product/api.product.create';
import { API_EditProduct, IRq_EditProduct } from '@/api/features/product/api.product.update';

export async function ACT_EditProduct(data: IRq_EditProduct) {
    try {
        const response = await API_EditProduct(data);
        return response
    } catch (error) {
        return error
    }
}
