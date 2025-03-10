import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    content?: string;
}

//Delete confirm dialog  
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm, title = 'Confirm', content = 'Are you sure you want to delete this employee?' }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
  