import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const login = () => {
    cookies.set('auth', 'true', { path: '/', maxAge: 86400 }); // Expires in 1 day
};

export const logout = () => {
    cookies.remove('auth', { path: '/' });
};

export const isAuthenticated = () => {
    return cookies.get('auth');
};
