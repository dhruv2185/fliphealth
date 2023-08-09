import React from 'react';
import { Avatar, Button, Card } from '@mui/material'
const DoctorBox = () => {
    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. Numun Bhugut</p><p style={{ color: "grey", lineHeight: "18px" }}>MBBS | GR : 3495739485234</p></div>
                </div>
                <Button variant="contained" style={{ margin: "auto 15px" }}>ADD TO HOSPITAL</Button>
            </Card>
        </>
    );
}

export default DoctorBox;
