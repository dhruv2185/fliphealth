import React from 'react';
import { Avatar, Button, Card } from '@mui/material'
const SearchDiagResult = () => {

    const handleGrant = async () => {
        // const res = grantAccessToDiagnostic("address", "accountAddress");
        // const res = grantAccessToDiagnostic("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        // console.log(res);
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Wadu  ka Kotha</p></div>
                </div>
                <Button variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>
            </Card>
        </>
    );
}

export default SearchDiagResult;
