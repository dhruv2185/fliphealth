import { Avatar, Box, Button, Card } from '@mui/material';
import React from 'react';
// import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
// const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
// const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

function UserAccessBox() {


    return (
        <>
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        R
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. Numun Bhugut</p><p style={{ color: "grey", lineHeight: "18px" }}>MBBS | GR : 3495739485234</p></div>

                </div>
                <Button variant="outlined" color='neutral' style={{ margin: "auto 15px" }}>Revoke Access</Button>
            </Card>
        </>
    )
}

export default UserAccessBox;