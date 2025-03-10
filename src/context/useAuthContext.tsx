import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { logoutUser } from '../services/auth';

interface AuthContextType {
    user: { id: string; email: string } | null;
    login: (token: string) => void;
    logout: VoidFunction
}

const AuthContext = createContext<AuthContextType>(null!);

//Context for user logged
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    //State for user data
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            //If token exists, set it into the local storage
            const decoded = jwtDecode<{ id: string; email: string }>(token);
            setUser(decoded);
        }
    }, []);

    //Login flow
    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode<{ id: string; email: string }>(token);
        setUser(decoded);
    };

    //Logout flow
    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
