import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import UserAccessBox from './UserAccessBox';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
import DiagAccessBox from './DiagAccessBox';
// const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
// const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

const ManageAccess = () => {

    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        const res = await getAllDoctorsForAPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getAllDoctorsForAPatient('loggedInAddress')
        // will return an array of objects and count of doctors sent
        setDoctors(res);
        console.log(doctors);
    }

    // fetchDoctors();

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
