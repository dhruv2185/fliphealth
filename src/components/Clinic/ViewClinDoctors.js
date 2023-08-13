import { Box, Container, CssBaseline } from '@mui/material';
import React, { useState } from 'react';
import ClinDocBox from './ClinDocBox';
import { getDoctorsOfClinic } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

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
            setDoctors(res);
        }
    }
    useState(() => {
        fetchDoctors(accountAddress);
    }, [accountAddress,]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {doctors && doctors.map((doctor, index) => {
                        if (doctor["name"] !== "") {
                            return (
                                <ClinDocBox key={index} data={doctor} />
                            );
                        }
                    })
                    }
                </Box>
            </Container>
        </>
    );
}

export default ViewClinDoctors;
