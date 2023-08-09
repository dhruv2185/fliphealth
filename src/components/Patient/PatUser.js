import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { getPatientOwnProfile } from '../../Utils/SmartContractUtils';


const PatUser = () => {

    const [profile, setProfile] = useState();

    const fetchProfile = async () => {
        const res = getPatientOwnProfile('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029');
        // const res = getPatientOwnProfile(patientAddress/loggedInAddress);
        setProfile(res);
        console.log(profile);
    }
    // fetchProfile();

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /></Container>
        </>
    );
}

export default PatUser;
