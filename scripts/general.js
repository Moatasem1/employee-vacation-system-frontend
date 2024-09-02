document.addEventListener("DOMContentLoaded", () => {
    printHeader();
});

async function printHeader() {
    const navbarContainer = document.getElementById("navbar-container");

    if (!navbarContainer) return;

    navbarContainer.innerHTML = await fetchHeader();
    assignActiveToCurrentPage();
}

async function fetchHeader() {
    const response = await fetch("/pages/header.html");

    if (response.ok) {
        return response.text();
    } else {
        return "Unable to load the header :(";
    }
}

function assignActiveToCurrentPage() {
    let currentUrl = window.location.pathname;

    // If the current URL is just a forward slash, treat it as '/index.html'.
    currentUrl = (currentUrl === "/") ? "/index.html" : currentUrl;

    const navLinks = document.querySelectorAll(".navbar .nav-link");

    for (const navLink of navLinks) {
        const navLinkUrl = navLink.getAttribute("href");

        if (currentUrl === navLinkUrl) {
            navLink.classList.add("active");
            break;
        }
    }
}