import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Web3 from 'web3';
import { patientABI } from '../../abis/patient.js'
// instantiating object
const web3 = new Web3('http://127.0.0.1:7545');
const patientContract = new web3.eth.Contract(patientABI,
    "0xDeC01AfA357A754ea3Ed6Ee6E8f27F954380f104"
);

const PatUser = () => {

    let userData;
    // tujhe global state main logged in account ka address bhi store karna padega.
    let accountAddress;

    const getUserData = async () => {
        const result = await patientContract.methods.getPatientOwnProfile().call({
            from: accountAddress
        })
        userData = result;
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /></Container>
        </>
    );
}

export default PatUser;
