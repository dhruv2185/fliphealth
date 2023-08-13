import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Card, Container, CssBaseline, IconButton, InputBase } from '@mui/material';
import { enrollInClinicForDoctor, exitFromClinic, getDoctorOwnProfile, getOrgOfDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';
import SearchIcon from '@mui/icons-material/Search';

const DocUser = () => {

    const [docProfile, setDocProfile] = useState(null);
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(true);
    const [cli, setCli] = useState("");
    const [hosp, setHosp] = useState("")
    const search = useRef("");

    const handleAdd = async () => {
        const res = await enrollInClinicForDoctor(search.current.value, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Clinic Added Successfully", { variant: "success" });
        }
    }

    const handleExit = async () => {
        const res = await exitFromClinic(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Removed from Clinic successfully", { variant: "success" });
        }
    }

    const fetchOrgs = async () => {
        setIsLoading(true);
        const res = await getOrgOfDoctor(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            const o = res["hospitalProfile"].hospname === "" ? "NA" : ["hospitalProfile"].hospname;
            const c = res["clinicProfile"].name === "" ? "NA" : res["clinicProfile"].name;
            setHosp(o);
            setCli(c);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getDoctorOwnProfile(accountAddress);

            if (res.message) {
                enqueueSnackbar(res.message, { variant: "error" });
            }
            else {
                setDocProfile(res);
            }
            console.log(res);
        }
        fetchProfile();
        fetchOrgs();
    }, [accountAddress])


    return (
        <>
            <Container component="main" maxwidth="s" minwidth="xs"><CssBaseline /><Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                {docProfile !== null && <><Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px", display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <Avatar sx={{ bgcolor: "red", width: 100, height: 100, fontSize: 50 }} aria-label="recipe">
                            {docProfile["name"][0]}
                        </Avatar>
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >{docProfile["name"]}</p><p style={{ color: "grey" }}>{docProfile["degreeName"]}</p><p style={{ color: "grey" }}>G.R. : {Number(docProfile["grNum"])}</p></div>
                    </div>
                </Card>

                    <Card sx={{ margin: "auto", width: "60vw", minWidth: "400px", padding: "15px 20px" }}>
                        <h3>PERSONAL DETAILS</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                            <h4 style={{ color: "grey" }}>ABHA ID : </h4>
                            <b><h4>{Number(docProfile["abhaId"])}</h4></b>
                            <h4 style={{ color: "grey" }}>E-mail ID : </h4>
                            <b><h4>{docProfile["email"]}</h4></b>
                            <h4 style={{ color: "grey" }}>Aadhar ID : </h4>
                            <b><h4>{Number(docProfile["aadharId"])}</h4></b>
                            <h4 style={{ color: "grey" }}> Hospital/Clinic : </h4>
                            <b><h4>{hosp} / {cli}</h4></b>
                            <h4 style={{ color: "grey" }}>Phone Number : </h4>
                            <b><h4>{Number(docProfile["mobile"])}</h4></b>
                        </div>
                        {cli === "NA" && <><InputBase
                            sx={{ ml: 1, flex: 1 }}
                            inputRef={search}
                            placeholder="Add Clinic"
                            inputProps={{ 'aria-label': 'search ' }} /><IconButton type="submit" sx={{ p: '10px' }} onClick={handleAdd} aria-label="search">
                                <SearchIcon />
                            </IconButton></>}
                        {cli !== "" && cli !== "NA" && <IconButton type="submit" sx={{ p: '10px' }} onClick={handleExit} aria-label="search">
                            Exit From Clinic
                            <SearchIcon />
                        </IconButton>}
                    </Card></>}
            </Container>
        </>
    );
}

export default DocUser;
