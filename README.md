# Fliphealth

## Description
This website is a blockchain base PHR management system, which means it guarantees the zenith of security available in today's age. Along with the security, this DApp provides an easy to use platform to manage and store one's health documents. Having such a tool can really help multitudes of people, especially elderly people and the differently abled. Since peolple don't need to waste time to file and store these health records safely, it frees up a lot of time for people with everyone. Easy searching and sharing means that even amongst a million documents, it's a piece of cake finding a specific document. This website employs IPFS to store the clients' data in a safe encrypted format, react tfor the UI, the Ethereum blockchain to deploy the smart contracts and the Sandox eKYC API for Aadhar KYC based authentication.

# Live Application URL
https://fliphealth.vercel.app

# Proxy server URL
https://fliphealth-aadhaar-verification-proxy.onrender.com

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)

## Features

- Aadhar-based Authentication.
- Metamask based authorisation and identity-management.
- Access control mechanism defined using smart contracts.
- Data storage in an encrypted form on IPFS (Inter-Planetary File Storage) as well as blockchain infrastructure.
- Easy to use user interface for people of different cohorts.

## Getting Started

### Prerequisites
- Metamask extension in your browser and an account with sufficient ether on desired network.
- An interface to deploy smart contract to the desired network.

### Installation
- Clone the repository: `git clone https://github.com/dhruv2185/fliphealth.git`
- Navigate to project directory: `cd fliphealth`
- Install dependencies: `npm install`
- Navigate to proxy server directory: `cd aadhaarVerification`
- Install dependencies: `npm install`

### Configuration
- Rename `.env.example` to `.env`
- Open `.env` and set your configuration varibles.
- Compile and Deploy the hospital.sol smart contract on desired test network.
- Update the hospital contract ABI in `abis/hospital.js`.
- Update the smart contract address in `.env`.

## Usage
- Start the DApp: `npm start`
- Open your web browser and navigate to `http://localhost:3000`.
- Continue ahead using the easy-to-use and fluent interface of the app.


  







