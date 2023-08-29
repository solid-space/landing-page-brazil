// basic functions for the t0 sportsbook page
var bs_min_odd_val = 1;

jQuery(document).ready(function() {
    
    // the following browsers allow the custom scrolling
    if ($("body").hasClass("browser-chrome")) allow_custom_scroll = true;
    if ($("body").hasClass("browser-firefox")) allow_custom_scroll = true;
    if ($("body").hasClass("browser-msie-10")) allow_custom_scroll = true;
    if ($("body").hasClass("browser-msie-11")) allow_custom_scroll = true;
    if ($("body").hasClass("browser-edge")) allow_custom_scroll = true;
    if ($("body").hasClass("browser-opera")) allow_custom_scroll = true;
    // mac has its own scroll, thus we disable custom scrolling
    if ($("body").hasClass("os-mac")) allow_custom_scroll = false;
    // till ie10, pushstate is not functional, thus we do not allow change of urls
    if ($("body").hasClass("browser-msie-7")) browser_history_change = false;
    if ($("body").hasClass("browser-msie-8")) browser_history_change = false;
    if ($("body").hasClass("browser-msie-9")) browser_history_change = false;
    if ($("body").hasClass("browser-msie-10")) browser_history_change = false;
    if(typeof init_swiper_slider === "function"){
        init_swiper_slider(slider_main_banner_params); 
        $(document).ajaxComplete(function() {
            init_swiper_slider(slider_bet_group_types_params);
        });
    }

});
    
var slider_main_banner_params = {
    'id' : 'main-banner',
    'elem' : '.swiper-out-wrap.main_banner .swiper-container',
    'next' : '.swiper-button-next',
    'prev' : '.swiper-button-prev',
    'pagination' : {
        el: '.swiper-pagination',
        clickable: 'true',
    },     
    slides_per_view: 1,
    slides_loop : false
};

slider_main_banner_params.autoplay = {
    delay : 8000,
    disableOnInteraction: false
}                    

var slider_bet_group_types_params = {
    'id' : 'bet-group-types',
    'elem' : '.swiper-out-wrap.bet_group_types .swiper-container',
    'next' : '.swiper-button-next',
    'prev' : '.swiper-button-prev',
    'pagination' : {
        el: '.swiper-pagination',
        clickable: 'true',
    },     
    slides_per_view: 5,
    slides_loop : false
};

slider_bet_group_types_params.breakpoints = {
    250: {
        slidesPerView: 2
    },
    1170: {
        slidesPerView: 2
    },
    1171: {
        slidesPerView: 3
    },
    1441: {
        slidesPerView: 5
    }
} 

var slider_bet_types_params = {
    'id' : 'bet-types',
    'elem' : '.swiper-out-wrap.bet_types .swiper-container',
    'next' : '.swiper-button-next',
    'prev' : '.swiper-button-prev',
    'pagination' : {
        el: '.swiper-pagination',
        clickable: 'true',
    },     
    slides_per_view: 5,
    slides_loop : false
};

slider_bet_types_params.breakpoints = {
    250: {
        slidesPerView: 2
    },
    1170: {
        slidesPerView: 2
    },
    1171: {
        slidesPerView: 3
    },
    1441: {
        slidesPerView: 5
    }
} 

// display the homepage/main section 
function show_homepage(noanim) {
    // display home contents
    $("#sports_odds .sports_odds_home").show();
    $(".main_banner_area").removeClass('hide_banner');
    $("#sports_odds .sports_scroll_content").hide();
    $("#sports_odds .sports_scroll_single_event").hide();
    // set page width
    var home_width = 'fixed';
    if (typeof sb_home_width != 'undefined' && sb_home_width != 'fixed') home_width = 'wide';
    load_page_width(home_width,noanim);
    // set location
    sports_loc = 0;
}
// show leagues list section
function show_leagues(noanim) {
    // display leagues contents
    $("#sports_odds .sports_odds_home").hide();
    $(".main_banner_area").addClass('hide_banner');
    $("#sports_odds .sports_scroll_content").show();
    $("#sports_odds .sports_scroll_single_event").hide();
    // set page as wide
    load_page_width('wide',noanim);
    // set location
    sports_loc = 1;
}
// show single event section
function show_event(noanim) {
    // display single event contents
    $("#sports_odds .sports_odds_home").hide();
    $("#sports_odds .sports_scroll_content").hide();
    $("#sports_odds .sports_scroll_single_event").show();
    // set page as wide
    load_page_width('wide',noanim);
    // set location
    sports_loc = 2;
}
// show custom contents section
// Note: This and the leagues list sections use the same content area!
function show_content(width,noanim) {
    // show the contents section
    $("#sports_odds .sports_odds_home").hide();
    $("#sports_odds .sports_scroll_content").show();
    $("#sports_odds .sports_scroll_single_event").hide();
    // set the page width based on params
    load_page_width(width,noanim);
    // set location
    sports_loc = 3;
}

function display_contents(contents) {
    $(".sports_odds_home").hide();
    $("#sports_odds .sports_scroll_single_event").html('').hide();
    // override is set to on, we start a new odds area
    $("#sports_odds .sports_scroll_content").html(contents).show();
}

// retrieve the event name (competitor1 vs competitor2) in full (html formatted)
// Note: event is the json object of the event
function get_event_name(event) {
    var ev_name = '<span class="competitor1">'+event.competitor1+'</span>';
    if (typeof event.competitor2 != 'undefined' && event.competitor2 != '' && event.competitor2 != null) ev_name += ' <span class="competitor_div">-</span> <span class="competitor2">'+event.competitor2+'</span>';
    if (typeof event.public_id != 'undefined' && event.public_id != null && event.public_id != false && event.public_id != "") {
        var event_public_id = event.public_id;
        var evp_len = 6;
        if (typeof sb_max_public_id != 'undefined' && parseInt(sb_max_public_id) > 0) evp_len = parseInt(sb_max_public_id);
        var prefix_str = '';
        for (var i=0;i<evp_len;i++) {
            prefix_str += '0';
        }
        if (event_public_id.toString().length < evp_len) {
        event_public_id = (prefix_str + event_public_id).slice(-evp_len);
        }
        ev_name = '<span class="ev_public_id">'+event_public_id+'</span> '+ev_name;
    }
    
    return ev_name;
}
function add_to_fav(lid) {
    $(".add_to_fav_"+lid).addClass("loading");
    $(".add_to_fav_"+lid).addClass("fa-spin");
    setTimeout(function() {
        alert("WORK IN PROGRESS");
    },100);
}

function toggle_sports_menu() {
    if ($("#sports_menu").hasClass("close")) {
        show_sports_menu();
    }
    else {
        hide_sports_menu();
    }
}

function show_sports_menu() {
    $("#sports_menu").removeClass("close");
}
function hide_sports_menu() {
    $("#sports_menu").addClass("close");
}

// toggle featured leagues menu
function toggle_popular_leagues() {
    $('.featured_leagues_area').toggle();
    handle_menu_position(true);
}

