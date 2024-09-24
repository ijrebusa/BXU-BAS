document.addEventListener("DOMContentLoaded", () => {
    const violators = JSON.parse(localStorage.getItem("violators")) || [];
    const violatorsTable = document.getElementById("violatorsBody");

    function displayViolators() {
        violatorsTable.innerHTML = "";
        violators.forEach((violator, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${violator.name}</td>
                <td>${violator.typeOfInspection}</td>
                <td>${violator.status}</td>
                <td>${violator.violationStatus}</td>
                <td>${violator.violationStatus === "with_violation" ? violator.natureOfViolation : '-'}</td>
                <td>${violator.violationStatus === "without_violation" ? violator.inspectionReportFormNo : '-'}</td>
                <td>
                    ${violator.scannedCopy && violator.scannedCopy.length > 0 ? violator.scannedCopy.map(url => `<a href="${url}" target="_blank">View Attachment</a>`).join('<br>') : '-'}
                </td>
                <td>${violator.violationReceiptNo}</td>
                <td>${violator.dateOfViolation}</td>
                <td>${violator.dueDate}</td>
                <td>${violator.phoneNumber}</td>
                <td>${violator.email}</td>
            `;
            row.addEventListener("click", () => {
                window.location.href = `settle.html?id=${index}`;
            });
            violatorsTable.appendChild(row);
        });
    }

    function filterTable() {
        const searchInput = document.getElementById('searchBar').value.toLowerCase();
        const rows = violatorsTable.getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const name = cells[1].innerText.toLowerCase();
            
            if (name.includes(searchInput)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    function sortTable() {
        const sortOptions = document.getElementById("sortOptions");
        sortOptions.addEventListener("change", () => {
            const sortBy = sortOptions.value;
            if (sortBy === "alphabetical") {
                violators.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === "dateOfViolation") {
                violators.sort((a, b) => new Date(a.dateOfViolation) - new Date(b.dateOfViolation));
            } else if (sortBy === "numberOfViolations") {
                violators.sort((a, b) => (b.violationsCount || 0) - (a.violationsCount || 0));
            } else if (sortBy === "dateAdded") {
                violators.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
            }
            displayViolators();
            filterTable(); // Ensure the table is filtered after sorting
        });
    }

    document.getElementById('searchBar').addEventListener('keyup', filterTable);

    // Initial display
    displayViolators();
    sortTable();
});
