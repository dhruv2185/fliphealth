import React, { useState } from 'react';
import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import { getClinicProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

const ClinProfile = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: 0,
        location: ""
    });
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async (clinicAdd, acctAdd) => {
        const res = await getClinicProfile(clinicAdd, acctAdd);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            console.log("res", res.name, res.email, Number(res.phone), res.location);
            const data = {
                name: res.name,
                email: res.email,
                phone: Number(res.phone),
                location: res.location
            }
            setProfile(
                {
                    name: res.name,
                    email: res.email,
                    phone: Number(res.phone),
                    location: res.location
                }
            );
            console.log("profile ", profile);
        }
        setIsLoading(false);
        console.log("profile ", profile);
    }
    useState(() => {
        fetchProfile(accountAddress, accountAddress);
    }, [accountAddress,]);

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            R
                        </Avatar>
                        {/* <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >{profile.name}</p><p style={{ color: "grey" }}>Location : {profile.location}</p></div> */}

                    </div>
                </Card>
                <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                    <h3>PERSONAL DETAILS</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                        {/* <b><h4>{profile.email}</h4></b> */}

                        <h4 style={{ color: "grey" }}>Phone Number : </h4>
                        {/* <b><h4>{(profile.phone).toString}</h4></b> */}
                    </div>
                </Card>

            </Container>
        </>
    );
}

export default ClinProfile;
