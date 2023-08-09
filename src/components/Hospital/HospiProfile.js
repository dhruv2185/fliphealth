import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import React from 'react';

const HospiProfile = () => {
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            R
                        </Avatar>
                        <div style={{ margin: "auto 60px", fontSize: "24px" }}><p >IIITDM JBP</p></div>

                    </div>
                </Card>
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                    <h3>DETAILS</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                        <b><h4>numunbhughut1414@gmail.com</h4></b>
                        <h4 style={{ color: "grey" }}>Phone Number : </h4>
                        <b><h4>69696969696</h4></b>
                        <h4 style={{ color: "grey" }}>License : </h4>
                        <b><h4>874356834568347568583</h4></b>
                    </div>
                </Card>

            </Container>
        </>
    );
}

export default HospiProfile;
