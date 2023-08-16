import React, { useEffect, useRef, useState } from 'react';
import { Container, CssBaseline, IconButton, Modal, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { getHealthRecordsOfPatient } from '../../Utils/SmartContractUtils';
import { enqueueSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import DiagRecordCard from './DiagRecordCard';


const data = [
    {
        organisation: "City General Hospital",
        date: "2023-08-16",
        doctorName: "Dr. Smith",
        documentName: "Lab Test Results",
        documentPath: "/documents/lab_results.pdf",
        documentCid: "QmXqYzAbCdEf12345",
        owner: "0xAbCdEf0123456789",
        documentType: "Medical Report"
    },
    {
        organisation: "Healthcare Clinic",
        date: "2023-08-14",
        doctorName: "Dr. Johnson",
        documentName: "Prescription",
        documentPath: "/documents/prescription.pdf",
        documentCid: "XyZwAbCdEf67890",
        owner: "0x1234567890AbCdEf",
        documentType: "Prescription"
    },
    {
        organisation: "Specialty Medical Center",
        date: "2023-08-10",
        doctorName: "Dr. Martinez",
        documentName: "Radiology Report",
        documentPath: "/documents/radiology_report.pdf",
        documentCid: "WvUtAbCdEf45678",
        owner: "0x67890AbCdEf12345",
        documentType: "Medical Imaging"
    },
    {
        organisation: "Healthy Life Clinic",
        date: "2023-08-09",
        doctorName: "Dr. Adams",
        documentName: "Blood Test Results",
        documentPath: "/documents/blood_results.pdf",
        documentCid: "PqRsAbCdEf23456",
        owner: "0xAbCdEf5678901234",
        documentType: "Medical Report"
    },
    {
        organisation: "MediCare Center",
        date: "2023-08-07",
        doctorName: "Dr. White",
        documentName: "Follow-up Notes",
        documentPath: "/documents/followup_notes.pdf",
        documentCid: "MnOpAbCdEf78901",
        owner: "0x5678901234AbCdEf",
        documentType: "Notes"
    },
    {
        organisation: "Wellness Hospital",
        date: "2023-08-05",
        doctorName: "Dr. Brown",
        documentName: "MRI Scan Report",
        documentPath: "/documents/mri_report.pdf",
        documentCid: "KlMnAbCdEf34567",
        owner: "0xAbCdEf7890123456",
        documentType: "Medical Imaging"
    },
    {
        organisation: "Family Health Clinic",
        date: "2023-08-02",
        doctorName: "Dr. Wilson",
        documentName: "Vaccination Record",
        documentPath: "/documents/vaccine_record.pdf",
        documentCid: "EfGhAbCdIj23456",
        owner: "0x89012345AbCdEf67",
        documentType: "Immunization"
    },
    {
        organisation: "Cardio Care Center",
        date: "2023-07-28",
        doctorName: "Dr. Taylor",
        documentName: "EKG Results",
        documentPath: "/documents/ekg_results.pdf",
        documentCid: "BcDeAbCdEf45678",
        owner: "0x34567890AbCdEf12",
        documentType: "Medical Report"
    },
    {
        organisation: "Dental Excellence Clinic",
        date: "2023-07-25",
        doctorName: "Dr. Harris",
        documentName: "Dental X-rays",
        documentPath: "/documents/dental_xrays.pdf",
        documentCid: "ZyXwAbCdEf12345",
        owner: "0xAbCdEf6789012345",
        documentType: "Dental Imaging"
    },
    {
        organisation: "Eye Care Institute",
        date: "2023-07-22",
        doctorName: "Dr. Turner",
        documentName: "Eye Exam Report",
        documentPath: "/documents/eye_exam_report.pdf",
        documentCid: "XwYzAbCdEf78901",
        owner: "0x67890123AbCdEf45",
        documentType: "Medical Report"
    }
]

const DiagViewDocs = (props) => {
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(false);
    const { open, setOpen, patientAddress } = props;
    const searchText = useRef();
    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        setOpen(false);
    }
    const theme = useTheme();
    const fullscreen = useMediaQuery(theme.breakpoints.down('md'));
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '100vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        overflow: 'auto',
        ...(fullscreen && {
            height: '100vh',
            width: '100vw',
        })

    };

    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getRecords = async () => {
            // const res = await getHealthRecordsOfPatient("accountAddress");
            setIsLoading(true);
            // console.log(patientAddress)
            const res = await getHealthRecordsOfPatient(patientAddress, accountAddress);
            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setRecords(res);
                console.log(res);
            }
            setIsLoading(false);

        }
        getRecords();
    }, [patientAddress, accountAddress]);

    useEffect(() => {
        if (searchText.current.value !== "") {
            const regex = new RegExp(searchText, 'gi');
            console.log(regex);
            const res = data.filter((item) => item.organisation.match(regex));
            console.log(res);
            return res;
        }
    }, [searchText.current.value])

    return (
        <>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"><Box sx={{ ...style }} className={"flex"}><IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <h2 id="parent-modal-title">Patient Records</h2>
                    <p id="parent-modal-description">
                        Here, you can access Patient's Records.
                    </p><Container component="main" maxWidth="s" minWidth="xs"><CssBaseline />
                        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", justifyContent: "center" }} >
                            {records.length === 0 && <div style={{ height: "70vh", }}><h4 style={{ margin: "30vh 30vw" }}>No Records Found</h4></div>}
                            {records.length !== 0 && records.map((record, index) => {
                                return <DiagRecordCard key={index} data={record} />
                            })}
                        </div>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            inputRef={searchText}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search ' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Container>
                </Box>
            </Modal>
        </>
    );
}

export default DiagViewDocs;
