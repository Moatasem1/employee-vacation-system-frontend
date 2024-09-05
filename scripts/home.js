import { printCardsPanel, UserProfile } from "./common.js";
import { vacationRequestsCardsData, userData } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {

  printLatestNewsCarousel();

  printSearchableVacationRequestsCardsPanel();

  let userProfile = new UserProfile(
    document.querySelector(".profile-summary .row > div:first-child"),
    userData,
    UserProfile.profileTypes[0]
  );

  userProfile.renderUserProfile();
});

/* ------------------------ start print latest new carousel ------------------------ */

function printLatestNewsCarousel() {

  const carouselItemsData = [
    {
      img: "1.jpg",
      title: "Empowering Growth: Our Path Forward",
      desc: "We are excited to announce new opportunities for skill development and career growth within the company. Your dedication is paving the way for a brighter future for all of us."
    },
    {
      img: "2.jpg",
      title: "Celebrating Success: Team Achievements",
      desc: "Our team’s hard work and collaboration have led to remarkable results this quarter. Let’s continue to build on this momentum and achieve even greater success together."
    },
    {
      img: "3.jpg",
      title: "Innovation in Action: Shaping Tomorrow",
      desc: "We’re launching new initiatives that will drive innovation and creativity in our projects. Your ideas and efforts are vital as we shape the future of our industry."
    }
  ];

  let carouselItemsContainer = document.getElementById("latest-news-carousel-inner");
  let carouselIndicatorsContainer = document.getElementById("latest-news-carousel-indicators");

  if (!carouselItemsContainer || !carouselIndicatorsContainer || !carouselItemsData)
    return;

  let counter = 0;
  carouselItemsData.forEach(imageData => {
    carouselItemsContainer.appendChild(getLatesNewsCarouselItemElement(imageData, counter));
    carouselIndicatorsContainer.appendChild(getLatesNewsCarouselIndicatorElement(counter));
    counter++;
  });
}

function getLatesNewsCarouselItemElement(imageData, id) {

  let imgElmentTemp = document.createElement("div");

  imgElmentTemp.innerHTML = `
         <div class="carousel-item ${id === 0 ? 'active' : ''}">
            <img
                src="${"/assets/images/latest_news/" + imageData.img}"
                class="d-block w-100 img-fluid rounded"
                alt="img slide ${id} not found"
            />
            <div
                class="carousel-caption text-start start-0 bottom-0 p-4 w-100"
            >
                <h5 class="text-dark fw-semibold">${imageData.title}</h5>
                <p class="text-dark mb-0">${(imageData.desc.length > 100) ? imageData.desc.slice(0, 100) + '...' : imageData.desc}</p>
            </div>
        </div>
    `;

  return imgElmentTemp.firstElementChild;
}

function getLatesNewsCarouselIndicatorElement(id) {

  let indicatorElmentTemp = document.createElement("div");

  indicatorElmentTemp.innerHTML = `
         <button
                type="button"
                data-bs-target="#lates-news-carousel"
                data-bs-slide-to="${id}"
                class="${id === 0 ? 'active' : ''}"
                aria-current="true"
                aria-label="Slide ${id}">
        </button>
    `;

  return indicatorElmentTemp.firstElementChild;
}

/* ------------------------ end print latest new carousel ------------------------ */

/* ------------------------ start print Searchable VacationReqeust Cards Panel ------------------------ */

function printSearchableVacationRequestsCardsPanel() {

  let cardsPanelContainer = document.querySelector(".vacation-requests .container");
  printCardsPanel(
    cardsPanelContainer,
    "vacation-requests-panel",
    vacationRequestsCardsData,
    getVacationRequestsCardElement,
    "fa-solid fa-list-check",
    "vacation requests",
    "/pages/requests.html",
    true
  );
}

function getVacationRequestsCardElement(vacationRequestsCardData) {
  let cardElementTemp = document.createElement("div");

  cardElementTemp.innerHTML = `
     <div class="col cards-panel__item">
                <div
                  class="vacation-requests-card shadow-sm text-center bg-background p-3 rounded"
                >
                  <header>
                    <img
                      class="vacation-requests-card__img rounded-pill shadow-sm"
                      src="${vacationRequestsCardData.img}"
                      alt="${vacationRequestsCardData.name.split(' ')[0]} image not found"
                    />
                    <h3 class="vacation-requests-card__employee-name fs-5 fw-semibold mt-2">${vacationRequestsCardData.name}</h3>
                  </header>
                  <main class="text-start mt-3 fs-14">
                    <div>
                      <span>submitted on:</span>
                      <span class="d-block fw-semibold text-secondary mb-2"
                        >${vacationRequestsCardData.submittedDate}</span
                      >
                    </div>
                    <div>
                      <span>Duration:</span>
                      <span class="d-block fw-semibold text-secondary mb-2"
                        >${vacationRequestsCardData.duration}</span
                      >
                    </div>
                    <div>
                      <span>salary:</span>
                      <span class="d-block fw-semibold text-secondary mb-2"
                        >${vacationRequestsCardData.salary}</span
                      >
                    </div>
                  </main>
                  <footer class="mt-4 d-flex align-items-center gap-3">
                    <button
                      type="button"
                      name="vacation requests card decline button"
                      id="vacation-requests-card-decline-button-${vacationRequestsCardData.id}"
                      class="btn btn-secondary w-100"
                    >
                      decline
                    </button>
                    <button
                      type="button"
                      name="vacation requests card approve button"
                      id="vacation-requests-card-approve-button-${vacationRequestsCardData.id}"
                      class="btn btn-main w-100"
                    >
                      Approve
                    </button>
                  </footer>
                </div>
              </div>
    `;

  return cardElementTemp.firstElementChild;
}

/* ------------------------ end print Searchable VacationReqeust Cards Panel ------------------------ */