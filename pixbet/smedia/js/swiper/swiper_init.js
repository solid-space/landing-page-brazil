// define a global swiper variable used to initialize the slider
var swiper_slider_obj = {};

function init_swiper_slider(params) {  

    // set default params
    var slides_direction = 'horizontal';
    var slides_per_view = 6;
    var autoplay = {};
    var slides_loop = true;
    var slides_effect = 'slide';
    var space_between = 0;
    
    // no initialization if params id property is not set
    if (typeof params.id == "undefined") return false;
    // if breakpoints for responsiveness are not set use the same number of slides for all resolutions 
    if (typeof params.breakpoints != "object") params.breakpoints = {};
     // set direction of the slider
    if (typeof params.slides_direction != "undefined") slides_direction = params.slides_direction;
     // set the sliding loop of the carousel
    if (typeof params.slides_loop != "undefined") slides_loop = params.slides_loop;
    // set number of slides to be shown in the slider if default value is not used
    if (typeof params.slides_per_view != "undefined") slides_per_view = params.slides_per_view;
    // set the amount of space between items
    if (typeof params.space_between != "undefined") space_between = params.space_between;
    // disable autoplay on interaction with slider
    if (typeof params.autoplay != "object") autoplay = params.autoplay;
    // set the slider animation effect (fade, slide, etc)
    if (typeof params.slides_effect != "undefined") slides_effect = params.slides_effect;
     //set the pagination
    if (typeof params.pagination != "object") params.pagination = {};

    // initialize a swiper slider with parameters
    swiper_slider_obj[params.id] = new Swiper(
    params.elem, 
    {
        direction: slides_direction,
        slidesPerView: slides_per_view,
        spaceBetween: space_between, 
        loop: slides_loop,
        effect: params.slides_effect,
        navigation: {
            nextEl: params.next,
            prevEl: params.prev,
        },
        pagination: params.pagination,
        autoplay: params.autoplay,
        breakpoints: params.breakpoints
    });     
}



