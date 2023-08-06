pragma solidity ^0.5.9;

contract patient{
    struct Patient{
        address myAdd;
        uint128 id; // will be replaced by abha id
        uint128 id;
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
        uint128 mobile;
        string email;
    }

    struct HealthRecord {
        string documentName;
        uint64 documentId;
        string documentPath;
        address owner;
        string documentCid;
        // string timestamp;
    }


    mapping(address => Patient) public patientIndex; // address of user to index in struct array
    mapping(address => Doctor) public doctorIndex; // address of user to index in struct array
    mapping(address => address[]) public accessList; // doctor id to user ids
    mapping(address => HealthRecord[]) public userRecords; // address of user to list od ids of health records
    mapping(address => address) public requests; // patientid to doctorId

    function register_patient(string memory _name, uint16 _age, uint _patientId, string memory _gender, uint _mobile, string memory _email) public {
        patientIndex[msg.sender] = Patient(msg.sender, uint128(_patientId), _name, _age, _gender, uint128(_mobile), _email);
    }

    function addRecordByUser (string memory _name, string memory _path, string memory _cid) public {
        userRecords[msg.sender].push(HealthRecord(_name, healthRecordId, _path, msg.sender, _cid));
    }

    function grantAccessToDoctor(uint _doctorId) public {
        // check if requesting user is owner
        // if yes then add this document id to access list corresponding to doctor id
        accessList[_doctorId].push(_patientId);                
    }
}