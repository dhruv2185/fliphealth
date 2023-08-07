pragma solidity ^0.8.0;
import "./patient.sol";

contract doctor is patient {
    function registerDoctor(
        uint128 _abhaId,
        uint128 _aadharId,
        string memory _name,
        uint16 _age,
        uint64 _grNum,
        uint128 _mobile,
        string memory _email,
        string memory _degreeName
    ) external {
        doctors.push(msg.sender);
        doctorIndex[msg.sender] = Doctor(
            _abhaId,
            _aadharId,
            _name,
            _age,
            _grNum,
            _mobile,
            _email,
            _degreeName
        );
    }

    function getDocOwnProfile() external view returns (Doctor memory) {
        return doctorIndex[msg.sender];
    }

    function getDocProfile(
        address _doctor
    ) external view returns (DocProfile memory) {
        Doctor memory curr = doctorIndex[_doctor];
        DocProfile memory currProfile = DocProfile(
            curr.name,
            curr.age,
            curr.grNum,
            curr.degreeName,
            _doctor
        );
        return currProfile;
    }

    // return list of profiles of patients who have granted access to doctor
    function getPatients() external view returns (PatientProfile[] memory) {
        uint patientCount = accessList[msg.sender].length;
        // add a response if patientCount is 0
        PatientProfile[] memory patients = new PatientProfile[](patientCount);
        for (uint i = 0; i < patientCount; i++) {
            address currPatAddress = accessList[msg.sender][i];
            Patient memory curr = patientIndex[currPatAddress];
            patients[i] = PatientProfile(
                curr.name,
                curr.age,
                curr.gender,
                currPatAddress
            );
        }
        return patients;
    }

    function getHealthRecords(
        address patAddress
    ) external view returns (HealthRecord[] memory) {
        require(isAuthorized(patAddress, msg.sender), "unauthorized");
        return userRecords[patAddress];
    }

    // sent when patient wants to search from all doctors;
    struct DocProfile {
        string name;
        uint16 age;
        uint64 grNum;
        string degreeName;
        address myAdd;
    }

    function getAllDoctors() external view returns (DocProfile[] memory) {
        uint256 numDoctors = doctors.length;
        DocProfile[] memory allDoctors = new DocProfile[](numDoctors);
        for (uint256 i = 0; i < numDoctors; i++) {
            address doctorAddress = doctors[i];
            Doctor memory curr = doctorIndex[doctorAddress];
            allDoctors[i] = DocProfile(
                curr.name,
                curr.age,
                curr.grNum,
                curr.degreeName,
                doctorAddress
            );
        }
        return allDoctors;
    }

    function getDoctorsForUser() external view returns (DocProfile[] memory) {
        address userAddress = msg.sender;
        uint256 numDoctors = accessList2[userAddress].length;
        DocProfile[] memory allDoctors = new DocProfile[](numDoctors);
        for (uint256 i = 0; i < numDoctors; i++) {
            address doctorAddress = accessList2[userAddress][i];
            Doctor memory curr = doctorIndex[doctorAddress];
            allDoctors[i] = DocProfile(
                curr.name,
                curr.age,
                curr.grNum,
                curr.degreeName,
                doctorAddress
            );
        }
        return allDoctors;
    }
}

// doctor has list of patients => clicks on view records button of a patient
