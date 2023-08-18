import { Avatar, Box, Button, Card, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { revokeDoctorsAccess } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ConfirmDialog from '../ConfirmDialog';

function UserAccessBox(props) {
    const { refresh, setRefresh, data } = props;
    const accountAddress = useSelector(state => state.accountAddress);
    const [confirm, setConfirm] = useState(false);
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
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.myAdd);
        enqueueSnackbar("Address Copied!", { variant: "success" });
    }

    return (
        <><ConfirmDialog open={confirm} setOpen={setConfirm} onConfirm={revokeAccessOnPress} title={"Revoke Access"} children={"Are you sure you want to REVOKE the access for this Doctor?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>

                </div>
                <div style={{ margin: "auto 15px", display: "flex", flexWrap: "nowrap" }}><IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton><Button onClick={() => { setConfirm(true) }} variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button></div>

            </Card>
        </>
    )
}

export default UserAccessBox;