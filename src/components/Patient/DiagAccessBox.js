import React, { useState } from 'react';
import { Avatar, Button, Card, IconButton } from '@mui/material'
import { revokeAccessOfDiagnostic } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ConfirmDialog from '../ConfirmDialog';
const DiagAccessBox = (props) => {
    const { refresh, setRefresh, data } = props;
    const [confirm, setConfirm] = useState(false);
    const accountAddress = useSelector(state => state.accountAddress);
    const handleRevoke = async () => {
        const res = await revokeAccessOfDiagnostic(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Diagnostic Access Revoked!", { variant: "success" });
        }
        setRefresh(!refresh);
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.myAdd);
        enqueueSnackbar("Address Copied!", { variant: "success" });
    }

    return (
        <>
            <ConfirmDialog open={confirm} setOpen={setConfirm} onConfirm={handleRevoke} title={"Revoke Access"} children={"Are you sure you want to REVOKE the access for this Diagnostic?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px", textOverflow: "ellipsis" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px", textOverflow: "ellipsis" }}>E-mail : {data.email} <br /> Phone : {Number(data.phone)}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}>
                    <IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton>
                    <Button onClick={() => {
                        setConfirm(true);
                    }} variant="outlined" color="neutral" style={{ margin: "auto 15px" }}>Revoke Access</Button>
                </div>

            </Card>
        </>
    );
}

export default DiagAccessBox;
