import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserAccessBox from './UserAccessBox';
import DiagAccessBox from './DiagAccessBox';
import { getAllDoctorsForAPatient, getDiagnosticForPatient } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';


const ManageAccess = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [doctors, setDoctors] = useState([]);
    const [diagnostics, setDiagnostics] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const fetchDoctors = async () => {
        const res = await getAllDoctorsForAPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getAllDoctorsForAPatient('loggedInAddress')
        setDoctors(res);
        console.log(doctors);
    }
    const fetchDiagnostics = async () => {
        const res = await getDiagnosticForPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getDiagnosticForPatient('accountAddress')
        // will return an array of objects and count of diagnostics sent
        setDiagnostics(res);
        console.log(diagnostics);
    }
    useEffect(() => {


        fetchDoctors();
        fetchDiagnostics();
    }, [refresh])




    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <center><h3>DOCTORS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox setRefresh={setRefresh} refresh={refresh} /></Box>
                <center><h3>DIAGNOSTICS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DiagAccessBox setRefresh={setRefresh} refresh={refresh} /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
