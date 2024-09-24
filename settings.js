document.addEventListener("DOMContentLoaded", () => {
    const settingsForm = document.querySelector("#settingsForm");
    const bgColorInput = document.querySelector("#bgColor");
    const textColorInput = document.querySelector("#textColor");
    const fontSizeInput = document.querySelector("#fontSize");
    const navbarColorInput = document.querySelector("#navbarColor");
    const modeSelect = document.querySelector("#mode");
    const notificationsEnabledInput = document.querySelector("#notificationsEnabled");
    const resetSettingsButton = document.querySelector("#resetSettings");

    const defaultSettings = {
        bgColor: "#f0f8ff",
        textColor: "#333",
        fontSize: 16,
        navbarColor: "#007bff",
        mode: "default",
        notificationsEnabled: true,
    };

    function applySettings(settings) {
        document.documentElement.style.setProperty('--bg-color', settings.bgColor);
        document.documentElement.style.setProperty('--text-color', settings.textColor);
        document.documentElement.style.setProperty('--font-size', settings.fontSize + 'px');
        document.documentElement.style.setProperty('--navbar-color', settings.navbarColor);

        const navbar = document.querySelector(".navbar");
        navbar.style.backgroundColor = settings.navbarColor;

        if (settings.mode === "dark") {
            document.documentElement.style.backgroundColor = "#333";
            document.documentElement.style.color = "#f0f8ff";
        } else if (settings.mode === "light") {
            document.documentElement.style.backgroundColor = "#ffffff";
            document.documentElement.style.color = "#000000";
        } else {
            document.documentElement.style.backgroundColor = settings.bgColor;
            document.documentElement.style.color = settings.textColor;
        }

        notificationsEnabledInput.checked = settings.notificationsEnabled;
    }

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("settings")) || defaultSettings;
        bgColorInput.value = savedSettings.bgColor;
        textColorInput.value = savedSettings.textColor;
        fontSizeInput.value = savedSettings.fontSize;
        navbarColorInput.value = savedSettings.navbarColor;
        modeSelect.value = savedSettings.mode;
        notificationsEnabledInput.checked = savedSettings.notificationsEnabled;

        applySettings(savedSettings);
    }

    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const settings = {
            bgColor: bgColorInput.value,
            textColor: textColorInput.value,
            fontSize: fontSizeInput.value,
            navbarColor: navbarColorInput.value,
            mode: modeSelect.value,
            notificationsEnabled: notificationsEnabledInput.checked,
        };

        localStorage.setItem("settings", JSON.stringify(settings));
        applySettings(settings);
    });

    resetSettingsButton.addEventListener("click", () => {
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
        loadSettings();
    });

    loadSettings();
});
