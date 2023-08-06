import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { useState } from 'react';

const DoctorLogin = () => {
    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });
    useEffect(() => {

        // Asking if metamask is already present or not
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => console.log(res));
        } else {
            alert("install metamask extension!!");
        }
    }, [])

    return (
        <>



            <strong>Address: </strong>
            {data.address}

            <strong>Balance: </strong>
            {data.Balance}




        </>
    );

}

export default DoctorLogin;
