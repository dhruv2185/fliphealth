import fetch from 'node-fetch';
import express, { json } from 'express';


import cors from 'cors';

const app = express();
const port = 3001;

app.use(json());
app.use(cors());

const API_BASE_URL = "https://api.sandbox.co.in";

// Proxy route for authenticating the app
app.post('/authenticate', async (req, res) => {
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

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).send('Authentication Failed');
        }
    } catch (error) {
        res.status(500).send('Authentication Failed');
    }
});

// Proxy route for generating OTP
app.post('/generateOTP', async (req, res) => {
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
            res.json(data);
        } else {
            res.status(response.status).send('Failed to Generate OTP');
        }
    } catch (error) {
        res.status(500).send('Failed to Generate OTP');
    }
});

// Proxy route for verifying OTP
app.post('/verifyOTP', async (req, res) => {
    try {
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
