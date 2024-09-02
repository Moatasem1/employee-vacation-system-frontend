document.addEventListener("DOMContentLoaded", () => {

    printLatestNewsCarousel();

});

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
                <p class="text-dark mb-0">${imageData.desc}</p>
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