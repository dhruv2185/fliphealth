
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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
import { register_patient } from '../../Utils/SmartContractUtils';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { generateOtp, verifyOTP } from '../../Utils/AadharVerification';

const PatientLogin = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const name = useRef();
    const age = useRef();
    const email = useRef();
    const phone = useRef();
    const abha = useRef();
    const aadhar = useRef();
    const [gender, setgender] = useState('');
    const [accounts, setAccounts] = useState([]);
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


        // accessToken to be stored in the redux store
        let accessToken;
        const result = await generateOtp(data.aadhar, accessToken);
        // error case
        // if (result.message) {
        //     enqueueSnackbar(result.message, { variant: "error" });
        //     return;
        // }
        const refId = result.ref_id;

        // otp to be taken from user make form/ modal field for that
        let otp;
        const veriOTP = await verifyOTP(refId, otp, accessToken);
        // error case
        // if (veriOTP.message) {
        //     enqueueSnackbar(veriOTP.message, { variant: "error" });
        //     return;
        // }
        const aadharDetails = veriOTP;
        // note the format and create a new data object to be sent to the smart contract

        const res = await register_patient(data, accounts[0]);
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
                                />
                            </Box>
                            <FormControl fullWidth sx={{ marginTop: "8px 0" }} ><InputLabel id="demo-simple-select-label">Gender * </InputLabel><Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
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
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="abha"
                                label="ABHA ID"
                                name="abhaID"
                                inputRef={abha}
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
