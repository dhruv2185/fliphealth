import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import DiagPatientBox from './DiagPatientBox';
import { getPatientsOfDiagnostic } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const DiagPatients = () => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [patients, setPatients] = React.useState(null);
    const accountAddress = useSelector(state => state.accountAddress);



    useEffect(() => {
        const getPatients = async () => {
            const res = await getPatientsOfDiagnostic(accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setPatients(res);
            }
            setIsLoading(false);
            console.log(res);
        }
        getPatients();
    }, [accountAddress]);

    return (
        <>
            <Container component="main" maxwidth="s" minwidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {patients !== null && patients.map((patient, index) => {
                        return <DiagPatientBox key={index} patient={patient} />
                    })
                    }
                    {patients !== null && patients.length === 0 && <p>No Patients Found</p>}
                </Box>
            </Container>
        </>
    );
}

export default DiagPatients;
