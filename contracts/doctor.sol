pragma solidity ^0.5.9;
import "./patient.sol";
contract Doctor is patient{
    modifier AuthorizedDoctor( uint _doctorId, uint _patientId) {
        uint128[] memory p = accessList[uint64(_doctorId)];
        bool auth= false;
        for( uint i=0; i < p.length; i++)
        {
            if(p[i]== _patientId){
                auth=true;
            }
        }
        require(auth == true);
        _;
    }

    function registerDoctor(string memory _name, uint _abhaId, uint16 _age, string memory _degreePath) public {
        uint64 index= uint64(doctors.length);
        doctorIndex[msg.sender] = index;
        doctors.push(Doctor(msg.sender, uint128(_abhaId), _name, _age, _degreePath));
    }

    function requestAccess (uint _patientId) public {
        uint64 index= doctorIndex[msg.sender];
        doctors[index].abhaId                 
    } 

    function viewDocuments() public view returns () {
    }

}