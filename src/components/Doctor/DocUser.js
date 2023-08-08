import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor';
// import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

const getUserData = async () => {
    const result = await doctorContract.methods.getDocOwnProfile().call({
        from: "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029"
    })
    const userData = result;
    console.log(userData.abhaId);
}

getUserData();

const DocUser = () => {

    let userData;
    // tujhe global state main logged in account ka address bhi store karna padega.
    let accountAddress;

    const getUserData = async () => {
        const result = await doctorContract.methods.getDocOwnProfile().call({
            from: 0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029
        })
        userData = result;
        console.log(userData);
    }

    getUserData();

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /></Container>
        </>
    );
}

export default DocUser;
