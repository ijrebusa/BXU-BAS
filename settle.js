document.addEventListener("DOMContentLoaded", () => {
    const violators = JSON.parse(localStorage.getItem("violators")) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const violatorIndex = urlParams.get('id');
    const violator = violators[violatorIndex];
    const violatorDetails = document.getElementById("violatorDetails");

    if (violator) {
        violatorDetails.innerHTML = `
            <p>Name: ${violator.name}</p>
            <p>Type of Inspection: ${violator.typeOfInspection}</p>
            <p>Status: ${violator.status}</p>
            <p>Violation Status: ${violator.violationStatus}</p>
            <p>Nature of Violation: ${violator.natureOfViolation}</p>
            <p>Inspection Report Form No.: ${violator.inspectionReportFormNo}</p>
            <p>Scanned Copy: ${violator.scannedCopy && violator.scannedCopy.length > 0 ? violator.scannedCopy.map(url => `<a href="${url}" target="_blank">View Attachment</a>`).join('<br>') : '-'}</p>
            <p>Violation Receipt No.: ${violator.violationReceiptNo}</p>
            <p>Date of Violation: ${violator.dateOfViolation}</p>
            <p>Due Date: ${violator.dueDate}</p>
            <p>Phone Number: ${violator.phoneNumber}</p>
            <p>Email: ${violator.email}</p>
        `;
    }

    document.getElementById("settleButton").addEventListener("click", () => {
        violator.status = "settled";
        localStorage.setItem("violators", JSON.stringify(violators));
        alert("Penalty settled successfully!");
        window.location.href = "violations.html";
    });
});
