import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { addDoctorToHospital } from '../../Utils/SmartContractUtils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ConfirmDialog from '../ConfirmDialog';
const DoctorBox = (props) => {
    const accountAddress = useSelector(state => state.accountAddress)
    const { data, grantedDoctors, isLoading, setIsLoading } = props;
    const [accessGranted, setAccessGranted] = useState(false);
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        setAccessGranted(grantedDoctors.some(item => data.myAdd === item.myAdd));
    }, [grantedDoctors, data]);

    const handleAdd = async () => {
        setIsLoading(true);
        const res = await addDoctorToHospital(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Doctor Added Successfully", { variant: "success" });
            setAccessGranted(true);
        }
        setIsLoading(false);
    }
    const handleAdded = () => {
        enqueueSnackbar("Doctor already ADDED!", { variant: "warning" });
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.myAdd);
        enqueueSnackbar("Address Copied!", { variant: "success" });
    }
    return (
        <><ConfirmDialog open={confirm} setOpen={setConfirm} onConfirm={handleAdd} title={"ADD Doctor"} children={"Are you sure you want to ADD this Doctor to your Hospital?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}><IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton>{!accessGranted && <Button onClick={() => {
                    setConfirm(true);
                }} variant="contained" style={{ margin: "auto 15px" }}>Add to Hospital</Button>}
                    {accessGranted && <Button onClick={handleAdded} variant="outlined" style={{ margin: "auto 15px" }}>Doctor Added</Button>}</div>
            </Card>
        </>
    );
}

export default DoctorBox;
