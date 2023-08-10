import React, { useState } from 'react';
import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import { getClinicProfile } from '../../Utils/SmartContractUtils';

const ClinProfile = () => {

    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        // const res = await getClinicProfile(cliAddress, accountAddress);
        const res = await getClinicProfile('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029', '0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029');
        setProfile(res);
    }

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            R
                        </Avatar>
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >Wadu ka Kotha</p><p style={{ color: "grey" }}>Location : Mumbai</p></div>

                    </div>
                </Card>
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                    <h3>PERSONAL DETAILS</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                        <b><h4>numunbhughut1414@gmail.com</h4></b>

                        <h4 style={{ color: "grey" }}>Phone Number : </h4>
                        <b><h4>69696969696</h4></b>
                    </div>
                </Card>

            </Container>
        </>
    );
}

export default ClinProfile;
