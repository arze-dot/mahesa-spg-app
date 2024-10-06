import { SERVICE_URL } from "./common.service";

export const ENDPOINTS = {
    auth: {
        login: `${SERVICE_URL}/login`,
    },
    upload: `${SERVICE_URL}/upload`,
    report: {
        list: `${SERVICE_URL}/reports`,
    },
    product: {
        list: `${SERVICE_URL}/products`,
        create: `${SERVICE_URL}/products`,
        delete: `${SERVICE_URL}/products`,
    },
};
