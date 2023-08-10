pragma solidity ^0.8.0;
import "./clinic.sol";

contract diagnostics is clinic {
    function registerDiagnostic(
        string memory _Diagname,
        string memory _email,
        uint128 _phone,
        string memory _license
    ) external {
        grantAccess(msg.sender);
        diagnostics.push(msg.sender);
        DiagnosticIndex[msg.sender] = Diagnostic(
            _Diagname,
            _email,
            _phone,
            _license
        );
    }

    function getPatientsForDiagnostic()
        external
        view
        returns (PatientProfile[] memory)
    {
        uint patientCount = DiagnosticAccessList[msg.sender].length;
        // add a response if patientCount is 0
        PatientProfile[] memory patients = new PatientProfile[](patientCount);
        for (uint i = 0; i < patientCount; i++) {
            address currPatAddress = DiagnosticAccessList[msg.sender][i];
            patients[i] = getPatientProfile(currPatAddress);
        }
        return patients;
    }

    function getHealthRecordsDiagnostic(
        address patAddress
    ) public view returns (HealthRecord[] memory) {
        require(isAuthorizedDiagnostic(patAddress, msg.sender), "unauthorized");
        return userRecords[patAddress];
    }

    function getAllDiagnostics()
        external
        view
        returns (Diagnostic[] memory, address[] memory)
    {
        uint256 numDiagnostics = diagnostics.length;
        Diagnostic[] memory allDiagnostics = new Diagnostic[](numDiagnostics);
        for (uint256 i = 0; i < numDiagnostics; i++) {
            address diagnosticAddress = diagnostics[i];
            Diagnostic memory curr = DiagnosticIndex[diagnosticAddress];
            allDiagnostics[i] = curr;
        }
        return (allDiagnostics, diagnostics);
    }

    function getDiagnosticsForUser()
        external
        view
        returns (Diagnostic[] memory, uint)
    {
        uint count = 0;
        Diagnostic[] memory authDiagnostic = new Diagnostic[](50);
        for (uint i = 0; i < diagnostics.length; i++) {
            if (isAuthorizedDiagnostic(msg.sender, diagnostics[i])) {
                authDiagnostic[count] = DiagnosticIndex[diagnostics[i]];
                count++;
            }
        }
        return (authDiagnostic, count);
    }

    function uploadRecordsDiagnostic(
        address _patient,
        string memory _org,
        string memory _date,
        string memory _docName,
        string memory _name,
        string memory _path,
        string memory _cid,
        string memory _docType
    ) external {
        require(isAuthorizedDiagnostic(_patient, msg.sender), "unauthorized");
        userRecords[_patient].push(
            HealthRecord(
                _org,
                _date,
                _name,
                _docName,
                _path,
                _cid,
                _patient,
                _docType
            )
        );
    }

    function getPatientIndexDia(
        address _diagnostc,
        address _user
    ) internal view returns (uint256) {
        address[] memory Diagnostics = DiagnosticAccessList[_diagnostc];
        for (uint256 i = 0; i < Diagnostics.length; i++) {
            if (Diagnostics[i] == _user) {
                return i;
            }
        }
        return Diagnostics.length; // User address not found in the array
    }

    function revokeAccessDiagnostic(address _diagnostic) external {
        uint256 index = getPatientIndexDia(_diagnostic, msg.sender);

        address[] storage users = DiagnosticAccessList[_diagnostic];
        if (index < users.length) {
            users[index] = users[users.length - 1];
            users.pop();
        }
    }
}
