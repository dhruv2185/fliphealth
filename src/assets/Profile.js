
import React, { useEffect } from 'react';


import Navbar from '../components/Navbar';
import DoctorProfile from '../components/DoctorProfile';
import PatientProfile from '../components/PatientProfile';
import Footer from '../components/Footer';

import HospitalProfile from '../components/HospitalProfile';
import DiagnosticsProfile from '../components/DiagnosticsProfile';
import ClinicProfile from '../components/ClinicProfile';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const accountType = useSelector(state => state.accountType);
    const navigate = useNavigate();
    useEffect(() => {
        const credential = sessionStorage.getItem("credential") ? JSON.parse(sessionStorage.getItem("credential")) : null;
        if (!credential) {
            navigate("/");
        }
        else if (credential.accountType === null) {
            navigate("/");
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountType])
    return (
        <>
            <Navbar />
            {accountType === "CLINIC" && <ClinicProfile />}
            {accountType === "DIAGNOSTICS" && <DiagnosticsProfile />}
            {accountType === "DOCTOR" && <DoctorProfile />}
            {accountType === "HOSPITAL" && <HospitalProfile />}
            {accountType === "PATIENT" && <PatientProfile />}
            <Footer />
        </>
    );
}

export default Profile;
