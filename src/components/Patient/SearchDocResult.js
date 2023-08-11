import { Avatar, Button, Card } from '@mui/material'
import React from 'react';
import { grantAccessToDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

function SearchDocResult(props) {
    const accountAddress = useSelector(state => state.accountAddress)
    const data = props.data;
    const grantAccessOnPress = async () => {
        const res = await grantAccessToDoctor(
            data.address,
            accountAddress
        )
        enqueueSnackbar("Access GRANTED to Doctor!", { variant: "success" });
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
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {data.grNum}</p></div>
                </div>
                <Button onClick={grantAccessOnPress} variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>
            </Card>
        </>
    )
}

export default SearchDocResult