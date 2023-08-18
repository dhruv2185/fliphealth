import fetch from 'node-fetch';
import express, { json } from 'express';
import 'dotenv/config';

import cors from 'cors';

const app = express();
const port = 3001;

app.use(json());
app.use(cors());

const API_BASE_URL = process.env.API_BASE_URL;

// Proxy route for authenticating the app
app.post('/authenticate', async (req, res) => {
    console.log("authenticating");
    try {
        const response = await fetch(`${API_BASE_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY,
                "x-api-secret": process.env.REACT_APP_SANDBOX_API_SECRET,
                "x-api-version": "1.0",
            },
            body: JSON.stringify(req.body),
        });
        // console.log(response);
        if (response.ok) {
            const data = await response.json();
            // console.log("access token aa gaya");
            // console.log(data);
            res.json(data);
        } else {
            // console.log(await response.json())
            res.status(response.status).json({
                message: "Kuch toh gadbad hai daya"
            });
        }
    } catch (error) {
        // console.log("error");
        res.status(500).send('Authentication Failed');
    }
});

// Proxy route for generating OTP
app.post('/generateOTP', async (req, res) => {
    console.log("generate");
    // console.log(req.body);
    console.log(req.headers.authorization);
    try {
        const response = await fetch(`${API_BASE_URL}/kyc/aadhaar/okyc/otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY,
                "x-api-version": "1.0",
            },
            body: JSON.stringify(req.body),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            res.json(data);

        } else {
            res.status(response.status).json({
                message: response.message
            });
        }
    } catch (error) {
        console.log("error");
        res.status(500).json({
            message: "Failed to generate OTP due to internal server error."
        });
    }
});

// Proxy route for verifying OTP
app.post('/verifyOTP', async (req, res) => {
    console.log("verify");
    try {
        console.log(req.headers);
        const response = await fetch(`${API_BASE_URL}/kyc/aadhaar/okyc/otp/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
                "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY,
                "x-api-version": "1.0",
            },
            body: JSON.stringify(req.body),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            res.json(data);

        } else {
            res.status(response.status).send('Failed to Verify OTP');
        }
    } catch (error) {
        res.status(500).send('Failed to Verify OTP');
    }
});

app.listen(port, () => {
    console.log(`Your Proxy server is running on port ${port}`);
});
