import { printHTML } from "./common.js";

document.addEventListener("DOMContentLoaded", () => {
    printHeader();
});

async function printHeader() {

    let navbarContainer = document.getElementById("navbar-container");

    await printHTML(navbarContainer, "/master_pages/header.html", "/styles/header.css")

    assignActiveToCurrentPage();
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