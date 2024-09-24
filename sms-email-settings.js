document.addEventListener("DOMContentLoaded", () => {
    const smsEmailSettingsForm = document.querySelector("#smsEmailSettingsForm");

    smsEmailSettingsForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const smsGateway = document.querySelector("#smsGateway").value;
        const smsApiKey = document.querySelector("#smsApiKey").value;
        const emailServer = document.querySelector("#emailServer").value;
        const emailUsername = document.querySelector("#emailUsername").value;
        const emailPassword = document.querySelector("#emailPassword").value;

        const settings = {
            smsGateway,
            smsApiKey,
            emailServer,
            emailUsername,
            emailPassword,
        };

        localStorage.setItem("smsEmailSettings", JSON.stringify(settings));

        alert("Settings saved successfully!");
    });

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem("smsEmailSettings"));
        if (settings) {
            document.querySelector("#smsGateway").value = settings.smsGateway;
            document.querySelector("#smsApiKey").value = settings.smsApiKey;
            document.querySelector("#emailServer").value = settings.emailServer;
            document.querySelector("#emailUsername").value = settings.emailUsername;
            document.querySelector("#emailPassword").value = settings.emailPassword;
        }
    }

    loadSettings();
});
