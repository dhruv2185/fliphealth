import { Container, CssBaseline, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import DoctorBox from './DoctorBox';
import { searchDoctorByAddress, searchDoctorByName } from '../../Utils/SmartContractUtils';

const SearchDoctors = () => {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [searchResults, setSearchResults] = useState()

    const getSearchResults = async () => {
        // if by address
        const res = searchDoctorByAddress(
            "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029",
            "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029"
        )
        // const res = searchDoctorByAddress(
        // enteredAddress, loggedInAddress
        // )
        setSearchResults(res);

        // if by name
        const result = await searchDoctorByName(
            "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029"
            // or loggedInAddress
        )
        setSearchResults(result);
        console.log(searchResults);
        // further regex logic
    }

    const searchHandler = (e) => {
        e.preventDefault();
    }
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs" sx={{ minHeight: "50vh" }}><CssBaseline /><Paper onSubmit={searchHandler}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: '20px auto' }}
            >   <FormControl ><InputLabel id="demo-simple-select-label">Search By</InputLabel><Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchType}
                label="Search Type"
                onChange={handleChange}
                required
            >
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"address"}>Address</MenuItem>

            </Select></FormControl>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search ' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><DoctorBox /><DoctorBox /><DoctorBox /><DoctorBox /></Box>
            </Container>
        </>
    );
}

export default SearchDoctors;
