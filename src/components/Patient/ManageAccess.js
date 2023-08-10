import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import UserAccessBox from './UserAccessBox';
import DiagAccessBox from './DiagAccessBox';
import { getDiagnosticForPatient } from '../../Utils/SmartContractUtils';


const ManageAccess = () => {

    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        const res = await getAllDoctorsForAPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getAllDoctorsForAPatient('loggedInAddress')
        // will return an array of objects and count of doctors sent
        setDoctors(res);
        console.log(doctors);
    }

    const [diagnostics, setDiagnostics] = useState([]);

    const fetchDiagnostics = async () => {
        const res = await getDiagnosticForPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getDiagnosticForPatient('accountAddress')
        // will return an array of objects and count of diagnostics sent
        setDiagnostics(res);
        console.log(diagnostics);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <center><h3>DOCTORS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /></Box>
                <center><h3>DIAGNOSTICS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DiagAccessBox /><DiagAccessBox /><DiagAccessBox /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
