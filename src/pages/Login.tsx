import { useForm } from 'react-hook-form';
import { loginUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Link, 
    Grid, 
    Paper, 
    Alert 
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAuth } from '../context/useAuthContext';
import { useState } from 'react';
import { User } from '../types/common';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Pick<User, 'email' | 'password'>>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data: Pick<User, 'email' | 'password'>) => {
        try {
            const request = await loginUser(data);
            login(request.data.token);
            navigate('/');
            setError('');
        } catch (error) {
            setError('Invalid credentials, try again...');
            console.error(error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <LockOpenIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" component="h1" sx={{ mt: 1 }}>
                        Login
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email', { required: 'Email required' })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', { required: 'Password required' })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 1 }}
                            >
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Link 
                                component="button" 
                                type="button"
                                onClick={() => navigate('/register')}
                                sx={{ color: 'text.secondary' }}
                            >
                                Dont you have an account? Sign up here!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
