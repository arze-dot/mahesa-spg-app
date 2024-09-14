import { Cookies } from 'react-cookie';
import ACT_LOGIN from '../api/login';

const cookies = new Cookies();

export const login = async (email: string, password: string) => {
    try {
        const result = await ACT_LOGIN(email, password);
        if (result.data.status) {
            const token = result.data.token;
            cookies.set('auth', token, { path: '/', maxAge: 86400 });
            return true
        }
        return false
    } catch (err) {
        console.error('Login failed:', err);
        return false
    }
    return false
};

export const logout = () => {
    cookies.remove('auth', { path: '/' });
};

export const isAuthenticated = () => {
    return cookies.get('auth');
};
