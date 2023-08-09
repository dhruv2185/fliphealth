
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import HospiProfile from "./Hospital/HospiProfile";
import ViewDoctors from "./Hospital/ViewDoctors";
import SearchDoctors from "./Hospital/SearchDoctors";
const HospitalProfile = () => {
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
                            <Tab label="View Doctors" value="Doctors" />
                            <Tab label="Search Doctors" value="Search" />
                        </TabList>
                    </Box>
                    <TabPanel value="Profile"><HospiProfile /></TabPanel>
                    <TabPanel value="Doctors"><ViewDoctors /></TabPanel>
                    <TabPanel value="Search"><SearchDoctors /></TabPanel>

                </TabContext>
            </Box>
        </>
    );
}

export default HospitalProfile;
