pragma solidity ^0.8.0;
import "./patient.sol";
contract Doctor is patient{

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

    function getHealthRecords(address patAddress) public view returns (HealthRecord[] memory) {
        return userRecords[patAddress];
    }

}