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
            try {
                const newEmployee = await createEmployee(employee);
                if (newEmployee && newEmployee.status && newEmployee.status !== 201) {
                    return newEmployee;
                } else {
                    setEmployees([...employees, newEmployee]);
                }
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        updateEmployee: async (id: string, updates: Partial<Employee>) => {
            try {
                const updatedEmployee = await updateEmployee(id, updates);
                setEmployees(employees.map(emp => emp._id === id ? updatedEmployee : emp));   
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        deleteEmployee: async (id: string) => {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp._id !== id));   
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    };
};

export default useEmployees;