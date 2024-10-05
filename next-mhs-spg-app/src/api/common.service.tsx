const locking = process.env.ENVIRONMENT_LEVEL === 'LOCK';
const endpoint = process.env.apiUrl;

export const SERVICE_URL = locking ? 'lock_url' : endpoint;
