import { Container, CssBaseline, IconButton, InputBase, Paper, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDocResult from './SearchDocResult';
import { searchDoctorByAddress, searchDoctorByName, getAllDoctorsForAPatient } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SearchDoctor = () => {
    const [isLoading, setIsLoading] = useState(false);
    const accountAddress = useSelector(state => state.accountAddress);
    const search = useRef("");
    const [searchType, setSearchType] = useState('name');
    const [searchResults, setSearchResults] = useState([]);
    const [grantedDoctors, setGrantedDoctors] = useState([]);
    const getByAddress = async (search) => {
        setIsLoading(true);
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
        setIsLoading(false);

    }
    const fetchDoctors = async () => {
        setIsLoading(true);
        const res = await getAllDoctorsForAPatient(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const newres = (res.filter(item => item.myAdd !== "0x0000000000000000000000000000000000000000")).map(item => {
                return {
                    name: item["name"],
                    degreeName: item["degreeName"],
                    age: item["age"],
                    grNum: item["grNum"],
                    myAdd: item["myAdd"]
                }
            })
            setGrantedDoctors(newres);
        }
        setIsLoading(false);
    }
    const getByName = async (search) => {
        setIsLoading(true);
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
        setIsLoading(false);

    }
    const searchHandler = (e) => {
        e.preventDefault();
        // if by address
        fetchDoctors();
        if (searchType === "address") {
            getByAddress(search.current.value);
        }
        // if by name
        if (searchType === "name") {
            getByName(search.current.value);
        }
    }
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }
    return (
        <>
            <Container component="main" maxwidth="s" minwidth="xs" sx={{ minHeight: "50vh" }}><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop><Paper onSubmit={searchHandler}
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
                        inputRef={search}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search ' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>{searchResults.length !== 0 && searchResults.map((item, index) => <SearchDocResult key={index} data={item} grantedDoctors={grantedDoctors} isLoading={isLoading} setIsLoading={setIsLoading} />)}
                    {searchResults.length === 0 && !search.current.value && <h5>ENTER A SEARCH QUERY</h5>}
                    {searchResults.length === 0 && search.current.value && <h5>NO RESULTS FOUND</h5>}</Box>
            </Container>
        </>
    );
}

export default SearchDoctor;
