import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { grantAccessToDiagnostic } from '../../Utils/SmartContractUtils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ConfirmDialog from '../ConfirmDialog';
const SearchDiagResult = (props) => {
    const { data, grantedDiag, isLoading, setIsLoading } = props;
    const [accessGranted, setAccessGranted] = useState(false);
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        setAccessGranted(grantedDiag.some(item => data.myAdd === item.myAdd));
    }, [grantedDiag, data]);
    const accountAddress = useSelector(state => state.accountAddress);
    const handleGrant = async () => {
        setIsLoading(true);
        const res = await grantAccessToDiagnostic(data.myAdd, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Access GRANTED to Diagnostic!", { variant: "success" });
            setAccessGranted(true);
        }
        // const res = grantAccessToDiagnostic("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        // console.log(res);
        setIsLoading(false);
    }
    const handleGranted = () => {
        enqueueSnackbar("Access already GRANTED", { variant: "warning" });
    }
    return (
        <>
            <ConfirmDialog open={confirm} setOpen={setConfirm} onConfirm={handleGrant} title={"Grant Access"} children={"Are you sure you want to GRANT access to this Diagnostic?"} />
            <Card sx={{ width: "60vw", minWidth: "400px", padding: "5px 20px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: "red", margin: "auto", textTransform: "uppercase" }} aria-label="recipe" >
                        {data.name[0]}
                    </Avatar>
                    <div style={{ margin: "auto 15px", lineHeight: "14px" }}><p >{data.name}</p><p style={{ color: "grey", lineHeight: "18px" }}>E-mail : {data.email} | Phone : {Number(data.phone)}</p></div>
                </div>
                <div style={{ margin: "auto 15px" }}><IconButton><ContentCopyIcon /></IconButton>{!accessGranted && <Button onClick={() => {
                    setConfirm(true);
                }} variant="contained" style={{ margin: "auto 15px" }}>Grant Access</Button>}
                    {accessGranted && <Button onClick={handleGranted} variant="outlined" style={{ margin: "auto 15px" }}>Access Granted</Button>}</div>

            </Card>
        </>
    );
}

export default SearchDiagResult;
