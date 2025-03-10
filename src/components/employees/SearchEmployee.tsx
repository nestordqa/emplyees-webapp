import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';

interface EmployeeSearchProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

//Employees navbar
const EmployeeSearch = ({ searchTerm, setSearchTerm }: EmployeeSearchProps) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search employees..."
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
            sx={{ mb: 3 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default EmployeeSearch;
