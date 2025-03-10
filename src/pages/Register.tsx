import { useForm } from 'react-hook-form';
import { registerUser } from '../services/auth';
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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react';
import { User } from '../types/common';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<Omit<User, 'id'>>();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: Omit<User, 'id'>) => {
        setLoading(true);
        try {
            await registerUser(data);
            navigate('/');
        } catch (error) {
            setError('There was an error, try again...');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <HowToRegIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h5" component="h1" sx={{ mt: 1 }}>
                        Sign Up
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}

                        {/* FIRSTNAME */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Firtname"
                                type="text"
                                {...register('firstName', { 
                                    required: 'Firstname required',
                                    pattern: {
                                        value: /^[A-Z][a-z]*$/i,
                                        message: 'Invalid firstname, must be just text characters'
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'You must enter at least 4 characters'
                                    },
                                })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>

                        {/* LASTNAME */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Lastname"
                                type="text"
                                {...register('lastName', { 
                                    required: 'Lastname required',
                                    pattern: {
                                        value: /^[A-Z][a-z]*$/i,
                                        message: 'Invalid lastname, must be just text characters'
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'You must enter at least 4 characters'
                                    },
                                })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>

                        {/* EMAIL */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                {...register('email', { 
                                    required: 'Email required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email'
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        {/* PASSWORD */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', { 
                                    required: 'Password required',
                                    minLength: {
                                        value: 10,
                                        message: 'Mínimo 10 caracteres'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/i,
                                        message: 'Invalid email'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        {/* CONFIRM PASSWORD */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm password"
                                type="password"
                                {...register('confirmPassword', {
                                    validate: value => 
                                        value === watch('password') || 'Both passwords does not match'
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                        
                        {/* SIGN UP BUTTON */}
                        <Grid item xs={12}>
                            <Button
                                loading={loading}
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 1 }}
                            >
                                Sign up
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Link 
                                component="button" 
                                type="button"
                                onClick={() => navigate('/')}
                                sx={{ color: 'text.secondary', textDecoration: 'none' }}
                            >
                                Already have an account? Login here!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Register;