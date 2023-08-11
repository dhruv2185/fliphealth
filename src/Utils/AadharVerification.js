// authenticate the app
// receive the access token
const authenticate = async () => {
    try {
        const res = await fetch(
            'https://api.sandbox.co.in/authenticate',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    "x-api-key": REACT_APP_SANDBOX_API_KEY,
                    "x-api-secret": REACT_APP_SANDBOX_API_SECRET,
                    "x-api-version": "1.0"
                }
            }
        )
        const data = await res.json()
        const accessToken = data.access_token;
        console.log(data);
        return accessToken;
    } catch (error) {
        console.log(error);
    }
}

// generate otp 
// params : aadharNumber of User, accessToken from authenticate()
// returns refId and otp on valid aadhar number linked to a phone number
const generateOtp = async (aadharNumber, accessToken) => {
    try {
        const res = await fetch(
            'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: accessToken,
                    "x-api-key": REACT_APP_SANDBOX_API_KEY,
                    "x-api-version": "1.0",
                    "content-type": "application/json"
                },
                body: JSON.stringify({ aadhaar_number: aadharNumber })
            }
        )
        const data = await res.json()
        const code = data.code;
        if (code === 200) {
            return data.data;
        }
        else {
            return {
                message: data.message
            };
        }
    } catch (error) {
        console.log(error);
    }
}

// verify OTP
// params : refId, otp, accessToken from authenticate()
// returns aadhar details in data object on valid otp
// returns error message on invalid otp
const verifyOTP = async (refId, otp, accessToken) => {
    try {
        const res = await fetch(
            'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: accessToken,
                    "x-api-key": REACT_APP_SANDBOX_API_KEY,
                    "x-api-version": "1.0",
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ref_id: refId, otp: otp })
            }
        )
        const data = await res.json()
        const code = data.code;
        if (code === 200) {
            return data.data;
        }
        else {
            return {
                message: data.message
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    authenticate,
    generateOtp,
    verifyOTP
}
