document.addEventListener("DOMContentLoaded", () => {
    const upcomingDueList = document.querySelector("#upcomingDueList");
    const overdueList = document.querySelector("#overdueList");

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
        displayViolators(upcomingDueViolators, upcomingDueList, "Upcoming Due");

        // Display overdue violators
        displayViolators(overdueViolators, overdueList, "Overdue");
    }

    function displayViolators(violatorsArray, targetList, status) {
        targetList.innerHTML = "";
        if (violatorsArray.length === 0) {
            targetList.innerHTML = `<li>No ${status} violators to display.</li>`;
        } else {
            violatorsArray.forEach(violator => {
                const li = document.createElement("li");
                li.innerHTML = `<span>${violator.name}</span><span>${status} Date: ${violator.dueDate}</span>`;
                targetList.appendChild(li);
            });
        }
    }

    checkDueDates(); // Call checkDueDates function on page load
});
