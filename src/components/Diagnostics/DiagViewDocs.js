import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import RecordCard from '../Patient/RecordCard';
import { getHealthRecordsOfPatient } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const DiagViewDocs = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { open, setOpen, patientAddress } = props;
    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpen(false);
    }
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '100vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflow: 'auto',
        ...(fullscreen && {
            height: '100vh',
            width: '100vw',
        })

    };

    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getRecords = async () => {
            // const res = await getHealthRecordsOfPatient("accountAddress");
            setIsLoading(true);
            console.log(patientAddress)
            // const res = await getHealthRecordsOfPatient(patientAddress);
            // if (res.message) {
            //     enqueueSnackbar(res.message, { variant: "error" });
            // }
            // else {
            //     setRecords(res);
            //     console.log(res);
            // }
            setIsLoading(false);

        }
        getRecords();
    }, [patientAddress, refresh]);

    return (
        <>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"><Box sx={{ ...style }} className={"flex"}><IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                ><Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <CloseIcon />
                </IconButton>
                    <h2 id="parent-modal-title">Kishun Patil's Records</h2>
                    <p id="parent-modal-description">
                        Here, you can access Patient's Records.
                    </p><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >

                    </div></Container></Box></Modal>
        </>
    );
}

export default DiagViewDocs;
