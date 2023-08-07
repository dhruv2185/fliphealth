pragma solidity ^0.8.0;

import "./doctor.sol";
contract hospital is doctor{
    struct Hospital{
        string hospname;
        string email;
        uint128 phone;
    }

    mapping (address => address) organization; ///doctor struct to hospital struct

    modifier authorizedHospital(address _doctor, address _hospital) {
        require(organization[msg.sender]== _hospital);
        _;
    }

    function removeDoctor(address _doctor) public authorizedHospital(_doctor, msg.sender) {
        organization[_doctor] = address(0);                                                                
    }

    function addHospital(address _doctor) public {
        organization[_doctor] = msg.sender;        
    }
}