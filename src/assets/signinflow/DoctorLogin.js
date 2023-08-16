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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getDoctorOwnProfile, registerDoctor } from '../../Utils/SmartContractUtils';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { authenticate, generateOtp, verifyOTP } from '../../Utils/AadhaarVerification';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    height: "40vh",
    minHeight: "400px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const DoctorLogin = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [aadhaar, setAadhaar] = useState(true);
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
    const [otp, setOtp] = useState("");
    const [refId, setRefId] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [openOTP, setOpenOTP] = useState(false);
    const [data, setData] = useState();
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
            enqueueSnackbar("Please give access to only one account at a time, otherwise, the first account selected in Metamask would be used to LOGIN!", { variant: "info" })
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
                                age: Number(getProfile["age"]),
                                email: getProfile["email"],
                                abhaId: Number(getProfile["abhaId"]),
                                aadharId: Number(getProfile["aadharId"]),
                                mobile: Number(getProfile["mobile"]),
                                gender: getProfile["gender"],
                                grNumber: Number(getProfile["grNum"]),
                                degreeName: getProfile["degreeName"]
                            }
                            sessionStorage.setItem("credential", JSON.stringify({ accountType: "DOCTOR", accountAddress: res[0], profile: profile }))
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
                    abhaId: Number(getProfile["abhaId"]),
                    aadharId: Number(getProfile["aadharId"]),
                    mobile: Number(getProfile["mobile"]),
                    gender: getProfile["gender"],
                    grNumber: Number(getProfile["grNum"]),
                    degreeName: getProfile["degreeName"]
                }
                sessionStorage.setItem("credential", JSON.stringify({ accountType: "DOCTOR", accountAddress: accounts[0], profile: profile }))
                enqueueSnackbar(`Welcome, ${profile.name}`);
                dispatch({ type: "LOGIN", payload: { accountType: "DOCTOR", accountAddress: accounts[0], profile: profile } })
                navigate("/Dashboard");
            }

        }
        console.log(res);
    };
    const handleFirstSubmit = async (event) => {
        event.preventDefault();
        let flag = 0;
        console.log(grnumber.current.value)
        const onlyNumber = Number(grnumber.current.value.substring(2));
        const received = { phone: phone.current.value, abha: abha.current.value, aadhar: aadhar.current.value, grnumber: onlyNumber, specialisation: specialisation.current.value }
        setData(received);
        if (received.phone === "" || received.phone.length !== 10 || isNaN(received.phone)) {
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
        if (received.abha.length !== 14 || isNaN(received.abha)) {
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
        if (received.aadhar.length !== 12 || isNaN(received.aadhar)) {
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
        if (received.specialisation === "") {
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

        const token = authenticate();
        if (token.message) {
            enqueueSnackbar(token.message, {
                variant: "error"
            })
            // return;
        }
        else {
            setAccessToken(token);
        }

        const result = await generateOtp(data.aadhar, accessToken);
        if (result.message) {
            enqueueSnackbar(result.message, { variant: "error" });
            // return;
        }
        setRefId(result.ref_id);
        setOpenOTP(true);
    }
    const handleOtpChange = (newvalue) => {
        setOtp(newvalue);
    }
    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpenOTP(false);

    }
    const resendOTP = async () => {
        const result = await generateOtp(data.aadhar, accessToken);
        if (result.message) {
            enqueueSnackbar(result.message, { variant: "error" });
            // return;
        }
        setRefId(result.ref_id);
    }
    const handleSecondSubmit = async (event) => {
        event.preventDefault();
        const veriOTP = await verifyOTP(refId, otp, accessToken);
        // error case
        if (veriOTP.message) {
            enqueueSnackbar(veriOTP.message, { variant: "error" });
            // return;
        }
        const aadharDetails = veriOTP;
        data.name = aadharDetails.name;
        data.gender = aadharDetails.gender;
        data.age = 23;
        data.email = aadharDetails.email;
        console.log(data);

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
                    abhaId: Number(getProfile["abhaId"]),
                    aadharId: Number(getProfile["aadharId"]),
                    mobile: Number(getProfile["mobile"]),
                    gender: getProfile["gender"],
                    grNumber: Number(getProfile["grNum"]),
                    degreeName: getProfile["degreeName"]
                }
                sessionStorage.setItem("credential", JSON.stringify({ accountType: "DOCTOR", accountAddress: accounts[0], profile: profile }))
                enqueueSnackbar(`Welcome, ${profile.name}`);
                dispatch({ type: "LOGIN", payload: { accountType: "DOCTOR", accountAddress: accounts[0], profile: profile } })
                navigate("/Dashboard");
            }

        }
        console.log(res);
    }

    return (
        <>
            {isLoading && <Box sx={{ display: 'flex', position: "absolute", top: "48%", left: "48%" }}>
                <CircularProgress />
            </Box>}
            {!isLoading && <><Navbar />
                <Container component="main" maxWidth="s">
                    <CssBaseline />
                    {!aadhaar && <Box
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
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
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
                                    <Link onClick={() => { setAadhaar(true) }} variant="body2">
                                        Sign Up with Aadhaar
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://healthid.ndhm.gov.in/register" variant="body2" target="_blank">
                                        {"Don't have an ABHA ID? Create Now!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>}{
                        aadhar && <><Modal
                            open={openOTP}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Aadhaar OTP Verification
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Enter the OTP sent to your Aadhaar linked Mobile number.
                                </Typography>
                                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "inherit", paddingTop: "40px" }} component={"form"} onSubmit={handleSecondSubmit}>
                                    <MuiOtpInput value={otp} length={6} onChange={handleOtpChange} /><div style={{ alignSelf: "flex-end", display: "flex", gap: "20px" }}>
                                        <Button color='neutral' onClick={handleClose} className={"btn"} variant="text">CANCEL</Button>
                                        <Button onClick={resendOTP} className={"btn"} variant="outlined">RESEND OTP</Button>
                                        <Button className={"btn"} type='submit' variant="contained" >VERIFY</Button></div>
                                </Box>
                            </Box>
                        </Modal><Box
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
                                <Box component="form" onSubmit={handleFirstSubmit} sx={{ mt: 1, maxWidth: "600px", marginBottom: "60px" }}>
                                    <Box component="div" sx={{ display: "flex", gap: "5px" }}>
                                    </Box>
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
                                        type='text'
                                        label="ABHA ID"
                                        name="abhaID"
                                        inputRef={abha}
                                        error={abhaError.error}
                                        helperText={abhaError.message}
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
                                            <Link onClick={() => {
                                                setAadhaar(false);
                                            }} variant="body2">
                                                TEST Sign up
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="https://healthid.ndhm.gov.in/register" variant="body2" target="_blank">
                                                {"Don't have an ABHA ID? Create Now!"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box></>
                    }
                </Container><Footer /></>}
        </>
    );

}

export default DoctorLogin;
