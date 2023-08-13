import { Avatar, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import ViewPatDocs from './ViewPatDocs'

function PatientBox(props) {
    const [open, setOpen] = useState(false);
    const { patient } = props;
    const openRecords = () => {
        setOpen(true);
    }
    return (
        <> <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
                <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                    {patient["name"][0]}
                </Avatar>
                <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{patient["name"]}</p><p style={{ color: "grey", lineHeight: "18px" }}>{patient["gender"]} | Age : {Number(patient["age"])} yrs</p></div>
            </div>
            <Button onClick={openRecords} variant="contained" style={{ margin: "auto 15px" }}>VIEW RECORDS</Button>
        </Card><ViewPatDocs open={open} setOpen={setOpen} patientAddress={patient.myAdd} /></>
    )
}

export default PatientBox

