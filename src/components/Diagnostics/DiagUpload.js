import React, { useRef, useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { uploadRecordsByDiagnostic } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);
const DiagUpload = () => {
    const [file, setFile] = useState(null);
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(false);
    const [docType, setDocType] = useState('');
    const [fileErr, setFileErr] = useState(false);
    const recordname = useRef();
    const docName = useRef();
    const orgName = useRef();
    const patientAddress = useRef();
    const [recordNameError, setRecordNameError] = useState({
        error: false,
        message: ''
    });
    const [docNameError, setDocNameError] = useState({
        error: false,
        message: ''
    });
    const [orgNameError, setOrgNameError] = useState({
        error: false,
        message: ''
    });
    const [docTypeError, setDocTypeError] = useState({
        error: false,
        message: ''
    });
    const [patientAddressError, setPatientAddressError] = useState({
        error: false,
        message: ''
    });
    const handleChange = (event) => {
        setDocType(event.target.value);
    };
    const handleFileChange = (val) => {
        console.log(val)
        setFile(val)
        setFileErr(false);
    }
    const resetHandler = () => {
        setDocType('');
        setFile(null);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const flag = 0;
        if (recordname.current.value === '') {
            setRecordNameError({
                error: true,
                message: 'Record Name is required'
            });
            flag = 1;
        }
        else {
            setRecordNameError({
                error: false,
                message: ''
            });
        }
        if (docName.current.value === '') {
            setDocNameError({
                error: true,
                message: 'Doctor Name is required'
            });
            flag = 1;
        }
        else {
            setDocNameError({
                error: false,
                message: ''
            });
        }
        if (orgName.current.value === '') {
            setOrgNameError({
                error: true,
                message: 'Organisation Name is required'
            });
            flag = 1;
        }
        else {
            setOrgNameError({
                error: false,
                message: ''
            });
        }
        if (docType === '') {
            setDocTypeError({
                error: true,
                message: 'Document Type is required'
            });
            flag = 1;
        }
        else {
            setDocTypeError({
                error: false,
                message: ''
            });
        }
        if (patientAddress.current.value === '') {
            setPatientAddressError({
                error: true,
                message: 'Patient Address is required'
            });
            flag = 1;
        }
        else {
            setPatientAddressError({
                error: false,
                message: ''
            });
        }
        if (flag === 1) {
            return;
        }
        if (file === null) {
            setFileErr(true);
        }
        else {
            setIsLoading(true);
            try {
                const result = await ipfs.add(file);
                console.log(result);
                console.log("uploaded");

                const data = {
                    org: orgName.current.value,
                    date: new Date(),
                    documentName: recordname.current.value,
                    doctorname: docName.current.value,
                    path: result.path,
                    cid: result.cid,
                    docType: docType,
                }
                const padd = patientAddress.current.value;
                const res = await uploadRecordsByDiagnostic(data, accountAddress, padd);
                if (res.message) {
                    enqueueSnackbar(res.message, { variant: "error" });
                }
                else {
                    enqueueSnackbar("File uploaded successfully", { variant: "success" });
                    event.target.reset();
                    resetHandler();
                }
                setIsLoading(false);
                console.log(res);
            }
            catch (err) {
                enqueueSnackbar("Error in uploading record", { variant: "error" });
                setIsLoading(false);
            }
        }
    }
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box component="form" onSubmit={onSubmitHandler} sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: "20px"
                }}>  <TextField
                        margin="normal"
                        fullWidth
                        name="patientaddress"
                        label="Patient Address"
                        type="text"
                        id="patientaddress"
                        inputRef={patientAddress}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}
                        error={patientAddressError.error}
                        helperText={patientAddressError.message}
                    /><TextField
                        margin="normal"
                        fullWidth
                        name="name"
                        label="Record Name"
                        type="text"
                        id="name"
                        inputRef={recordname}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                        error={recordNameError.error}
                        helperText={recordNameError.message}
                    /><TextField
                        margin="normal"
                        fullWidth
                        name="docname"
                        label="Doctor or Issuer's Name"
                        type="text"
                        id="docname"
                        inputRef={docName}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                        error={docNameError.error}
                        helperText={docNameError.message}
                    /><TextField
                        autoComplete='off'
                        margin="normal"
                        fullWidth
                        name="orgname"
                        label="Organisation's Name"
                        type="text"
                        id="orgname"
                        inputRef={orgName}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                        error={orgNameError.error}
                        helperText={orgNameError.message}
                    />
                    <FormControl sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}><InputLabel id="demo-simple-select-label">Record Type *</InputLabel><Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={docType}
                        label="Record Type *"
                        onChange={handleChange}
                        error={docTypeError.error}
                        helperText={docTypeError.message}
                    >
                        <MenuItem value={"certificate"}>Certificate</MenuItem>
                        <MenuItem value={"report"}>Report</MenuItem>
                    </Select></FormControl><MuiFileInput error={fileErr} sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }} label="Upload File(*.pdf, *.jpg, *.png) " value={file} onChange={handleFileChange} /><Box sx={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}><Button type="submit" variant='contained'>SUBMIT</Button><Button onClick={resetHandler} type="reset" color='neutral' variant='outlined'>DISCARD</Button></Box></Box></Container>
        </>
    );
}

export default DiagUpload;
