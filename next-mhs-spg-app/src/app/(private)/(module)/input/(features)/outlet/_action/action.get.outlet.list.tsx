'use server';

import { API_GetOutletList } from '@/api/features/outlet/api.outlet.list';

export async function ACT_GetOutletList() {
    try {
        const response: any = await API_GetOutletList({});
        return response.data;
    } catch (error) {
        return {
            status: 500,
            message: "Failed get outlet data",
            data: []
        }
    }
}
