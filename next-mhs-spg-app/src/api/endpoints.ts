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
        edit: `${SERVICE_URL}/products`,
    },
    asset: {
        list: `${SERVICE_URL}/assets`,
        create: `${SERVICE_URL}/assets`,
        delete: `${SERVICE_URL}/assets`,
        edit: `${SERVICE_URL}/assets`,
    },
    outlet: {
        list: `${SERVICE_URL}/outlets`,
        create: `${SERVICE_URL}/outlets`,
        delete: `${SERVICE_URL}/outlets`,
        edit: `${SERVICE_URL}/outlets`,
    },
};
