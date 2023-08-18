import Web3 from 'web3';
import { hospitalABI } from '../abis/hospital'
const web3 = new Web3(process.env.REACT_APP_BLOCKCHAIN_PROVIDER_URL);
const hospitalAddress = process.env.REACT_APP_HOSPITAL_CONTRACT_ADDRESS
const doctorContract = new web3.eth.Contract(hospitalABI, hospitalAddress);
const hospitalContract = new web3.eth.Contract(hospitalABI, hospitalAddress);
const diagContract = new web3.eth.Contract(hospitalABI, hospitalAddress);
const clinicContract = new web3.eth.Contract(hospitalABI, hospitalAddress);

// Patient Functions

// @params accountAddress: The address of the user
// @params data: The data of the user
// @dev This function is used to register the patient on the blockchain
// The data either comes from the user or from government API after verifying the aadhar
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
        return result;
    } catch (error) {
        const errObject = {
            message: "Failed to register, Please check your balance or try another account"
        }
        return errObject;
    }
}

// @dev This function is used to get the profiles of all granted diagnostics of a patient
// @params accountAddress: The address of the user
const getDiagnosticForPatient = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getDiagnosticsForUser().call({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to fetch diagnostics, Please reload the page or try again later",
        }
        return errObject;
    }
}

const grantAccessToDiagnostic = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.grantAccessToDiagnostic(address).send({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to grant access, Please check your balance or try again later",
        }
        return errObject;
    }
}

const revokeAccessOfDiagnostic = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.revokeAccessDiagnostic(address).send({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to revoke access, Please check your balance and try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a doctor/patient to get all the records of a patient
// @params patientAddress: The address of the patient
// @params accountAddress: The address of the user
const getRecordsOfUser = async (patientAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.getHealthRecords(patientAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch the documents, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used to delete a document from the blockchain storage
// @params accountAddress: The address of the user
// @params cid: The cid of the document to be deleted
const deleteDocument = async (accountAddress, cid) => {
    try {
        const result = await doctorContract.methods.deleteRecord(cid).send({
            from: accountAddress,
            gas: 3000000
        })
        return result;
    } catch (error) {
        const errObject = {
            message: "Failed to delete your document, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used for a patient to get all his doctors
// @params accountAddress: The address of the user
const getAllDoctorsForAPatient = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getDoctorsForUser().call({
            from: accountAddress
        });
        const grantedDoctors = res;
        return grantedDoctors;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch your doctors, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used for a patient to get his own profile
// @params accountAddress: The address of the user
const getPatientOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatientOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        return userData;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch your profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a patient to grant access to view their documents to a doctor
// @params docAddress: The address of the doctor
// @params accountAddress: The address of the user
const grantAccessToDoctor = async (docAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.grantAccess(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to grant access, Please check your balance or try another account",
        }
        return errObject;
    }

}

// @dev This function is used by a user to revoke a doctor's access to his documents
// @params docAddress: The address of the doctor
// @params accountAddress: The address of the user
const revokeDoctorsAccess = async (docAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.revokeAccess(docAddress).send({
            from: accountAddress,
            gas: 3000000
        })
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to revoke access, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a user to upload his record metaData to the blockchain
// @params data: The metaData of the document
// @params accountAddress: The address of the user
const uploadRecordByUser = async (data, accountAddress) => {
    try {
        const res = await doctorContract.methods.addRecordByUser(
            data.org, String(data.date), String(data.doctorname), String(data.documentName), String(data.path), String(data.cid), data.docType).send({
                from: accountAddress,
                gas: 3000000
            });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to upload your document, Please check your balance or try again later",
        }
        return errObject;
    }
}


// Doctor Functions

const getOrgOfDoctor = async (accountAddress) => {
    try {
        const orgAddress = await hospitalContract.methods.organization(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        let hospitalProfile = {
            hospname: ""
        };
        if (orgAddress !== "0x0000000000000000000000000000000000000000") {
            hospitalProfile = await hospitalContract.methods.hospitals(orgAddress).call({
                from: accountAddress,
                gas: 3000000
            });
        }
        let clinicProfile = {
            name: ""
        };
        const clinicAddress = await clinicContract.methods.DoctorToClinic(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        if (clinicAddress !== "0x0000000000000000000000000000000000000000") {
            clinicProfile = await clinicContract.methods.ClinicIndex(clinicAddress).call({
                from: accountAddress,
                gas: 3000000
            });
        }
        return { hospitalProfile, clinicProfile };
    }
    catch (error) {
        const errObject = {
            message: "Failed to fetch organisations, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used for a doctor to get all his patients
// @params accountAddress: The address of the user
const getPatientsForADoctor = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getPatients().call({
            from: accountAddress,
            gas: 3000000
        })
        return result;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch your patients, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @params accountAddress: The address of the user
// @params data: The data of the user
// @dev This function is used to register the doctor on the blockchain
// The data either comes from the user or from government API after verifying the aadhar
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
        return result;
    } catch (err) {
        const errObject = {
            message: "Failed to register, Please check your balance or try another account"
        }
        return errObject;
    }
}


// @dev This function is used for a doctor to get his own profile
// @params accountAddress: The address of the user
const getDoctorOwnProfile = async (accountAddress) => {
    try {
        const result = await doctorContract.methods.getDocOwnProfile().call({
            from: accountAddress
        })
        const userData = result;
        return userData
    } catch (error) {
        const errObject = {
            message: "Failed to fetch your profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

// Hospital Functions

// @dev This function is used to search a doctor by address
// @params enteredAddress: The address of the doctor
// @params accountAddress: The address of the user
const searchDoctorByAddress = async (enteredAddress, accountAddress) => {
    try {
        const res = await doctorContract.methods.DocProfileReturn(enteredAddress).call({
            from: accountAddress
        });
        const doctorProfile = res;
        return doctorProfile;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch doctor profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used to search a doctor by name
// @params accountAddress: The address of the user
const searchDoctorByName = async (accountAddress) => {
    try {
        const res = await doctorContract.methods.getAllDoctors().call({
            from: accountAddress
        })
        const doctorProfile = res;
        return doctorProfile;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch doctor profiles, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a hospital to remove a doctor from the hospital
// @params docAddress: The address of the doctor
// @params accountAddress: The address of the user
const removeDoctorFromHospital = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.removeDoctor(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to remove doctor, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a hospital to add a doctor to the hospital
// @params docAddress: The address of the doctor
// @params accountAddress: The address of the user
const addDoctorToHospital = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.addDoctorTOHospital(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to add doctor, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a hospital to get all the doctors of the hospital
// @params accountAddress: The address of the user
const getDoctorsOfHospital = async (accountAddress) => {
    try {
        const res = await hospitalContract.methods.getAllDoctorsForHospital().call({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch doctors, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by users to get profile of a hospital
// @params accountAddress: The address of the user
const getHospitalProfile = async (accountAddress) => {
    try {
        const res = await hospitalContract.methods.hospitals(accountAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch hospital profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

// @dev This function is used by a hospital to revoke access of a doctor to documents of all the patients
// @params docAddress: The address of the doctor
// @params accountAddress: The address of the user
const revokeAllAccessOfDoctor = async (docAddress, accountAddress) => {
    try {
        const res = await hospitalContract.methods.revokeAccessToAll(docAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed revoke access, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used to register a hospital
// @params data: The data of the hospital
// @params accountAddress: The address of the user
const registerHospital = async (data, accountAddress) => {
    try {
        const res = await hospitalContract.methods.registerHospital(
            data.name,
            data.email,
            data.phone,
            data.license
        ).send({
            from: accountAddress,
            gas: 3000000,
            value: web3.utils.toWei('0.1', 'ether')
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to register hospital, Please check your balance or try again later",
        }
        return errObject;
    }
}

// @dev This function is used to register a diagnostic
// @params data: The data of the diagnostic
// @params accountAddress: The address of the user
const registerDiagnostic = async (data, accountAddress) => {
    try {
        const res = await diagContract.methods.registerDiagnostic(
            data.name,
            data.email,
            data.phone,
            data.license
        ).send({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to register diagnostic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getHealthRecordsOfPatient = async (patAddress, accountAddress) => {
    try {
        const res = await diagContract.methods.getHealthRecordsDiagnostic(patAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch health records, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getAllDiagnostics = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getAllDiagnostics().call({
            from: accountAddress,
            gas: 3000000
        });
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch diagnostics, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getDiagProfile = async (address, accountAddress) => {
    try {
        const res = await diagContract.methods.DiagnosticIndex(address).call({
            from: accountAddress,
            gas: 3000000
        });
        res.myAdd = address;
        return res;
    } catch (error) {
        const errObject = {
            message: "Failed to fetch diagnostic profile, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getPatientsOfDiagnostic = async (accountAddress) => {
    try {
        const res = await diagContract.methods.getPatientsForDiagnostic().call({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to fetch patients, Please reload the page or try again later",
        }
        return errObject;
    }
}

const uploadRecordsByDiagnostic = async (data, accountAddress, patientAddress) => {
    try {
        const res = await diagContract.methods.uploadRecordsDiagnostic(
            patientAddress,
            data.org, String(data.date), String(data.documentName), String(data.doctorname), String(data.path), String(data.cid), String(data.docType)).send({
                from: accountAddress,
                gas: 3000000
            });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to upload records, Please check your balance or try again later",
        }
        return errObject;
    }
}

// Clinic Functions

const registerClinic = async (data, accountAddress) => {
    try {
        const res = await clinicContract.methods.registerClinic(
            data.name,
            data.phone,
            data.email,
            data.location
        ).send({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to register clinic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const enrollInClinicForDoctor = async (cliAddress, accountAddress) => {
    try {
        const res = await clinicContract.methods.enrollInClinic(cliAddress).send({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to enroll in clinic, Please check your balance or try again later",
        }
        return errObject;
    }
}

const getDoctorsOfClinic = async (accountAddress) => {
    try {
        const res = await clinicContract.methods.getAllDoctorsForClinic().call({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to fetch doctor profiles, Please reload the page or try again later",
        }
        return errObject;
    }
}

const getClinicProfile = async (cliAddress, accountAddress) => {
    try {
        const res = await clinicContract.methods.ClinicIndex(cliAddress).call({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to fetch clinic profile, Please reload the page or try again later",
        }
        return errObject;
    }
}


const exitFromClinic = async (accountAddress) => {
    try {
        const res = await clinicContract.methods.exitFromClinic().send({
            from: accountAddress,
            gas: 3000000
        });
        return res
    } catch (error) {
        const errObject = {
            message: "Failed to exit from clinic, Please check your balance or try again later",
        }
        return errObject;
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
    grantAccessToDoctor, revokeDoctorsAccess, getRecordsOfUser, uploadRecordByUser,
    removeDoctorFromHospital, addDoctorToHospital, getDoctorsOfHospital, getHospitalProfile, revokeAllAccessOfDoctor, registerHospital,
    registerDiagnostic, getAllDiagnostics, getDiagProfile, getPatientsOfDiagnostic, grantAccessToDiagnostic, revokeAccessOfDiagnostic, getDiagnosticForPatient, uploadRecordsByDiagnostic, deleteDocument,
    registerClinic, enrollInClinicForDoctor, getDoctorsOfClinic,
    getClinicProfile, exitFromClinic, getOrgOfDoctor,
    getHealthRecordsOfPatient,
}
