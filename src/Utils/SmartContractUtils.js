import Web3 from 'web3';
import { doctorABI } from '../abis/doctor'
const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
const doctorAddress = process.env.REACT_APP_DOCTOR_CONTRACT_ADDRESS;
console.log(doctorABI, doctorAddress);
const doctorContract = new web3.eth.Contract(doctorABI, doctorAddress);
// const accounts = await web3.eth.getAccounts();

const registerDoctor = async (data, accountAddress) => {
    try {
        const result = await doctorContract.methods.registerDoctor(
            data.abha,
            data.aadhar,
            data.name,
            data.age,
            data.grnumber,
            data.phone,
            data.email,
            data.specialisation,
        ).send({
            from: accountAddress,
            gas: 3000000
        })
        console.log(result);
        return result;
    } catch (err) {
        console.log(err);
    }
}

const register_patient = async (data, accountAddress) => {
    try {
        const result = await doctorContract.methods.register_patient(
            data.name,
            data.age,
            data.abha,
            data.aadhar,
            data.gender,
            data.phone,
            data.email
        ).send({ from: accountAddress, gas: 3000000 })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const getDoctorOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getDocOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        console.log(userData);
        return userData
    } catch (error) {
        console.log(error);
    }
}


const getPatientsForADoctor = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatients().call({
            from: accountAddress,
            gas: 3000000
        })
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const getAllDoctorsForAPatient = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getDoctorsForUser().call({
            from: accountAddress
        });
        const grantedDocs = res;
        console.log(grantedDocs);
        return grantedDocs;
    } catch (error) {
        console.log(error);
    }
}

const getPatientOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatientOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        console.log(userData);
        return userData;
    } catch (error) {
        console.log(error);
    }
}

const grantAccessToDoctor = async (doctorAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.grantAccess(doctorAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }

}

const searchDoctorByAddress = async (enteredAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.getDocProfile(enteredAddress).call({
            from: accountAddress
        });
        const doctorProfile = res;
        console.log(doctorProfile);
        return doctorProfile;
    } catch (error) {
        console.log(error);
    }
}

const searchDoctorByName = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getAllDoctors().call({
            from: accountAddress
        })
        const doctorProfile = res;
        console.log(doctorProfile);
        return doctorProfile;
    } catch (error) {
        console.log(error);
    }
}

const uploadRecordByUser = async (data, accountAddress) => {
    try {
        const res = await doctorContract.methods.addRecordByUser(
            data.org, String(data.date), String(data.doctorname), String(data.documentName), String(data.path), String(data.cid), String(data.docType)).send({
                from: accountAddress,
                gas: 3000000
            });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}


const revokeDoctorsAccess = async (doctorAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.revokeAccess(doctorAddress).send({
            from: accountAddress,
            gas: 3000000
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

const getRecordsOfUser = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getHealthRecords("0x22207fBEF242156F1cbF1DC83a13d32A2c5Cd029").call({
            from: accountAddress,
            gas: 3000000
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}



export {
    registerDoctor,
    register_patient,
    getDoctorOwnProfile,
    getAllDoctorsForAPatient,
    getPatientsForADoctor,
    getPatientOwnProfile,
    searchDoctorByAddress,
    searchDoctorByName,
    grantAccessToDoctor, revokeDoctorsAccess, getRecordsOfUser, uploadRecordByUser
}


