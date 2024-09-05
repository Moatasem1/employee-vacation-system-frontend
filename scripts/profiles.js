import { UserProfile, printCardsPanel } from "./common.js";
import { userData, vacationHistoryData, pendingRequest } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

    renderUserProfile();

    renderVacationHistoryPanel();

    renderPendingRequestPanel();
});

function renderUserProfile() {
    let userProfile = new UserProfile(
        document.querySelector("#user-profile .container"),
        userData,
        UserProfile.profileTypes[1]
    );

    userProfile.renderUserProfile();
}

function renderVacationHistoryPanel() {
    printCardsPanel(
        document.querySelector("#history .container"),
        "history-panel",
        vacationHistoryData,
        getVacationHistoryCardEl,
        "fa-solid fa-clock-rotate-left",
        "history",
        "",
        false
    );
}

function renderPendingRequestPanel() {
    printCardsPanel(
        document.querySelector("#pending .container"),
        "history-panel",
        pendingRequest,
        getPendingCardEl,
        "fa-solid fa-spinner",
        "pending requests",
        "",
        false
    );
}


function getVacationHistoryCardEl(historyCardData) {
    let historyCardWrapper = document.createElement("div");

    historyCardWrapper.innerHTML = `
        <div class="col">
            <div
            class="vacation-history-card shadow-sm p-3 bg-background rounded"
            >
            <h2 class="fs-5 fw-semibold">${historyCardData.vacationType}</h2>
            <p class="text-secondary mb-3 fw-medium">
                ${historyCardData.from} - ${historyCardData.to}
                <span class="fw-semibold ms-1">${historyCardData.days} Days</span>
            </p>
            <span class="text-secondary fw-medium"
                >approved by: ${userData.username}</span
            >
            </div>
        </div>
        `;

    return historyCardWrapper.firstElementChild
}

function getPendingCardEl(pendingCardData) {
    let cardElementTemp = document.createElement("div");

    cardElementTemp.innerHTML = `
       <div class="col cards-panel__item">
                  <div
                    class="vacation-requests-card shadow-sm text-center bg-background p-3 rounded"
                  >
                    <header>
                      <img
                        class="vacation-requests-card__img rounded-pill shadow-sm"
                        src="${pendingCardData.img}"
                        alt="${pendingCardData.name.split(' ')[0]} image not found"
                      />
                      <h3 class="vacation-requests-card__employee-name fs-5 fw-semibold mt-2">${pendingCardData.name}</h3>
                    </header>
                    <main class="text-start mt-3 fs-14">
                      <div>
                        <span>submitted on:</span>
                        <span class="d-block fw-semibold text-secondary mb-2"
                          >${pendingCardData.submittedDate}</span
                        >
                      </div>
                      <div>
                        <span>Duration:</span>
                        <span class="d-block fw-semibold text-secondary mb-2"
                          >${pendingCardData.duration}</span
                        >
                      </div>
                    </main>
                    <footer class="mt-4 text-start">
                    <span class='d-block'>currently at:</span>
                    <span class='text-theme fw-semibold'>${pendingCardData.redirectedTo}</span>
                    </footer>
                  </div>
                </div>
      `;

    return cardElementTemp.firstElementChild;
}