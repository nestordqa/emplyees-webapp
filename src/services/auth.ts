import { User } from '../types/common';
import api from './api';

export const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
    try {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;   
    } catch (error) {
        console.error(error);
    }
};

export const registerUser = async (userData: User) => {
    try {
        const response = await api.post('/api/auth/register', userData);
        return response.data;   
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = async () => {
    try {
        await api.post('/api/auth/logout');
        localStorage.removeItem('token');        
    } catch (error) {
        console.error(error);
    }
};

