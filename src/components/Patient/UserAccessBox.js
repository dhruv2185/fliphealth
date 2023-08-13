import { Avatar, Box, Button, Card, IconButton } from '@mui/material';
import React from 'react';
import { revokeDoctorsAccess } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function UserAccessBox(props) {
    const { refresh, setRefresh, data } = props;
    const accountAddress = useSelector(state => state.accountAddress);
    const revokeAccessOnPress = async () => {
        const res = await revokeDoctorsAccess(
            data.myAdd,
            accountAddress
        )
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Access Revoked!", { variant: "success" });
        }
        setRefresh(!refresh);
        // const res = revokeDoctorsAccess(
        //     docotrAddress,
        //     loggedInAddress
        // )
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.myAdd);
        enqueueSnackbar("Address Copied!", { variant: "success" });
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>

                </div>
                <div style={{ margin: "auto 15px" }}><IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton><Button onClick={revokeAccessOnPress} variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button></div>

            </Card>
        </>
    )
}

export default UserAccessBox;