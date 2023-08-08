import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import PatientBox from './PatientBox';
import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER_URL);
const doctorContract = new web3.eth.Contract(process.env.DOCTOR_CONTRACT_ABI, process.env.DOCTOR_CONTRACT_ADDRESS);

const ViewPatients = () => {

    const getPatients = async () => {
        const result = await doctorContract.methods.getPatients().call({
            from: "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18",
            gas: 3000000
        })
        console.log(result);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}></Box></Container>
        </>
    );
}

export default ViewPatients;
