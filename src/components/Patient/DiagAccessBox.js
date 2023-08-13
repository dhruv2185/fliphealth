import React from 'react';
import { Avatar, Button, Card, IconButton } from '@mui/material'
import { revokeAccessOfDiagnostic } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const DiagAccessBox = (props) => {
    const { refresh, setrefresh, data } = props;
    const accountAddress = useSelector(state => state.accountAddress);
    const handleRevoke = async () => {
        const res = revokeAccessOfDiagnostic(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Diagnostic Access Revoked!", { variant: "success" });
        }

        setrefresh(!refresh);
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
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>E-mail : {data.email} | Phone : {data.phone}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}>
                    <IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton>
                    <Button onClick={handleRevoke} variant="outlined" color="neutral" style={{ margin: "auto 15px" }}>Revoke Access</Button>
                </div>

            </Card>
        </>
    );
}

export default DiagAccessBox;
