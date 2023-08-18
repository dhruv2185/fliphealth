import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/Footer';
import { getDiagProfile, registerDiagnostic } from '../../Utils/SmartContractUtils';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const Diagnostics = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const license = useRef();
    const [nameError, setNameError] = useState({
        error: false,
        message: ""
    });
    const [emailError, setEmailError] = useState({
        error: false,
        message: ""
    });
    const [phoneError, setPhoneError] = useState({
        error: false,
        message: ""
    });
    const [licenseError, setLicenseError] = useState({
        error: false,
        message: ""
    });
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {

        // Asking if metamask is already present or not
        if (window.ethereum) {
            enqueueSnackbar("Please give access to only one account at a time, otherwise, the first account selected in Metamask would be used to login!", { variant: "info" })
            window.ethereum
                .request({ method: "eth_requestAccounts" }).then((res) => {
                    if (res.length === 0) {
                        enqueueSnackbar("Please connect at least one account to continue!", { variant: "error" })
                        navigate("/");
                    }
                    else {
                        return res;
                    }
                })
                .then((res) => {
                    setAccounts(res);
                    const authenticate = async () => {
                        const getProfile = await getDiagProfile(res[0]);
                        if (!getProfile || getProfile["Diagname"] === "") {
                            return;
                        }
                        else {
                            const profile = {
                                name: getProfile["Diagname"],
                                email: getProfile["email"],
                                mobile: Number(getProfile["phone"]),
                                license: getProfile["license"],
                            }
                            sessionStorage.setItem("credential", JSON.stringify({ accountType: "DIAGNOSTICS", accountAddress: res[0], profile: profile }))
                            enqueueSnackbar(`Welcome, ${profile.name}`);
                            dispatch({ type: "LOGIN", payload: { accountType: "DIAGNOSTICS", accountAddress: res[0], profile: profile } })
                            navigate("/Dashboard");
                        }
                    }
                    authenticate();
                    setIsLoading(false)
                }).catch(err => {
                    enqueueSnackbar("Please Log in to Metamask to Proceed!", { variant: "error" });
                    navigate("/");
                });
        } else {
            enqueueSnackbar("Please install Metamask to Proceed!", { variant: "error" });
            navigate("/");

        }
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name: name.current.value, phone: phone.current.value, email: email.current.value, license: license.current.value };
        const flag = 0;
        if (data.name === "") {
            setNameError({
                error: true,
                message: "Name cannot be empty!"
            });
            flag = 1;
        }
        else {
            setNameError({
                error: false,
                message: ""
            });
        }
        if (data.phone === "" || isNaN(data.phone)) {
            setPhoneError({
                error: true,
                message: "Enter a valid mobile number!"
            });
            flag = 1;
        }
        else {
            setPhoneError({
                error: false,
                message: ""
            });
        }
        if (data.email === "" || !data.email.includes('@')) {
            setEmailError({
                error: true,
                message: "Enter a valid email address!"
            });
            flag = 1;
        }
        else {
            setEmailError({
                error: false,
                message: ""
            });
        }
        if (data.license === "") {
            setLicenseError({
                error: true,
                message: "Enter a valid license number!"
            });
            flag = 1;
        }
        else {
            setLicenseError({
                error: false,
                message: ""
            });
        }
        if (flag === 1) {
            return;
        }
        const res = await registerDiagnostic(data, accounts[0]);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const getProfile = await getDiagProfile(accounts[0]);
            if (getProfile.message) {
                enqueueSnackbar(getProfile.message, { variant: "error" });
            }
            else {
                const profile = {
                    name: getProfile["Diagname"],
                    email: getProfile["email"],
                    mobile: Number(getProfile["phone"]),
                    license: getProfile["license"],
                }
                sessionStorage.setItem("credential", JSON.stringify({ accountType: "DIAGNOSTICS", accountAddress: accounts[0], profile: profile }))
                enqueueSnackbar(`Welcome, ${profile.name}`);
                dispatch({ type: "LOGIN", payload: { accountType: "DIAGNOSTICS", accountAddress: accounts[0], profile: profile } })
                navigate("/Dashboard");
            }
        }
    };

    return (
        <>
            {isLoading && <Box sx={{ display: 'flex', position: "absolute", top: "48%", left: "48%" }}>
                <CircularProgress />
            </Box>}
            {!isLoading && <><Navbar />
                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LocalHospitalIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up as a Diagnostics Centre
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "600px", marginBottom: "60px" }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"
                                inputRef={name}
                                error={nameError.error}
                                helperText={nameError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                type='text'
                                inputRef={email}
                                error={emailError.error}
                                helperText={emailError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Mobile Number"
                                name="phone"
                                type='text'
                                inputRef={phone}
                                error={phoneError.error}
                                helperText={phoneError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="license"
                                label="License"
                                name="license"
                                inputRef={license}
                                error={licenseError.error}
                                helperText={licenseError.message}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container><Footer /></>}
        </>
    );

}

export default Diagnostics;
