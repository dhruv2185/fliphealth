pragma solidity ^0.8.0;
import "./doctor.sol";

// yaha pe bhi owner toh patient hi hona chahiye diagnostics ne upload kiya ho toh bhi
// aur diagnostic ke paas doctor jaisa gr number kaise hoga
// baad main explain karna yeh aur acces functions firse diagnostics ke liye bhi likhne padenge

contract diagnostic is doctor {
    // function registerDiagnostic(
    //     uint128 _abhaId,
    //     uint128 _aadharId,
    //     string memory _name,
    //     uint16 _age,
    //     uint64 _grNum,
    //     uint64 _mobile,
    //     string memory _email
    // ) external {
    //     doctorIndex[msg.sender] = Doctor(
    //         _abhaId,
    //         _aadharId,
    //         _name,
    //         _age,
    //         _grNum,
    //         _mobile,
    //         _email
    //     );
    // }

    function uploadDocuments(
        address _patient,
        string memory _org,
        string memory _date,
        string memory _docName,
        string memory _name,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) public {
        require(isAuthorized(_patient, msg.sender), "unauthorized");
        userRecords[_patient].push(
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
}
