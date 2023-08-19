import { Avatar, Card, Container, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { getDiagProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const DiagProfile = () => {

    const [profile, setProfile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const accountAddress = useSelector(state => state.accountAddress);

    const getProfile = async (accountAddress) => {
        const res = await getDiagProfile(accountAddress, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" })
        }
        else {
            setProfile(res);
        }
        setIsLoading(false);
    }
    useEffect(() => {
        getProfile(accountAddress);
    }, [accountAddress])

    return (
        <>
            <Container component="main" maxwidth="s" minwidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {profile && <><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            {profile["Diagname"][0]}
                        </Avatar>
                        <div style={{ margin: "auto 60px", fontSize: "24px" }}><p>{profile["Diagname"]}</p></div>

                    </div>
                </Card><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                        <h3>DETAILS</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                            <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                            <b><h4>{profile["email"]}</h4></b>
                            <h4 style={{ color: "grey" }}>Phone Number : </h4>
                            <b><h4>{Number(profile["phone"])}</h4></b>
                            <h4 style={{ color: "grey" }}>License : </h4>
                            <b><h4>{profile["license"]}</h4></b>
                        </div>
                    </Card></>}
            </Container>
        </>
    );
}

export default DiagProfile;
