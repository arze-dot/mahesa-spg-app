'use server';

import { API_GetReportList, IRs_GetReportList } from '@/api/features/api.report.list';

export async function ACT_GetReportList() {
    try {
        const response: IRs_GetReportList = await API_GetReportList({});
        return response.data;
    } catch (error) {
        return {
            status: 500,
            message: "Failed get reports data",
            data: []
        }
    }
}
