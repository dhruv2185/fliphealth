import React from 'react';
import { Avatar, Button, Card } from '@mui/material'
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { grantAccessToDiagnostic } from '../../Utils/SmartContractUtils';

const SearchDiagResult = (props) => {
    const data = props.data;
    const accountAddress = useSelector(state => state.accountAddress);
    const handleGrant = async () => {
        const res = grantAccessToDiagnostic(data.address, accountAddress);
        console.log(res);
        enqueueSnackbar("Access GRANTED to Diagnostic!", { variant: "success" });
        // const res = grantAccessToDiagnostic("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        // console.log(res);
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto", textTransform: "uppercase" }} aria-label="recipe" >
                        {data.Diagname[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.Diagname}</p><p style={{ color: "grey", lineHeight: "18px" }}>E-mail : {data.email} | Phone : {data.phone}</p></div>
                </div>
                <Button onClick={handleGrant} variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>
            </Card>
        </>
    );
}

export default SearchDiagResult;
