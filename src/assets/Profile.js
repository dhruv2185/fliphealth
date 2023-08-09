
import React from 'react';


import Navbar from '../components/Navbar';
import DoctorProfile from '../components/DoctorProfile';
import PatientProfile from '../components/PatientProfile';
import Footer from '../components/Footer';

const Profile = () => {

    return (
        <>
            <Navbar />
            <DoctorProfile />
            <Footer />
        </>
    );
}

export default Profile;
