import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import DiagPatientBox from './DiagPatientBox';

const DiagPatients = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DiagPatientBox /></Box></Container>
        </>
    );
}

export default DiagPatients;
