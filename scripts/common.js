//functions to load html file and and append it in a specfice container
export async function printHTML(container, htmlUrl, styleUrl = "", scriptUrl = "") {

    if (!container) return;

    container.innerHTML = await fetchHTML(htmlUrl);

    appendStyle(styleUrl);
    appendScript(scriptUrl);
}

async function fetchHTML(url) {
    const response = await fetch(url);

    if (response.ok) {
        return response.text();
    } else {
        return "Unable to load the header :(";
    }
}

function appendStyle(styleUrl) {

    if (!styleUrl)
        return;

    let styleElement = document.createElement("link");
    styleElement.rel = "stylesheet";
    styleElement.href = styleUrl;

    document.head.appendChild(styleElement);
}

function appendScript(scriptUrl) {

    if (!scriptUrl)
        return;

    let scriptElement = document.createElement("script");
    scriptElement.defer = true;
    scriptElement.src = scriptUrl;

    document.body.appendChild(scriptElement);
}

// functions to print Cards Panel
export async function printCardsPanel(cardsPanelContainer, cardsPanelId, cardsData,
    cardDataTocardElementFn, iconClass, title, knowMoreLink, withSearch = false) {

    await printHTML(cardsPanelContainer, "/master_pages/cards-panel.html");

    //print cards panel
    let cardsPanel = cardsPanelContainer.firstChild;
    cardsPanel.id = cardsPanelId;
    cardsPanel.querySelector(".cards-panel__view-more-btn").href = knowMoreLink;

    let cardsPanelHeaderContainer = cardsPanel.querySelector(".cards-panel__header-container");
    let cardsContainer = cardsPanel.querySelector(".cards-panel__cards-container");

    printCardsPanelHeader(cardsPanelHeaderContainer, iconClass, title, "#" + cardsPanel.id + " ." + "cards-panel__item", withSearch);

    printCards(cardsContainer, cardsData, cardDataTocardElementFn, 0, 3);
}

export function printCards(cardsContainer, cardsData, cardDataTocardElementFn, from = 0, to = cardsData.length - 1) {

    if (!cardsData || !cardsContainer)
        return;

    for (let i = from; i <= to; ++i) {
        cardsContainer.appendChild(cardDataTocardElementFn(cardsData[i]));
    }
}

//functions to print cards panel header with search or without
export function printCardsPanelHeader(cardsPanelHeaderContainer, iconClass, title, cardsItemsQuery, withSearch = false) {

    if (!cardsPanelHeaderContainer) {
        console.log("the problem in printCardsPanelHeader");
        return;
    }
    cardsPanelHeaderContainer.appendChild(getCardsPanelHeader(title, iconClass, withSearch));

    appendStyle("/styles/cards-panel-header.css");

    let searchInput = cardsPanelHeaderContainer.querySelector(".cards-panel-header__search-input");
    if (withSearch)
        handelSearch(searchInput, cardsItemsQuery);
}

function getCardsPanelHeader(title, iconClass, withSearch = false) {

    let searchBarHtml = `
        <div
        class="cards-panel-header__search-bar d-flex align-items-center rounded-pill px-3 mt-4 mt-lg-0 ms-auto"
        >
            <i class="fa-solid fa-magnifying-glass text-theme"></i>
            <input
            type="text"
            class="cards-panel-header__search-input form-control"
            name="cards panel search bar"
            placeholder="Search..."
            />
        </div>
    `
    let cardsPanelHeader = `
        <div class="cards-panel-header d-lg-flex align-items-center pb-4">
            <div class="d-flex align-items-center">
                <i class="${iconClass} text-theme fs-2 me-3"></i>
                <h2 class="fs-4 fw-semibold mb-0">${title}</h2>
            </div>
            ${withSearch ? searchBarHtml : ""}
        </div>
    `;

    let cardsPanelHeaderHolder = document.createElement("div");

    cardsPanelHeaderHolder.innerHTML = cardsPanelHeader;

    return cardsPanelHeaderHolder.firstElementChild;
}

//functions to search about items and dispaly searched ones and hide others
function handelSearch(searchInput, itemsQuerySelector) {

    if (!searchInput) {
        console.log("the problem in handelSearch can't found searchInput");
        return;
    }

    searchInput.addEventListener("keyup", () => {

        let keyWord = searchInput.value.trim();
        displaySearchedItems(keyWord, itemsQuerySelector);
    });
}

function displaySearchedItems(keyWord, itemsQuerySelector) {

    if (!itemsQuerySelector) return;

    let Items = document.querySelectorAll(itemsQuerySelector);


    if (!Items || Items.length === 0) {
        console.log("the problem in displaySearchedVacationCards 1");
        return;
    }

    Items.forEach(item => {
        keyWord = keyWord.toLowerCase();

        let itemData = item.textContent.toLowerCase();
        item.style.display = (itemData.includes(keyWord)) ? "block" : "none";
    });
}

//if you want user profile
export class UserProfile {

    #container;
    #userData;
    static profileTypes = ["quick", "detailed"];
    #profileType;

    constructor(userProfileContainer, userData, profileType = "quick") {
        this.#container = userProfileContainer;
        this.#userData = userData;
        this.#profileType = profileType;

        this.#validate();
    }

    #validate() {
        if (!(this.#container instanceof HTMLElement)) {
            throw new Error("Invalid container: Must be an instance of HTMLElement.");
        }

        if (typeof this.#userData !== 'object' || this.#userData === null) {
            throw new Error("Invalid userData: Must be a non-null object.");
        }

        // Check required properties in userData
        const requiredProps = ['username', 'userJob', 'userDepartment',
            'reportingTo', "img", "corporateLevel", "lifeTime", "vacationDaysLeft", "sickDaysLeft"];

        for (const prop of requiredProps) {
            if (!(prop in this.#userData)) {
                throw new Error(`Missing required field in userData: ${prop}`);
            }
        }

        // Validate profileType
        if (!UserProfile.profileTypes.includes(this.#profileType)) {
            throw new Error(`Invalid profileType: ${this.#profileType}. Valid options are: ${UserProfile.profileTypes.join(", ")}`);
        }
    }

    renderUserProfile() {
        (this.#profileType == UserProfile.profileTypes[0]) ? this.#renderProfileQuick() : this.#renderProfileDetailed();

        this.#renderProfileSubData();
    }

    #renderProfileQuick() {
        this.#container.innerHTML = `
            <div
            class="user-profile shadow p-4 rounded-4 bg-secondary h-100 text-center text-md-start"
            >
                <header
                    class="user-profile__header d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
                >
                    <div
                    class="user-profile__info d-flex flex-column flex-md-row align-items-center gap-3"
                    >
                    <figure
                        class="user-profile__img-wrapper d-flex align-items-center rounded-pill mb-0 overflow-hidden"
                    >
                        <img
                        src="${this.#userData.img}"
                        alt="user image not found"
                        class="img-fluid"
                        />
                    </figure>
                    <div class="user-profile__name-job-wrapper">
                        <h2 class="fs-5 mb-0 fw-semibold">${this.#userData.username}</h2>
                        <span class="text-secondary">${this.#userData.userJob}</span>
                    </div>
                    </div>
                    <a
                    name="view profile"
                    id="view-profile"
                    class="btn btn-secondary"
                    href="/pages/profiles.html"
                    role="button"
                    >view profile</a
                    >
                </header>
                <div
                    class="user-profile__data-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-md-start gap-5 mt-5"
                >
                </div>
        </div>
        `;
    }

    #renderProfileDetailed() {
        this.#container.innerHTML = `
            <div
            class="user-profile shadow p-4 rounded-4 bg-secondary h-100 text-center text-md-start"
            >
                <header
                    class="user-profile__header d-flex flex-column flex-md-row align-items-center justify-content-between gap-3"
                >
                    <div
                    class="user-profile__info d-flex flex-column flex-md-row align-items-center gap-3"
                    >
                    <figure
                        class="user-profile__img-wrapper d-flex align-items-center rounded-pill mb-0 overflow-hidden"
                    >
                        <img
                        src="${this.#userData.img}"
                        alt="user image not found"
                        class="img-fluid"
                        />
                    </figure>
                    <div class="user-profile__name-job-wrapper">
                        <h2 class="fs-5 mb-0 fw-semibold">${this.#userData.username}</h2>
                        <span class="text-secondary-emphasis d-block">${this.#userData.userDepartment} Department</span>
                        <span class="text-secondary">${this.#userData.userJob}</span>
                    </div>
                    </div>
                    <a
                    name="new request"
                    id="view-profile"
                    class="btn btn-main"
                    role="button"
                    >new request</a
                    >
                </header>
                <div
                    class="user-profile__data-wrapper d-flex flex-wrap mt-5 gap-5 justify-content-center justify-content-md-start justify-content-lg-between"
                >
                </div>
        </div>
        `;
    }

    #getUserProfileDataElementAsString(userSubData) {
        console.log(userSubData);
        return `
        <div
        class="user-profile__data d-flex flex-column flex-md-row gap-3 align-items-center"
        >
            <i class="${userSubData.iconClass} fs-1 text-secondary"></i>
            <div>
                <h4 class="fs-6 fw-semibold mb-1">${userSubData.label}</h4>
                <span id="reporting-to" class="text-secondary">
                ${userSubData.prefex}
                 ${(this.#userData[userSubData.key]) ? this.#userData[userSubData.key] : "not found"}
                 ${userSubData.suffix}</span>
            </div>
        </div>
        `;
    }

    #renderProfileSubData() {

        let userSubData = [
            { key: "reportingTo", label: "reporting to", iconClass: "fa-solid fa-user", prefex: "", suffix: "" },
            { key: "corporateLevel", label: "corporate level", iconClass: "fa-solid fa-chart-line", prefex: "level", suffix: "" },
            { key: "lifeTime", label: "life time", iconClass: "fa-solid fa-hourglass", prefex: "", suffix: "years" },
            { key: "vacationDaysLeft", label: "vacation days left", iconClass: "fa-solid fa-calendar-check", prefex: "", suffix: "Days" },
            { key: "sickDaysLeft", label: "sick days left", iconClass: "fa-solid fa-stethoscope", prefex: "level", suffix: "Days" }
        ];

        let from = 0, to = userSubData.length - 1;
        if (this.#profileType === UserProfile.profileTypes[0])
            to = 1;

        let userSubDataElements = '';
        for (let i = from; i <= to; ++i) {
            userSubDataElements += this.#getUserProfileDataElementAsString(userSubData[i]);
        }

        this.#container.querySelector(".user-profile__data-wrapper").innerHTML = userSubDataElements;
    }
}

/** if you want pagination */
export class CardSelectionHandler {

    #cardsContainer;
    #iconConfig;
    #SelectedCardAction;
    #selectAll;
    #paginationNavigation;
    #withSelectAll;
    #withPagination;

    constructor(
        cardsContainer,
        iconConfig = { checkIconClassName: '', checkedIconClassName: '' },
        SelectedCardAction,
        withSelectAll = true,
        selectAll = null,
        withPagination = true,
        paginationNavigation = null
    ) {
        this.#cardsContainer = cardsContainer;
        this.#iconConfig = iconConfig;
        this.#SelectedCardAction = SelectedCardAction;
        this.#selectAll = selectAll;
        this.#withSelectAll = withSelectAll;
        this.#withPagination = withPagination;
        this.#paginationNavigation = paginationNavigation;

        this.#validate();
    }

    #validate() {

        if (typeof this.#withSelectAll !== 'boolean') {
            throw new Error('Invalid withSelectAll: Expected a boolean.');
        }

        if (typeof this.#withPagination !== 'boolean') {
            throw new Error('Invalid withPagination: Expected a boolean.');
        }

        if (!(this.#cardsContainer instanceof Element)) {
            throw new Error('Invalid cardsContainer: Expected an Element.');
        }

        if (typeof this.#iconConfig.checkIconClassName !== 'string') {
            throw new Error('Invalid checkIconClassName: Expected a string.');
        }

        if (typeof this.#iconConfig.checkedIconClassName !== 'string') {
            throw new Error('Invalid checkedIconClassName: Expected a string.');
        }

        if (!(this.#SelectedCardAction instanceof Element)) {
            throw new Error('Invalid SelectedCardAction: Expected an Element or null.');
        }

        if (!this.#withSelectAll)
            return;

        if (!(this.#selectAll instanceof Element)) {
            throw new Error('Invalid selectAll: Expected an Element or null.');
        }

        if (!this.#withPagination)
            return;

        if (!(this.#paginationNavigation instanceof Element)) {
            throw new Error('Invalid paginationNavigation: Expected an Element or null.');
        }
    }

    handleCardsSelection() {
        this.#handleCardSelection();

        if (this.#withSelectAll)
            this.#handelAllCardsSelection();

        if (this.#withSelectAll && this.#withPagination) {
            this.#paginationNavigation.addEventListener("click", (event) => {
                if (event.target && event.target.matches(".page-item")) {
                    this.#handelAllCardsSelection();
                    this.#updateSelectAll();
                }
            });
        }
    }

    #handleCardSelection() {

        this.#cardsContainer.addEventListener("click", (event) => {
            if (event.target && event.target.matches("." + this.#iconConfig.checkIconClassName)) {

                event.target.classList.toggle(this.#iconConfig.checkedIconClassName);
            }

            //if all item checked check select all else don't checked it
            if (!this.#withSelectAll) return;

            this.#updateSelectAll();
        });
    }

    #updateSelectAll() {
        let checkIcons = this.#cardsContainer.querySelectorAll("." + this.#iconConfig.checkIconClassName);
        let checkedIcons = this.#cardsContainer.querySelectorAll("." + this.#iconConfig.checkedIconClassName);

        if (!checkIcons)
            throw Error("'checkIcons' undefined");

        if (checkedIcons && checkedIcons.length === checkIcons.length) {
            this.#selectAll.checked = true;
        }
        else {
            this.#selectAll.checked = false;
        }

        this.#handelSelectedCardsAction();
    }

    #handelSelectedCardsAction() {

        if (document.querySelector("." + this.#iconConfig.checkedIconClassName))
            this.#SelectedCardAction.classList.remove("d-none");
        else
            this.#SelectedCardAction.classList.add("d-none");
    }

    #handelAllCardsSelection() {
        let cardsCheckIcons = this.#cardsContainer.querySelectorAll("." + this.#iconConfig.checkIconClassName);

        if (!cardsCheckIcons) return;

        this.#selectAll.addEventListener("change", () => {
            cardsCheckIcons.forEach(cardSelectedIcon => {
                if (this.#selectAll.checked)
                    cardSelectedIcon.classList.add("vacation-requests-card__select-icon--selected");
                else
                    cardSelectedIcon.classList.remove("vacation-requests-card__select-icon--selected");
            });

            this.#handelSelectedCardsAction();
        });
    }
}

/** if you want pagination */
export class Pagination {
    #navigation;
    #cashedPages = {};
    #paginationContainer;
    #paginationConfig;
    #cardConfig;

    constructor(
        paginationContainer,
        { cardsNumber, pageSize },
        { getDataChunksFunction, dataToCardElementFunction, cardsContainer }
    ) {

        this.#paginationContainer = paginationContainer;
        const pagesNumber = Math.ceil(cardsNumber / pageSize);
        this.#paginationConfig = { cardsNumber, pageSize, pagesNumber };
        this.#cardConfig = { getDataChunksFunction, dataToCardElementFunction, cardsContainer };

        this.#validateInputs();
    }

    #validateInputs() {
        if (!this.#paginationContainer || !this.#paginationConfig.cardsNumber
            || !this.#paginationConfig.pageSize || !this.#cardConfig.getDataChunksFunction ||
            !this.#cardConfig.dataToCardElementFunction || !this.#cardConfig.cardsContainer) {
            throw new Error('All parameters must be provided and not null.');
        }
    }

    renderPagination() {
        this.#navigation = this.#getNavigationElement();

        this.#paginationContainer.appendChild(this.#navigation);
        this.#renderNavigationNumbers();

        //render fist page as default
        this.#renderPageContent(1);

        this.#handleNavigationClick();
    }

    #handleNavigationClick() {

        this.#navigation.addEventListener("click", (event) => {

            if (event.target && event.target.matches(".page-item")) {
                this.#handleNavigationItemClick(event.target);

                this.#cardConfig.cardsContainer.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                let activePage = this.#navigation.querySelector(".page-item--active");
                if (activePage) {
                    this.#renderPageContent(activePage.getAttribute("page"));
                    this.#handleNaviagationNumbers(activePage);
                }
            }
        });
    }

    #handleNavigationItemClick(clickedPage) {
        let activePage = this.#navigation.querySelector(".page-item--active");
        let activePageValue = activePage.getAttribute("page");
        const clickedPageValue = clickedPage.getAttribute("page");
        const prevButton = this.#navigation.querySelector(".page-item[page='prev']");
        const nextButton = this.#navigation.querySelector(".page-item[page='next']");

        if (!activePageValue || !clickedPageValue || !prevButton || !nextButton)
            throw Error("Please ensure that 'activePageValue', 'clickedPageValue', 'prevButton', and 'nextButton' are properly defined");

        if (clickedPageValue == activePageValue) return;

        this.#navigation.querySelectorAll(".page-item").forEach(pageItem => {
            pageItem.classList.remove("page-item--active");
        });

        switch (clickedPageValue) {
            case '1':
                prevButton.classList.add("page-item--disable");
                clickedPage.classList.add("page-item--active");
                break;
            case this.#paginationConfig.pagesNumber.toString():
                nextButton.classList.add("page-item--disable");
                clickedPage.classList.add("page-item--active");
                break;
            case 'prev':
                if (activePage.previousElementSibling.getAttribute("page") != 'prev')
                    activePage.previousElementSibling.classList.add("page-item--active");
                break;
            case 'next':
                if (activePage.nextElementSibling.getAttribute("page") != 'next')
                    activePage.nextElementSibling.classList.add("page-item--active");
                break;
            default:
                clickedPage.classList.add("page-item--active");
                break;
        }

        activePage = this.#navigation.querySelector(".page-item--active");
        activePageValue = activePage.getAttribute("page");

        if (activePageValue == this.#paginationConfig.pagesNumber.toString()) {
            nextButton.classList.add("page-item--disable");
            prevButton.classList.remove("page-item--disable");
        }
        else if (activePageValue == '1') {
            prevButton.classList.add("page-item--disable");
            nextButton.classList.remove("page-item--disable");
        }
        else {
            prevButton.classList.remove("page-item--disable");
            nextButton.classList.remove("page-item--disable");
        }
    }

    #handleNaviagationNumbers(activePage) {

        const paginationLength = 4;
        let activePageValue = +activePage.getAttribute("page");
        let navigationStartNumber = 0, navigationEndNumber = 0;

        if (activePage === activePage.parentElement.lastElementChild) {

            if (activePageValue < paginationLength) return;

            let remainPagesNumber = this.#paginationConfig.pagesNumber - activePageValue + 1

            navigationStartNumber = Math.min(activePageValue, this.#paginationConfig.pagesNumber);

            if (remainPagesNumber < paginationLength)
                navigationStartNumber = navigationStartNumber - (paginationLength - remainPagesNumber);

            navigationEndNumber = Math.min(activePageValue + paginationLength - 1, this.#paginationConfig.pagesNumber);

            this.#renderNavigationNumbers(navigationStartNumber, navigationEndNumber, activePageValue);
        }
        else if (activePage === activePage.parentElement.firstElementChild) {

            navigationStartNumber = Math.max(1, activePageValue - paginationLength - 1);
            navigationEndNumber = Math.max(activePageValue, activePageValue + (paginationLength - activePageValue));
            this.#renderNavigationNumbers(navigationStartNumber, navigationEndNumber, activePageValue);
        }
    }

    #getNavigationElement() {

        let naviagationWrapper = document.createElement("div");

        naviagationWrapper.innerHTML = `
            <ul
            class="pagination shadow-sm w-fit mx-auto gap-2 bg-secondary py-2 px-3 rounded-pill"
            >
                <li
                    role="button"
                    page='prev'
                    class="page-item page-item--disable rounded-pill d-flex align-items-center justify-content-center"
                >
                    <!--<i class="fa-solid fa-angle-left fs-5"></i>-->
                    prev
                </li>
                <div class='d-flex align-items-center pagination__numbers'> </div>
                <li
                    role="button"
                    page='next'
                    class="page-item rounded-pill d-flex align-items-center justify-content-center"
                >
                    <!--<i class="fa-solid fa-angle-right fs-5"></i>--> 
                    next
                </li>
            </ul>
        `;

        return naviagationWrapper.firstElementChild;
    }

    #renderNavigationNumbers(from = 1, to = 4, active = 1) {
        let paginationItems = '';

        for (let i = from; i <= to; ++i) {
            paginationItems += this.#getPageItemAsString(i, active);
        }

        this.#navigation.querySelector(".pagination__numbers").innerHTML = paginationItems;
    }

    #getPageItemAsString(pageNumber, active = 1) {

        return `
            <li
            role="button"
            page='${pageNumber}'
            class="page-item ${pageNumber === active ? 'page-item--active' : ''} rounded-pill d-flex align-items-center justify-content-center"
            >
            ${pageNumber} 
            </li>
        `;
    }

    #renderPageContent(pageNumber) {

        let pageData = null;

        pageNumber = pageNumber.toString();

        // look if the page cahed
        let cashedPage = this.#cashedPages[pageNumber];
        if (cashedPage)
            pageData = cashedPage;
        else {
            pageData = this.#cardConfig.getDataChunksFunction(+pageNumber);
            this.#cashedPages[pageNumber] = pageData;
        }

        this.#cardConfig.cardsContainer.innerHTML = ``;

        if (!pageData)
            throw ("'pageData' in renderPageContent in Pagination class undefined");

        pageData.forEach(card => {
            this.#cardConfig.cardsContainer.appendChild(this.#cardConfig.dataToCardElementFunction(card));
        });
    }
}