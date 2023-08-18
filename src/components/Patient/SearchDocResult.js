import { Avatar, Button, Card, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { grantAccessToDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ConfirmDialog from '../ConfirmDialog';

function SearchDocResult(props) {
    const accountAddress = useSelector(state => state.accountAddress)
    const { data, grantedDoctors, setIsLoading } = props;
    const [accessGranted, setAccessGranted] = useState(false);
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        setAccessGranted(grantedDoctors.some(item => data.myAdd === item.myAdd));
    }, [grantedDoctors, data]);

    const grantAccessOnPress = async () => {
        setIsLoading(true);
        const res = await grantAccessToDoctor(
            data.myAdd,
            accountAddress
        )
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Access GRANTED to Doctor!", { variant: "success" });
            setAccessGranted(true);
        }
        setIsLoading(false);

    }
    const handleGranted = () => {
        enqueueSnackbar("Access already GRANTED!", { variant: "warning" });
    }
    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.myAdd);
        enqueueSnackbar("Address Copied!", { variant: "success" });
    }
    return (
        <>
            <ConfirmDialog open={confirm} setOpen={setConfirm} onConfirm={grantAccessOnPress} title={"Grant Access"} children={"Are you sure you want to GRANT access to this Doctor?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto" }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>{data.degreeName} | GR : {Number(data.grNum)}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}><IconButton onClick={handleCopy}><ContentCopyIcon /></IconButton>{!accessGranted && <Button onClick={() => {
                    setConfirm(true);
                }} variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>}
                    {accessGranted && <Button onClick={handleGranted} variant="outlined" style={{ margin: "auto 15px" }}>Access Granted</Button>}</div>
            </Card>
        </>
    )
}

export default SearchDocResult;
