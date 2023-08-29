// basic functions for the t0 sportsbook page
var bs_min_odd_val = 1;

jQuery(document).ready(function() {
    // all functionality should be added to the sportsbook_init()
    // functionality that may be called at a later stage should be placed in a different function
    sportsbook_init();
    handle_history_change();
    
});

// the first function called when loading the sportsbook
function sportsbook_init() {
    // 1. retrieve and display data - menu,slip
    if (typeof nomenu_init == 'undefined' || nomenu_init != true) {
        get_sports_data('get_menu',false,'build_the_menu_ajax');
    }
    // build the slip with no selections
    build_the_slip();
    get_sports_data('get_slip',false,'build_the_slip_ajax');
    
    // 2. check hash
    // 3. based on hash, retrive and display data
    handle_page_hash();
    
    // 4. display site
    $("#sports_container .sports_container_wrapper").show();
    
    if (typeof load_quickbet == 'function') load_quickbet();
}

// generic function to handle page widths via css classes
function load_page_width(width,noanim) {
    // noanim param set to true
    if (typeof noanim != "undefined" && noanim == true) {
        $("body").addClass("noanim");
    }
    // noanim param either not set, or set false
    else {
        noanim = false;
        $("body").removeClass("noanim");
    }
    // fixed width
    if (width == 'fixed') {
        // remove css classes from elements
        $("body").removeClass("wide");
        $("#sports_container").removeClass("wide");
        // destroy the custom scrollbar from every section/placeholder (menu/odds/slip)
        if (allow_custom_scroll) $(".sports_scroll").scrollbar('destroy');
        handle_menu_position(false); 
        $('.featured_leagues_area').show();   
    }
    // full width
    else {
        if (!$("body").hasClass("wide")) {
            $('.featured_leagues_area').hide();
        }
        $("body").addClass("wide");
        // set small timeout to add css class to element and create scrollbar to sb sections (menu/odds/slip)
        setTimeout(function() {
            timeout_widepage();
        },animation_duration);
    }
}
function timeout_widepage() {
    if (!$("body").hasClass("wide")) return false;
    
    $("#sports_container").addClass("wide");
    if (allow_custom_scroll) $(".sports_scroll").scrollbar();
    handle_menu_position(true);
}
function handle_menu_position(go_wide) {
    if (go_wide) {
        var mt = $("#sports_menu .sports_scroll_content").height();
        $("body.wide .sports_container_wrapper #sports_menu > .scroll-wrapper.sports_scroll").css("margin-top",mt);
    }
    else {
        $("body.wide .sports_container_wrapper #sports_menu > .scroll-wrapper.sports_scroll").css("margin-top",0);
    }
}
