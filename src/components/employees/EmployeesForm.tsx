import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import {
    DatePicker,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  
import { Employee } from '../../types/common';
import { getPositions } from '../../services/employees';

interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null; 
    onSubmit: (data: Employee) => void;
    error: any
}

// Employee form for creating or editing
const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, onClose, employee, onSubmit, error }) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Employee>();
    const [positions, setPositions] = useState<string[] | null>([]);

    // Get positions from API
    useEffect(() => {
        const fetchPositions = async () => {
            const data = await getPositions();
            setPositions(data);
        };
        fetchPositions();
    }, []);

    useEffect(() => {
    }, [error]);

    useEffect(() => {
        // If employee is received, the employee is editing
        if (employee) {
            setValue('firstName', employee.firstName);
            setValue('lastName', employee.lastName);
            setValue('job_position', employee.job_position);
            setValue('birthdate', dayjs(employee.birthdate));
        } else {
            reset(); 
        }
    }, [employee, setValue, reset]);

    const handleFormSubmit = (data: Employee) => {
        onSubmit(data);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{employee ? 'Edit Employee' : 'Create Employee'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            {...register('firstName', { required: 'Required field' })}
                            error={!!errors.firstName}
                        />
                        {errors.firstName && (
                            <FormHelperText error>{errors.firstName.message}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Lastname"
                            fullWidth
                            {...register('lastName', { required: 'Required field' })}
                            error={!!errors.lastName}
                        />
                        {errors.lastName && (
                            <FormHelperText error>{errors.lastName.message}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Job Position"
                            fullWidth
                            {...register('job_position', { required: 'Select a job position' })}
                            error={!!errors.job_position}
                        >
                            {positions?.map((position, index) => (
                                <MenuItem key={index} value={position} sx={{
                                    height: '1.5em',
                                    color: '#000'
                                }}>
                                    {position}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.job_position && (
                            <FormHelperText error>{errors.job_position.message}</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birthdate"
                                value={employee ? dayjs(employee.birthdate) : null}
                                onChange={(date) => setValue('birthdate', date)}
                                renderInput={(props) => <TextField {...props} fullWidth />}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </DialogContent>
            {error && <FormHelperText error>{error}</FormHelperText>}
            <DialogActions sx={{ p: 3 }}>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(handleFormSubmit)}>
                    {employee ? 'Save changes' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmployeeForm;
