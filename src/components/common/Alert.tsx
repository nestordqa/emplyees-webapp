import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AlertMessageProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info'; // Tipos de alerta
}

const AlertMessage: React.FC<AlertMessageProps> = ({ open, onClose, message, severity }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertMessage;
