import { Avatar, Button, Card, IconButton } from '@mui/material'
import React, { useState } from 'react'
import DiagViewDocs from './DiagViewDocs';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { enqueueSnackbar } from 'notistack';

const DiagPatientBox = (props) => {
    const { patient } = props;
    const [open, setOpen] = useState(false);
    const openRecords = () => {
        setOpen(true);
    }
    const address = patient.myAdd;
    const handleClick = async () => {
        await navigator.clipboard.writeText((address.toString()));
        enqueueSnackbar("Address Copied to Clipboard", { variant: "success" });
    }

    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {patient.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{patient.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{patient.gender} | Age : {Number(patient.age)} yrs</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}>
                    <IconButton onClick={handleClick} >
                        <ContentCopyIcon />
                    </IconButton>
                    <Button onClick={openRecords} variant="contained" style={{ margin: "auto 10px" }}>VIEW RECORDS</Button>
                </div>
            </Card>
            <DiagViewDocs open={open} setOpen={setOpen} patientAddress={patient.myAdd} />
        </>
    );
}

export default DiagPatientBox;
