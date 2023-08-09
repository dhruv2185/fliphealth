import React, { useState } from 'react';
import RecordCard from './RecordCard';
import { Container, CssBaseline } from '@mui/material';
import { getRecordsOfUser } from '../../Utils/SmartContractUtils';


const ViewRecords = () => {

    const [records, setRecords] = useState([]);

    // const getRecords = async () => {
    //     const res = await getRecordsOfUser("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029")
    //     console.log(res[0].date);
    //     setRecords(records);
    // }
    // getRecords();

    return (
        <>
            <Container component="main" maxWidth="s" minWidth="xs"><CssBaseline /><div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="img" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
                <RecordCard type="pdf" />
            </div></Container>
        </>
    );
}

export default ViewRecords;
