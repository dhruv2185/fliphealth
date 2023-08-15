import { Avatar, Button, Card } from '@mui/material';
import React, { useState } from 'react';
import { removeDoctorFromHospital, revokeAllAccessOfDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import ConfirmDialog from '../ConfirmDialog';

const DoctorAccessBox = (props) => {
    const accountAddress = useSelector(state => state.accountAddress);
    const { data, setRefresh, refresh, setIsLoading } = props;
    const [confirm1, setConfirm1] = useState(false);
    const [confirm2, setConfirm2] = useState(false);
    const handleRemove = async () => {
        setIsLoading(true);
        const res = await removeDoctorFromHospital(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Doctor Removed Successfully", { variant: "success" });
        }
        setRefresh(!refresh);
        setIsLoading(false);
    }
    const handleRevoke = async () => {
        setIsLoading(true);
        const res = await revokeAllAccessOfDoctor(data.myAdd, accountAddress);
        const result = await removeDoctorFromHospital(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else if (result.message) {
            enqueueSnackbar(result.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Doctor Accesses Revoked and Removed Doctor Successfully", { variant: "success" });
        }
        setRefresh(!refresh);
        setIsLoading(false);
    }

    return (
        <>
            <ConfirmDialog open={confirm1} setOpen={setConfirm1} onConfirm={handleRemove} title={"Remove Doctor"} children={"Are you sure you want to REMOVE this Doctor from your hospital?"} />
            <ConfirmDialog open={confirm2} setOpen={setConfirm2} onConfirm={handleRevoke} title={"Revoke Access"} children={"Are you sure you want to REMOVE and REVOKE the access of this Doctor from ALL the patients?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. {data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>

                </div>
                <div style={{ margin: "auto 15px" }}>
                    <Button variant="outlined" color='neutral' style={{ margin: "auto 5px" }} onClick={() => {
                        setConfirm1(true);
                    }}>Remove</Button>
                    <Button variant="contained" color='neutral' style={{ margin: "auto 5px" }} onClick={() => {
                        setConfirm2(true);
                    }}>Revoke Access</Button></div>
            </Card>
        </>
    );
}

export default DoctorAccessBox;
