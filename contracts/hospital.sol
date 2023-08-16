pragma solidity ^0.8.0;

import "./diagnostics.sol";
import "./Ownable.sol";

contract hospital is diagnostics, Ownable {
    uint cost = 0.1 ether;
    struct Hospital {
        string hospname;
        string email;
        uint128 phone;
        string license;
    }
    mapping(address => Hospital) public hospitals; /// hospital mapping
    mapping(address => address) public organization; ///doctor struct to hospital struct

    modifier authorizedHospital(address _doctor, address _hospital) {
        require(organization[_doctor] == _hospital, "unauthorized");
        _;
    }

    function getAllDoctorsForHospital()
        external
        view
        returns (DocProfile[] memory)
    {
        DocProfile[] memory myDoctors = new DocProfile[](50);
        for (uint i = 0; i < doctors.length; i++) {
            if (organization[doctors[i]] == msg.sender) {
                myDoctors[i] = DocProfileReturn(doctors[i]);
            }
        }
        return myDoctors;
    }

    function registerHospital(
        string memory _hospname,
        string memory _email,
        uint _phone,
        string memory _license
    ) external payable {
        require(msg.value == cost);
        hospitals[msg.sender] = Hospital(
            _hospname,
            _email,
            uint128(_phone),
            _license
        );
    }

    function removeDoctor(
        address _doctor
    ) external authorizedHospital(_doctor, msg.sender) {
        delete organization[_doctor];
    }

    function addHospital(address _doctor) external {
        organization[_doctor] = msg.sender;
    }

    function revokeAccessToAll(address _doctor) external {
        delete accessList[_doctor];
    }

    function withdraw() external onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function setCost(uint _fee) external onlyOwner {
        cost = _fee;
    }
}
