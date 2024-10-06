import { z } from 'zod';

export const SchemaEditAsset = z.object({
    id: z.string(),
    name: z
        .string()
        .min(1, 'Nama asset tidak boleh kosong')
        .refine((value) => value?.trim() === value, {
            message: 'Nama asset tidak boleh diawali atau diakhiri dengan spasi',
        }),
    code: z.string().min(1, 'Kode asset tidak boleh kosong'),
    image: z.string(),
    date_in: z.string().min(1, 'Tangal masuk tidak boleh kosong'),
    date_expired: z.string().min(1, 'Tangal masuk asset tidak boleh kosong'),
    created_by: z.number(),
    updated_by: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

