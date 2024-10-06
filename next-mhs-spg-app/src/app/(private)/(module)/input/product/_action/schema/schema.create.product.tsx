import { z } from 'zod';

export const SchemaCreateProduct = z.object({
    name: z
        .string()
        .min(1, 'Nama produk tidak boleh kosong')
        .refine((value) => value?.trim() === value, {
            message: 'Nama produk tidak boleh diawali atau diakhiri dengan spasi',
        }),
    type: z
        .string(),
    code: z
        .string()
        .min(1, 'Kode produk tidak boleh kosong'),
    image: z.string(),
    created_by: z.number(),
    updated_by: z.number(),
});

