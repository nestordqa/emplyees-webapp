import { User } from '../types/common';
import api from './api';

//Login request
export const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
    try {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;   
    } catch (error) {
        console.error(error);
    }
};

//Register a new user
export const registerUser = async (userData: User) => {
    try {
        const response = await api.post('/api/auth/register', userData);
        return response.data;   
    } catch (error) {
        console.error(error);
    }
};

//Logout flow
export const logoutUser = async () => {
    try {
        await api.post('/api/auth/logout');
        localStorage.removeItem('token');        
    } catch (error) {
        console.error(error);
    }
};

