import { z } from 'zod';

const SchemaOutlet = {
    name: z.string(),
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    code: z.string(),
    area_code: z.string().nullable(),
    created_by: z.number().nullable(),
    updated_by: z.number().nullable(),
    user_id: z.number().nullable(),
    image: z.string(),
}

const SchemaAsset = {
    id: z.number(),
    outlet_id: z.number().nullable(),
    name: z.string(),
    code: z.string(),
    date_in: z.string(),
    date_expired: z.string(),
    image: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    created_by: z.number(),
    updated_by: z.number(),
}

export const SchemaCreateEmployee = z.object({
    full_name: z.string(),
    nik: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    birth_date: z.string(),
    employee_status: z.string(),
    gender: z.string(),
    areaCode: z.string(),
    role: z.string(),
    username: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    outlets: z.array(z.object(SchemaOutlet)),
    assets: z.array(z.object(SchemaAsset)),
});

