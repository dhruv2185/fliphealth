import { Avatar, Box, Button, Card } from '@mui/material';
import React from 'react';
import { revokeDoctorsAccess } from '../../Utils/SmartContractUtils';


function UserAccessBox() {

    const revokeAccessOnPress = async () => {
        const res = revokeDoctorsAccess(
            '0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029',
            '0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029'
        )
        // const res = revokeDoctorsAccess(
        //     docotrAddress,
        //     loggedInAddress
        // )
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
                <Button variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button>
            </Card>
        </>
    )
}

export default UserAccessBox;