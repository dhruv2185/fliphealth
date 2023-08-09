
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DiagProfile from "./Diagnostics/DiagProfile";
import DiagUpload from "./Diagnostics/DiagUpload";
import DiagPatients from "./Diagnostics/DiagPatients";
const DiagnosticsProfile = () => {
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
                            <Tab label="User Profile" value="Profile" />
                            <Tab label="Upload Records" value="UploadRecords" />
                            <Tab label="View Patients" value="ViewPatients" />
                        </TabList>
                    </Box>
                    <TabPanel value="Profile"><DiagProfile /></TabPanel>
                    <TabPanel value="UploadRecords"><DiagUpload /></TabPanel>
                    <TabPanel value="ViewPatients"><DiagPatients /></TabPanel>

                </TabContext>
            </Box>
        </>
    );
}

export default DiagnosticsProfile;
