import { Container, CssBaseline, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useRef, useState } from 'react';
import DoctorBox from './DoctorBox';
import { getDoctorsOfHospital, searchDoctorByAddress, searchDoctorByName } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const SearchDoctors = () => {
    const [isLoading, setIsLoading] = useState(false);
    const search = useRef("");
    const [searchType, setSearchType] = useState('name');
    const [searchResults, setSearchResults] = useState([])
    const accountAddress = useSelector(state => state.accountAddress);
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
    const getDoctors = async () => {
        const res = await getDoctorsOfHospital(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        } else {
            const newRes = res.filter((doc) => doc["name"] !== "");
            setGrantedDoctors(newRes);
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
        getDoctors();
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
            <Container component="main" maxWidth="s" minWidth="xs" sx={{ minHeight: "50vh" }}><CssBaseline /><Backdrop
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}>
                    {searchResults.length !== 0 && searchResults.map((item, index) => <DoctorBox key={index} data={item} grantedDoctors={grantedDoctors} isLoading={isLoading} setIsLoading={setIsLoading} />)}
                    {searchResults.length === 0 && search.current.value === "" && <h5>ENTER A SEARCH QUERY</h5>}
                    {searchResults.length === 0 && search.current.value !== "" && <h5>NO RESULTS FOUND</h5>}
                </Box>
            </Container>
        </>
    );
}

export default SearchDoctors;
