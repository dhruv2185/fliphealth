import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material"
const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{

                p: 6,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            We are FlipHealth, dedicated to providing the best experience in the field of Electronic Health Record Management.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            PDPM IIITDM Jabalpur, Madhya Pradesh
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: XXXXXX@fliphealth.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +91 8430X XXXXX
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" >
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"

                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" >
                            <Twitter />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Crafted with ❤️ by Dhruv Ghevariya, Naman Bhagat and Omkar Wadekar.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
