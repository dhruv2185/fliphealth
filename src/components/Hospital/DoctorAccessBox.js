import { Avatar, Button, Card } from '@mui/material';
import React from 'react';

const DoctorAccessBox = () => {
    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. Numun Bhugut</p><p style={{ color: "grey", lineHeight: "18px" }}>MBBS | GR : 3495739485234</p></div>

                </div>
                <div style={{ margin: "auto 15px" }}>
                    <Button variant="outlined" color='neutral' style={{ margin: "auto 5px" }}>Remove</Button>
                    <Button variant="contained" color='neutral' style={{ margin: "auto 5px" }}>Revoke Access</Button></div>
            </Card>
        </>
    );
}

export default DoctorAccessBox;
