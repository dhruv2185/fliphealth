import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import DoctorAccessBox from './DoctorAccessBox';

const ViewDoctors = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /></Box>
            </Container>
        </>
    );
}

export default ViewDoctors;
