import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import PatientBox from './PatientBox';
const ViewPatients = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}></Box></Container>
        </>
    );
}

export default ViewPatients;
