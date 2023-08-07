pragma solidity ^0.8.0;
import "./patient.sol";

contract doctor is patient{

     function registerDoctor(
        uint128 _abhaId,
        uint128 _aadharId,
        string memory _name,
        uint16 _age,
        uint64 _grNum,
        uint64 _mobile,
        string memory _email
    ) public {
        doctorIndex[msg.sender] = Doctor(
            _abhaId,
            _aadharId,
            _name,
            _age,
            _grNum,
            _mobile,
            _email
        );
    }

    function getPatients() public view returns (Patient[] memory) {
        uint patientCount = accessList[msg.sender].length;
        // add a response if patientCount is 0
        Patient[] memory patients = new Patient[](patientCount);
        for (uint i = 0; i < patientCount; i++) {
            patients[i] = patientIndex[accessList[msg.sender][i]];
        }
        return patients;
    }

    function getHealthRecords(address patAddress) public view returns (HealthRecord[] memory) {
        require(isAuthorized(patAddress, msg.sender), "unauthorized");
        return userRecords[patAddress];
    }


}