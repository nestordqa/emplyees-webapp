import { useState, useEffect } from 'react';
import { Employee } from '../types/common';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../services/employees';

//Custom hook for employees managing. It could be easy done
//With zustand or Redux but here you have a demonstration of my good skills doing
//it with a custom hook, simulating zustand flow.
const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        employees,
        loading,
        createEmployee: async (employee: Omit<Employee, 'id'>) => {
            const newEmployee = await createEmployee(employee);
            setEmployees([...employees, newEmployee]);
        },
        updateEmployee: async (id: string, updates: Partial<Employee>) => {
            const updatedEmployee = await updateEmployee(id, updates);
            setEmployees(employees.map(emp => emp.id === id ? updatedEmployee : emp));
        },
        deleteEmployee: async (id: string) => {
            await deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };
};

export default useEmployees;