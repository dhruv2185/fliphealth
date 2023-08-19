import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import DoctorAccessBox from './DoctorAccessBox';
import { useSelector } from 'react-redux';
import { getDoctorsOfHospital } from '../../Utils/SmartContractUtils';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';

const ViewDoctors = () => {

    const [doctors, setDoctors] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [refresh, setRefresh] = React.useState(false);
    const accountAddress = useSelector(state => state.accountAddress);
    const getDoctors = async (accountAddress) => {
        const res = await getDoctorsOfHospital(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        } else {
            const newRes = res.filter((doc) => doc["name"] !== "");
            setDoctors(newRes);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        getDoctors(accountAddress)
    }, [refresh, accountAddress])

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px", minHeight: "60vh" }}>
                    {doctors !== [] && doctors.map((doc, index) => (doc["name"] !== "" && <DoctorAccessBox key={index} data={doc} setRefresh={setRefresh} refresh={refresh} setIsLoading={setIsLoading} />))}
                    {doctors.length === 0 && <h3>No Doctors Available</h3>}</Box>
            </Container>
        </>
    );
}

export default ViewDoctors;
