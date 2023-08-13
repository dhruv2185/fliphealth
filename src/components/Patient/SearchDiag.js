import { Container, CssBaseline, IconButton, InputBase, Paper, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDiagResult from './SearchDiagResult';
import { getAllDiagnostics, getDiagnosticForPatient, getDiagProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SearchDiag = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const search = useRef("");
    const [searchType, setSearchType] = useState('name');
    const [results, setResults] = useState([]);
    const [grantedDiag, setGrantedDiag] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }
    const getByAddress = async (address) => {
        setIsLoading(true);
        const result = await getDiagProfile(address, accountAddress);
        if (result.message) {
            enqueueSnackbar(result.message, { variant: "error" })
        }
        else {
            setResults([result]);
        }
        setIsLoading(false);
        // const result = await getDiagProfile("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");


    }
    const fetchDiagnostics = async () => {
        setIsLoading(true);
        const res = await getDiagnosticForPatient(accountAddress)
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const newres = (res.filter(item => item["myAdd"] !== "0x0000000000000000000000000000000000000000")).map(item => {
                return {
                    name: item["name"],
                    email: item["email"],
                    phone: item["phone"],
                    license: item["license"],
                    myAdd: item["myAdd"]
                }
            })
            setGrantedDiag(newres);
            console.log(newres)
        }
        setIsLoading(false);
        // const res = await getDiagnosticForPatient('accountAddress')
        // will return an array of objects and count of diagnostics sent
        // console.log(res);
        // or add a setState function which will store the granted diagnostics

    }
    const getByName = async (name) => {
        setIsLoading(true);
        const res = await getAllDiagnostics(accountAddress);
        const regex = new RegExp(name, "gi");


        const result = res.filter(
            item => (name !== '' && regex.test(item["name"]))
        )
        setResults(result);
        console.log(result);
        setIsLoading(false);
    }
    const searchHandler = (e) => {
        e.preventDefault();


        // to filter out the already granted diagnostics

        // const fetchDiagnostics = async () => {
        //     const res = await getDiagnosticForPatient(accountAddress);
        //     // const res = await getDiagnosticForPatient('accountAddress')
        //     // will return an array of objects and count of diagnostics sent
        //     console.log(res);
        //     // or add a setState function which will store the granted diagnostics
        //     return res;
        // }

        // if search by name
        // const res = await getAllDiagnostics();
        // console.log(res);
        // further logic to filter out the result using regex
        fetchDiagnostics();
        if (searchType === "name") {
            getByName(search.current.value);
        }
        // if search by address
        if (searchType === "address") {
            getByAddress(search.current.value);
        }

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
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search ' }}
                        inputRef={search}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {results.length !== 0 && results.map((item, index) => <SearchDiagResult key={index} data={item} grantedDiag={grantedDiag} isLoading={isLoading} setIsLoading={setIsLoading} />)}
                    {results.length === 0 && search.current.value === '' && <h3>ENTER A SEARCH QUERY</h3>}
                    {results.length === 0 && search.current.value !== '' && <h3>NO RESULTS FOUND</h3>}
                </Box>
            </Container>
        </>
    );
}

export default SearchDiag;
