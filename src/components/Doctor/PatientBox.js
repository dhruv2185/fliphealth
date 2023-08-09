import { Avatar, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import ViewPatDocs from './ViewPatDocs'

function PatientBox() {
    const [open, setOpen] = useState(false);
    const openRecords = () => {
        setOpen(true);
    }
    return (
        <> <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
                <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                    R
                </Avatar>
                <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Kishun Patil</p><p style={{ color: "grey", lineHeight: "18px" }}>Male | Age : 69 yrs</p></div>
            </div>
            <Button onClick={openRecords} variant="contained" style={{ margin: "auto 15px" }}>VIEW RECORDS</Button>
        </Card><ViewPatDocs open={open} setOpen={setOpen} /></>
    )
}

export default PatientBox

