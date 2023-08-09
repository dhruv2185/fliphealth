import { Avatar, Button, Card } from '@mui/material'
import React from 'react';
import { grantAccessToDoctor } from '../../Utils/SmartContractUtils';

function SearchDocResult() {

    let doctorAddress;
    const grantAccessOnPress = async (doctorAddress) => {
        const res = await grantAccessToDoctor(
            "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029",
            "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029"
        )
        // const res = await grantAccessToDoctor(
        //     doctorAddress,
        //     loggedInAddress
        // )
        console.log(res);
    }
    // grantAccessOnPress();

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. Numun Bhugut</p><p style={{ color: "grey", lineHeight: "18px" }}>MBBS | GR : 3495739485234</p></div>
                </div>
                <Button variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>
            </Card>
        </>
    )
}

export default SearchDocResult