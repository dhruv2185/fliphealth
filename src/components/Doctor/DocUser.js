import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3('http://127.0.0.1:7545');
const doctorContract = new web3.eth.Contract(doctorABI, "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18");

const DocUser = () => {

    let userData;
    // tujhe global state main logged in account ka address bhi store karna padega.
    let accountAddress;

    const getUserData = async () => {
        const result = await doctorContract.methods.getDocOwnProfile().call({
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

export default DocUser;
