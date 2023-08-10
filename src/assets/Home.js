import React from 'react';
import Navbar from '../components/Navbar';
import classes from './Home.module.css';
import { Button } from '@mui/material';
import shield from "./images/shield.jpg";
import security from "./images/security.jpg";
import accessibility from "./images/accessibility.jpg";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <Navbar />
            <section className={classes.one}>
                <div className={classes.content}>
                    <div className={classes["text-content"]}>
                        <h1 className={classes.white}>Decentralised EHR Management Systems for <strong>EVERYONE!</strong>
                        </h1>
                        <h4 className={classes.blackish}>We offer Blockchain-Based services for EHR Management!</h4>
                        <div className={classes["two-button"]}>
                            <Link to="/Patient/SignIn"><Button variant='contained'>Get Started</Button></Link>
                            <Link to="/About"><Button variant='outlined'>About Us</Button></Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className={classes.two}>
                <div className={classes.heading}>
                    <h1>What We Do</h1>
                    <p className={classes.lightblack}>Here are some of the goals we have achieved using the power of Blockchain and Decentralisation</p>

                </div>


                <div className={classes.container}>
                    <div className={classes.info}>
                        <span><img src={shield} alt="" /></span>
                        <div className={classes.info__text}>
                            <h1>Privacy</h1>

                            <p>Patients can choose who has access to their data, and they can revoke access at any time.</p>
                        </div>
                    </div>
                    <div className={classes.info}>
                        <span><img src={security} alt="" /></span>
                        <div className={classes.info__text}>
                            <h1>Security</h1>

                            <p>dApps like FlipHealth are more secure than centralized applications because they are built on a blockchain network.</p>

                        </div>
                    </div>
                    <div className={classes.info}>
                        <span><img src={accessibility} alt="" /></span>
                        <div className={classes.info__text}>
                            <h1>Accessibility</h1>

                            <p>Doctors and other healthcare providers could access patient records from anywhere in the world. </p>


                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    );
}

export default Home;
