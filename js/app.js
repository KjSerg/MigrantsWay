var doc = document;
addEventListener("DOMContentLoaded", (event) => {
    sliderInit();
    escKeyPressEvent();
    doc.querySelectorAll('.burger').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var href = element.getAttribute('href');
            var el = doc.querySelector(href);
            var body = doc.querySelector('body');
            if (el) {
                if (element.classList.contains('active')) {
                    el.classList.remove('active');
                    element.classList.remove('active');
                } else {
                    el.classList.add('active');
                    element.classList.add('active');
                }
            }
        });
    });
    doc.querySelectorAll('.accordion__title').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var closest = element.closest('.accordion-item');
            var accordion = element.closest('.accordion');
            var content = closest.querySelector('.accordion__text');

            if (closest.classList.contains('showed')) {
                closest.classList.remove('showed');
                slideUp(content, 400);
            } else {
                accordion.querySelectorAll('.accordion-item').forEach(function (el, index) {
                    el.classList.remove('showed');
                    slideUp(el.querySelector('.accordion__text'), 100);
                });
                setTimeout(function () {

                    closest.classList.add('showed');
                    slideDown(content, 500);
                }, 101)
            }
        });
    });
    doc.querySelectorAll('.service-accordion__title').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var closest = element.closest('.service-accordion');
            var accordion = element.closest('.service-columns');
            var content = closest.querySelector('.service-accordion-content');
            if (closest.classList.contains('active')) {
                closest.classList.remove('active');
                slideUp(content, 400);
            } else {
                accordion.querySelectorAll('.service-accordion').forEach(function (el, index) {
                    el.classList.remove('active');
                    slideUp(el.querySelector('.service-accordion-content'), 100);
                });
                setTimeout(function () {
                    closest.classList.add('active');
                    slideDown(content, 500);
                }, 101)
            }
        });
    });
    doc.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^+\d]/g, '');
        });
    });
    doc.querySelectorAll('.open-modal').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var href = element.getAttribute('href');
            var el = doc.querySelector(href);
            var rect = element.getBoundingClientRect();
            if (element.classList.contains('open-and-close-modal')) {
                closeModal();
            }
            openModal(el);
        });
    });
    doc.querySelectorAll('.modal-close, .trigger-close-modal').forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var href = element.getAttribute('href');
            if (href !== undefined) {
                var el = doc.querySelector(href);
                closeModal({
                    element: el
                });
            }
        });
    });
});


var elementsWithGap = Array.from(document.querySelectorAll("*")).filter(element => {
    const style = window.getComputedStyle(element);
    return style.gap !== "normal" && style.gap !== "";
});

function replaceGap() {
    var browser = detectBrowser();
    if (browser === 'safari' && !supportsFlexGap()) {
        document.querySelectorAll("*").forEach(function (element) {
            var style = window.getComputedStyle(element);
            var gap = style.gap;
            if (gap !== "normal" && gap !== "") {
                element.classList.add('safari-gap');
            }
        });
    }
}

function supportsFlexGap() {
    const testElement = document.createElement('div');
    testElement.style.display = 'flex';
    testElement.style.gap = '10px';
    document.body.appendChild(testElement);
    const supportsGap = window.getComputedStyle(testElement).gap === '10px';
    document.body.removeChild(testElement);
    return supportsGap;
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";

    if (userAgent.indexOf("Chrome") > -1) {
        browserName = "chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browserName = "firefox";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "safari";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        browserName = "internet-explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "edge";
    }

    return browserName;
}

function setBrowserName() {
    var browser = detectBrowser();
    doc.querySelector('body').classList.add(browser);
}

function showMessage(text) {
    var el = doc.getElementById('message');
    el.querySelector('.modal__title').innerHTML = text;
    openModal(el);
    setTimeout(function () {
        closeModal({
            element: el
        });
    }, 1000);
}

function slideDown(element, duration = 400) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') {
        element.style.display = 'block';
    }

    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.transition = `${duration}ms ease`;

    setTimeout(() => {
        element.style.height = height + 'px';
    }, 10);

    setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideRight(element, duration = 400) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') {
        element.style.display = 'block';
    }

    let w = element.offsetWidth;
    element.style.overflow = 'hidden';
    element.style.width = 0;

    console.log(w)
    setTimeout(() => {
        element.style.transition = `width ${duration}ms ease`;
        element.style.width = w + 'px';
    }, 10);

    setTimeout(() => {
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideUp(element, duration = 400) {
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `${duration}ms ease`;

    setTimeout(() => {
        element.style.height = 0;
    }, 10);

    setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideLeft(element, duration = 400) {
    element.style.width = element.offsetWidth + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `width ${duration}ms ease`;

    setTimeout(() => {
        element.style.width = 0;
    }, 10);

    setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideToggle(element, duration = 400) {
    if (window.getComputedStyle(element).display === 'none') {
        slideDown(element, duration);
    } else {
        slideUp(element, duration);
    }
}

function sliderInit() {
    doc.querySelectorAll('.slider').forEach(function (slider, index) {
        var wrapper = slider.closest('.slider-wrapper');
        var next = null;
        var prev = null;
        if (wrapper !== null) {
            next = wrapper.querySelector('.slider-next');
            prev = wrapper.querySelector('.slider-prev');
        }
        let isDragging = false;
        var oldScrollLeft = 0;
        var newScrollLeft = 0;
        var slideWidth = 0;
        var sliderTrackWidth = 0;
        var slideValue = 0;
        let startX;
        let scrollLeft;
        var slides = Array.from(slider.children);
        slides.forEach(function (slide, index) {
            slide.classList.add('slide');
            if (index === 0) {
                slideWidth = slide.getBoundingClientRect().width;
                var marginRight = window.getComputedStyle(slide).marginRight;
                if (marginRight) {
                    marginRight = marginRight.replace("px", '');
                    marginRight = Number(marginRight);
                    if (!isNaN(marginRight)) slideWidth = slideWidth + marginRight;
                }
            }
        });
        console.log(slideWidth)
        var html = slider.innerHTML;
        slider.innerHTML = '<div class="slider-container">' + html + '</div>';
        slider.classList.add('slider-init');
        const sliderTrack = slider.querySelector('.slider-container');
        sliderTrackWidth = sliderTrack.getBoundingClientRect().width;
        window.addEventListener('resize', function (e) {
            var oldSlideWidth = slideWidth;
            slideWidth = getFirstSlideWidth(Array.from(sliderTrack.children));
            if (oldSlideWidth !== slideWidth) snapToFirstSlide(sliderTrack);
        });
        sliderTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            sliderTrack.style.cursor = 'grabbing';
            startX = e.pageX - sliderTrack.offsetLeft;
            scrollLeft = sliderTrack.scrollLeft;
        });
        sliderTrack.addEventListener('mouseleave', () => {
            if (isDragging) snapToSlide(sliderTrack, slideWidth);
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
        });
        sliderTrack.addEventListener('mouseup', () => {
            snapToSlide(sliderTrack, slideWidth);
            isDragging = false;
            sliderTrack.style.cursor = 'grab';
        });
        sliderTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - sliderTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            sliderTrack.scrollLeft = scrollLeft - walk;
        });
        if (next !== null) {
            next.addEventListener('click', (e) => {
                e.preventDefault();
                snapToNextSlide(sliderTrack, slideWidth)
            });
        }
        if (prev !== null) {
            prev.addEventListener('click', (e) => {
                e.preventDefault();
                snapToPrevSlide(sliderTrack, slideWidth);
            });
        }

    });
}

function getFirstSlideWidth(slides) {
    var slideWidth = 0;
    slides.forEach(function (slide, index) {
        if (index === 0) {
            console.log(slide)
            slideWidth = slide.getBoundingClientRect().width;
            var marginRight = window.getComputedStyle(slide).marginRight;
            if (marginRight) {
                marginRight = marginRight.replace("px", '');
                marginRight = Number(marginRight);
                if (!isNaN(marginRight)) slideWidth = slideWidth + marginRight;
            }
        }
    });
    return slideWidth;
}

function snapToSlide(sliderTrack, slideWidth) {
    const currentScroll = sliderTrack.scrollLeft;
    const closestSlideIndex = Math.round(currentScroll / slideWidth);
    const newScrollPosition = closestSlideIndex * slideWidth;

    sliderTrack.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
    });
}

function snapToNextSlide(sliderTrack, slideWidth) {
    const currentScroll = sliderTrack.scrollLeft;
    const closestSlideIndex = Math.round(currentScroll / slideWidth);
    const newScrollPosition = closestSlideIndex * slideWidth;

    sliderTrack.scrollTo({
        left: newScrollPosition + slideWidth,
        behavior: 'smooth'
    });
}

function snapToPrevSlide(sliderTrack, slideWidth) {
    const currentScroll = sliderTrack.scrollLeft;
    const closestSlideIndex = Math.round(currentScroll / slideWidth);
    const newScrollPosition = closestSlideIndex * slideWidth;

    sliderTrack.scrollTo({
        left: newScrollPosition - slideWidth,
        behavior: 'smooth'
    });
}

function snapToFirstSlide(sliderTrack) {
    sliderTrack.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
}

function escKeyPressEvent() {
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            closeModal();
        }
    };
}

function closeModal(args = {}) {
    var element = args.element || null;
    if (element !== null) {
        element.classList.remove('open');
    } else {
        doc.querySelectorAll('.modal-window.open').forEach(function (element, index) {
            element.classList.remove('open');
        });
    }
    var modalsCount = doc.querySelectorAll('.modal-window.open').length;
    if (modalsCount === 0) doc.querySelector('body').classList.remove('open-modal');
}

function openModal(el) {
    el.classList.add('open');
    doc.querySelector('body').classList.add('open-modal');
}

function isDesktop() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /mobile|android|iphone|ipad|tablet|touch/.test(userAgent);
    var hasPointer = window.matchMedia('(pointer: fine)').matches;

    return !isMobile && hasPointer && window.screen.width >= 1024;
}