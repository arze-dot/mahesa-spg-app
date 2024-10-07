import { z } from 'zod';

export const SchemaCreateEmployee = z.object({
    name: z
        .string()
        .min(1, 'Nama outlet tidak boleh kosong')
        .refine((value) => value?.trim() === value, {
            message: 'Nama outlet tidak boleh diawali atau diakhiri dengan spasi',
        }),
    address: z
        .string(),
    latitude: z
        .string()
        .min(1, 'latitude tidak boleh kosong'),
    longitude: z
        .string()
        .min(1, 'longitude tidak boleh kosong'),
    image: z.string(),
    area_code: z.string().min(1, 'Area Code tidak boleh kosong'),
    created_by: z.number(),
    updated_by: z.number(),
    user_id: z.number(),
});

