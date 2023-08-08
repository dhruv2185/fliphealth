import React, { useRef, useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
import { Document, Page, pdfjs } from 'react-pdf';

const web3 = new Web3('http://127.0.0.1:7545');
const doctorContract = new web3.eth.Contract(doctorABI, "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18");

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const UploadRecords = () => {

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
    const handleChange = (event) => {
        setDocType(event.target.value);
    };
    const handleFileChange = (val) => {
        console.log(val)
        setFile(val)
        setFileErr(false);
    }
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess(numPages) {
        setNumPages(numPages);
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (file === null) {
            setFileErr(true);
        }
        else {
            console.log("uploading");
            console.log(ipfs);
            console.log(file);
            const result = await ipfs.add(file);
            console.log(result);
            console.log("uploaded");

            const cid = result.cid; // tostring
            const path = result.path;

            // add arguments to below function
            const res = await doctorContract.methods.addRecordByUser(cid, path, docType).send({
                from: "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18",
                gas: 3000000
            });
            console.log(res);
        }


    }


    return (<><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box component="form" onSubmit={onSubmitHandler} sx={{
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
            name="docname"
            label="Doctor or Issuer's Name"
            type="text"
            id="docname"
            inputRef={docName}
            sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px", marginTop: "0" }}
        /><FormControl sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}><InputLabel id="demo-simple-select-label">Record Type *</InputLabel><Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={docType}
            label="Record Type *"
            onChange={handleChange}
            required
        >
            <MenuItem value={"certificate"}>Certificate</MenuItem>
            <MenuItem value={"report"}>Report</MenuItem>
            <MenuItem value={"prescription"}>Prescription</MenuItem>
            <MenuItem value={"mediclaim"}>MediClaim</MenuItem>
        </Select></FormControl><MuiFileInput error={fileErr} sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }} label="Upload File(*.pdf, *.jpg, *.png) " value={file} onChange={handleFileChange} /><Box sx={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}><Button type="submit" variant='contained'>SUBMIT</Button><Button type="reset" color='neutral' variant='outlined'>DISCARD</Button></Box></Box><Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document></Container></>)
}

export default UploadRecords;
