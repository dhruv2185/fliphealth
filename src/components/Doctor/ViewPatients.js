import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import PatientBox from './PatientBox';

import { getPatientsForADoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const ViewPatients = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = React.useState(true);
    const [patients, setPatients] = useState(null)

    useEffect(() => {
        const fetchPatients = async () => {
            const res = await getPatientsForADoctor(accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setPatients(res);
            }
            setIsLoading(false);
            console.log(res);
        }
        fetchPatients();
    }, [accountAddress]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop><Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>{patients !== null && patients.map((patient, index) => {
                return <PatientBox key={index} patient={patient} />
            })
            }{patients && patients.length === 0 && <p>No Patients Found</p>}</Box></Container>
        </>
    );
}

export default ViewPatients;
