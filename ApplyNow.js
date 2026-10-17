
/* =====================================================
   DARK / LIGHT THEME TOGGLE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    const sun = document.getElementById("sunIcon");
    const moon = document.getElementById("moonIcon");

    if (!toggle) return;

    function setTheme(isLight) {
        document.body.classList.toggle("light-theme", isLight);

        sun?.classList.toggle("hidden", isLight);
        moon?.classList.toggle("hidden", !isLight);

        toggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );

        toggle.setAttribute("aria-pressed", String(isLight));
        toggle.title = isLight ? "Switch to dark theme" : "Switch to light theme";
    }

    let savedTheme = "dark";

    try {
        savedTheme = localStorage.getItem("applyNowTheme") || "dark";
    } catch (error) {
        // Theme switching still works without local storage.
    }

    setTheme(savedTheme === "light");

    toggle.addEventListener("click", () => {
        const isLight = !document.body.classList.contains("light-theme");

        setTheme(isLight);

        try {
            localStorage.setItem("applyNowTheme", isLight ? "light" : "dark");
        } catch (error) {
            // Keep the selected theme for the current page.
        }
    });
});
