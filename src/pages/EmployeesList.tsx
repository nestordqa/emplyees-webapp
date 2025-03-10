import { useState } from 'react';
import { Container, Paper, Grid, Typography, Button, Pagination } from '@mui/material';
import { Add } from '@mui/icons-material';
import useEmployees from '../hooks/useEmployees';
import EmployeeForm from '../components/employees/EmployeesForm';
import ConfirmDialog from '../components/employees/EmployeeDelete';
import EmployeeSearch from '../components/employees/SearchEmployee';
import EmployeeCard from '../components/employees/EmployeeCard';
import { Employee } from '../types/common';
import AlertMessage from '../components/common/Alert';

// Employees list page
const EmployeeList = () => {
    const { employees, deleteEmployee, updateEmployee, createEmployee } = useEmployees();
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of employees

    //Handle alert close
    const handleAlertClose = () => {
        setAlertOpen(false); // Cierra la alerta
        setError(''); // Resetea el mensaje de error
    };

    // Show create employee modal
    const handleCreate = async (data: Employee) => {
        const newEmp = await createEmployee(data);
        if (newEmp && newEmp.status && newEmp.status !== 201) {
            setError(newEmp?.response?.data?.error);
            setAlertOpen(true);
            return;
        }
        
        setIsCreateOpen(false);
    };

    // Show edit employee modal
    const handleEdit = (data: Employee) => {
        if (selectedEmployee) {
            updateEmployee(selectedEmployee._id, data);
        }
        setSelectedEmployee(null);
    };

    // Show delete employee dialog
    const handleDelete = (id: string) => {
        setEmployeeToDelete(id);
        setIsConfirmOpen(true);
    };
    
    // Deletes the employee selected
    const confirmDelete = () => {
        if (employeeToDelete) {
            deleteEmployee(employeeToDelete);
        }
        setIsConfirmOpen(false);
        setEmployeeToDelete(null);
    };

    // Get the current employees
    const filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage); // Total of pages
    const currentEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Current employees per page

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                {/* Header list */}
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                        Employees List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setIsCreateOpen(true)}
                    >
                        Create Employee
                    </Button>
                </Grid>

                <EmployeeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <Grid container spacing={3}>
                    {currentEmployees && currentEmployees.length > 0 ? currentEmployees.map((employee) => (
                        <Grid item xs={12} md={6} key={employee._id}>
                            <EmployeeCard
                                employee={employee}
                                onEdit={() => setSelectedEmployee(employee)}
                                onDelete={() => handleDelete(employee._id)}
                            />
                        </Grid>
                    ))
                    :
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" component="h1" sx={{ fontWeight: 600, fontSize: '2em', textAlign: 'center' }}>
                            There are not employees yet
                        </Typography>      
                    </Grid>          
                }
                </Grid>

                {/* Paginación */}
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    sx={{ mt: 3 }} // Margen superior para separación visual
                />

                <EmployeeForm
                    open={!!selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    employee={selectedEmployee}
                    onSubmit={handleEdit}
                />

                <EmployeeForm
                    open={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    onSubmit={handleCreate}
                    employee={null}
                />

                <AlertMessage 
                    open={alertOpen}
                    onClose={handleAlertClose}
                    message={error}
                    severity="error" 
                />

                <ConfirmDialog
                    open={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete employee"
                    content="Are you sure you want to delete this employee?"
                />
            </Paper>
        </Container>
    );
};

export default EmployeeList;
