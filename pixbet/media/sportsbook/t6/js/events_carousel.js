$(document).ready(function() {
    
    setTimeout(function(){
        var mySwiper = new Swiper('.swiper.sportsbook_widget', {
            speed: 400,
            initialSlide: 0,                           
            autoHeight: false,     
            direction: 'horizontal',
            loop: true,                       
            effect: 'slide',
            spaceBetween: 10,
            slidesPerView: 1,
            slidesOffsetBefore: 0,
            grabCursor: true,
            navigation: {
                nextEl: '.fw-swiper-nav.swiper-button-next',
                prevEl: '.fw-swiper-nav.swiper-button-prev',
            },
            breakpoints: {
                550: {
                  slidesPerView: 2,
                },
                991: {
                  slidesPerView: 3,
                }
            }
        });
    }, 2000);
});