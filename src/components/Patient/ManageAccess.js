import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import UserAccessBox from './UserAccessBox';
import { getAllDoctorsForAPatient } from '../../Utils/SmartContractUtils';



const ManageAccess = () => {

    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        const res = await getAllDoctorsForAPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
        // const res = await getAllDoctorsForAPatient('loggedInAddress')
        setDoctors(res);
        console.log(doctors);
    }

    // fetchDoctors();

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /><UserAccessBox /></Box>
            </Container>
        </>
    );
}

export default ManageAccess;
