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
                    doctorname: docName.current.value,
                    documentName: recordname.current.value,
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
                    setDocType('');
                    setFile(null);
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
                        required
                        fullWidth
                        name="name"
                        label="Record Name"
                        type="text"
                        id="name"
                        inputRef={recordname}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}
                    /><TextField
                        margin="normal"
                        required
                        fullWidth
                        name="patientaddress"
                        label="Patient Address"
                        type="text"
                        id="patientaddress"
                        inputRef={patientAddress}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                    /><TextField
                        margin="normal"
                        required
                        fullWidth
                        name="docname"
                        label="Doctor or Issuer's Name"
                        type="text"
                        id="docname"
                        inputRef={docName}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                    /><TextField
                        autoComplete='off'
                        margin="normal"
                        required
                        fullWidth
                        name="orgname"
                        label="Organisation's Name"
                        type="text"
                        id="orgname"
                        inputRef={orgName}
                        sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
                    />
                    <FormControl sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}><InputLabel id="demo-simple-select-label">Record Type *</InputLabel><Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={docType}
                        label="Record Type *"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={"certificate"}>Certificate</MenuItem>
                        <MenuItem value={"report"}>Report</MenuItem>
                    </Select></FormControl><MuiFileInput error={fileErr} sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }} label="Upload File(*.pdf, *.jpg, *.png) " value={file} onChange={handleFileChange} /><Box sx={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}><Button type="submit" variant='contained'>SUBMIT</Button><Button type="reset" color='neutral' variant='outlined'>DISCARD</Button></Box></Box></Container>
        </>
    );
}

export default DiagUpload;
