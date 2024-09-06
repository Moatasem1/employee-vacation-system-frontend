import { UserProfile, printCardsPanel } from "./common.js";
import { userData, vacationHistoryData, pendingRequest } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

  renderDetailedUserProfile();

  renderVacationHistoryPanel();

  renderPendingRequestPanel();
});

/*---------------------------- main functions ---------------------------- */

function renderDetailedUserProfile() {
  let userProfile = new UserProfile(
    //profile container HTML element
    document.querySelector("#user-profile .container"),
    //user data
    userData,
    //profile type 1 for quick and 2 for detailed
    UserProfile.profileTypes[1]
  );

  userProfile.renderUserProfile();
}

function renderVacationHistoryPanel() {
  printCardsPanel(
    //panel container HTML element
    document.querySelector("#history .container"),
    //panel new id
    "history-panel",
    //vacation history data
    vacationHistoryData,
    //function to converte history data to HTML card element
    getVacationHistoryCardEl,
    //icon class 'font awesome'
    "fa-solid fa-clock-rotate-left",
    //title
    "history",
    //view more link
    "",
    //with search
    false
  );
}

function renderPendingRequestPanel() {
  printCardsPanel(
    //panel container
    document.querySelector("#pending .container"),
    //panel new id
    "history-panel",
    //pending request data
    pendingRequest,
    //function to converte each pending data to card Element
    getPendingCardEl,
    //icon class name 'font awesome'
    "fa-solid fa-spinner",
    //title
    "pending requests",
    //view more link
    "",
    //with search?
    false
  );
}

/*---------------------------- helper functions ---------------------------- */

function getVacationHistoryCardEl(historyCardData) {
  let historyCardWrapper = document.createElement("div");

  historyCardWrapper.innerHTML = `
        <div class="col">
            <div
            class="vacation-history-card shadow-card p-3 bg-background rounded"
            >
            <h2 class="fs-5 fw-semibold">${historyCardData.vacationType}</h2>
            <p class="text-secondary mb-3 fw-medium">
                ${historyCardData.from} - ${historyCardData.to}
                <span class="fw-semibold ms-1">${historyCardData.days} Days</span>
            </p>
            <span class="text-secondary fw-medium"
                >approved by: ${userData.reportingTo}</span
            >
            </div>
        </div>
        `;

  return historyCardWrapper.firstElementChild
}

function getPendingCardEl(pendingCardData) {
  let cardElementTemp = document.createElement("div");

  cardElementTemp.innerHTML = `
       <div class="col cards-panel__item ">
                  <div
                    class="vacation-requests-card shadow-card  text-center bg-background p-3 rounded"
                  >
                    <header>
                      <img
                        class="vacation-requests-card__img rounded-pill shadow-sm"
                        src="${userData.img}"
                        alt="${userData.username.split(' ')[0]} image not found"
                      />
                      <h3 class="vacation-requests-card__employee-name fs-5 fw-semibold mt-2">${userData.username}</h3>
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
                    <span class='text-theme fw-semibold'>${userData.reportingTo}</span>
                    </footer>
                  </div>
                </div>
      `;

  return cardElementTemp.firstElementChild;
}