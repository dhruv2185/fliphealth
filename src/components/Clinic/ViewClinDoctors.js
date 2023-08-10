import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import ClinDocBox from './ClinDocBox';
import { getDoctorsOfClinic } from '../../Utils/SmartContractUtils';

const ViewClinDoctors = () => {

    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        // const res = await getDoctorsOfClinic( accountAddress);
        const res = await getDoctorsOfClinic('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029');
        setDoctors(res);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><ClinDocBox /><ClinDocBox /><ClinDocBox /></Box>
            </Container>
        </>
    );
}

export default ViewClinDoctors;
