import React, { useEffect, useState } from 'react';
import RecordCard from './RecordCard';
import { Container, CssBaseline } from '@mui/material';
import { getRecordsOfUser } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ViewRecords = () => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [records, setRecords] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getRecords = async () => {
            const res = await getRecordsOfUser(accountAddress, accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setRecords(res);

            }
            setLoading(false);
            console.log(res);

        }
        getRecords();
    }, [refresh, accountAddress])



    return (
        <>
            <Container component="main" maxWidth="s" minwidth="xs"><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                    {records.length === 0 && <h1>No Records Found</h1>}
                    {records.length !== 0 && records.map((record, index) => {
                        return <RecordCard key={index} data={record} refresh={refresh} setRefresh={setRefresh} />
                    })}


                </div></Container>
        </>
    );
}

export default ViewRecords;
