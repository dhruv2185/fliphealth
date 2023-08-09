import { Avatar, Button, Card } from '@mui/material'
import React, { useState } from 'react'
import DiagViewDocs from './DiagViewDocs';

const DiagPatientBox = () => {
    const [open, setOpen] = useState(false);
    const openRecords = () => {
        setOpen(true);
    }
    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Kishun Patil</p><p style={{ color: "grey", lineHeight: "18px" }}>Male | Age : 69 yrs</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}><Button onClick={openRecords} variant="contained" style={{ margin: "auto 10px" }}>VIEW RECORDS</Button><Button variant="outlined" style={{ margin: "auto 10px" }}>COPY ADDRESS</Button></div>

            </Card><DiagViewDocs open={open} setOpen={setOpen} />
        </>
    );
}

export default DiagPatientBox;
