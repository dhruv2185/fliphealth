import React, { useEffect, useState } from 'react';
import RecordCard from './RecordCard';
import { Container, CssBaseline, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getRecordsOfUser } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ViewRecords = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [allRecords, setAllRecords] = useState([]);
    const [records, setRecords] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        const getRecords = async () => {
            const res = await getRecordsOfUser(accountAddress, accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setRecords(res);
                setAllRecords(res);
            }
            setLoading(false);
            console.log(res);

        }
        getRecords();
    }, [refresh, accountAddress])

    useEffect(() => {
        if (searchText !== "") {
            const regex = new RegExp(searchText, 'i');
            console.log(regex);
            const res = allRecords.filter((item) => (regex.test(item.organisation) || regex.test(item.doctorName) || regex.test(item.documentName) || regex.test(item.doumentType)));
            console.log(res);
            setRecords(res);
        }
        else {
            setRecords(allRecords)
        }
    }, [searchText, allRecords])

    return (
        <>
            <Container component="main" maxWidth="s" minwidth="xs"><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                <center style={{ padding: "20px" }}><InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search ' }}
                    value={searchText}
                    onChange={(event) => {
                        setSearchText(event.target.value)
                    }}
                />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton></center>
                <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >

                    {records.length === 0 && <div style={{ height: "70vh", }}><h4 style={{ margin: "30vh 30vw" }}>No Records Found</h4></div>}
                    {records.length !== 0 && records.map((record, index) => {
                        return <RecordCard key={index} data={record} refresh={refresh} setRefresh={setRefresh} />
                    })}
                </div>

            </Container>
        </>
    );
}

export default ViewRecords;
