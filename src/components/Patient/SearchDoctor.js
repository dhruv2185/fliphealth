import { Container, CssBaseline, IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
const SearchDoctor = () => {
    const [search, setSearch] = useState('');
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
                    inputProps={{ 'aria-label': 'search strategy' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper></Container>
        </>
    );
}

export default SearchDoctor;
