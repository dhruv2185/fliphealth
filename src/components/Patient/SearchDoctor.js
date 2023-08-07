import { Container, CssBaseline, IconButton, InputBase, Paper, Box } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SearchDocResult from './SearchDocResult';
import Web3 from 'web3';
import { doctorABI } from '../../abis/doctor.js'
const web3 = new Web3('http://127.0.0.1:7545');
const doctorContract = new web3.eth.Contract(doctorABI, "0x7e96E574ABCD8Fc3d95492D499BD85B3c6bE4d18");

const SearchDoctor = () => {
    const [search, setSearch] = useState('');

    let doctorProfile;
    let accountAddress; // yeh globally stored logged in address hai
    // search by address
    // yeh galat ho sakta hai aur call ki jagah send ki jarurat pad sakti hai
    const searchByAddress = async (enteredAddress) => {
        const res = await doctorContract.methods.getDocProfile(enteredAddress).call({
            from: accountAddress
        });
        doctorProfile = res;
    }

    // I will return profiles of all doctors
    const searchByName = async () => {
        const res = await doctorContract.methods.getAllDoctors().call({
            from: accountAddress
        })
        doctorProfile = res;
    }

    const searchHandler = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs" sx={{ minHeight: "50vh" }}><CssBaseline /><Paper onSubmit={searchHandler}
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350, margin: '20px auto' }}
            >
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: "10px" }}><SearchDocResult /></Box>
            </Container>
        </>
    );
}

export default SearchDoctor;
