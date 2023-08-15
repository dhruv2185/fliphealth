import React, { useRef, useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { create as ipfsHttpClient } from "ipfs-http-client";
import { uploadRecordByUser } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const UploadRecords = () => {
    const [isLoading, setIsLoading] = useState(false);

    const accountAddress = useSelector(state => state.accountAddress);

    const [file, setFile] = useState(null);
    const ipfs = ipfsHttpClient({
        url: "https://ipfs.infura.io:5001",
        headers: {
            authorization,
        },
    });
    const [docType, setDocType] = useState('');
    const [fileErr, setFileErr] = useState(false);
    const recordname = useRef();
    const docName = useRef();
    const orgName = useRef();
    const [recordNameError, setRecordNameError] = useState({
        error: false,
        message: ""
    });
    const [docNameError, setDocNameError] = useState({
        error: false,
        message: ""
    });
    const [orgNameError, setOrgNameError] = useState({
        error: false,
        message: ""
    });
    const [docTypeError, setDocTypeError] = useState({
        error: false,
        message: ""
    });
    const handleChange = (event) => {
        setDocType(event.target.value);
    };
    const handleFileChange = (val) => {
        setFile(val)
        setFileErr(false);
    }
    const resetHandler = () => {
        setDocType('');
        setFile(null);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let flag = 0;
        if (recordname.current.value === "") {
            setRecordNameError({
                error: true,
                message: "Record Name is required"
            })
            flag = 1;
        }
        else {
            setRecordNameError({
                error: false,
                message: ""
            })
        }
        if (docName.current.value === "") {
            setDocNameError({
                error: true,
                message: "Doctor's Name is required"
            })
            flag = 1;
        }
        else {
            setDocNameError({
                error: false,
                message: ""
            })
        }
        if (orgName.current.value === "") {
            setOrgNameError({
                error: true,
                message: "Organisation's Name is required"
            })
            flag = 1;
        }
        else {
            setOrgNameError({
                error: false,
                message: ""
            })
        }
        if (docType === "") {
            setDocTypeError({
                error: true,
                message: "Document Type is required"
            })
            flag = 1;
        }
        else {
            setDocTypeError({
                error: false,
                message: ""
            })
        }
        if (flag === 1) {
            return;
        }
        if (file === null) {
            setFileErr(true);
        }
        else {
            // console.log("uploading");
            // console.log(ipfs);
            // console.log(file);
            setIsLoading(true);
            try {
                const result = await ipfs.add(file);
                // const result = await ipfs.pin.rm(file.cid);
                // console.log(result);
                // console.log("uploaded");
                const data = {
                    org: orgName.current.value,
                    date: new Date(),
                    doctorname: docName.current.value,
                    documentName: recordname.current.value,
                    path: result.path,
                    cid: result.cid,
                    docType: docType
                }
                const res = await uploadRecordByUser(
                    data,
                    accountAddress
                    // loggedInAddress
                )
                if (res.message) {
                    enqueueSnackbar(res.message, { variant: "error" })
                }
                else {
                    enqueueSnackbar("File upload successful!", { variant: "success" });
                    event.target.reset();
                    setDocType('');
                    setFile(null);
                }
                setIsLoading(false);
            } catch (err) {
                enqueueSnackbar("Failed to upload record", { variant: "error" });
                setIsLoading(false);
            }
        }
    }

    return (<><Container component="main" maxwidth="s" minwidth="xs"><CssBaseline />
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop><Box component="form" onSubmit={onSubmitHandler} sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: "20px"
        }}>  <TextField
                autoComplete='off'
                margin="normal"
                fullWidth
                name="name"
                label="Record Name"
                type="text"
                id="name"
                inputRef={recordname}
                sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}
                error={recordNameError.error}
                helperText={recordNameError.message}
            /><TextField
                autoComplete='off'
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
            /><FormControl sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}><InputLabel id="demo-simple-select-label">Record Type *</InputLabel><Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={docType}
                label="Record Type *"
                onChange={handleChange}
                error={docTypeError.error}
                helperText={docTypeError.message}
            >
                <MenuItem value={"Certificate"}>Certificate</MenuItem>
                <MenuItem value={"Report"}>Report</MenuItem>
                <MenuItem value={"Prescription"}>Prescription</MenuItem>
                <MenuItem value={"Mediclaim"}>MediClaim</MenuItem>
            </Select></FormControl><MuiFileInput error={fileErr} sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }} label="Upload File" value={file} onChange={handleFileChange} /><Box sx={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}><Button type="submit" variant='contained'>SUBMIT</Button><Button onClick={resetHandler} type="reset" color='neutral' variant='outlined'>DISCARD</Button></Box></Box></Container></>)
}

export default UploadRecords;
