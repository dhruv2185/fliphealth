import { Container, CssBaseline, IconButton, InputBase, Paper, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import React, { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDiagResult from './SearchDiagResult';
import { getAllDiagnostics, getDiagnosticForPatient, getDiagProfile } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

const SearchDiag = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const search = useRef("");
    const [searchType, setSearchType] = useState('name');
    const [results, setResults] = useState([]);
    const handleChange = (event) => {
        setSearchType(event.target.value);
    }
    const getByAddress = async (address) => {
        const result = await getDiagProfile(address, accountAddress);
        if (result.message) {
            enqueueSnackbar(result.message, { variant: "error" })
        }
        else {
            result.address = address;
            setResults([result]);
        }
        // const result = await getDiagProfile("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029", "0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029");


    }
    const getByName = async (name) => {
        const res = await getAllDiagnostics(accountAddress);
        const regex = new RegExp(name, "gi");
        const newres = [];
        for (let i = 0; i < res[0].length; i++) {
            newres.push({
                Diagname: res[0][i].Diagname,
                email: res[0][i].email,
                phone: Number(res[0][i].phone),
                license: res[0][i].license,
            })
        }
        for (let i = 0; i < res[1].length; i++) {
            newres[i].address = res[1][i];
        }
        const result = newres.filter(
            item => (name !== '' && regex.test(item.Diagname))
        )
        setResults(result);
        console.log(results);
    }
    const searchHandler = (e) => {
        e.preventDefault();


        // to filter out the already granted diagnostics

        const fetchDiagnostics = async () => {
            const res = await getDiagnosticForPatient('0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029')
            // const res = await getDiagnosticForPatient('accountAddress')
            // will return an array of objects and count of diagnostics sent
            console.log(res);
            // or add a setState function which will store the granted diagnostics
            return res;
        }

        // if search by name
        // const res = await getAllDiagnostics();
        // console.log(res);
        // further logic to filter out the result using regex
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
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search ' }}
                    inputRef={search}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {results.length !== 0 && results.map(item => <SearchDiagResult data={item} />)}
                    {results.length === 0 && search.current.value === '' && <h3>ENTER A SEARCH QUERY</h3>}
                    {results.length === 0 && search.current.value !== '' && <h3>NO RESULTS FOUND</h3>}
                </Box>
            </Container>
        </>
    );
}

export default SearchDiag;
