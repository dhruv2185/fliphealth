// import Web3 from 'web3';
// import { doctorABI } from '../../abis/doctor.js'
// const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
// const doctorContract = new web3.eth.Contract(doctorABI, process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS);

// const accounts = await web3.eth.getAccounts();

// let diagName, email, phone, license;

// const registerDiag = async () => {
//     const res = await doctorContract.methods.registerDiagnostic(
//         diagName,
//         email,
//         phone,
//         license
//     ).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// const getDiagOwnProfile = async () => {
//     const res = await doctorContract.methods.getDiagOwnProfile().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const getAllDiagnostic = async () => {
//     const res = await doctorContract.methods.getAllDiagnostics().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const getDiagnosticsForUser = async () => {
//     const res = await doctorContract.methods.getDiagnosticsForUser().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const getHealthRecordsDiagnostic = async () => {
//     const res = await doctorContract.methods.getHealthRecordsDiagnostic().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const getPatientsForDiagnostic = async () => {
//     const res = await doctorContract.methods.getPatientsForDiagnostic().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const grantAccessToDiagnostic = async (diagnosticAddress) => {
//     const res = await doctorContract.methods.grantAccessToDiagnostic(diagnosticAddress).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// const revokeAccessToDiagnostic = async (diagnosticAddress) => {
//     const res = await doctorContract.methods.revokeAccessDiagnostic(diagnosticAddress).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// /////// -----------------------------------------------------------------------------////////

// // Hospital Functions

// const registerHospital = async () => {
//     const res = await doctorContract.methods.registerHospital(
//         hospitalName,
//         email,
//         phone,
//         license
//     ).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// const getAllDoctorsForHospital = async () => {
//     const res = await doctorContract.methods.getAllDoctorsForHospital().call({
//         from: accounts[0]
//     });
//     console.log(res);
// }

// const removeDoctorFromHospital = async () => {
//     const res = await doctorContract.methods.removeDoctor().send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// const addhospital = async (doctorAddress) => {
//     const res = await doctorContract.methods.addHospital(doctorAddress).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }

// const revokeAccessToAll = async (doctorAddress) => {
//     const res = await doctorContract.methods.revokeAccessToAll(doctorAddress).send({
//         from: accounts[0],
//         gas: 3000000
//     });
//     console.log(res);
// }


// unpinning a document from infura

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const unpinFromInfura = async (hash) => {
    const res = await fetch(`https://ipfs.infura.io:5001/api/v0/pin/rm?arg=${hash}`, {
        method: 'POST',
        headers: {
            'Authorization': authorization
        }
    });
    console.log(res);
}

unpinFromInfura("Qma3nbPLRJj32mBRUNPxat62hycjUfpQ3SoBwy3BSVwQ5n")
