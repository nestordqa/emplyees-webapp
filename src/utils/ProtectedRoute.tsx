import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
