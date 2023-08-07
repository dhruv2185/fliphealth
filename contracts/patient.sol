pragma solidity ^0.8.0;

contract patient {
    struct Diagnostic {
        string diagname;
        string email;
        uint128 phone;
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

    // stored
    address[] internal doctors;
    address[] internal diagnostics;
    mapping(address => Diagnostic) internal diagnostic;

    mapping(address => Patient) internal patientIndex; // address of user to index in struct array

    mapping(address => Doctor) internal doctorIndex; // address of user to index in struct array
    // used in showing the doctor all patients who have granted access to him to their documents
    mapping(address => address[]) internal accessList; // doctor address to user address
    // used in getting all documents of users, showing all documents of user to allowed doctors
    mapping(address => HealthRecord[]) internal userRecords; // address of user to list od ids of health records
    // used in getting doctors to whom a user has given access
    mapping(address => address[]) internal accessList2; // address of user to addresses of doctors

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
        accessList2[msg.sender].push(_doctorAddress);
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
        // yaha pe yeh function kyu hai?
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

    // yeh function likha toh hai lekin abhi thoda confusion hai iske baare main sochte hai kal
    // mujhe samajh nahi aa raha abji
    function getOwnRecords() public view returns (HealthRecord[] memory) {
        return userRecords[msg.sender];
    }

    function getPatientIndex(
        address _doctor,
        address _user
    ) internal view returns (uint256) {
        address[] storage users = accessList[_doctor];
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _user) {
                return i;
            }
        }
        return users.length; // User address not found in the array
    }

    function getDoctorIndex(
        address _doctor,
        address _user
    ) internal view returns (uint256) {
        address[] storage users = accessList2[_user];
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i] == _doctor) {
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

        uint256 index1 = getDoctorIndex(_doctor, msg.sender);

        address[] storage users2 = accessList2[_doctor];
        if (index < users2.length) {
            users2[index1] = users[users2.length - 1];
            users2.pop();
        }
    }

    function getPatientOwnProfile() external view returns (Patient memory) {
        return patientIndex[msg.sender];
    }

    struct PatientProfile {
        string name;
        uint16 age;
        string gender;
        address myAdd;
    }

    function getPatientProfile(
        address _patient
    ) external view returns (PatientProfile memory) {
        Patient memory currPatient = patientIndex[_patient];
        PatientProfile memory patProfile = PatientProfile(
            currPatient.name,
            currPatient.age,
            currPatient.gender,
            _patient
        );
        return patProfile;
    }
}
