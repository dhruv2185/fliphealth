import { Avatar, Button, Card, IconButton } from '@mui/material'
import React from 'react';
import { grantAccessToDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
function SearchDocResult(props) {
    const accountAddress = useSelector(state => state.accountAddress)
    const data = props.data;
    const grantAccessOnPress = async () => {
        const res = await grantAccessToDoctor(
            data.myAdd,
            accountAddress
        )
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Access GRANTED to Doctor!", { variant: "success" });
        }

        // const res = await grantAccessToDoctor(
        //     doctorAddress,
        //     loggedInAddress
        // )
    }
    // grantAccessOnPress();

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}><IconButton><ContentCopyIcon /></IconButton><Button onClick={grantAccessOnPress} variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button></div>
            </Card>
        </>
    )
}

export default SearchDocResult