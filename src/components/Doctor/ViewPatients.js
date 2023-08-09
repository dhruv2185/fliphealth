import React, { useState } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import PatientBox from './PatientBox';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
import { getPatientsForADoctor } from '../../Utils/SmartContractUtils';

const ViewPatients = () => {

    const [patients, setPatients] = useState([])
    let doctorAddress;
    const fetchPatients = async (doctorAddress) => {
        const res = await getPatientsForADoctor("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        setPatients(res);
    }
    fetchPatients(doctorAddress);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}></Box></Container>
        </>
    );
}

export default ViewPatients;
