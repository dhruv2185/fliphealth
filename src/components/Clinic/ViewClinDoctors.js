import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import ClinDocBox from './ClinDocBox';

const ViewClinDoctors = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><ClinDocBox /><ClinDocBox /><ClinDocBox /></Box>
            </Container>
        </>
    );
}

export default ViewClinDoctors;
