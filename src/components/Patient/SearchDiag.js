import { Container, CssBaseline, IconButton, InputBase, Paper, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDiagResult from './SearchDiagResult';
import { getAllDiagnostics } from '../../Utils/SmartContractUtils';

const SearchDiag = () => {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('name');
    const searchHandler = (e) => {
        e.preventDefault();
    }
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }


    const handleSearch = async () => {
        // if search by name
        // const res = await getAllDiagnostics();
        // console.log(res);
        // further logic to filter out the result using regex

        // if search by address
        // const result = await getDiagProfile("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");
        // const result = await getDiagProfile("diagAddress", "accountAddress");
        // console.log(result);
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><SearchDiagResult /></Box>
            </Container>
        </>
    );
}

export default SearchDiag;
