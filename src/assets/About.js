import React, { useState } from "react";
import { Container, Image, Card, Typography } from "@mui/material";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    const [teamMembers, setTeamMembers] = useState([
        {
            name: "John Doe",
            imageUrl: "https://picsum.photos/200/200",
            description:
                "John is the founder and CEO of our company. He is a visionary leader with a passion for technology.",
        },
        {
            name: "Jane Doe",
            imageUrl: "https://picsum.photos/200/200",
            description:
                "Jane is the CTO of our company. She is a brilliant engineer with a knack for solving complex problems.",
        },
        {
            name: "Peter Smith",
            imageUrl: "https://picsum.photos/200/200",
            description:
                "Peter is the lead developer of our team. He is a talented engineer with a deep understanding of software development.",
        },
    ]);

    return (
        <>
            <Navbar />
            <Container>
                <h1>About Us</h1>
                <Card>

                </Card>
            </Container>
            <Footer /></>

    );

}

export default About;
