import React, { useEffect, useState } from 'react';
import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import { getPatientOwnProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';

const PatUser = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getPatientOwnProfile(accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setProfile(res);
            }
            setIsLoading(false);
            console.log(res);
        }
        fetchProfile();
    }, [accountAddress]);


    return (
        <>
            <Container component="main" maxWidth="s" minwidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {profile !== null && <><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100 }} aria-label="recipe">

                            <p style={{ fontSize: 60, position: "relative", top: "-5%" }}>{profile["name"][0]}</p>
                        </Avatar>
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >{profile["name"]}</p><p style={{ color: "grey" }}>{profile["gender"]}</p><p style={{ color: "grey" }}>Age : {Number(profile["age"])} yrs.</p></div>

                    </div>
                </Card>
                    <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                        <h3>PERSONAL DETAILS</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                            <h4 style={{ color: "grey" }}>ABHA ID : </h4>
                            <b><h4>{Number(profile["abhaId"])}</h4></b>
                            <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                            <b><h4>{profile["email"]}</h4></b>
                            <h4 style={{ color: "grey" }}>Aadhar ID : </h4>
                            <b><h4>{Number(profile["aadharId"])}</h4></b>
                            <h4 style={{ color: "grey" }}>Phone Number : </h4>
                            <b><h4>{Number(profile["mobile"])}</h4></b>
                        </div>
                    </Card></>}

            </Container>
        </>
    );
}

export default PatUser;
