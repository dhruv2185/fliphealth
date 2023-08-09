import React, { useState } from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';


import { useSelector, useDispatch } from 'react-redux';
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
        width: '50vw',
        height: '60vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        ...(fullscreen && {
            height: '100vh',
            width: '100vw',
        })

    };


    return <><Modal open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"><Box sx={{ ...style }} className={"flex"}>
            <h2 id="parent-modal-title">Kishun Patil's Records</h2>
            <p id="parent-modal-description">
                Here, you can access Patient's Records.
            </p></Box></Modal></>
}

export default ViewPatDocs;