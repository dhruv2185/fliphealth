export const hospitalABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ClinicIndex",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "phone",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "location",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "DiagnosticIndex",
        "outputs": [
            {
                "internalType": "string",
                "name": "Diagname",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "phone",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "license",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctor",
                "type": "address"
            }
        ],
        "name": "DocProfileReturn",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DocProfile",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctor",
                "type": "address"
            }
        ],
        "name": "addDoctorTOHospital",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_org",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_doctorName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_documentName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_path",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_docType",
                "type": "string"
            }
        ],
        "name": "addRecordByUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            }
        ],
        "name": "deleteRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_clinic",
                "type": "address"
            }
        ],
        "name": "enrollInClinic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDiagnostics",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint128",
                        "name": "phone",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "license",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DiagnosticProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDoctors",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DocProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDoctorsForClinic",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DocProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllDoctorsForHospital",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DocProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDiagnosticsForUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint128",
                        "name": "phone",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "license",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DiagnosticProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDocOwnProfile",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "abhaId",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "aadharId",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "uint128",
                        "name": "mobile",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    }
                ],
                "internalType": "struct patient.Doctor",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getDoctorsForUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "uint64",
                        "name": "grNum",
                        "type": "uint64"
                    },
                    {
                        "internalType": "string",
                        "name": "degreeName",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.DocProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "patAddress",
                "type": "address"
            }
        ],
        "name": "getHealthRecords",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "organisation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentPath",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentCid",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "documentType",
                        "type": "string"
                    }
                ],
                "internalType": "struct patient.HealthRecord[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "patAddress",
                "type": "address"
            }
        ],
        "name": "getHealthRecordsDiagnostic",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "organisation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "date",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "doctorName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentPath",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentCid",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "documentType",
                        "type": "string"
                    }
                ],
                "internalType": "struct patient.HealthRecord[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPatientOwnProfile",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint128",
                        "name": "abhaId",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "aadharId",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string",
                        "name": "gender",
                        "type": "string"
                    },
                    {
                        "internalType": "uint128",
                        "name": "mobile",
                        "type": "uint128"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    }
                ],
                "internalType": "struct patient.Patient",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPatients",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string",
                        "name": "gender",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.PatientProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPatientsForDiagnostic",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint16",
                        "name": "age",
                        "type": "uint16"
                    },
                    {
                        "internalType": "string",
                        "name": "gender",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "myAdd",
                        "type": "address"
                    }
                ],
                "internalType": "struct patient.PatientProfile[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctorAddress",
                "type": "address"
            }
        ],
        "name": "grantAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_diagnosticAddress",
                "type": "address"
            }
        ],
        "name": "grantAccessToDiagnostic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hospitals",
        "outputs": [
            {
                "internalType": "string",
                "name": "hospname",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "phone",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "license",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "organization",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "_phone",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_location",
                "type": "string"
            }
        ],
        "name": "registerClinic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_Diagname",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "_phone",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "_license",
                "type": "string"
            }
        ],
        "name": "registerDiagnostic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "_abhaId",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "_aadharId",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint16",
                "name": "_age",
                "type": "uint16"
            },
            {
                "internalType": "uint64",
                "name": "_grNum",
                "type": "uint64"
            },
            {
                "internalType": "uint128",
                "name": "_mobile",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_degreeName",
                "type": "string"
            }
        ],
        "name": "registerDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_hospname",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_phone",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_license",
                "type": "string"
            }
        ],
        "name": "registerHospital",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint16",
                "name": "_age",
                "type": "uint16"
            },
            {
                "internalType": "uint256",
                "name": "_abhaId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_aadharId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_gender",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_mobile",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "register_patient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctor",
                "type": "address"
            }
        ],
        "name": "removeDoctor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctor",
                "type": "address"
            }
        ],
        "name": "revokeAccess",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_diagnostic",
                "type": "address"
            }
        ],
        "name": "revokeAccessDiagnostic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_doctor",
                "type": "address"
            }
        ],
        "name": "revokeAccessToAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_patient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_org",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_docName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_path",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_docType",
                "type": "string"
            }
        ],
        "name": "uploadRecordsDiagnostic",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]