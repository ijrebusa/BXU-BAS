document.addEventListener("DOMContentLoaded", () => {
    const generateReportButton = document.querySelector("#generateReport");
    const reportSummary = document.querySelector("#reportSummary");
    const reportOutput = document.querySelector("#reportOutput");

    generateReportButton.addEventListener("click", () => {
        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const violators = JSON.parse(localStorage.getItem("violators")) || [];
        const filteredViolators = violators.filter(violator => {
            const violationDate = new Date(violator.dateOfViolation);
            return violationDate >= new Date(startDate) && violationDate <= new Date(endDate);
        });

        displaySummary(filteredViolators);
        displayReport(filteredViolators);
    });

    function displaySummary(violators) {
        reportSummary.innerHTML = "";

        const totalViolations = violators.length;
        const uniqueBusinesses = [...new Set(violators.map(violator => violator.name))].length;
        const violationsByType = violators.reduce((acc, violator) => {
            acc[violator.violation] = (acc[violator.violation] || 0) + 1;
            return acc;
        }, {});

        reportSummary.innerHTML = `
            <h2>Summary</h2>
            <p>Total Violations: ${totalViolations}</p>
            <p>Unique Businesses: ${uniqueBusinesses}</p>
            <p>Most Common Violations: ${Object.entries(violationsByType).map(([type, count]) => `${type}: ${count}`).join(', ')}</p>
        `;
    }

    function displayReport(violators) {
        reportOutput.innerHTML = "";

        if (violators.length === 0) {
            reportOutput.innerHTML = "<p>No violators found for the selected period.</p>";
            return;
        }

        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Violation</th>
                    <th>Date of Violation</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                ${violators.map(violator => `
                    <tr>
                        <td>${violator.name}</td>
                        <td>${violator.violation}</td>
                        <td>${violator.dateOfViolation}</td>
                        <td>${violator.dueDate}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        reportOutput.appendChild(table);
    }
});
