import { Box, Container, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import DoctorAccessBox from './DoctorAccessBox';
import { useSelector } from 'react-redux';
import { getDoctorsOfHospital } from '../../Utils/SmartContractUtils';

const ViewDoctors = () => {

    const [doctors, setDoctors] = React.useState([]);
    const accountAddress = useSelector(state => state.accountAddress);
    useEffect(() => {
        const getDoctors = async (accountAddress) => {
            // const res = await getDoctorsOfHospital("accountAddress");
            const res = await getDoctorsOfHospital("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
            setDoctors(res[0].map(doc => {
                if (doc.name !== '') {
                    return doc;
                }
                return null;
            }))
            console.log(doctors)
        }
        getDoctors(accountAddress)
    }, [])


    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {doctors !== [] && doctors.map(doc => <DoctorAccessBox data={doc} />)}{doctors === [] && <h3>No Doctors Available</h3>}</Box>
            </Container>
        </>
    );
}

export default ViewDoctors;
