pragma solidity ^0.8.0;

contract patient {
    struct Diagnostic {
        string Diagname;
        string email;
        uint128 phone;
        string license;
    }

    struct Patient {
        uint128 abhaId; // will be replaced by abha id
        uint128 aadharId;
        string name;
        uint16 age;
        string gender;
        uint128 mobile;
        string email;
    }

    struct Doctor {
        uint128 abhaId; // will be replaced by abha id
        uint128 aadharId;
        string name;
        uint16 age;
        uint64 grNum;
        uint128 mobile;
        string email;
        string degreeName;
    }

    struct HealthRecord {
        string organisation;
        string date;
        string doctorName;
        string documentName;
        string documentPath;
        string documentCid;
        address owner;
        string documentType;
    }

    struct DocProfile {
        string name;
        uint16 age;
        uint64 grNum;
        string degreeName;
        address myAdd;
    }

    struct PatientProfile {
        string name;
        uint16 age;
        string gender;
        address myAdd;
    }

    struct DiagnosticProfile {
        string name;
        string email;
        uint128 phone;
        string license;
        address myAdd;
    }

    // List of addresses of all the doctors
    address[] internal doctors;
    // List of addresses of all the diagnostics
    address[] internal diagnostics;

    // Maps the address of the diagnostic to the diagnostic struct
    mapping(address => Diagnostic) public DiagnosticIndex;
    // Maps address of diagnostic to list of addresses of users who have granted access to the diagnostic
    mapping(address => address[]) internal DiagnosticAccessList;
    // Maps the address of the patient to the patient struct
    mapping(address => Patient) internal patientIndex;
    // Maps the address of the doctor to the doctor struct
    mapping(address => Doctor) internal doctorIndex;
    // Maps the address of the doctor to all the addresses of the users who have granted access to the doctor
    mapping(address => address[]) internal accessList; // doctor address to user address
    // Maps the address of the user to the list of health records
    mapping(address => HealthRecord[]) internal userRecords; // address of user to list od ids of health records

    // Check if the user has granted access to the doctor
    function isAuthorized(
        address user,
        address doctor
    ) internal view returns (bool) {
        address[] memory authorizedUsers = accessList[doctor];
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    // Check if the user has granted access to the diagnostic
    function isAuthorizedDiagnostic(
        address _user,
        address _diagnostic
    ) internal view returns (bool) {
        address[] memory authorizedDiagnostics = DiagnosticAccessList[
            _diagnostic
        ];
        for (uint i = 0; i < authorizedDiagnostics.length; i++) {
            if (authorizedDiagnostics[i] == _user) {
                return true;
            }
        }
        return false;
    }

    // Returns profile of the entered doctor
    function DocProfileReturn(
        address _doctor
    ) public view returns (DocProfile memory) {
        Doctor memory curr = doctorIndex[_doctor];
        DocProfile memory docprof = DocProfile(
            curr.name,
            curr.age,
            curr.grNum,
            curr.degreeName,
            _doctor
        );
        return docprof;
    }

    // Registers the patient :  Adds patient struct to the patientIndex
    function register_patient(
        string memory _name,
        uint16 _age,
        uint _abhaId,
        uint _aadharId,
        string memory _gender,
        uint _mobile,
        string memory _email
    ) external {
        grantAccess(msg.sender);
        patientIndex[msg.sender] = Patient(
            uint128(_abhaId),
            uint128(_aadharId),
            _name,
            _age,
            _gender,
            uint128(_mobile),
            _email
        );
    }

    // Grants the doctor access to sender's documents
    function grantAccess(address _doctorAddress) public {
        accessList[_doctorAddress].push(msg.sender);
    }

    // Grants the diagnostic access to sender's documents
    function grantAccessToDiagnostic(address _diagnosticAddress) public {
        DiagnosticAccessList[_diagnosticAddress].push(msg.sender);
    }

    // Adds the record metadata to the userRecords mapping
    function addRecordByUser(
        string memory _org,
        string memory _date,
        string memory _doctorName,
        string memory _documentName,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) external {
        // grantAccess(msg.sender);
        userRecords[msg.sender].push(
            HealthRecord(
                _org,
                _date,
                _doctorName,
                _documentName,
                _path,
                _cid,
                msg.sender,
                _docType
            )
        );
    }

    // Returns position of a patient in a doctor's accessList
    function getPatientIndex(
        address _doctor,
        address _user
    ) internal view returns (uint256) {
        address[] memory users = accessList[_doctor];
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _user) {
                return i;
            }
        }
        return users.length; // User address not found in the array
    }

    // Revokes access of the doctor to the sender's documents
    function revokeAccess(address _doctor) external {
        uint256 index = getPatientIndex(_doctor, msg.sender);

        address[] storage users = accessList[_doctor];
        if (index < users.length) {
            users[index] = users[users.length - 1];
            users.pop();
        }
    }

    // Returns Patient profile of the user.
    function getPatientOwnProfile() external view returns (Patient memory) {
        return patientIndex[msg.sender];
    }

    // Returns Patient profile of the entered user.
    function getPatientProfile(
        address _patient
    ) internal view returns (PatientProfile memory) {
        Patient memory curr = patientIndex[_patient];
        PatientProfile memory patientProf = PatientProfile(
            curr.name,
            curr.age,
            curr.gender,
            _patient
        );
        return patientProf;
    }

    // Returns position of document in the userRecords mapping
    function getRecocrdIndex(
        address _patient,
        string memory _cid
    ) internal view returns (uint256) {
        HealthRecord[] memory documents = userRecords[_patient];
        for (uint256 i = 0; i < documents.length; i++) {
            if (
                keccak256(abi.encodePacked(documents[i].documentCid)) ==
                keccak256(abi.encodePacked(_cid))
            ) {
                return i;
            }
        }
        return documents.length;
    }

    // Deletes the record metaData from the userRecords mapping
    function deleteRecord(string memory _cid) external {
        address _patient = msg.sender;
        uint256 index = getRecocrdIndex(_patient, _cid);
        HealthRecord[] storage documents = userRecords[_patient];
        if (index < documents.length) {
            documents[index] = documents[documents.length - 1];
            documents.pop();
        }
    }
}
