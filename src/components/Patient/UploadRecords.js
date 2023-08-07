import React, { useState } from 'react';
import { MuiFileInput } from 'mui-file-input';
import { Box, Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const UploadRecords = () => {

    const [value, setValue] = useState(null)
    const [docType, setDocType] = useState('');

    const handleChange = (event) => {
        setDocType(event.target.value);
    };
    const handleFileChange = (newValue) => {
        setValue(newValue)
    }



    return (<><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><Box component="form" sx={{
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
            sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }}
        /><TextField
            margin="normal"
            required
            fullWidth
            name="docname"
            label="Doctor or Issuer's Name"
            type="text"
            id="docname"
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
        </Select></FormControl><MuiFileInput required sx={{ width: "40vw", maxWidth: "405px", minWidth: "250px" }} label="Upload File(*.pdf, *.jpg, *.png) " value={value} onChange={handleFileChange} /><Box sx={{ display: "flex", gap: "20px", justifyContent: "center", padding: "20px" }}><Button type="submit" variant='contained'>SUBMIT</Button><Button type="reset" color='neutral' variant='outlined'>DISCARD</Button></Box></Box></Container></>)
}

export default UploadRecords;
