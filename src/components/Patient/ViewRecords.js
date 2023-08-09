import React from 'react';
import RecordCard from './RecordCard';
import { Container, CssBaseline } from '@mui/material';
// import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
// const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
// const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

const ViewRecords = () => {
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
