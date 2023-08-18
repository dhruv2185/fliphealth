import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Card, Container, CssBaseline, IconButton, InputBase, Button } from '@mui/material';
import { enrollInClinicForDoctor, exitFromClinic, getDoctorOwnProfile, getOrgOfDoctor } from '../../Utils/SmartContractUtils';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { enqueueSnackbar } from 'notistack';

import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from '../ConfirmDialog';
const DocUser = () => {

    const [docProfile, setDocProfile] = useState(null);
    const accountAddress = useSelector(state => state.accountAddress);
    const [isLoading, setIsLoading] = useState(true);
    const [cli, setCli] = useState("");
    const [hosp, setHosp] = useState("")
    const search = useRef("");
    const [refresh, setRefresh] = useState(false);
    const [confirm1, setConfirm1] = useState(false);
    const [confirm2, setConfirm2] = useState(false);
    const handleAdd = async () => {
        const res = await enrollInClinicForDoctor(search.current.value, accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Clinic Added Successfully", { variant: "success" });
        }
        setRefresh(!refresh);
    }

    const handleExit = async () => {
        const res = await exitFromClinic(accountAddress);
        if (res.message) {
            enqueueSnackbar(res.message, { variant: "error" });
        }
        else {
            enqueueSnackbar("Removed from Clinic successfully", { variant: "success" });
        }
        setRefresh(!refresh);
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
        }
        fetchProfile();
        fetchOrgs();
    }, [accountAddress, refresh])

    return (
        <><ConfirmDialog open={confirm1} setOpen={setConfirm1} onConfirm={handleAdd} title={"ADD to Clinic"} children={"Are you sure you want to ADD yourself to this clinic?"} />
            <ConfirmDialog open={confirm2} setOpen={setConfirm2} onConfirm={handleExit} title={"Leave Clinic"} children={"Are you sure you want to LEAVE your CURRENT Clinic?"} />
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
                        <div style={{ margin: "auto 60px", lineHeight: "16px" }}><p >{docProfile["name"]}</p><p style={{ color: "grey" }}>{docProfile["degreeName"]}</p><p style={{ color: "grey" }}>G.R. : G-{Number(docProfile["grNum"])}</p></div>
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
                        <center>
                            {cli === "NA" && <div><InputBase
                                sx={{ ml: 1, flex: 1, minWidth: "300px", backgroundColor: "#595959", padding: 1, borderRadius: "5px" }}
                                inputRef={search}
                                placeholder="Add Clinic (Address)"
                                inputProps={{ 'aria-label': 'search ' }} /><IconButton type="submit" sx={{ p: '10px' }} onClick={() => {
                                    setConfirm1(true);
                                }} aria-label="search">
                                    <AddIcon />
                                </IconButton></div>}
                            {cli !== "" && cli !== "NA" && <Button type="submit" sx={{ p: '10px' }} onClick={() => {
                                setConfirm2(true);

                            }} color="neutral" variant="outlined">
                                Exit From Clinic

                            </Button>}</center>
                    </Card></>}
            </Container>
        </>
    );
}

export default DocUser;
