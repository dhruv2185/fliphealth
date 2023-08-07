pragma solidity ^0.8.0;
import "./doctor.sol";

contract diagnostics is doctor{
    struct Diagnostic{
        string Diagname;
        string email;
        uint128 phone;
    }

    function uploadDocuments(address _patient,
        string memory _org,
        string memory _date,
        string memory _docName,
        string memory _name,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) public {
        require(isAuthorized(_patient, msg.sender), "unauthorized");
        userRecords[_patient].push(HealthRecord(_org, _date, _name, _docName, _path, _cid, msg.sender, _docType));                
    }

}