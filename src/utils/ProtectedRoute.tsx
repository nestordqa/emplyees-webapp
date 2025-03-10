import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const { user } = useAuth();
    useEffect(() => {}, [user])
    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
