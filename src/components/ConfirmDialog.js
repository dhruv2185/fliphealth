import React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

const ConfirmDialog = (props) => {
    const { title, children, open, setOpen, onConfirm } = props;

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"


        >
            <DialogTitle id="dialog-title">{title}</DialogTitle>
            <DialogContent ><DialogContentText id="dialog-description">{children}</DialogContentText></DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    color='neutral'

                >
                    CANCEL
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}


                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;