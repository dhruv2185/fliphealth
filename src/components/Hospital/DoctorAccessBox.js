import { Avatar, Button, Card } from '@mui/material';
import React from 'react';
import { removeDoctorFromHospital } from '../../Utils/SmartContractUtils';

const DoctorAccessBox = () => {

    const handleRemove = async () => {
        // const res = await removeDoctorFromHospital("doctorAddress", "accountAddress");
        const res = await removeDoctorFromHospital("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        console.log(res);
    }

    const handleRevoke = async () => {
        const res = await removeDoctorFromHospital("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        console.log(res);
    }

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
