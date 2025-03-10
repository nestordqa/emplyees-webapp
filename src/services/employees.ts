import { Employee, Position } from '../types/common';
import api from './api';

//Get all employees
export const getEmployees = async (): Promise<Employee[]> => {
    try {
        const response = await api.get('/api/employees');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw new Error('Could not fetch employees. Please try again later.');
    }
};

//Get a employee by id
export const getEmployeeById = async (id: string): Promise<Employee> => {
    try {
        const response = await api.get(`/api/employees/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching employee with ID ${id}:`, error);
        throw new Error(`Could not fetch employee with ID ${id}. Please try again later.`);
    }
};

//Create an employee
export const createEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    try {
        const response = await api.post('/api/employees', employeeData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw new Error('Could not create employee. Please try again later.');
    }
};

//Update an employee
export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    try {
        const response = await api.patch(`/api/employees/${id}`, updates);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating employee with ID ${id}:`, error);
        throw new Error(`Could not update employee with ID ${id}. Please try again later.`);
    }
};

//Delete an employee
export const deleteEmployee = async (id: string): Promise<void> => {
    try {
        await api.delete(`/api/employees/${id}`);
    } catch (error) {
        console.error(`Error deleting employee with ID ${id}:`, error);
        throw new Error(`Could not delete employee with ID ${id}. Please try again later.`);
    }
};

// Get all positions
export const getPositions = async (): Promise<Position[]> => {
    try {
        const response = await api.get('/api/employees/positions');
        return response.data;
    } catch (error) {
        console.error('Error fetching positions:', error);
        throw new Error('Could not fetch positions. Please try again later.');
    }
};
