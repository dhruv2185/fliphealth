
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PatUser from "./Patient/PatUser";
import ViewRecords from "./Patient/ViewRecords";
import UploadRecords from "./Patient/UploadRecords";
import ManageAccess from "./Patient/ManageAccess";
import SearchDoctor from "./Patient/SearchDoctor";
import SearchDiag from "./Patient/SearchDiag";

const PatientProfile = () => {
    const [value, setValue] = useState('Profile');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered variant="fullWidth">
                            <Tab label="USER PROFILE" value="Profile" />
                            <Tab label="MY RECORDS" value="myRecords" />
                            <Tab label="UPLOAD RECORDS" value="uploadRecords" />
                            <Tab label="MANAGE ACCESS" value="manageAccess" />
                            <Tab label="SEARCH DOCTOR" value="searchDoctors" />
                            <Tab label="SEARCH DIAGNOSTICS" value="searchDiag" />

                        </TabList>
                    </Box>
                    <TabPanel value="Profile"><PatUser /></TabPanel>
                    <TabPanel value="myRecords"><ViewRecords /></TabPanel>
                    <TabPanel value="uploadRecords"><UploadRecords /></TabPanel>
                    <TabPanel value="manageAccess"><ManageAccess /></TabPanel>
                    <TabPanel value="searchDoctors"><SearchDoctor /></TabPanel>
                    <TabPanel value="searchDiag"><SearchDiag /></TabPanel>


                </TabContext>
            </Box>
        </>
    );
}

export default PatientProfile;
