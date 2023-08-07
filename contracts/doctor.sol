pragma solidity ^0.8.0;
import "./patient.sol";

contract doctor is patient{

     function registerDoctor(
        uint128 _abhaId,
        uint128 _aadharId,
        string memory _name,
        uint16 _age,
        uint64 _grNum,
        uint128 _mobile,
        string memory _email
    ) external {
        doctors.push(msg.sender);
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

    function getDocOwnProfile() external view returns (Doctor memory) {
        return doctorIndex[msg.sender];
    }

    function getDocProfile(address _doctor) external view returns (Doctor memory) {
        return doctorIndex[_doctor];
    }

    function getPatients() external view returns (Patient[] memory) {
        uint patientCount = accessList[msg.sender].length;
        // add a response if patientCount is 0
        Patient[] memory patients = new Patient[](patientCount);
        for (uint i = 0; i < patientCount; i++) {
            patients[i] = patientIndex[accessList[msg.sender][i]];
        }
        return patients;
    }

    function getHealthRecords(address patAddress) external view returns (HealthRecord[] memory) {
        require(isAuthorized(patAddress, msg.sender), "unauthorized");
        return userRecords[patAddress];
    }

    function getAllDoctors() external view returns (Doctor[] memory) {
        uint256 numDoctors = doctors.length;
        Doctor[] memory allDoctors = new Doctor[](numDoctors);
        for (uint256 i = 0; i < numDoctors; i++) {
            address doctorAddress = doctors[i];
            allDoctors[i] = doctorIndex[doctorAddress];
        }
        return allDoctors;
    }    

    function getDoctorsForUser(address userAddress) external view returns (Doctor[] memory) {
    }

}