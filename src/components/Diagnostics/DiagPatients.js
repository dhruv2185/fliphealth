import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import DiagPatientBox from './DiagPatientBox';
import { getPatientsOfDiagnostic } from '../../Utils/SmartContractUtils';

const DiagPatients = () => {

    const [patients, setPatients] = React.useState([]);

    const getPatients = async (accountAddress) => {
        // const res = await getPatientsOfDiagnostic("accountAddress");
        const res = await getPatientsOfDiagnostic("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        console.log(res);
        setPatients(res);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DiagPatientBox /></Box></Container>
        </>
    );
}

export default DiagPatients;
