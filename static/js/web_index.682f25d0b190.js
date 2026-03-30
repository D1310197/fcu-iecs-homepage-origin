var swiper = null;

if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    swiper = new Swiper('.mySwiper', {
        spaceBetween: 10,
        slidesPerView: 1,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        },
        loop: false,
        watchSlidesProgress: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function updateCarouselLinkA11y() {
    var carouselInner = document.querySelector('#carousel .carousel-inner');
    if (!carouselInner) {
        return;
    }

    carouselInner.querySelectorAll(':scope > a').forEach(link => {
        var carouselItem = link.querySelector('.carousel-item');
        var slideImg = link.querySelector('img');
        var isActive = !!(carouselItem && carouselItem.classList.contains('active'));

        if (slideImg && slideImg.alt) {
            link.setAttribute('aria-label', slideImg.alt);
        } else if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', '輪播內容連結');
        }

        link.setAttribute('tabindex', isActive ? '0' : '-1');
    });
}

var carouselEl = document.querySelector('#carousel');
if (carouselEl) {
    updateCarouselLinkA11y();
    carouselEl.addEventListener('slid.bs.carousel', updateCarouselLinkA11y);
}

document.querySelectorAll('.index-video').forEach(element => {
    element.addEventListener('click', () => {
        var rawUrl = element.dataset.url || '';
        var videoId = '';

        try {
            var parsedUrl = new URL(rawUrl);
            videoId = parsedUrl.searchParams.get('v') || '';
        } catch (e) {
            videoId = '';
        }

        if (!videoId) {
            return;
        }

        var modalContent = document.querySelector('#modalForVideo .modal-content');
        if (modalContent) {
            modalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        }
    });
});

var modalEl = document.querySelector('#modalForVideo');
if (modalEl) {
    modalEl.addEventListener('hide.bs.modal', () => {
        var modalContent = document.querySelector('#modalForVideo .modal-content');
        if (modalContent) {
            modalContent.innerHTML = '';
        }
    });
}

window.addEventListener('load', () => {
    var indexAbout = document.querySelector('.index-about-background');
    if (!indexAbout || !indexAbout.dataset || !indexAbout.dataset.bgimg) {
        return;
    }

    indexAbout.style.backgroundImage = `url(${location.origin + indexAbout.dataset.bgimg})`;
});
