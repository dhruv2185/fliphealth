import { Avatar, Box, Button, Card } from '@mui/material';
import React from 'react';

function UserAccessBox() {
    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "420px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                        R
                    </Avatar>
                    <p style={{ margin: "auto 15px" }}>Dr. Numun Bhugut</p>
                </div>
                <Button variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button>
            </Card>
        </>
    )
}

export default UserAccessBox;