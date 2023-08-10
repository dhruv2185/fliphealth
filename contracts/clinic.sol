// *pragma solidity ^0.8.0;
// import "./patient.sol";

// contract clinic is patient{
//     struct Clinic {
//         string name;
//         uint128 phone;
//         string email;
//         string location;
//     }

//     mapping (address => address) internal DocClinAdd; // doctor address to clinic address
//     mapping (address => Clinic) internal DoctorClinic;  // doctor address to clinic struct

//     function getAllDoctorsForHospital() external view returns (DocProfile[] memory){
//         DocProfile[] memory myDoctors= new DocProfile[](50);
//         for (uint i=0; i<doctors.length; i++){
//             if(DocClinAdd[doctors[i]] == msg.sender)
//             {
//                 myDoctors[i] = DocProfileReturn(doctors[i]);
//             }
//         }
//         return myDoctors;        
//     }
     
//     function addClinic(string memory _name, uint128 _phone, string memory _email, string memory _location) external{
//         DoctorClinic[msg.sender]= Clinic(_name, _phone, _email, _location);        
//     }

//     function removeClinic() external {
//         delete DoctorClinic[msg.sender];            
//     }
// }