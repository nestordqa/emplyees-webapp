import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { Logout } from '@mui/icons-material';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Verifies if current is in login
    const isHomePage = location.pathname === '/';

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1em' }}>
                    Employee Management
                </Typography>
                {user && !isHomePage &&
                    <>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            {user.email}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}/>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
