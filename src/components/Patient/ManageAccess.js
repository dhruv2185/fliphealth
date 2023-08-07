import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import UserAccessBox from './UserAccessBox';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3('http://127.0.0.1:7545');
const doctorContract = new web3.eth.Contract(doctorABI, "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18");

const ManageAccess = () => {

    let grantedDocs;
    let accountAddress;
    const getGrantedDoc = async () => {
        const res = await doctorContract.methods.getDoctorsForUser().call({
            from: accountAddress
        });
        grantedDocs = res;
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
