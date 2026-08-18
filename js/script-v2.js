let category = "home";

$(function () {
    initCarousel();
});

window.addEventListener('load', function() {
    const OPTIONS_NAVBAR = ".navbar-menu a";
    const VALUE_HREF = "/personas/seguros";
    const TEXT_SEGUROS = "Seguros<sup>1</sup>";
    const TEXT_SEGUROS_MOBILE = '\n                            <img class="icon_category" src="/personas/assets/img/iconos/icon_seguros.svg">\n                            <span>Seguros<sup>1</sup></span>\n                        ';
    var options = document.querySelectorAll(OPTIONS_NAVBAR);
    options.forEach((optionMenu, index) => {
        if (optionMenu.attributes.href.value.indexOf(VALUE_HREF) != -1 ) {
            if (index == 39) {
                optionMenu.children[0].innerHTML = TEXT_SEGUROS_MOBILE
            } else {
                optionMenu.children[0].children[1].children[0].innerHTML = TEXT_SEGUROS;
            }            
        }
    });

    let disclainer = `<section class="section-cintillo pb-0">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-center">1. Seguros emitidos y operados por Zurich Santander Seguros MÃ©xico, S.A.</p>
                                </div>
                            </div>
                        </div>
                    </section>`;
    $(disclainer).insertBefore("footer .section-cintillo.section-cintillo-gray");
});

const initCarousel = function () {
    $('.section-banner-hero .owl-carousel').owlCarousel({
        autoplay: true,
        autoplayTimeout: 25000,
        autoplayHoverPause: true,
        animateOut: 'fadeOutRight',
        animateIn: 'fadeInLeft',
        loop: true,
        nav: true,
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        navText: ["<img src='/components/carousel/assets/img/left.png'>", "<img src='/components/carousel/assets/img/right.png'>"]
    });

    $('.section-acerca-de .owl-carousel').owlCarousel({
        loop: false,
        nav: true,
        navText: ["", ""],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
}