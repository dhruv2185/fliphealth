pragma solidity ^0.8.0;

contract patient{
    struct Patient {
        uint128 abhaId; // will be replaced by abha id
        uint128 aadharId;
        string name;
        uint16 age;
        string gender;
        uint64 mobile;
        string email;
    }

    struct Doctor {
        uint128 abhaId; // will be replaced by abha id
        uint128 aadharId;
        string name;
        uint16 age;
        uint64 grNum;
        uint64 mobile;
        string email;
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

    mapping(address => Patient) public patientIndex; // address of user to index in struct array
    mapping(address => Doctor) public doctorIndex; // address of user to index in struct array
    mapping(address => address[]) public accessList; // doctor id to user ids
    mapping(address => HealthRecord[]) public userRecords; // address of user to list od ids of health records

    function isAuthorized(address user, address doctor)  internal view returns (bool) {
        address[] memory authorizedUsers = accessList[doctor];
        for (uint i = 0; i < authorizedUsers.length; i++) {
            if (authorizedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    // Define a modifier to check if the user's address is in the access list for a specific doctor
    // modifier onlyAuthorized(address doctor) {
    //     require(isAuthorized(msg.sender, doctor), "Not authorized.");
    //     _;
    // }

    function register_patient(
        string memory _name,
        uint16 _age,
        uint _abhaId,
        uint _aadharId,
        string memory _gender,
        uint _mobile,
        string memory _email
    ) public {
        patientIndex[msg.sender] = Patient(
            uint128(_abhaId),
            uint128(_aadharId),
            _name,
            _age,
            _gender,
            uint64(_mobile),
            _email
        );
    }

    function addRecordByUser(string memory _org,
        string memory _date,
        string memory _docName,
        string memory _name,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) public {
        userRecords[msg.sender].push(HealthRecord(_org, _date, _name, _docName, _path, _cid, msg.sender, _docType));
    }



    // modifier AuthorizedDoctor(address doctor, address patientAdd) {
    //     address[] memory p = accessList[doctor];
    //     bool auth= false;
    //     for( uint i=0; i < p.length; i++)
    //     {
    //         if(p[i]== patientAdd){
    //             auth=true;
    //         }
    //     }
    //     require(auth == true, "unauthorized doctor");
    //     _;
    // }

    function grantAccessToDoctor(address _doctorAddress) public {
        // check if requesting user is owner
        // if yes then add this document id to access list corresponding to doctor id
        accessList[_doctorAddress].push( msg.sender);
    }

    function revokeAccess(address _doctorAddress)  public{
        require(isAuthorized(msg.sender, _doctorAddress), "unauthorized");
        address[] storage addresses = accessList[msg.sender];
        for( uint i=0; i < accessList[_doctorAddress].length; i++)
        {
            if(accessList[_doctorAddress][i]== msg.sender){
                uint indexToDelete = i;
                require(indexToDelete < addresses.length, "Element not found in the array");
                addresses[indexToDelete] = addresses[addresses.length - 1];
                addresses.pop();
            }
        }
    }
}