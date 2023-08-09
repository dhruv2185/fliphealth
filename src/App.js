
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './assets/Home';


import PatientLogin from './assets/signinflow/PatientLogin';
import DoctorLogin from './assets/signinflow/DoctorLogin';
import Profile from './assets/Profile';
import Diagnostics from './assets/signinflow/Diagnostics';
import HospitalLogin from './assets/signinflow/HospitalLogin';
import ClinicLogin from './assets/signinflow/ClinicLogin';




function App() {


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      neutral: {
        main: '#f45c03',

      }
    },

  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Patient/SignIn" element={<PatientLogin />} />
            <Route path="/Doctor/SignIn" element={<DoctorLogin />} />
            <Route path="/Diagnostics/SignIn" element={<Diagnostics />} />
            <Route path="/Clinic/SignIn" element={<ClinicLogin />} />
            <Route path="/Hospital/SignIn" element={<HospitalLogin />} />


          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
