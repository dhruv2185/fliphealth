import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { getRecordsOfUser } from '../../Utils/SmartContractUtils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';

import CloseIcon from '@mui/icons-material/Close';


import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';
import DiagRecordCard from '../Diagnostics/DiagRecordCard';
const ViewPatDocs = (props) => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const res = await getRecordsOfUser(patientAddress, accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setRecords(res);
                console.log(res);
            }
            setIsLoading(false);
        }
        getRecords();
    }, [patientAddress, accountAddress]);

    //     // const res = await getRecordsOfUser(patientAddress, doctorAddress)
    //     console.log(res[0].date);
    //     setRecords(records);
    // }
    // getRecords();


    return <><Modal open={open}
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
        >
            <CloseIcon />
        </IconButton>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <h2 id="parent-modal-title">Patient's Records</h2>
            <p id="parent-modal-description">
                Here, you can access Patient's Records.
            </p><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                {records.length === 0 && <div style={{ height: "70vh", }}><h4 style={{ margin: "30vh 30vw" }}>No Records Found</h4></div>}
                {records.length !== 0 && records.map((record, index) => {
                    return <DiagRecordCard key={index} data={record} />
                })}
            </div></Container></Box></Modal></>
}

export default ViewPatDocs;