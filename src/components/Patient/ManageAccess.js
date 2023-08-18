import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserAccessBox from './UserAccessBox';
import DiagAccessBox from './DiagAccessBox';
import { getAllDoctorsForAPatient, getDiagnosticForPatient } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';

const ManageAccess = () => {
    const [isLoading, setIsLoading] = useState(false);
    const accountAddress = useSelector(state => state.accountAddress);
    const [doctors, setDoctors] = useState([]);
    const [diagnostics, setDiagnostics] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const fetchDoctors = async () => {
        setIsLoading(true);
        const res = await getAllDoctorsForAPatient(accountAddress)
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        } else {
            const newres = res.filter(item => item.myAdd !== "0x0000000000000000000000000000000000000000");
            setDoctors(newres);
        }
        setIsLoading(false);
    }
    const fetchDiagnostics = async () => {
        setIsLoading(true);
        const res = await getDiagnosticForPatient(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const newres = res.filter(item => item.myAdd !== "0x0000000000000000000000000000000000000000");
            setDiagnostics(newres);
        }
        setIsLoading(false);
        console.log(diagnostics);
    }
    useEffect(() => {
        fetchDoctors();
        fetchDiagnostics();
    }, [refresh])




    return (
        <>
            <Container component="main" maxWidth="s" minwidth="xs"><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                <center><h3>DOCTORS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>{doctors.length !== 0 && doctors.map((item, index) => <UserAccessBox key={index} setRefresh={setRefresh} refresh={refresh} data={item} />)}{doctors.length === 0 && <h5>No Doctors Found</h5>}</Box>
                <center><h3>DIAGNOSTICS</h3></center>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>{diagnostics.length === 0 && <h5>No Diagnostics Found</h5>}{diagnostics.length !== 0 && diagnostics.map((item, index) => <DiagAccessBox key={index} setRefresh={setRefresh} refresh={refresh} data={item} />)}</Box>
            </Container>
        </>
    );
}

export default ManageAccess;
