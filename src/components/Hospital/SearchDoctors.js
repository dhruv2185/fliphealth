import { Container, CssBaseline, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import DoctorBox from './DoctorBox';
import { searchDoctorByAddress, searchDoctorByName } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import SearchDocResult from '../Patient/SearchDocResult';

const SearchDoctors = () => {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [searchResults, setSearchResults] = useState()
    const accountAddress = useSelector(state => state.accountAddress);

    const getByAddress = async (search) => {
        const res = await searchDoctorByAddress(
            search,
            accountAddress
        )
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            setSearchResults([res]);
        }
    }

    const getByName = async (search) => {
        const res = await searchDoctorByName(
            accountAddress
        )
        const regex = new RegExp(search, "gi");
        const newres = res.map(item => {
            return {
                name: item["name"],
                degreeName: item["degreeName"],
                age: item["age"],
                grNum: item["grNum"],
                myAdd: item["myAdd"]
            }
        })
        const result = newres.filter(
            item => (search !== "" && regex.test(item["name"]))
        )
        setSearchResults(result);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        // if search by address
        if (searchType === "address") {
            getByAddress(search.current.value);
        }
        // if search by name
        if (searchType === "name") {
            getByName(search.current.value);
        }
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {searchResults.length !== 0 && searchResults.map(item => <SearchDocResult data={item} />)}
                    {searchResults.length === 0 && search.current.value === "" && <h3>ENTER A SEARCH QUERY</h3>}
                    {searchResults.length === 0 && search.current.value !== "" && <h3>NO RESULTS FOUND</h3>}
                </Box>
            </Container>
        </>
    );
}

export default SearchDoctors;
