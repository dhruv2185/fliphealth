pragma solidity ^0.5.9;

contract patient{
    struct Patient{
        address myAdd;
        uint128 id; // will be replaced by abha id
        string name;
        uint16 age;
        string gender;
        uint128 mobile;
        string email;
    }

    struct Doctor {
        address myAdd;
        uint128 abhaId; // will be replaced by abha id
        string name;
        uint16 age;
        string degreePath;
    }

    struct HealthRecord {
        string documentName;
        uint64 documentId;
        string documentPath;
        address owner;
        string documentCid;
        // string timestamp;
    }


    Patient[] public patients;
    Doctor[] public doctors;
    HealthRecord[] public healthRecords;
    mapping(address => uint64) public patientIndex; // address of user to index in struct array
    mapping(address => uint128) public doctorIndex; // address of user to index in struct array
    mapping(uint64 => uint128[]) public accessList; // doctor id to user ids
    mapping(address => uint64[]) public userRecords; // address of user to list od ids of health records

    function register_patient(string memory _name, uint16 _age, uint _patientId, string memory _gender, uint _mobile, string memory _email) public {
        uint64 index = uint64(patients.length);
        patientIndex[msg.sender] = index;         
        patients.push(Patient(msg.sender, uint128(_patientId), _name, _age, _gender, uint128(_mobile), _email));
    }

    function addRecordByUser (string memory _name, string memory _path, string memory _cid) public {
        uint64 healthRecordId = uint64(healthRecords.length + 1);
        userRecords[msg.sender].push(healthRecordId);
        healthRecords.push(HealthRecord(_name, healthRecordId, _path, msg.sender, _cid));
    }

    function grantAccessToDoctor(uint64 _patientId, uint64 _doctorId) public {
        // check if requesting user is owner
        // if yes then add this document id to access list corresponding to doctor id
        accessList[_doctorId].push(_patientId);                
    }
}