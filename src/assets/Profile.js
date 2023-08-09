
import React from 'react';


import Navbar from '../components/Navbar';
import DoctorProfile from '../components/DoctorProfile';
import PatientProfile from '../components/PatientProfile';
import Footer from '../components/Footer';

import HospitalProfile from '../components/HospitalProfile';
import DiagnosticsProfile from '../components/DiagnosticsProfile';
import ClinicProfile from '../components/ClinicProfile';

const Profile = () => {

    return (
        <>
            <Navbar />
            <ClinicProfile />
            <Footer />
        </>
    );
}

export default Profile;
