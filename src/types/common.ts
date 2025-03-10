export interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    job_position: string;
    birthdate: Date;
}
  
export interface Position {
    name: string;
}
  
export interface User {
    email: string;
    password: string;
    confirmPassword?: string;
    firstName: string;
    lastName: string;
}
  