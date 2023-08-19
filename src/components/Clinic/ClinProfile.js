import React, { useEffect, useState } from 'react';
import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import { getClinicProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ClinProfile = () => {

    const [profile, setProfile] = useState(null);
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (clinicAdd, acctAdd) => {
        const res = await getClinicProfile(clinicAdd, acctAdd);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            setProfile(
                {
                    name: res["name"],
                    email: res["email"],
                    phone: Number(res["phone"]),
                    location: res["location"]
                }
            );
        }
        setIsLoading(false);
    }
    useEffect(() => {
        fetchProfile(accountAddress, accountAddress);
    }, [accountAddress]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {profile && <><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            R
                        </Avatar>
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p>{profile.name}</p><p style={{ color: "grey" }}>Location : {profile.location}</p></div>

                    </div>
                </Card><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                        <h3>PERSONAL DETAILS</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                            <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                            <b><h4>{profile.email}</h4></b>

                            <h4 style={{ color: "grey" }}>Phone Number : </h4>
                            <b><h4>{(profile.phone)}</h4></b>
                        </div>
                    </Card></>}
            </Container>
        </>
    );
}

export default ClinProfile;
