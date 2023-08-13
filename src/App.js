
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
import About from './assets/About';
import Contact from './assets/Contact';
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux';



function App() {

  const dispatch = useDispatch();
  dispatch({
    type: "UPDATE", payload: {
      accountAddress: "0x17d9BbE5bA09ea6a46Ece6D559Ff3d620A7876E4", accountType: "PATIENT", authenticated: true, profile: {
        name: "omkar Wadu", age: "18", abhaId: 867, aadharId: 7858, gender: "male", mobile: "342424", email: "omkar@hotmail.com"
      }
    }
  })
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
        <SnackbarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Dashboard" element={<Profile />} />
              <Route path="/Patient/SignIn" element={<PatientLogin />} />
              <Route path="/Doctor/SignIn" element={<DoctorLogin />} />
              <Route path="/Diagnostics/SignIn" element={<Diagnostics />} />
              <Route path="/Clinic/SignIn" element={<ClinicLogin />} />
              <Route path="/Hospital/SignIn" element={<HospitalLogin />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />


            </Routes>
          </Router></SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
