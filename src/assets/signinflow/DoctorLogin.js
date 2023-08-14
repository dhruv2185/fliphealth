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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/Footer';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getDoctorOwnProfile, registerDoctor } from '../../Utils/SmartContractUtils';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { generateOtp, verifyOTP } from '../../Utils/AadhaarVerification';

const DoctorLogin = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const name = useRef();
    const age = useRef();
    const email = useRef();
    const phone = useRef();
    const abha = useRef();
    const aadhar = useRef();
    const grnumber = useRef("G-");
    const specialisation = useRef();
    const [gender, setgender] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [abhaError, setAbhaError] = useState({
        error: false,
        message: ""
    });
    const [aadharError, setAadharError] = useState({
        error: false,
        message: ""
    });
    const [grnumberError, setGrnumberError] = useState({
        error: false,
        message: ""
    });
    const [emailError, setEmailError] = useState({
        error: false,
        message: ""
    });
    const [nameError, setNameError] = useState({
        error: false,
        message: ""
    });
    const [ageError, setAgeError] = useState({
        error: false,
        message: ""
    });
    const [phoneError, setPhoneError] = useState({
        error: false,
        message: ""
    });
    const [specialisationError, setSpecialisationError] = useState({
        error: false,
        message: ""
    });
    const [genderError, setGenderError] = useState({
        error: false,
        message: ""
    });
    const handleGenderChange = (event) => {
        setgender(event.target.value);
    };
    useEffect(() => {

        // Asking if metamask is already present or not
        if (window.ethereum) {
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
                        const getProfile = await getDoctorOwnProfile(res[0]);
                        if (!getProfile || getProfile["name"] === "") {
                            return;
                        }
                        else {
                            const profile = {
                                name: getProfile["name"],
                                age: getProfile["age"],
                                email: getProfile["email"],
                                abhaId: getProfile["abhaId"],
                                aadharId: getProfile["aadharId"],
                                mobile: getProfile["mobile"],
                                gender: getProfile["gender"],
                                grNumber: getProfile["grNum"],
                                degreeName: getProfile["degreeName"]
                            }
                            enqueueSnackbar(`Welcome, ${profile.name}`);
                            dispatch({ type: "LOGIN", payload: { accountType: "DOCTOR", accountAddress: res[0], profile: profile } })
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
        // add field for degree name
        const onlyNumber = Number(grnumber.current.value.substring(2));
        const data = { name: name.current.value, age: age.current.value, phone: phone.current.value, abha: abha.current.value, aadhar: aadhar.current.value, email: email.current.value, grnumber: onlyNumber, gender: gender, specialisation: specialisation.current.value };
        let flag = 0;
        // check if all fields are filled
        if (data.name === "") {
            setNameError({
                error: true,
                message: "Name cannot be empty"
            });
            flag = 1;
        }
        else {
            setNameError({
                error: false,
                message: ""
            });
        }
        if (data.age === "" || isNaN(data.age) || Number(data.age) < 18 || Number(data.age) > 100) {
            setAgeError({
                error: true,
                message: "Age should be between 18 and 100"
            });
            flag = 1;
        }
        else {
            setAgeError({
                error: false,
                message: ""
            });
        }
        if (data.phone === "" || data.phone.length !== 10 || isNaN(data.phone)) {
            setPhoneError({
                error: true,
                message: "Phone number should be of 10 digits"
            });
            flag = 1;
        }
        else {
            setPhoneError({
                error: false,
                message: ""
            });
        }
        if (data.gender === "") {
            setGenderError({
                error: true,
                message: "Select one of the above values"
            });
            flag = 1;
        }
        else {
            setGenderError({
                error: false,
                message: ""
            });
        }
        if (data.abha.length !== 14 || isNaN(data.abha)) {
            setAbhaError({
                error: true,
                message: "ABHA ID should be of 14 digits"
            });
            flag = 1;
        }
        else {
            setAbhaError({
                error: false,
                message: ""
            });
        }
        if (data.aadhar.length !== 12 || isNaN(data.aadhar)) {
            setAadharError({
                error: true,
                message: "Aadhar number should be of 12 digits"
            });
            flag = 1;
        }
        else {
            setAadharError({
                error: false,
                message: ""
            });
        }
        if (grnumber.current.value === "" || (grnumber.current.value.length !== 7) || !grnumber.current.value.startsWith("G-")) {
            setGrnumberError({
                error: true,
                message: "GR Number should be of 5 digits and start with G-"
            });
            flag = 1;
        }
        else {
            setGrnumberError({
                error: false,
                message: ""
            });
        }
        if (!data.email.includes('@')) {
            setEmailError({
                error: true,
                message: "Enter a valid email address"
            });
            flag = 1;
        }
        else {
            setEmailError({
                error: false,
                message: ""
            });
        }
        if (data.specialisation === "") {
            setSpecialisationError({
                error: true,
                message: "Specialisation cannot be empty"
            });
            flag = 1;
        }
        else {
            setSpecialisationError({
                error: false,
                message: ""
            });
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

        // const res = await registerDoctor(data, accounts[0]);
        const res = await registerDoctor(data, accounts[0]);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const getProfile = await getDoctorOwnProfile(accounts[0]);
            if (getProfile.message) {
                enqueueSnackbar(getProfile.message, { variant: "error" });
            }
            else {
                const profile = {
                    name: getProfile["name"],
                    age: Number(getProfile["age"]),
                    email: getProfile["email"],
                    abhaId: getProfile["abhaId"],
                    aadharId: getProfile["aadharId"],
                    mobile: getProfile["mobile"],
                    gender: getProfile["gender"],
                    grNumber: getProfile["grNum"],
                    degreeName: getProfile["degreeName"]
                }
                enqueueSnackbar(`Welcome, ${profile.name}`);
                dispatch({ type: "LOGIN", payload: { accountType: "DOCTOR", accountAddress: accounts[0], profile: profile } })
                navigate("/Dashboard");
            }

        }
        console.log(res);
    };
    useEffect(() => {
        enqueueSnackbar("Please give access to only one account at a time, otherwise, the first account selected in Metamask would be used to login!", { variant: "info" })
    }, [])

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
                            Sign up as Doctor
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "600px", marginBottom: "60px" }}>
                            <Box component="div" sx={{ display: "flex", gap: "5px" }}><TextField
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
                                    name="age"
                                    label="Age"
                                    type="number"
                                    inputProps={{ inputMode: "numeric", min: "1", max: "120" }}
                                    id="age"
                                    inputRef={age}
                                    error={ageError.error}
                                    helperText={ageError.message}
                                />
                            </Box>
                            <FormControl fullWidth sx={{ marginTop: "8px 0" }} ><InputLabel id="demo-simple-select-label">Gender * </InputLabel><Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={handleGenderChange}
                                error={genderError.error}
                                helperText={genderError.message}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"other"}>Other</MenuItem>
                            </Select></FormControl>
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
                                id="abha"
                                label="ABHA ID"
                                name="abhaID"
                                inputRef={abha}
                                error={abhaError.error}
                                helperText={abhaError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="aadhar"
                                label="AADHAR ID"
                                type="text"
                                id="aadhar"
                                inputRef={aadhar}
                                error={aadharError.error}
                                helperText={aadharError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="GR-number"
                                label="General Registration (G.R.) Number"
                                name="grnumber"
                                type='text'
                                inputRef={grnumber}
                                error={grnumberError.error}
                                helperText={grnumberError.message}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="specialisation"
                                label="Specialisation"
                                name="specialisation"
                                inputRef={specialisation}
                                error={specialisationError.error}
                                helperText={specialisationError.message}
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

export default DoctorLogin;
