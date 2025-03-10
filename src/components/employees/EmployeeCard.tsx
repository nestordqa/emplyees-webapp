import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { Edit, Delete, Person } from '@mui/icons-material';
import dayjs from 'dayjs';
import { Employee } from '../../types/common';

interface EmployeeCardProps {
    employee: Employee,
    onEdit: VoidFunction,
    onDelete: VoidFunction
}

//Employee card for employess list
const EmployeeCard = ({ employee, onEdit, onDelete }: EmployeeCardProps) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {employee.firstName} {employee.lastName}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph sx={{ textTransform: 'capitalize' }}>
                    Job Position: {employee.job_position}
                </Typography>

                <Typography variant="caption" color="textSecondary">
                    Birthdate: {dayjs(employee.birthdate).format('DD/MM/YYYY')}
                </Typography>
            </CardContent>
            
            {/* Buttons for edit and delete the user */}
            <CardActions>
                <IconButton color="primary" onClick={onEdit}>
                    <Edit />
                </IconButton>
                <IconButton color="error" onClick={onDelete}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default EmployeeCard;
