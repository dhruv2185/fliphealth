import { Avatar, Button, Card } from '@mui/material'
import React from 'react'

function PatientBox() {
    return (
        <> <Card sx={{ width: "60vw", minWidth: "420px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    R
                </Avatar>
                <p style={{ margin: "auto 15px" }}>Kishun Patil</p>
            </div>
            <Button variant="contained" style={{ margin: "auto 15px" }}>VIEW RECORDS</Button>
        </Card></>
    )
}

export default PatientBox

