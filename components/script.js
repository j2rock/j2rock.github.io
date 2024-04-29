// Function to set the theme based on system preference
function setTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = prefersDarkScheme ? "dark-mode" : "light-mode";
    document.body.className = theme;
}

// Toggle theme button event listener
/* document.getElementById("toggleTheme").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
}); */

// Set initial theme based on system preference
setTheme();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setTheme);