import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import UserAccessBox from './UserAccessBox';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
// const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
// const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

const ManageAccess = () => {

    let grantedDocs;
    let accountAddress;

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
