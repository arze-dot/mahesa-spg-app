'use server';

import { API_UploadFile } from '@/api/features/api.upload.file';

export async function ACT_UploadProductImage(data: FormData) {
    try {
        const response = await API_UploadFile((data));
        return response
    } catch (error) {
        return error
    }
}
