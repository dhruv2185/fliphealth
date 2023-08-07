export const patientABI = [
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
        "name": "addRecordByUser",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "revokeAccess",
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
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "accessList",
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "doctorIndex",
        "outputs": [
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
                "internalType": "uint64",
                "name": "mobile",
                "type": "uint64"
            },
            {
                "internalType": "string",
                "name": "email",
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
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "getPatientIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
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
        "name": "patientIndex",
        "outputs": [
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
                "internalType": "uint64",
                "name": "mobile",
                "type": "uint64"
            },
            {
                "internalType": "string",
                "name": "email",
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
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userRecords",
        "outputs": [
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
        "stateMutability": "view",
        "type": "function"
    }
]