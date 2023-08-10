import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import DoctorAccessBox from './DoctorAccessBox';

const ViewDoctors = () => {

    const [doctors, setDoctors] = React.useState([]);

    const getDoctors = async (accountAddress) => {
        // const res = await getHospitalDoctors("accountAddress");
        const res = await getHospitalDoctors("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        console.log(res);
        setDoctors(res);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /><DoctorAccessBox /></Box>
            </Container>
        </>
    );
}

export default ViewDoctors;
