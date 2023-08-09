import React, { useState } from 'react';
import { Avatar, Card, Container, CssBaseline } from '@mui/material';
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
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            R
                        </Avatar>
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >Numun Bhugut</p><p style={{ color: "grey" }}>Male</p><p style={{ color: "grey" }}>Age : 6 yrs.</p></div>

                    </div>
                </Card>
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                    <h3>PERSONAL DETAILS</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h4 style={{ color: "grey" }}>ABHA ID : </h4>
                        <b><h4>94385734598845</h4></b>
                        <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                        <b><h4>numunbhughut1414@gmail.com</h4></b>
                        <h4 style={{ color: "grey" }}>Aadhar ID : </h4>
                        <b><h4>94334255335345</h4></b>
                        <h4 style={{ color: "grey" }}>Phone Number : </h4>
                        <b><h4>69696969696</h4></b>
                    </div>
                </Card>

            </Container>
        </>
    );
}

export default PatUser;
