// kya likha hai kuch samajh nahi aa raha bhai
// comments daala kar
// ek mapping yeh hogi na ki address to organization
// aur ek mapping yeh hogi ki organization to doctor address jisse doctors ko remove or add karne ki authority sirf owner ke paas hogi
// yaha aisa kuch dikh nahi raha
// kal jara samjha dena. Thank you

// pragma solidity ^0.8.0;

// import "./doctor.sol";
// contract hospital is doctor{
//     struct Hospital{
//         string hospname;
//         string email;
//         uint128 phone;
//     }

//     mapping (address => address) organization; ///doctor struct to hospital struct

//     modifier authorizedHospital(address _doctor, address _hospital) {
//         require(organization[msg.sender]== _hospital);
//         _;
//     }

//     function removeDoctor(address _doctor) public authorizedHospital(_doctor, msg.sender) {
//         organization[_doctor] = address(0);                                                                
//     }

//     function addHospital(address _doctor) public  {
//         organization[_doctor] = msg.sender;        
//     }
// }