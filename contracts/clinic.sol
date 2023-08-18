pragma solidity ^0.8.0;
import "./doctor.sol";

contract clinic is doctor {
    struct Clinic {
        string name;
        uint128 phone;
        string email;
        string location;
    }

    // Maps a user to a clinic
    mapping(address => address) public DoctorToClinic; // doctor address to clinic address
    // Maps an address to Clinic Profile
    mapping(address => Clinic) public ClinicIndex; // doctor address to clinic struct

    // Registers clinic on the blockchain
    function registerClinic(
        string memory _name,
        uint128 _phone,
        string memory _email,
        string memory _location
    ) external {
        ClinicIndex[msg.sender] = Clinic(_name, _phone, _email, _location);
    }

    // Allows a user to enroll in a clinic
    function enrollInClinic(address _clinic) external {
        DoctorToClinic[msg.sender] = _clinic;
    }

    // Returns profile of all doctors enrolled in the clinic
    function getAllDoctorsForClinic()
        external
        view
        returns (DocProfile[] memory)
    {
        uint16 count = 0;
        DocProfile[] memory myDoctors = new DocProfile[](25);
        for (uint i = 0; i < doctors.length; i++) {
            if (DoctorToClinic[doctors[i]] == msg.sender) {
                myDoctors[count] = DocProfileReturn(doctors[i]);
                count++;
            }
        }
        return (myDoctors);
    }

    // Allows a user to exit from a clinic
    function exitFromClinic() external {
        delete DoctorToClinic[msg.sender];
    }
}
