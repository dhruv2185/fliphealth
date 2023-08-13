import { Avatar, Button, Card } from '@mui/material';
import React from 'react';
import { removeDoctorFromHospital, revokeAllAccessOfDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

const DoctorAccessBox = (props) => {
    const accountAddress = useSelector(state => state.accountAddress);
    const { data, setRefresh, refresh, setIsLoading } = props;
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
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >Dr. {data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>

                </div>
                <div style={{ margin: "auto 15px" }}>
                    <Button variant="outlined" color='neutral' style={{ margin: "auto 5px" }} onClick={handleRemove}>Remove</Button>
                    <Button variant="contained" color='neutral' style={{ margin: "auto 5px" }} onClick={handleRevoke}>Revoke Access</Button></div>
            </Card>
        </>
    );
}

export default DoctorAccessBox;
