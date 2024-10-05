import { z } from 'zod';

export const FormLoginSchema = z.object({
    username: z
        .string()
        .min(1, 'Username tidak boleh kosong')
        .refine((value) => value?.trim() === value, {
            message: 'Username tidak boleh diawali atau diakhiri dengan spasi',
        }),
    password: z
        .string()
        .min(1, 'Password tidak boleh kosong')
        .refine((value) => value?.trim() === value, {
            message: 'Password tidak boleh diawali atau diakhiri dengan spasi',
        }),
});
