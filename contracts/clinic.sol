pragma solidity ^0.8.0;
import "./doctor.sol";

contract clinic is doctor {
    struct Clinic {
        string name;
        uint128 phone;
        string email;
        string location;
    }

    mapping(address => address) internal DoctorToClinic; // doctor address to clinic address
    mapping(address => Clinic) public ClinicIndex; // doctor address to clinic struct

    // register Clinic
    // view all doctors of clininc
    // view all clinics for doctors
    // add organisation abd clinic to doctorProfile

    function registerClinic(
        string memory _name,
        uint128 _phone,
        string memory _email,
        string memory _location
    ) external {
        ClinicIndex[msg.sender] = Clinic(_name, _phone, _email, _location);
    }

    function enrollInClinic(address _clinic) external {
        DoctorToClinic[msg.sender] = _clinic;
    }

    function getAllDoctorsForClinic()
        external
        view
        returns (DocProfile[] memory, uint16)
    {
        uint16 count = 0;
        DocProfile[] memory myDoctors = new DocProfile[](25);
        for (uint i = 0; i < doctors.length; i++) {
            if (DoctorToClinic[doctors[i]] == msg.sender) {
                myDoctors[count] = DocProfileReturn(doctors[i]);
                count++;
            }
        }
        return (myDoctors, count);
    }
}
