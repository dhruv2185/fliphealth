import React, { useState } from 'react';
import { Container, CssBaseline, IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';

import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import RecordCard from '../Patient/RecordCard';
const ViewPatDocs = (props) => {
    const { open, setOpen } = props;
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
            <h2 id="parent-modal-title">Kishun Patil's Records</h2>
            <p id="parent-modal-description">
                Here, you can access Patient's Records.
            </p><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
            </div></Container></Box></Modal></>
}

export default ViewPatDocs;