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

    address[] internal doctors;
    address[] internal diagnostics;
    mapping(address => Diagnostic) public DiagnosticIndex;
    mapping(address => address[]) internal DiagnosticAccessList;
    mapping(address => Patient) internal patientIndex;
    mapping(address => Doctor) internal doctorIndex;
    mapping(address => address[]) internal accessList; // doctor address to user address
    mapping(address => HealthRecord[]) internal userRecords; // address of user to list od ids of health records

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

    function DocProfileReturn(
        address _doctor
    ) internal view returns (DocProfile memory) {
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

    function grantAccess(address _doctorAddress) public {
        accessList[_doctorAddress].push(msg.sender);
    }

    function grantAccessToDiagnostic(address _diagnosticAddress) public {
        DiagnosticAccessList[_diagnosticAddress].push(msg.sender);
    }

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

    function revokeAccess(address _doctor) external {
        uint256 index = getPatientIndex(_doctor, msg.sender);

        address[] storage users = accessList[_doctor];
        if (index < users.length) {
            users[index] = users[users.length - 1];
            users.pop();
        }
    }

    function getPatientOwnProfile() external view returns (Patient memory) {
        return patientIndex[msg.sender];
    }

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

    function deleteRecord(address _patient, string memory _cid) external {
        uint256 index = getRecocrdIndex(_patient, _cid);
        HealthRecord[] storage documents = userRecords[_patient];
        if (index < documents.length) {
            documents[index] = documents[documents.length - 1];
            documents.pop();
        }
    }
}
