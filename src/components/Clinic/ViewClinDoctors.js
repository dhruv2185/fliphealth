import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import ClinDocBox from './ClinDocBox';
import { getDoctorsOfClinic } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ViewClinDoctors = () => {

    const [doctors, setDoctors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const accountAddress = useSelector(state => state.accountAddress);

    const fetchDoctors = async (acctAdd) => {
        const res = await getDoctorsOfClinic(acctAdd);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const newres = res.filter(item => item.myAdd !== "0x0000000000000000000000000000000000000000");
            setDoctors(newres);
        }
        setIsLoading(false);
    }
    useState(() => {
        fetchDoctors(accountAddress);
    }, [accountAddress,]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs">
                <CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px", minHeight: "60vh" }}>
                    {doctors && doctors.map((doctor, index) => {
                        if (doctor["name"] !== "") {
                            return (
                                <ClinDocBox key={index} data={doctor} />
                            );
                        }
                    })
                    }{!doctors && <h5>Failed to load data. Please reload the page OR switch tabs!</h5>}
                    {doctors && doctors.length === 0 && <h5>No Doctors Found!</h5>}
                </Box>
            </Container>
        </>
    );
}

export default ViewClinDoctors;
