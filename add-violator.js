document.addEventListener("DOMContentLoaded", () => {
    const upcomingDueList = document.querySelector("#upcomingDueList");
    const overdueList = document.querySelector("#overdueList");
    const upcomingDueTitle = document.querySelector("#upcomingDueTitle");
    const overdueTitle = document.querySelector("#overdueTitle");
    const upcomingDueTable = document.querySelector("#upcomingDueTable");
    const overdueTable = document.querySelector("#overdueTable");

    upcomingDueTitle.addEventListener("click", () => {
        upcomingDueTable.classList.toggle("hidden");
    });

    overdueTitle.addEventListener("click", () => {
        overdueTable.classList.toggle("hidden");
    });

    function checkDueDates() {
        const today = new Date().setHours(0, 0, 0, 0);
        const violators = JSON.parse(localStorage.getItem("violators")) || [];
        const upcomingDueViolators = [];
        const overdueViolators = [];

        violators.forEach(violator => {
            const dueDate = new Date(violator.dueDate).setHours(0, 0, 0, 0);
            if (dueDate > today) {
                // Upcoming due
                upcomingDueViolators.push(violator);
            } else if (dueDate < today) {
                // Overdue
                overdueViolators.push(violator);
            }
        });

        // Display upcoming due violators
        displayViolators(upcomingDueViolators, upcomingDueList);

        // Display overdue violators
        displayViolators(overdueViolators, overdueList);
    }

    function displayViolators(violatorsArray, targetList) {
        targetList.innerHTML = "";
        if (violatorsArray.length === 0) {
            const status = targetList.id === "upcomingDueList" ? "Upcoming Due" : "Overdue";
            targetList.innerHTML = `<tr><td colspan="2">No ${status} violators to display.</td></tr>`;
        } else {
            violatorsArray.forEach(violator => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${violator.name}</td><td>${violator.dueDate}</td>`;
                targetList.appendChild(tr);
            });
        }
    }

    checkDueDates(); // Call checkDueDates function on page load
});
