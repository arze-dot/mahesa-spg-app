'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { FormLoginSchema } from './schema/schema.login';
import { API_Login, IRs_Login } from '@/api/auth/api.login';

type IRq_Login = z.infer<typeof FormLoginSchema>;

export async function ACT_Login(data: IRq_Login) {
    const result = FormLoginSchema.safeParse(data);
    const { username, password } = FormLoginSchema.parse(data);

    if (result.success) {
        try {
            const response: IRs_Login = await API_Login({
                username: username,
                password: password,
            });

            const token = response?.token;
            if (token) {
                cookies().set({
                    name: 'token',
                    value: token,
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60,
                    sameSite: 'strict',
                    path: '/',
                });
            }

            return response;
        } catch (error) {
            return {
                status: false
            }
        }
    }
}
