import React from 'react';
import RecordCard from './RecordCard';
import { Container, CssBaseline } from '@mui/material';
import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER_URL);
const doctorContract = new web3.eth.Contract(process.env.DOCTOR_CONTRACT_ABI, process.env.DOCTOR_CONTRACT_ADDRESS);

const ViewRecords = () => {

    const getRecords = async () => {
        const res = await doctorContract.methods.getRecordsByUser().call({
            from: "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18",
            gas: 3000000
        });
        console.log(res);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
            </div></Container>
        </>
    );
}

export default ViewRecords;
