import { SERVICE_URL } from "./common.service";

export const ENDPOINTS = {
    auth: {
        login: `${SERVICE_URL}/login`,
    },
    report: {
        list: `${SERVICE_URL}/reports`,
    },
};
