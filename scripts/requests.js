import { printCardsPanelHeader, Pagination, CardSelectionHandler } from "./common.js";
import { vacationRequestsCardsData } from "./data.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {
        printCardsPanelHeader(
            document.querySelector(".vacation-requests__header-wrapper"),
            "fa-solid fa-list-check",
            "vacation requests",
            "#vacation-requests .cards-panel__item",
            true
        );

        renderPagination();
        handleCardsSelection();

    } catch (error) {
        console.log(error);
    }
});

function renderPagination() {
    let pagination = new Pagination(
        document.querySelector(".vacation-request__pagination"),
        { cardsNumber: vacationRequestsCardsData.length, pageSize: 9 },
        {
            getDataChunksFunction: getPagesData,
            dataToCardElementFunction: getVacationRequestsCardElement,
            cardsContainer: document.querySelector(".vacation-requests__cards-wrapper")
        }

    );
    pagination.renderPagination();
}

function handleCardsSelection() {
    let cardSelectionHandler = new CardSelectionHandler(
        document.querySelector('.vacation-requests__cards-wrapper'),
        {
            checkIconClassName: "vacation-requests-card__select-icon ",
            checkedIconClassName: "vacation-requests-card__select-icon--selected"
        },
        document.querySelector(".vacation-request-action"),
        true,
        document.getElementById("select-all")
    );

    cardSelectionHandler.handleCardsSelection();
}

function getVacationRequestsCardElement(vacationRequestsCardData) {
    let cardElementTemp = document.createElement("div");

    cardElementTemp.innerHTML = `
    <div class="col cards-panel__item">
        <div class="vacation-requests-card position-relative text-center bg-background p-3 rounded">
            <span class='vacation-requests-card__select-icon position-absolute top-0 end-0'></span>
            <header class="d-sm-flex align-items-center gap-3">
                <img loading='lazy'
                    class="vacation-requests-card__img rounded-pill shadow-sm"
                    src="${vacationRequestsCardData.img}"
                    alt="${vacationRequestsCardData.name.split(' ')[0]} image not found"
                />
                <h3 class="vacation-requests-card__employee-name fs-5 fw-semibold mt-2">
                    ${vacationRequestsCardData.name}
                </h3>
            </header>
            <div class="vacation-requests__data-btns-wrapper d-sm-flex justify-content-between">
                <main class="text-start mt-3 fs-14">
                    <div>
                        <span>submitted on:</span>
                        <span class="d-block fw-semibold text-secondary mb-2">
                            ${vacationRequestsCardData.submittedDate}
                        </span>
                    </div>
                    <div>
                        <span>Duration:</span>
                        <span class="d-block fw-semibold text-secondary mb-2">
                            ${vacationRequestsCardData.duration}
                        </span>
                    </div>
                    <div>
                        <span>salary:</span>
                        <span class="d-block fw-semibold text-secondary mb-2">
                            ${vacationRequestsCardData.salary}
                        </span>
                    </div>
                </main>
                <footer class="mt-4 d-flex flex-sm-column align-items-center gap-3 align-self-end">
                    <button
                        type="button"
                        name="vacation requests card decline button"
                        id="vacation-requests-card-decline-button-${vacationRequestsCardData.id}"
                        class="btn btn-secondary w-100 order-1"
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
    </div>
`;

    return cardElementTemp.firstElementChild;
}

function getPagesData(pageNumber) {

    const numberOfCardsInPage = 9;

    let chunkStart = numberOfCardsInPage * (pageNumber - 1);
    chunkStart = (chunkStart < 0) ? 0 : chunkStart;
    let chunkEnd = numberOfCardsInPage * pageNumber;

    chunkEnd = (pageNumber * numberOfCardsInPage > vacationRequestsCardsData.length) ? vacationRequestsCardsData.length : chunkEnd;

    return vacationRequestsCardsData.slice(chunkStart, chunkEnd);
}