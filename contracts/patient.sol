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
    address[] internal daignostics;
    mapping(address => Diagnostic) internal dagnostic;
    mapping(address => Patient) internal patientIndex; // address of user to index in struct array
    mapping(address => Doctor) internal doctorIndex; // address of user to index in struct array
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

    function addRecordByUser(
        string memory _org,
        string memory _date,
        string memory _docName,
        string memory _name,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) external {
        // grantAccess(msg.sender);
        userRecords[msg.sender].push(
            HealthRecord(
                _org,
                _date,
                _name,
                _docName,
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
    ) external view returns (Patient memory) {
        return patientIndex[_patient];
    }
}
