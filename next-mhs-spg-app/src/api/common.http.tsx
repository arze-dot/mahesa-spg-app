export interface IRs_Common<T> {
    code: number;
    responseCode: string;
    responseDesc: string;
    responseData: T | null;
}

export const CommonError: IRs_Common<undefined> = {
    code: 500,
    responseCode: '01',
    responseDesc: 'Internal Server Error',
    responseData: null,
};
