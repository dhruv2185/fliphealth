import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import ClinDocBox from './ClinDocBox';
import { getDoctorsOfClinic } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';

const ViewClinDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const accountAddress = useSelector(state => state.accountAddress);

    const fetchDoctors = async (acctAdd) => {
        // const res = await getDoctorsOfClinic( accountAddress);
        const res = await getDoctorsOfClinic(acctAdd);
        setDoctors(res);
    }
    useState(() => {
        fetchDoctors(accountAddress);
    }, [accountAddress,]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><ClinDocBox /><ClinDocBox /><ClinDocBox /></Box>
            </Container>
        </>
    );
}

export default ViewClinDoctors;
