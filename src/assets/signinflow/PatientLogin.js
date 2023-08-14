import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
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
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/Footer';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getPatientOwnProfile, register_patient } from '../../Utils/SmartContractUtils';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { generateOtp, verifyOTP } from '../../Utils/AadhaarVerification';

const PatientLogin = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const name = useRef();
    const age = useRef();
    const email = useRef();
    const phone = useRef();
    const abha = useRef();
    const aadhar = useRef();
    const [gender, setgender] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [abhaError, setAbhaError] = useState(false);
    const [aadharError, setAadharError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const handleGenderChange = (event) => {
        setgender(event.target.value);
    };
    useEffect(() => {

        // Asking if metamask is already present or not
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                    setAccounts(res);
                    console.log(accounts);
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
        const data = { name: name.current.value, age: age.current.value, phone: phone.current.value, abha: abha.current.value, aadhar: aadhar.current.value, email: email.current.value, gender: gender };
        let flag = 0;
        if (data.name === "") {
            setNameError(true);
            flag = 1;
        }
        if (data.age === "" || isNaN(data.age)) {
            setAgeError(true);
            flag = 1;
        }
        if (data.phone === "" || isNaN(data.phone)) {
            setPhoneError(true);
            flag = 1;
        }
        if ((data.abha).length !== 14 || isNaN(data.abha)) {
            setAbhaError(true);
            flag = 1;
        }
        if ((data.aadhar).length !== 12 || isNaN(data.aadhar)) {
            setAadharError(true);
            flag = 1;
        }
        if (data.email === "" || !data.email.includes('@')) {
            setEmailError(true);
            flag = 1;
        }
        if (data.gender === "") {
            setGenderError(true);
            flag = 1;
        }
        if (flag === 1) {
            return;
        }
        // accessToken to be stored in the redux store
        // let accessToken;
        // const result = await generateOtp(data.aadhar, accessToken);
        // error case
        // if (result.message) {
        //     enqueueSnackbar(result.message, { variant: "error" });
        //     return;
        // }
        // const refId = result.ref_id;

        // otp to be taken from user make form/ modal field for that
        // let otp;
        // const veriOTP = await verifyOTP(refId, otp, accessToken);
        // error case
        // if (veriOTP.message) {
        //     enqueueSnackbar(veriOTP.message, { variant: "error" });
        //     return;
        // }
        // const aadharDetails = veriOTP;
        // note the format and create a new data object to be sent to the smart contract

        const res = await register_patient(data, accounts[0]);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const getProfile = await getPatientOwnProfile(accounts[0]);
            if (getProfile.message) {
                enqueueSnackbar(getProfile.message, { variant: "error" });
            }
            else {
                const profile = {
                    name: getProfile["name"],
                    age: getProfile["age"],
                    email: getProfile["email"],
                    abhaId: getProfile["abhaId"],
                    aadharId: getProfile["aadharId"],
                    mobile: getProfile["mobile"],
                    gender: getProfile["gender"]
                }
                enqueueSnackbar(`Welcome, ${profile.name}`);
                dispatch({ type: "LOGIN", payload: { accountType: "PATIENT", accountAddress: accounts[0], profile: profile } })
                navigate("/Dashboard");
            }

        }
        console.log(res);

    };
    enqueueSnackbar("Please give access to only one account at a time, otherwise, the first account selected in Metamask would be used to login!", { variant: "info" })
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
                            <PersonIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up as Patient
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "600px", marginBottom: "60px" }}>
                            <Box component="div" sx={{ display: "flex", gap: "5px" }}><TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"
                                inputRef={name}
                                error={nameError}
                            />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="age"
                                    label="Age"
                                    type="number"
                                    inputProps={{ inputMode: "numeric", min: "1", max: "120" }}
                                    id="age"
                                    inputRef={age}
                                    error={ageError}
                                />
                            </Box>
                            <FormControl fullWidth sx={{ marginTop: "8px 0" }} ><InputLabel id="demo-simple-select-label">Gender * </InputLabel><Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                                error={genderError}
                                required
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select></FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                type='email'
                                inputRef={email}
                                error={emailError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Mobile Number"
                                name="phone"
                                type='text'
                                inputRef={phone}
                                error={phoneError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="abha"
                                type='text'
                                label="ABHA ID"
                                name="abhaID"
                                inputRef={abha}
                                error={abhaError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="aadhar"
                                label="AADHAR ID"
                                type="text"
                                id="aadhar"
                                inputRef={aadhar}
                                error={aadharError}
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
                                <Grid item>
                                    <Link href="https://healthid.ndhm.gov.in/register" variant="body2" target="_blank">
                                        {"Don't have an ABHA ID? Create Now!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Container><Footer /></>}
        </>
    );
}

export default PatientLogin;
