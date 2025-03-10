import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        navigate('/');
    }
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Employee Management
                </Typography>
                {user ? (
                    <>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            {user.email}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
