import fetch from 'node-fetch';

// Assuming this code is in your React component or other appropriate location

// Authentication function
const authenticate = async () => {
    try {
        const res = await fetch(
            'http://localhost:3001/authenticate', // Update with your proxy server URL
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Your authentication request data
                    login_id: 'your_login_id',
                    password: 'your_password',
                }),
            }
        );

        if (res.ok) {
            const data = await res.json();
            const accessToken = data.access_token;
            console.log(data);
            return accessToken;
        } else {
            const errObject = {
                message: "Authentication failed due to server error."
            };
            return errObject;
        }
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Authentication failed due to network error."
        };
        return errObject;
    }
};

// Generate OTP function
const generateOtp = async (aadharNumber, accessToken) => {
    try {
        const res = await fetch(
            'http://localhost:3001/generateOTP', // Update with your proxy server URL
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                body: JSON.stringify({ aadhaar_number: aadharNumber }),
            }
        );

        if (res.ok) {
            const data = await res.json();
            const code = data.code;
            if (code === 200) {
                return data.data;
            } else {
                return {
                    message: data.message
                };
            }
        } else {
            const errObject = {
                message: "Failed to generate OTP due to server error."
            };
            return errObject;
        }
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to generate OTP due to network error."
        };
        return errObject;
    }
};

// Verify OTP function
const verifyOTP = async (refId, otp, accessToken) => {
    try {
        const res = await fetch(
            'http://localhost:3001/verifyOTP', // Update with your proxy server URL
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken,
                },
                body: JSON.stringify({ ref_id: refId, otp: otp }),
            }
        );

        if (res.ok) {
            const data = await res.json();
            const code = data.code;
            if (code === 200) {
                return data.data;
            } else {
                return {
                    message: data.message
                };
            }
        } else {
            const errObject = {
                message: "Failed to verify OTP due to server error."
            };
            return errObject;
        }
    } catch (error) {
        console.log(error);
        const errObject = {
            message: "Failed to verify OTP due to network error."
        };
        return errObject;
    }
};

export {
    authenticate,
    generateOtp,
    verifyOTP
};
