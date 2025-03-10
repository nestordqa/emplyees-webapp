import { useState, useEffect } from 'react';
import { Employee } from '../types/common';
import useEmployees from '../hooks/useEmployees';
import {
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { Edit, Delete, Search, Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { getPositions } from '../services/employees';

const EmployeeList = () => {
    const { employees, deleteEmployee, updateEmployee } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [positions, setPositions] = useState<any[]>([]);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<Employee>();

    useEffect(() => {
        const fetchPositions = async () => {
            const data = await getPositions();
            setPositions(data);
        };
        fetchPositions();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            setValue('firstName', selectedEmployee.firstName);
            setValue('lastName', selectedEmployee.lastName);
            setValue('job_position', selectedEmployee.job_position);
            setValue('birthdate', selectedEmployee.birthdate);
        }
    }, [selectedEmployee, setValue]);

    const handleUpdate = async (data: Employee) => {
        if (selectedEmployee) {
            await updateEmployee(selectedEmployee.id, data);
            setSelectedEmployee(null);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    Lista de Empleados
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar empleados..."
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3 }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Grid container spacing={3}>
                    {employees.filter(emp => 
                        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((employee, index) => (
                        <Grid item xs={12} md={6} key={employee.id}  key={index}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                                        {employee.firstName} {employee.lastName}
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        Puesto: {employee.job_position}
                                    </Typography>
                                    
                                    <Typography variant="caption">
                                        Nacimiento: {dayjs(employee.birthdate).format('DD/MM/YYYY')}
                                    </Typography>
                                </CardContent>
                                
                                <CardActions>
                                    <IconButton 
                                        color="primary" 
                                        onClick={() => setSelectedEmployee(employee)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton 
                                        color="error" 
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Dialog 
                    open={!!selectedEmployee} 
                    onClose={() => setSelectedEmployee(null)}
                    fullWidth
                    maxWidth="sm"
                >
                <DialogTitle>
                    <Edit sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Editar Empleado
                </DialogTitle>
                
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nombre"
                                fullWidth
                                {...register('firstName', { required: 'Campo requerido' })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Apellido"
                                fullWidth
                                {...register('lastName', { required: 'Campo requerido' })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Puesto de trabajo"
                                fullWidth
                                {...register('job_position', { required: 'Seleccione un puesto' })}
                                error={!!errors.job_position}
                                helperText={errors.job_position?.message}
                            >
                                {positions.map((position) => (
                                <MenuItem key={position.id} value={position.name}>
                                    {position.name}
                                </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                        <DatePicker
                            label="Fecha de nacimiento"
                            value={dayjs(selectedEmployee?.birthdate)}
                            onChange={(date) => setValue('birthdate', date?.toDate())}
                            slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!errors.birthdate,
                                helperText: errors.birthdate?.message
                            }
                            }}
                        />
                        </Grid>
                    </Grid>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                    <Button 
                        onClick={() => setSelectedEmployee(null)}
                        color="inherit"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained"
                        color="primary"
                    >
                        Guardar Cambios
                    </Button>
                    </DialogActions>
                </form>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default EmployeeList;
