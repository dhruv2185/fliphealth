import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { getDoctorOwnProfile } from '../../Utils/SmartContractUtils';

const DocUser = () => {

    const [docProfile, setDocProfile] = useState();

    const fetchProfile = async () => {
        const res = await getDoctorOwnProfile("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        setDocProfile(res);
        console.log(docProfile);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /></Container>
        </>
    );
}

export default DocUser;
