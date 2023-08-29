// this files contains all js related to the league listing, including the home/landing structure/ functionality, the search and the generic lising of a league

sov_odds_display = 'side';


jQuery(document).on("submit","#sb_search_form", function() {    
    // search for a event - using remove_tags to sanitze input    
    search_events(remove_tags($("#sb_search_form input.sb_input").val()));
    return false;
});   

// the file is used to build the html for the current sports template
// ajax requests to retrieve data are set in the base.js file
// the function 'build_the_odds' is required, as this is called on completion of the leagues/events/odds related ajax calls
// the object 'sb_odds_data' is created on success of the ajax calls
// the object returns a json encoded array with league/events and odds information

// data retrieving

// function to parse the json object, call the league events builder or error notice
function build_the_odds_ajax(output) {
    if (typeof sb_time != 'undefined' && sb_time == true) console.log('CALLED: build_the_odds_ajax');
    // valida json object or false on error (invalid json)
    sb_odds_data = get_valid_json(output);
    // on error, load the error tempate and display
    if (sb_odds_data == false) $("#sports_odds .sports_scroll_content").html(load_sb_tpl('sport_odds_generic_error',{}));
    else build_the_odds();
}


// the function is used to build and populate the odds for the home/landing section
function build_the_odds_ajax_home(output) {
    // get valid json object
    var home_odds_data = get_valid_json(output);
    // display error if object is NOT valid
    if (home_odds_data == false) $(".sports_odds_home").html(load_sb_tpl('sport_odds_generic_error',{}));
    // returned an error
    else if (typeof home_odds_data.errors != "undefined") {
        // remove contents related to odds
        $('.soh_content_upcoming').html('');
        $('.soh_content_hot').html('');
        $('.soh_content_feat_stats').html('');
        // update first div html to display error
        $('.soh_content_hot').html(load_sb_tpl('sport_odds_custom_error',{'error':home_odds_data.errors[0]}));
    }
    // all good
    else {
        //build_the_odds(true,".sports_odds_home .soh_content_upcoming",true);
        if (typeof home_odds_data.upcoming != 'undefined' && Object.keys(home_odds_data.upcoming).length > 0) {
            var upcoming_odds = jQuery.extend({},home_odds_data.upcoming);
            var league_params = {};
            league_params.home = true;
            league_params.home_div = '.soh_content_upcoming';
            league_params.home_sports_div_css = 'upcoming';
            league_params.home_sports_title = home_odds_data.title.upcoming;
            league_params.override = false;
            league_params.upcoming = true;
            
            generate_league_html_home(upcoming_odds,league_params);
        }
        else $('.soh_content_upcoming').html('');
        
        if (typeof home_odds_data.hot != 'undefined' && Object.keys(home_odds_data.hot).length > 0) {
            var hot_odds = jQuery.extend({},home_odds_data.hot);
            var league_params = {};
            league_params.home = true;
            league_params.home_div = '.soh_content_hot';
            league_params.home_sports_div_css = 'hot';
            league_params.home_sports_title = home_odds_data.title.hot;
            league_params.override = false;
            
            generate_league_html_home(hot_odds,league_params);
        }
        else $('.soh_content_hot').html('');
        
        // expecting football 1x2
        if (typeof home_odds_data.featured != 'undefined' && typeof home_odds_data.featured.selections != 'undefined' && Object.keys(home_odds_data.featured.selections).length == 3) {
            
            var feat_odds = jQuery.extend({},home_odds_data.featured);
            create_most_played_stats_home(feat_odds,'.soh_content_feat_stats');
        }
        else $('.soh_content_feat_stats').html('');
        
        if (
            typeof home_odds_data.results != 'undefined' 
            && Object.keys(home_odds_data.results).length > 0
            && typeof home_odds_data.results.events != 'undefined' && Object.keys(home_odds_data.results.events).length > 0
        ) {
            var event_results = jQuery.extend({},home_odds_data.results);
            create_event_results_home(event_results);
        }
        if (
            typeof home_odds_data.market_movers != 'undefined' 
            && Object.keys(home_odds_data.market_movers).length > 0
            && typeof home_odds_data.market_movers.events != 'undefined' && Object.keys(home_odds_data.market_movers.events).length > 0
        ) {
            var event_movers = jQuery.extend({},home_odds_data.market_movers);
            create_market_movers_home(event_movers);
        }
    }
    // reset opened leagues and remove css classes from menu
    open_leagues = [];
    $(".league_item_li.open").removeClass("open");
    $("#sports_odds .sports_scroll_content").html('');
    $("#sports_odds .sports_scroll_single_event").html('');
}

// function used to build the html for leagues when changing the bet type
// the function replaces the current html container of the league with the updated html
function build_the_odds_events_ajax(output) {
    // get a valid json response
    sb_odds_data = get_valid_json(output);
    
    
    var league_id = sb_odds_data.l_id;
    var header_bt_html = ''; // bet types header
    var header_bts_html = ''; // bet type selections header
    var header_linfo_html = ''; // heading with league info
    var footer_spacer_html = ''; // footer spacing 
    var header_bt_more = ''; // more (plus) icon in league header (show/hide categories)
    var events_list_html = ''; // html for event listings
    var dynamic_html = ''; // dynamic bet types for events in current league
    var league_div_css_class = ''; // css class used on the league div
    
    var league = sb_odds_data;
    
    // params array of objects used to call other related function
    var params = {};
    
    // generate headings for bet types and selections
    var ev_headers = generate_league_events_header(sb_odds_data);
    header_bt_html = ev_headers['bt'];
    header_bts_html = ev_headers['bts'];
    header_linfo_html = ev_headers['info'];
    footer_spacer_html = ev_headers['footer'];
    
    // get the events html as table rows
    events_list_html = generate_league_events_html(sb_odds_data,params);
    //console.log(events_list_html);
    // check if event has dynamic bet types and generate html
    dynamic_html = generate_league_dynamic_events_html(sb_odds_data,params);
    //console.log('dynamic_html',dynamic_html);
    
    if (events_list_html.length == 0 && dynamic_html.length == 0) {
        header_bt_html = '';
        header_bts_html = '';
        //header_bt_more = '';
        //header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':'nobtc close'});
        events_list_html = load_sb_tpl('sport_odds_league_event_row_noevents',{});
        league_div_css_class += ' noev';
    }
    if (events_list_html.length == 0) league_div_css_class += ' noevbt';
    if (dynamic_html.length == 0) league_div_css_class += ' nodybt';
    
    // bet type categories section
    var league_bet_type_groups = '';
    if (typeof league.league_bet_types_categories != 'object') league.league_bet_types_categories = {};
    
    // generic template params for the league events odds table
    var league_events_params = {
        'league_id'                     : league_id,
        'header_bet_types'              : header_bt_html, // get from tpl sport_odds_league_header_bt_name (loop)
        'header_bt_selections'          : header_bts_html,
        'events_list'                   : events_list_html,
        'header_league_info'            : header_linfo_html,
        'footer_area'                   : footer_spacer_html,
        'league_bet_type_groups'        : league_bet_type_groups
    };
    // load the events area template with the set params
    var events_table = load_sb_tpl('sport_odds_league_events_area',league_events_params);
    
    // not that we have the html, we need to replace the current events table with the new one
    $("#sleague_"+sb_odds_data.l_id+" .odds_open").replaceWith(events_table);
    // now we append any dynamic bet types
    $("#sleague_"+league_id+" .odds_open").append(dynamic_html);
    // hide immediately and display a slide down animation on the new table html
    //$("#sleague_"+sb_odds_data.l_id+" .odds_open").hide();
    //$("#sleague_"+sb_odds_data.l_id+" .odds_open").slideDown(animation_duration)
    $("#sleague_"+sb_odds_data.l_id+" .odds_open").show();
}

// retrieve info for search results
function build_the_search_ajax(search_str,raw_str,hour_results) {
    
    var json_obj = get_valid_json(raw_str);
    var html = '';
    set_page_hash();
    
    
    if (json_obj === false) {
        var html = load_sb_tpl('sport_odds_generic_error',{});
        display_contents(html);
        load_page_width('full');
        return;
    }
    else if (typeof json_obj.errors != 'undefined') {
        var err_str = 'Error with search: ';
        for (var i in json_obj.errors) {
            err_str += '<div class="error">'+json_obj.errors[i]+'</div>';
        }
        var html = load_sb_tpl('sport_odds_custom_error',{'error':err_str});
        display_contents(html);
        load_page_width('full');
        return;
    }
    
    var lc = 0; // search results league counter
    // show league as open
    $(".league_item_li.open").removeClass("open");
    // loop all leagues
    for (var sp in json_obj) {
        leagues = json_obj[sp];
    for (var li in leagues) {
        var league = leagues[li];
        // get html output of the html
        // note here we require the that html is returned, thus we set the param 'return' to true
        output = generate_league_html(league,{'return':true,'no_categories':true});
        // get html for static and dynamic events/bet types
        if (typeof output.html != 'undefined') html+=output.html;
        if (typeof output.dynamic_html != 'undefined') html+=output.dynamic_html;
        
        lc++; // update counter
    }
    }
    // no leagues found, display_error
    if (lc == 0) {
        if (hour_results == true) display_contents(load_sb_tpl('sport_odds_league_event_noevents',{'search':search_str}));
        else display_contents(load_sb_tpl('sport_odds_no_results',{'search':search_str}));
    }
    // on success generate the html accordingly
    else {
        var output = load_sb_tpl('sport_odds_search_results',{'search':search_str,'html':html});
        if (hour_results == true ) display_contents(html);
        else display_contents(output);
    }
    load_page_width('full');
}



// generic leagues lsiting fcuntions

//show bet types related to the specified group and league
function league_odds_show_group(group_id,league_id) {
    // hide from the currently visible bet types
    $("#sleague_"+league_id+" .league_odd_bt_item").removeClass("selected");
    $("#group_bt_-1_"+league_id).removeClass("selected").removeClass("display_odds"); // default group button/link
    
    // remove highlight from the currently selected group
    $("#sleague_"+league_id+" .league_odd_group_item.selected").removeClass("selected");
    $("#leo_group_"+group_id+"_"+league_id).addClass("selected"); // add selected class to selected group and league
    
    // show only bet types that are available within the group
    if (group_id > 0) $("#sleague_"+league_id+" .league_odd_bt_item.lobtc_"+group_id).addClass("selected");
    // or show all if the 'all' options is selected (group 0)
    else if (group_id == 0) {
        $("#sleague_"+league_id+" .league_odd_bt_item").addClass("selected");
        $("#sleague_"+league_id+" .league_odd_btg_all").removeClass("selected");
        $("#group_bt_0_"+league_id).addClass("selected"); // default group button/link
    }
    else if (group_id == -1) {
        $("#group_bt_-1_"+league_id).addClass("selected").addClass("display_odds"); // default group button/link
    }
    
    if(typeof init_swiper_slider === "function"){
        init_swiper_slider(slider_bet_types_params);
    }
}

// load a set of bet types for the selected league
function league_odds_load_bet_types(bet_type_ids,league_id,group_id) {
    if (bet_type_ids.indexOf(",") != -1) {
    //if (typeof bet_type_ids == 'object') {
        var bet_type_ids_arr = bet_type_ids.split(",");
        
        $("#sleague_"+league_id+" .league_odd_bt_item.display_odds").removeClass("display_odds");
        $("#group_bt_-1_"+league_id).removeClass("display_odds");
        $("#group_bt_-1_"+league_id).removeClass("selected");
        
        var sports_url = 'lid='+league_id+'&replace=1';
        for (var b in bet_type_ids_arr) {
            sports_url += '&bet_type_ids[]='+bet_type_ids_arr[b];
            //$("#group_bt_"+bet_type_ids[b]+"_"+league_id).addClass("display_odds");
        }
        
        var preloader = load_sb_tpl('sport_odds_generic_preloader',{'css_class':'absolute_tl'});
        $("#sleague_"+league_id+" .odds_open").append(preloader);
        $("#group_btg_"+group_id).addClass("display_odds");
        get_sports_data('get_odds',sports_url,'build_the_odds_events_ajax');
        return;
    }
}

// load a particular bet type for the selected league
function league_odds_load_bet_type(bet_type_id,league_id,sov) {
    var css_cls = league_id; // div id
    var extra_url = '';
    // if bt has sov, add this to the div id (sov index)
    if (typeof sov != 'undefined' && sov != "") {
        css_cls += '_'+get_sov_index(sov);
        extra_url += '&sov='+sov;
    }
    // if the current bet type is already selected, we stop the request
    if ($("#group_bt_"+bet_type_id+"_"+css_cls).hasClass("display_odds")) return;
    
    // remove the blocking css class, and selected/highlight class
    $("#sleague_"+league_id+" .league_odd_bt_item.display_odds").removeClass("display_odds");
    $("#group_bt_-1_"+css_cls).removeClass("display_odds");
    $("#group_bt_-1_"+css_cls).removeClass("selected");
    
    // lock the current bet type 
    $("#group_bt_"+bet_type_id+"_"+css_cls).addClass("display_odds");
    
    // request ajax data, call function 'build_the_odds_events_ajax' on success
    var preloader = load_sb_tpl('sport_odds_generic_preloader',{'css_class':'absolute_tl'});
    $("#sleague_"+league_id+" .odds_open").append(preloader);
    
    get_sports_data('get_odds','lid='+league_id+'&replace=1&bet_type_id='+bet_type_id+extra_url,'build_the_odds_events_ajax');
}

// basic function to load and display the home section ajax contents
function load_homepage(get_new) {
    if (typeof xhr_ajax != 'undefined' && xhr_ajax != false && typeof xhr_ajax['get_odds'] != 'undefined' && xhr_ajax['get_odds'] != false) {
        xhr_ajax.abort();
    }
    $(".sports_odds_home .soh_content").html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':''}));
    var home_url = 'home=1';
    if (typeof get_new != 'undefined' && get_new) home_url += '&new=1';
    setTimeout(function() { get_sports_data('get_odds', home_url, 'build_the_odds_ajax_home'); }, 30);
    show_homepage();
}

// clear the search form
function clear_search() {
    $("#sb_search_form input.sb_input").val("");
}

// templates leagues list only

// the function generates the html to display events for the selected league (using global vat sb_odds_data)
function build_the_odds(is_home,home_div,override) {
    
    var sbo = new Date().getTime();
    if (typeof sb_time != 'undefined' && sb_time == true) console.log("START BUILD_THE_ODDS",sbo);
    // remove any error displayed
    $("#sports_odds .sports_scroll_content .generic_error").remove();
    // if no events are available, we show an error
    if (sb_odds_data == null || typeof sb_odds_data.events == 'undefined' || sb_odds_data.events == null || Object.keys(sb_odds_data.events).length == 0) {
        if (sb_odds_data == null || typeof sb_odds_data.l_id == 'undefined') {
            if (is_home) {
                $(home_div).html("");
            }
            if (typeof sb_odds_data.errors != 'undefined') {
                $("#sports_odds .sports_scroll_content").prepend(load_sb_tpl('sport_odds_custom_error',{'error':sb_odds_data.errors[0]}));
            }
            else {
                $("#sports_odds .sports_scroll_content").prepend(load_sb_tpl('sport_odds_generic_error',{}));
            }
            
            return;
        }
    }
    
    // get league id
    var lid = sb_odds_data.l_id;
    // add 'open' class to menu item
    $(".mleague_"+lid).addClass("open");
    open_leagues.push(lid.toString());
    
    // populate the parameters for the request
    var league_params = {};
    // check if homepage requested html gen
    if (is_home != 'undefined' && is_home) {
        league_params.home = true;
        if (home_div != 'undefined') league_params.home_div = home_div;
    }
    // check if request requires overriding the current leagues list html
    if (typeof override != 'undefined' && override) league_params.override = true;
    // build and display the league html
    generate_league_html(sb_odds_data,league_params);
    
    // extra check for display purposes
    // if only 1 league is available, we do not allow the user to close such league
    if (open_leagues.length == 1) {
        $(".sleague_item .close_league").addClass("disabled");
    }
    // else, more than 1 league is available, we allow the user to close the leagues
    else {
        $(".sleague_item .close_league").removeClass("disabled");
    }
    
    // based on the supplied params, we identify if the odds are for the home section or leagues list section
    if (is_home) {
        sports_loc = 0;
        show_homepage();
    } else {
        sports_loc = 1;
        show_leagues();
    }
    // check if hash url is allowed to change
    if (allow_hash_change) {
        // change hash url based on the page generic params
        set_page_hash();
    }
    // reset hash url change
    allow_hash_change = true;
    if (typeof sb_time != 'undefined' && sb_time == true) {
        var ebo = new Date().getTime();
        var diff = ebo - sbo;
        console.log("END BUILD_THE_ODDS",ebo);
        console.log("DIFF BUILD_THE_ODDS",diff);
    }
}

function generate_league_html_home(sports_events,params) {
    var up_v = 1;
    if (typeof bs_upcoming_ver != 'undefined' && bs_upcoming_ver == "2") {
        up_v = 2;
    }
    if (typeof params != 'undefined' && typeof params.version != 'undefined' && params.version > 0 && typeof window['generate_league_html_home_v'+params.version] == 'function') {
        up_v = params.version;
    }
    
    if (typeof params.is_live != 'undefined' && params.is_live) {
        up_v = 1; // no other version has been implemented yet
    }
    
    if (up_v == 1) {
        return generate_league_html_home_v1(sports_events,params);
    }
    else if (up_v == 2) {
        return generate_league_html_home_v2(sports_events,params);
    }
    
    else if (up_v == 3) {
        return generate_league_html_home_v3(sports_events,params);
    }
    
}

function generate_league_html_home_v1(sports_events,params) {
    
    if (typeof sports_events != 'object') {
        alert("ERROR!");
        return false;
    }
    
    var max_events = 50;
    var max_sport_events = 10;
    
    if (typeof params.max_events != 'undefined' && params.max_events > 0) max_events = params.max_events;
    if (typeof params.max_sport_events != 'undefined' && params.max_sport_events > 0) max_sport_events = params.max_sport_events;
    
    // basic parameters
    // convert params into object if not set
    if (typeof params != 'object') params = {};
    var is_home = true;
    if (typeof params.home_div == 'undefined') { 
        console.log('Home div not set `params.home_div`',params.home_div);
        return false;
    }
    
    var home_div = params.home_div;
    var override = true;
    var no_cats = true;
    
    var league_bet_type_groups = ''; // to replace with different sports
    
    // html sections generation
    
    var header_bt_html = ''; // bet types header
    var header_bts_html = ''; // bet type selections header
    var footer_spacer_html = ''; // spacers in the footer matching the selections
    var header_league_info = ''; // heading with league info
    var header_bt_more = ''; // more (plus) icon in league header (show/hide categories)
    var events_list_html = ''; // html for event listings
    var dynamic_html = ''; // dynamic bet types for events in current league
    var league_div_css_class = ''; // css class used on the league div
    
    var css_class = ''; // css class for header bet types more area (the plus icon)
    // sb_odds_bt_categories_open param set in the main page, when set to true, the categories will be visible on load
    css_class = (typeof sb_odds_bt_categories_open == 'boolean' && sb_odds_bt_categories_open) ? 'open' : 'close';
    
    css_class += ' nobtc';
    // generate the html or the more icon
    header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':css_class,'league_id':-1});
    
    var events_table = '';
    var first_sport = {};
    
    var events_count = 0;
    var sport_ev_count = {};
    for (var i in sports_events) {
        var league = sports_events[i];
        var league_id = params.home_sports_div_css+'_ev';
        var sport_id = league.s_id;
        
        if (typeof sport_ev_count[sport_id] == 'undefined') sport_ev_count[sport_id] = 0;
        if (events_count > max_events) break;
        
        var ev_headers = generate_league_events_header(league);
        header_bt_html = ev_headers['bt'];
        header_bts_html = ev_headers['bts'];
        header_league_info = ev_headers['info'];
        footer_spacer_html = ev_headers['footer'];
        
        for (var e in league.events) {
            if (sport_ev_count[sport_id] >= max_sport_events) {
                delete league.events[e];
            }
            events_count++;
            sport_ev_count[sport_id]++;
        }
        
        // get the events html as table rows
        events_list_html = generate_league_events_html(league,params);
        
        // check if event has dynamic bet types and generate html
        dynamic_html = generate_league_dynamic_events_html(league,params);
        
        if (events_list_html.length == 0 && dynamic_html.length == 0) {
            continue;
            //league_bet_type_groups = '';
            header_bt_html = '';
            header_bts_html = '';
            footer_spacer_html = '';
            //header_bt_more = '';
            //header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':'nobtc close'});
            events_list_html = load_sb_tpl('sport_odds_league_event_row_noevents',{});
            league_div_css_class += ' noev';
        }
        if (events_list_html.length == 0) league_div_css_class += ' noevbt';
        if (dynamic_html.length == 0) league_div_css_class += ' nodybt';
        
        
        // generic template params for the league events odds table
        var league_events_params = {
            'league_id'                     : league_id,
            'header_bet_types'              : header_bt_html, // get from tpl sport_odds_league_header_bt_name (loop)
            'header_bt_selections'          : header_bts_html,
            'events_list'                   : events_list_html,
            'header_league_info'            : header_league_info,
            'footer_area'                   : footer_spacer_html
        };
        var sport_html = load_sb_tpl('sport_odds_league_events_area',league_events_params);
        events_table += load_sb_tpl('sport_odds_league_home_sport_tbl',{"sport_id":league.s_id,'sport_name':league.sports_name,'css_class':params.home_sports_div_css+' home_sports_holder','events_table':sport_html});
        
        var sport_div = home_div+' .'+params.home_sports_div_css+'.home_sports_holder';
        league_bet_type_groups += load_sb_tpl('sports_odds_league_home_link_sport_link',{"sport_id":league.s_id,'sport_name':league.sports_name,'css_class':params.home_sports_div_css,'home_div':home_div,'sport_div':sport_div});
        
        if (i == 0) {
            first_sport.s_id = league.s_id;
            first_sport.home_div = home_div;
            first_sport.sport_div = sport_div;
        }
    }
    
    if (events_count == 0) {
        $(home_div).html('');
        console.log('No events available');
        return;
    }
    var sports_links = load_sb_tpl('sports_odds_league_home_link_sport_html',{'links':league_bet_type_groups,'css_class':'open sports_links'});
    if (Object.keys(sports_events).length <= 1) sports_links = '';
    // parameters used in generic template to generate league html
    var league_params = {
        'league_id'                     : league_id,
        'css_class'                     : league_div_css_class,
        'sport_name'                    : params.home_sports_title,
        
        'header_more'                   : header_bt_more,
        
        'league_bet_type_groups'        : sports_links, // get from tpl sport_odds_league_bet_types_groups
        'league_events_area'            : events_table
    }
    
    $(home_div).html(load_sb_tpl('sport_odds_league_home',league_params));
    
    toggle_soh_home_sport(first_sport.s_id,first_sport.home_div,first_sport.sport_div);
}
function generate_league_html_home_v2(sports_events,params) {
    
    var max_events = 50;
    var max_sport_events = 10;
    
    if (typeof params.max_events != 'undefined' && params.max_events > 0) max_events = params.max_events;
    if (typeof params.max_sport_events != 'undefined' && params.max_sport_events > 0) max_sport_events = params.max_sport_events;
    
    if (typeof sports_events != 'object') {
        alert("ERROR!");
        return false;
    }
    
    if (typeof params != 'object') params = {};
    var is_home = true;
    if (typeof params.home_div == 'undefined') { return false; }
    
    var home_div = params.home_div;
    var override = true;
    var no_cats = true;
    
    var league_bet_type_groups = ''; // to replace with different sports
    
    // html sections generation
    
    var header_bt_html = ''; // bet types header
    var header_bts_html = ''; // bet type selections header
    var footer_spacer_html = ''; // spacers in the footer matching the selections
    var header_league_info = ''; // heading with league info
    var header_bt_more = ''; // more (plus) icon in league header (show/hide categories)
    var events_list_html = ''; // html for event listings
    var dynamic_html = ''; // dynamic bet types for events in current league
    var league_div_css_class = 'selected '; // css class used on the league div
    
    var css_class = ''; // css class for header bet types more area (the plus icon)
    // sb_odds_bt_categories_open param set in the main page, when set to true, the categories will be visible on load
    css_class = (typeof sb_odds_bt_categories_open == 'boolean' && sb_odds_bt_categories_open) ? 'open' : 'close';
    
    css_class += ' nobtc';
    // generate the html or the more icon
    header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':css_class,'league_id':-1});
    
    var events_count = 0;
    var sport_ev_count = {};
    
    var sports_html = '';
    
    for (var i in sports_events) {
        
        var league = sports_events[i];
        var league_id = params.home_sports_div_css+'_ev';
        var sport_id = league.s_id;
        
        if (typeof sport_ev_count[sport_id] == 'undefined') sport_ev_count[sport_id] = 0;
        if (sport_ev_count[sport_id] > max_sport_events) {
            console.log("SPORT BREAK ["+sport_id+"]",sport_ev_count[sport_id],max_sport_events);
            break;
        }
        if (events_count > max_events) break;
        
        var ev_headers = generate_league_events_header(league);
        header_bt_html = ev_headers['bt'];
        header_bts_html = ev_headers['bts'];
        header_league_info = ev_headers['info'];
        footer_spacer_html = ev_headers['footer'];
        
        for (var e in league.events) {
            if (sport_ev_count[sport_id] >= max_sport_events) {
                delete league.events[e];
            }
            events_count++;
            sport_ev_count[sport_id]++;
        }
        
        // get the events html as table rows
        events_list_html = generate_league_events_html(league,params);
        // check if event has dynamic bet types and generate html
        dynamic_html = generate_league_dynamic_events_html(league,params);
        
        if (events_list_html.length == 0 && dynamic_html.length == 0) {
            continue;
        }
        
        if (events_list_html.length == 0) league_div_css_class += ' noevbt';
        if (dynamic_html.length == 0) league_div_css_class += ' nodybt';
        
        var league_events_params = {
            'league_id'                     : league_id,
            'header_bet_types'              : header_bt_html, // get from tpl sport_odds_league_header_bt_name (loop)
            'header_bt_selections'          : header_bts_html,
            'events_list'                   : events_list_html,
            'header_league_info'            : header_league_info,
            'footer_area'                   : footer_spacer_html
        };
        
        var sport_html = load_sb_tpl('sport_odds_league_events_area',league_events_params);
        var sport_table_html = load_sb_tpl('sport_odds_league_home_sport_tbl',{"sport_id":league.s_id,'sport_name':league.sports_name,'css_class':params.home_sports_div_css+' home_sports_holder selected','events_table':sport_html});
        
        var league_params = {
        'league_id'                     : league_id,
        'css_class'                     : league_div_css_class,
        'sport_name'                    : params.home_sports_title + " - " + league.sports_name,
        
        'header_more'                   : header_bt_more,
        
        'league_bet_type_groups'        : '', // get from tpl sport_odds_league_bet_types_groups
        'league_events_area'            : sport_table_html
    }
        
        sports_html += load_sb_tpl('sport_odds_league_home',league_params);
        
    }// end loop sports_events
    
    $(home_div).html(sports_html);
}
function generate_league_html_home_v3(sports_events,params) {
    var max_events = 15;
    
    if (typeof params.max_events != 'undefined' && params.max_events > 0) max_events = params.max_events;
    
    if (typeof sports_events != 'object') {
        alert("ERROR!");
        return false;
    }
    
    var football_upcoming = false;
    /*for (var i in sports_events) {
        var sport = sports_events[i];
        if (sport.s_id != 1) continue;
        football_upcoming = sport;
        break;
    }*/
    football_upcoming = {'sports':[],'events':[]};
    for (var i in sports_events) {
        var sport = sports_events[i];
        if (sport.s_id != 1 && sport.s_id != 3 && sport.s_id != 6) continue;
        football_upcoming.sports.push(sport);
        football_upcoming.events = football_upcoming.events.concat(sport.events);
    }
    
    football_upcoming.events.sort(function(a,b) {
       if (a['tstamp'] > b['tstamp']) return 1;
       else return -1;
    });
    
    if (Object.keys(football_upcoming.events).length == (false)) return false;
    
    var events_html = '';
    var ev_counter = 0;
    for (var e in football_upcoming.events) {
        var event = football_upcoming.events[e];
        
        var css_class1 = add_sel1 = '';
        var css_class0 = add_sel0 = '';
        var css_class2 = add_sel2 = '';
        var odd0 = odd1 = odd2 = '-';
        
        
        var event_odd_info = home_upcoming_odd_info(event);
        if (!event_odd_info) continue;
        
        if (ev_counter > max_events) break;
        
        add_sel0 = event_odd_info.add_sel0;
        add_sel1 = event_odd_info.add_sel1;
        add_sel2 = event_odd_info.add_sel2;
        
        css_class0 = event_odd_info.css_class0;
        css_class1 = event_odd_info.css_class1;
        css_class2 = event_odd_info.css_class2;
        
        odd0 = event_odd_info.odd0;
        odd1 = event_odd_info.odd1;
        odd2 = event_odd_info.odd2;
        
        var event_url = event.l_id+'-'+event.e_id;
        
        var ev_stats = '';
        if (typeof event.has_stats != 'undefined' && event.has_stats && typeof event.br_id != 'undefined' && typeof br_stats_url != 'undefined' && br_stats_url != false) {
            ev_stats = load_sb_tpl('sport_odds_league_event_icon_stats',{'stats_id':event.br_id});
        }
        
        var ev_date = ev_time = ''; // date and time values
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        
        
        var ev_params = {
            'event_date' : ev_date,
            'event_time' : ev_time,
            
            'competitor0' : 'X',
            'competitor1' : event.competitor1,
            'competitor2' : event.competitor2,
            
            'odd0' : format_odd_value(odd0), // final - X
            'odd1' : format_odd_value(odd1), // final - 1
            'odd2' : format_odd_value(odd2), // final - 2
            
            'add_selection_link0': 'a='+add_sel0,
            'add_selection_link1': 'a='+add_sel1,
            'add_selection_link2': 'a='+add_sel2,
            
            'css_class0' : css_class0,
            'css_class1' : css_class1,
            'css_class2' : css_class2,
            
            'btscount' : event.btscount,
            'br_id': event.br_id,
            
            'league_id' : event.l_id,
            'event_id' : event.e_id,
            'sport_id' : event.s_id,
            'event_url' : event_url,
            
            'ev_stats' : ev_stats,
            
        };
        
        //events_html += load_sb_tpl('t2_home_upcoming_event_row',ev_params);
        
        var event_htmltpl = 't2_home_upcoming_event_row';
        if (event.s_id == 1) event_htmltpl += '_threeway';
        else if (event.s_id == 3) event_htmltpl += '_twoway';
        else if (event.s_id == 6) event_htmltpl += '_twoway';
        
        events_html += load_sb_tpl(event_htmltpl,ev_params);
        
        ev_counter++;
    }
    
    var html = load_sb_tpl('t2_home_upcoming_area_mixed',{'events_list':events_html,'section_title' : params.home_sports_title});
    $('.soh_content_upcoming').html(html);
    
    return;
}
function home_upcoming_odd_info(event) {
    var css_class1 = add_sel1 = '';
    var css_class0 = add_sel0 = '';
    var css_class2 = add_sel2 = '';
    var odd0 = odd1 = odd2 = '-';
    
    if (Object.keys(event.selections).length == 0) return false;
    
    // football
    if (event.s_id == 1) {
        
        var bts_a = 1;
        var bts_b = 2;
        var bts_c = 3;
        
        
        if (typeof event.selections[bts_a] == 'undefined' || typeof event.selections[bts_b] == 'undefined' || typeof event.selections[bts_c] == 'undefined') return false;
        
        // 3way - X
        if (typeof event.selections[bts_b].add_sel_link != 'undefined') {
            add_sel0 = event.selections[bts_b].add_sel_link;
            odd0 = event.selections[bts_b].odd;
        }
        else add_sel0 = 'false';
        
        if (typeof event.selections[bts_b].selected != 'undefined' && event.selections[bts_b].selected == "1") css_class0 += 'selected ';
        if (event.selections[bts_b].odd <= bs_min_odd_val) {
            css_class0 += 'disabled_odd ';
            add_sel0 = 'false';
            odd0 = '-';
        }
        css_class0 += ' odd_'+event.e_id+'_'+event.selections[bts_b].bt_id+'_'+event.selections[bts_b].bts_id;
        
        // 3way - 1 
        if (typeof event.selections[bts_a].add_sel_link != 'undefined') {
            add_sel1 = event.selections[bts_a].add_sel_link;
            odd1 = event.selections[bts_a].odd;
        }
        else add_sel1 = 'false';
        
        if (typeof event.selections[bts_a].selected != 'undefined' && event.selections[bts_a].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_a].odd <= bs_min_odd_val) {
            css_class1 += 'disabled_odd ';
            add_sel1 = 'false';
            odd1 = '-';
        }
        css_class1 += ' odd_'+event.e_id+'_'+event.selections[bts_a].bt_id+'_'+event.selections[bts_a].bts_id;
        
        // final - 2
        if (typeof event.selections[bts_c].add_sel_link != 'undefined') {
            add_sel2 = event.selections[bts_c].add_sel_link;
            odd2 = event.selections[bts_c].odd;
        }
        else add_sel2 = 'false';
        
        if (typeof event.selections[bts_c].selected != 'undefined' && event.selections[bts_c].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_c].odd <= bs_min_odd_val) {
            css_class2 += 'disabled_odd ';
            add_sel2 = 'false';
            odd2 = '-';
        }
        css_class2 += ' odd_'+event.e_id+'_'+event.selections[bts_c].bt_id+'_'+event.selections[bts_c].bts_id;
        
        return {'s_id':1,'css_class0':css_class0,'css_class1':css_class1,'css_class2':css_class2,'add_sel0':add_sel0,'add_sel1':add_sel1,'add_sel2':add_sel2,'odd0':odd0,'odd1':odd1,'odd2':odd2};
    }
    
    // tennis
    if (event.s_id == 3) {
        
        var bts_a = 41;
        var bts_b = 42;
        
        if (typeof event.selections[bts_a] == 'undefined' || typeof event.selections[bts_b] == 'undefined') return false;
        
        // 2way - 1 
        if (typeof event.selections[bts_a].add_sel_link != 'undefined') {
            add_sel1 = event.selections[bts_a].add_sel_link;
            odd1 = event.selections[bts_a].odd;
        }
        else add_sel1 = 'false';
        
        if (typeof event.selections[bts_a].selected != 'undefined' && event.selections[bts_a].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_a].odd <= bs_min_odd_val) {
            css_class1 += 'disabled_odd ';
            add_sel1 = 'false';
            odd1 = '-';
        }
        css_class1 += ' odd_'+event.e_id+'_'+event.selections[bts_a].bt_id+'_'+event.selections[bts_a].bts_id;
        
        // 2way - 2
        if (typeof event.selections[bts_b].add_sel_link != 'undefined') {
            add_sel2 = event.selections[bts_b].add_sel_link;
            odd2 = event.selections[bts_b].odd;
        }
        else add_sel2 = 'false';
        
        if (typeof event.selections[bts_b].selected != 'undefined' && event.selections[bts_b].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_b].odd <= bs_min_odd_val) {
            css_class2 += 'disabled_odd ';
            add_sel2 = 'false';
            odd2 = '-';
        }
        css_class2 += ' odd_'+event.e_id+'_'+event.selections[bts_b].bt_id+'_'+event.selections[bts_b].bts_id;
        
        return {'s_id':1,'css_class0':css_class0,'css_class1':css_class1,'css_class2':css_class2,'add_sel0':add_sel0,'add_sel1':add_sel1,'add_sel2':add_sel2,'odd0':odd0,'odd1':odd1,'odd2':odd2};
    }
    // basket
    if (event.s_id == 6) {
        
        var bts_a = 2263;
        var bts_b = 2264;
        
        if (typeof event.selections[bts_a] == 'undefined' || typeof event.selections[bts_b] == 'undefined') return false;
        
        // 2way - 1 
        if (typeof event.selections[bts_a].add_sel_link != 'undefined') {
            add_sel1 = event.selections[bts_a].add_sel_link;
            odd1 = event.selections[bts_a].odd;
        }
        else add_sel1 = 'false';
        
        if (typeof event.selections[bts_a].selected != 'undefined' && event.selections[bts_a].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_a].odd <= bs_min_odd_val) {
            css_class1 += 'disabled_odd ';
            add_sel1 = 'false';
            odd1 = '-';
        }
        css_class1 += ' odd_'+event.e_id+'_'+event.selections[bts_a].bt_id+'_'+event.selections[bts_a].bts_id;
        
        // 2way - 2
        if (typeof event.selections[bts_b].add_sel_link != 'undefined') {
            add_sel2 = event.selections[bts_b].add_sel_link;
            odd2 = event.selections[bts_b].odd;
        }
        else add_sel2 = 'false';
        
        if (typeof event.selections[bts_b].selected != 'undefined' && event.selections[bts_b].selected == "1") css_class1 += 'selected ';
        if (event.selections[bts_b].odd <= bs_min_odd_val) {
            css_class2 += 'disabled_odd ';
            add_sel2 = 'false';
            odd2 = '-';
        }
        css_class2 += ' odd_'+event.e_id+'_'+event.selections[bts_b].bt_id+'_'+event.selections[bts_b].bts_id;
        
        return {'s_id':1,'css_class0':css_class0,'css_class1':css_class1,'css_class2':css_class2,'add_sel0':add_sel0,'add_sel1':add_sel1,'add_sel2':add_sel2,'odd0':odd0,'odd1':odd1,'odd2':odd2};
    }
    
    return false;
}
//======================================

function toggle_soh_home_sport(sport_id,elem_container,div_elem) {
    $(elem_container+" a.league_odd_group_item").removeClass("selected");
    $(elem_container+" a.league_odd_group_item.league_odd_group_item_"+sport_id).addClass("selected");
    $(div_elem).removeClass("selected");
    $(div_elem+'#home_sport_'+sport_id).addClass("selected");
    
}

// generates the html for the league based on the supplied params
function generate_league_html(league,params) {
    if (typeof league != 'object') {
        alert("ERROR!");
        return false;
    }
    // basic parameters
    // convert params into object if not set
    if (typeof params != 'object') params = {};
    var is_home = (typeof params.home != 'undefined' && params.home) ? true : false;
    var home_div = (is_home && typeof params.home_div != 'undefined') ? params.home_div : false; // only used if is_home = true;
    // override param, start new league list, or append with current list
    var override = (typeof params.override != 'undefined' && params.override) ? true : false;
    // extra param to hide categories is set to true
    var no_cats = (typeof params.no_categories != 'undefined' && params.no_categories) ? true : false;
    
    // basic league info
    var league_id = league.l_id;
    var league_name = league.name;
    
    // html sections generation
    
    var header_bt_html = ''; // bet types header
    var header_bts_html = ''; // bet type selections header
    var footer_spacer_html = ''; // spacers in the footer matching the selections
    var header_league_info = ''; // heading with league info
    var header_bt_more = ''; // more (plus) icon in league header (show/hide categories)
    var events_list_html = ''; // html for event listings
    var dynamic_html = ''; // dynamic bet types for events in current league
    var league_div_css_class = ''; // css class used on the league div
    
    // bet type categories section
    var league_bet_type_groups = '';
    if (typeof league.league_bet_types_categories != 'object') league.league_bet_types_categories = {};
    if (!is_home && !no_cats && Object.keys(league.league_bet_types_categories).length > 0) {
        league_bet_type_groups = generate_league_bet_types_html(league_id,league.league_bet_types_categories,league.bet_types);
    }
    else if (!is_home && !no_cats) {
        league_bet_type_groups = generate_league_bet_types_html(league_id,league.league_bet_types_categories,league.bet_types);
    }
    var css_class = ''; // css class for header bet types more area (the plus icon)
    // sb_odds_bt_categories_open param set in the main page, when set to true, the categories will be visible on load
    css_class = (typeof sb_odds_bt_categories_open == 'boolean' && sb_odds_bt_categories_open) ? 'open' : 'close';
    
    // check for additional css setting
    // categories not available (not set of empty) or home
    if (typeof league.league_bet_types_categories == 'undefined' || Object.keys(league.league_bet_types_categories).length == 0 || is_home) css_class += ' nobtc';
    // generate the html or the more icon
    header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':css_class,'league_id':league_id});
    
    var ev_headers = generate_league_events_header(league);
    header_bt_html = ev_headers['bt'];
    header_bts_html = ev_headers['bts'];
    header_league_info = ev_headers['info'];
    footer_spacer_html = ev_headers['footer'];
    ///////////////////////////////////////////////////////
    
    // get the events html as table rows
    events_list_html = generate_league_events_html(league,params);
    
    // check if event has dynamic bet types and generate html
    dynamic_html = generate_league_dynamic_events_html(league,params);
    
    if (events_list_html.length == 0 && dynamic_html.length == 0) {
        //league_bet_type_groups = '';
        header_bt_html = '';
        header_bts_html = '';
        footer_spacer_html = '';
        //header_bt_more = '';
        //header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more',{'css_class':'nobtc close'});
        events_list_html = load_sb_tpl('sport_odds_league_event_row_noevents',{});
        league_div_css_class += ' noev';
    }
    if (events_list_html.length == 0 && dynamic_html.length == 0) league_div_css_class += ' noevbt';
    if (dynamic_html.length == 0) league_div_css_class += ' nodybt';
    
    league_div_css_class += ' sport_'+league.s_id;
    
    // generic template params for the league events odds table
    var league_events_params = {
        'league_id'                     : league_id,
        'sport_id'                      : league.s_id,
        'header_bet_types'              : header_bt_html, // get from tpl sport_odds_league_header_bt_name (loop)
        'header_bt_selections'          : header_bts_html,
        'events_list'                   : events_list_html,
        'header_league_info'            : header_league_info,
        'footer_area'                   : footer_spacer_html
    };
    var events_table = load_sb_tpl('sport_odds_league_events_area',league_events_params);
    
    // parameters used in generic template to generate league html
    var league_params = {
        'league_id'                     : league_id,
        'sport_id'                      : league.s_id,
        'css_class'                     : league_div_css_class,
        'sport_name'                    : league.sports_name,
        'league_name'                   : league.league_name,
        
        'header_more'                   : header_bt_more,
        
        'league_bet_type_groups'        : league_bet_type_groups, // get from tpl sport_odds_league_bet_types_groups
        'league_events_area'            : events_table
    }
    
    // requested that the html for both normal and dynamic bet types is returned, and not displayed
    if (typeof params['return'] != 'undefined' && params['return'] === true) {
        var html = load_sb_tpl('sport_odds_league_start',league_params);
        // check search results for return val
        //return html;
        return {'html':html,'dynamic_html':dynamic_html};
    }
    
    // it's the homepage
    if (is_home) {
        // confirm that the home div is set, otherwise use the default div classname
        if ($(home_div).length <= 0) home_div = ".sports_odds_home";
        // override is set on
        if (override) $(home_div).html(load_sb_tpl('sport_odds_league_start',league_params));
        // append, override is set to off
        else $(home_div).append(load_sb_tpl('sport_odds_league_start',league_params));
    } else {
        // hide the home and single event contents
        $(".sports_odds_home").hide();
        $("#sports_odds .sports_scroll_single_event").html('').hide();
        // override is set to on, we start a new odds area
        if (override) $("#sports_odds .sports_scroll_content").html(load_sb_tpl('sport_odds_league_start',league_params));
        // repalce league if already in list
        else if ($("#sleague_"+league.l_id).length == 1) {
            $("#sports_odds .sports_scroll_content #sleague_"+league.l_id).replaceWith(load_sb_tpl('sport_odds_league_start',league_params));
            //$("#sports_odds .sports_scroll_content #sleague_"+league.l_id).html(load_sb_tpl('sport_odds_league_start',league_params));
        }
        // prepend (last clicked 1st to show), override is set to off
        else $("#sports_odds .sports_scroll_content").prepend(load_sb_tpl('sport_odds_league_start',league_params));
        // show the odds area contents
        $("#sports_odds .sports_scroll_content").show();
        // hide the current league div, and create an animation to display league
        //$("#sleague_"+league.l_id).hide();
        $("#sleague_"+league.l_id).show();
        //$("#sleague_"+league.l_id).slideDown(animation_duration);
    }
    
    // append dynamic html to league div
    $("#sleague_"+league_id+" .odds_open").append(dynamic_html);
}

// generate the heading html for a league
function generate_league_events_header(league) {
    
    var header_bt_html = ''; // bet types html palceholder
    var header_bts_html = ''; // bet type sels html palceholder
    var footer_spacer_html = ''; // spacer in footer matching the selections
    
    var header_more_html = load_sb_tpl('sport_odds_league_header_bt_more',{'league_id':league.l_id});
    var header_li_params = {'sport_name':league.sports_name,'league_name':league.league_name,'header_more':header_more_html};
    var header_league_info = load_sb_tpl('sport_odds_league_header_info',header_li_params);
    
    // loop the bet types available for the league
    for (var bt_index in league.bet_types) {
        // generic params
        var bet_type = league.bet_types[bt_index]; // current bet type info
        if (typeof bet_type != 'object' || typeof bet_type.bt_id == 'undefined') continue;
        if (typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == "1" && bet_type.cat != "2" && bet_type.cat != "3" && bet_type.cat != "10" && bet_type.cat != "11") continue;
        var sel_count = Object.keys(bet_type.selections).length; // selections count per bet type
        
        // dynamic bet types
        if (
            (typeof bet_type.selections == 'undefined' || sel_count == 0) 
            && typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == "1"
            && (bet_type.cat != "2" && bet_type.cat != "3" && bet_type.cat != "10" && bet_type.cat != "11")
        ) {
            // for now we skip these
        }
        // not dynamic, but are set to be displayed
        else if (bet_type.selected == "1") {
            // append a spacer if the header is not empty
            // this is done on every iteration of the bet types, 
            // adding an extra space between the previous bet type and the current
            if (header_bt_html != '') {
                // append spacer to bet types header
                header_bt_html += load_sb_tpl('sport_odds_league_header_bt_spacer',{});
                // append spacer to bet type selections header
                header_bts_html += load_sb_tpl('sport_odds_league_header_bt_spacer',{});
                footer_spacer_html += load_sb_tpl('sport_odds_league_footer',{'css_class':'spacer'});
            }
            // bet type selections params
            var colspan = 0; // colspan for bet type header (number of selections + spacers)
            var cc = 1; // generic loop counter
            // the bet type has an sov thus we require an extra col to display sov value for each event
            
            if (typeof bet_type.sov != 'undefined' && bet_type.cat != "2" && bet_type.cat != "3" && bet_type.cat != "10" && bet_type.cat != "11") {
                // bet types sels headings
                header_bts_html += load_sb_tpl('sport_odds_league_header_bt_sel_sov',{'sov':bet_type.sov});
                header_bts_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                
                footer_spacer_html += load_sb_tpl('sport_odds_league_footer',{'css_class':'sov'});
                footer_spacer_html += load_sb_tpl('sport_odds_league_footer',{'css_class':'spacer'});
                
                colspan++;colspan++; // sov + spacer
            }
            
            // for bet type categories 2 and 3, we require an empty space for sov value
            else if ((bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") && sov_odds_display != 'top') {
                // bet types heading
                header_bt_html += load_sb_tpl('sport_odds_league_header_bt_sel_sov',{'sov':''});
                header_bt_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                // bts heading
                header_bts_html += load_sb_tpl('sport_odds_league_header_bt_sel_sov',{'sov':''});
                header_bts_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
            }
            
            // loop the selections for the currnet bet type
            for (var bts_index in bet_type.selections) {
                var bt_sel = bet_type.selections[bts_index]; // current selection
                
                // append the selection to the bts header
                header_bts_html += load_sb_tpl('sport_odds_league_header_bt_sel',{'selection_name':bt_sel['name'],'selection_info':bt_sel['name'],'css_class':''});
                footer_spacer_html += load_sb_tpl('sport_odds_league_footer',{'css_class':'sel'});
                // add spacer if the current selection counter is smaller than the size of selections (adding a spacer in between selections only)
                if (cc < sel_count) {
                    // add spacer to bts header
                    header_bts_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                    footer_spacer_html += load_sb_tpl('sport_odds_league_footer',{'css_class':'spacer'});
                    // add an extra column to the bet type colspan
                    colspan++;
                }
                
                colspan++; // add the col to the bt colspan
                cc++; // update loop counter
            } // end bts loop
            
            var bt_name = bet_type.name;
            if (typeof bet_type.cat != 'undefined' && (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") && sov_odds_display == 'top') {
                if (bet_type.cat == "2" || bet_type.cat == "10") bt_name += " "+get_sov_index(bet_type.sov,2,true);
                else bt_name += ' '+bet_type.sov+'';
            }
            
            // append the html for the bet type cols
            header_bt_html += load_sb_tpl('sport_odds_league_header_bt_name',{'bet_type_name':bt_name,'colspan':colspan});
        }
        
    } // end loop bet types for league
    // object with bet types and bet type selections html
    return {'bt':header_bt_html,'bts':header_bts_html,'info':header_league_info,'footer':footer_spacer_html};
}

// generate the html for the events sextion of a league based on the supplied params
// the function is used to display normal bet types (not dynamic)
function generate_league_events_html(league,params) {
    var events = league.events; // current events for the league
    var html = ''; // html output
    
    var league_id = -1;
    if (typeof league.l_id != 'undefined') league_id = league.l_id;
    // loop all events
    for (var ev_index in events) {
        
        // get the current event
        var event = league.events[ev_index]; 
        
        // get the event name, we use some extra html within this param to easily identify how many competitors are availabel through jquery and css
        var ev_name = get_event_name(event);
        var event_url = league.l_id+'-'+event.e_id;
        if (typeof event.url != 'undefined' && event.url != null && event.url != '') event_url = event.url;
        
        // check if event has stats
        var ev_stats = '';
        if (typeof event.has_stats != 'undefined' && event.has_stats && typeof event.br_id != 'undefined' && typeof br_stats_url != 'undefined' && br_stats_url != false) {
            ev_stats = load_sb_tpl('sport_odds_league_event_icon_stats',{'stats_id':event.br_id});
        }
        
        var ev_date = ev_time = ''; // date and time values
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        
        if (typeof event.l_id != 'undefined') league_id = event.l_id;
        // params based on current event
        var ev_params = {
            'event_date'        : ev_date,
            'event_time'        : ev_time,
            'event_name'        : ev_name,
            'event_id'          : event.e_id,
            'league_id'         : league_id,
            'event_url'         : event_url,
            'bet_type_count'    : event.sel_count,
            'icons'             : ev_stats,
            'sport_id'          : league.s_id,
            'competitor1'       : event.competitor1,
            'competitor2'       : event.competitor2,
            'selections_amount' : event.sel_count
        }
        if (typeof event.sel_count_up != 'undefined' && event.sel_count_up > 0) {
            ev_params.bet_type_count = event.sel_count_up;
        }   
        
        var ev_info_tpl = 'sport_odds_league_event_info';
        if (typeof params.is_live != 'undefined' && params.is_live) {
            ev_info_tpl = 'sport_odds_league_event_info_live';
            
            var ev_time = get_event_time_html(event);
            var ev_score = get_event_score_html(event);
            
            var ev_time_score_html = get_ev_list_score_time_html(ev_time, ev_score);
            
            ev_params.ev_datetime_live = ev_time;
            ev_params.ev_score = ev_score;
            ev_params.ev_live_time_score = ev_time_score_html;
        }
        
        // event info area (date/time + ev name and link)
        var ev_info = load_sb_tpl(ev_info_tpl,ev_params);
        var ev_sels = ''; // selections html
        var ev_more = '<td></td>'; // more link for event row || #TODO: update to load from template
        
        // generate the html event selections
        //ev_sels = generate_league_event_selections_html(event.selections,ev_params);
        ev_sels = generate_league_event_selections_html(event.selections,league,ev_params);
        
        // update the more link html
        if (event.bet_type_count > 0) ev_more = load_sb_tpl('sport_odds_league_event_bt_sel_more',ev_params);
        
        // append the event info + selections + more html as a single row (current event)
        if (ev_sels.length > 0) html += load_sb_tpl('sport_odds_league_event_row',{'event_info':ev_info,'event_selections':ev_sels,'event_more':ev_more});
        
    } // end loop events
    
    // return the full html
    return html;
}

// generate the bet types html for a particular league
function generate_league_bet_types_html(league_id,bt_cats,bet_types) {
    
    var header_more_html = load_sb_tpl('sport_odds_league_header_bt_more',{'league_id':league_id})
    
    // categories not set, we return an empty string (no bet types)
    if (typeof bt_cats == 'undefined') {
        return '';
    }
    // html place holders
    var html = ''; // generic structure html
    var group_html = ''; // bt groups html
    var bt_html = ''; // bet types html
    var def = false; //default/selected group id, by default non set
    // group params
    var group_params = {'group_id':0,'league_id':league_id,'group_name':'','css_class':''};
    var def_html = '';
    
    
    var grouped_bts = {};
    
    // loop all categories
    for (var c in bt_cats) {
        // get current group
        var cat = bt_cats[c];
        // update the group params
        group_params = {'group_id':cat.bc_id,'league_id':league_id,'group_name':cat.name,'css_class':''};
        
        // set css class for default bet type
        // only 1 group should be set as default
        if (cat['default'] == "1") {
            def = cat.bc_id;
            group_params.css_class = 'selected';
            def_html = load_sb_tpl('sport_odds_league_bet_types_group_item_default',group_params);
        }
        else {
            // retrieve the html for a single group link
            group_html += load_sb_tpl('sport_odds_league_bet_types_group_item',group_params);
        }
        if (typeof cat.link_bt != 'undefined') {
            grouped_bts['grp_'+cat.bc_id] = {};
        }
    }
    // retrive html for the default group link
    // if there was not cat selected, we set the default link as selected
    if (def === false) {
        group_params.css_class = 'selected';
        group_params.group_name = 'Default';//#TODO: get translation
        def_html = load_sb_tpl('sport_odds_league_bet_types_group_item_default',group_params);
    }
    
    // retrieve html for the 'all' link
    group_params.css_class = ''; // no css class needs to be set here
    var all_html = load_sb_tpl('sport_odds_league_bet_types_group_item_all',group_params);
    if (Object.keys(bet_types).length == 0) all_html = '';
    if (sb_debug_odds) console.log(league_id,Object.keys(bet_types).length);
    // append the html to the group [DEFAULT + {ALL group LINKS} + ALL]
    group_html = def_html + group_html + all_html;
    
    // loop all the bet types availble
    for (var bti in bet_types) {
        // get current bet type
        var bt = bet_types[bti];
        // verify that bt exists
        if (typeof bt.bt_id == 'undefined') continue;
        // setup the css class for the current bet type
        var css_class = '';
        // 1 bet type can have multiple categories
        // loop all group ids within the bet type to identify
        // which categories this bet type is related to
        for (var bci in bt.bc_id) {
            css_class += ' lobtc_'+bt.bc_id[bci];
            // if the group
            //if (bt.bc_id == def) css_class += ' selected';
            if (typeof grouped_bts['grp_'+bt.bc_id[bci]] != 'undefined') {
                grouped_bts['grp_'+bt.bc_id[bci]][bt.bt_id] = 1;
            }
        }
        // for bet types with cat 3
        if (bt.cat == "992" || bt.cat == "993") {
            // verify that sov is available
            if (typeof bt.sov != 'undefined' && bt.sov != '') {
                var sov_id = '';
                sov_id = get_sov_index(bt.sov); // sov index
                var sov_display = get_sov_index(bt.sov,bt.cat,true);
                
                var bt_params = {'bet_type_id':bt.bt_id+'_'+sov_id,'league_id':league_id,'bet_type_name':bt.name,'group_id':bt.bc_id,'css_class':  css_class,'sov':bt.sov,'sov_id':sov_id,'sov_display':sov_display};
                bt_html += load_sb_tpl('sport_odds_league_bet_types_bt_item_sov',bt_params);
            }
        }
        // all other bet types
        else {
            var bt_params = {'bet_type_id':bt.bt_id,'league_id':league_id,'bet_type_name':bt.name,'group_id':bt.bc_id,'css_class':css_class};
            bt_html += load_sb_tpl('sport_odds_league_bet_types_bt_item',bt_params);
        }
    }
    
    for (var g in grouped_bts) {
        var grp_id = g.substring(4);
        var grp_bt = '';
        
        for (var b in grouped_bts[g]) {
            var bt = grouped_bts[g][b];
            if (grp_bt != '') grp_bt += ',';
            grp_bt += b;
        }
        
        var css_class = 'lobtc_'+grp_id;
        var grp_params = {'bet_type_ids':grp_bt,'league_id':league_id,'group_id':grp_id,'css_class':css_class}
        var group_extra_html = load_sb_tpl('sport_odds_league_bet_types_bt_group_item',grp_params);
        bt_html += group_extra_html;
    }
    
    var css_class = (typeof sb_odds_bt_categories_open == 'boolean' && sb_odds_bt_categories_open) ? 'open' : 'close';
    if (typeof sb_odds_data.league_bet_types_categories == 'undefined') css_class += ' nobtc';
    html = load_sb_tpl('sport_odds_league_bet_types_groups',{'group_links':group_html,'bt_links':bt_html,'css_class':css_class});
    
    return html;
}

function generate_league_event_selections_html(event_selections,league,event_params) {
    // html output
    var html = '';
    
    var has_at_least_one_odd = false;
    // for now, we only loop the bet types for the current league
    // the selections for the event will be based on the supplied league bet types
    for (var bt_index in league.bet_types) {
        // get current bet type
        var bet_type = league.bet_types[bt_index];
        var sov = '';
        
        
        
        
        // display only bet types and selections that are set as selected
        if (typeof bet_type.selections != 'undefined' && Object.keys(bet_type.selections).length > 1 && bet_type.selected == "1") {
            
            if (typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == "1" && bet_type.cat != "2" && bet_type.cat != "3" && bet_type.cat != "10" && bet_type.cat != "11") continue;
            
            if (html != '') html += load_sb_tpl('sport_odds_league_event_bt_sel_spacer',{});
            
            // for bet type cat 3, we require the generation of the html using a different function
            if (typeof bet_type.cat != 'undefined' && (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") && sov_odds_display != 'top') {
                //html += generate_btcat3_odds(event_params,bet_type,event_selections);
                html += generate_btcat_sovrange_odds(event_params,bet_type,event_selections);
                //html += load_sb_tpl('sport_odds_league_event_bt_sel_spacer',{});
                // skip the process
                continue;
            }
            
            // adding an extra space between the previous bet type and the current
            // append spacer between bet types 
            
            var cc = 1;
            
            // the bet type has an sov thus we require an extra col to display sov value for each event
            
            
            var sel_count = Object.keys(bet_type.selections).length;
            //console.log('BT SELS',bet_type.bt_id,bet_type.selections);
            // loop the bet type selections for the current league
            for (var bts_index in bet_type.selections) {
                var bts_selection = bet_type.selections[bts_index]; // current bet type selection info
                var bts_id = bts_selection.bts_id; // bts id
                var bt_id = bet_type.bt_id; // bts id
                if (typeof bts_selection.bt_id != 'undefined') bt_id = bts_selection.bt_id;
                
                var odd = '-'; // default odd value for current selection
                var css_class = '';
                
                // first thing to do for a bet type, runs 1ce per bt
                if (cc == 1) {
                    if ((typeof bet_type.sov != 'undefined' && bet_type.sov && bet_type.cat != "3" && bet_type.cat == "11" && bet_type.cat == "10") && bet_type.cat != "2") {
                        if (typeof event_selections[bts_id] != 'undefined' && typeof event_selections[bts_id]['sov'] != 'undefined') {
                            sov = event_selections[bts_id]['sov'];
                            if (typeof bet_type.cat != 'undefined') {
                                if (bet_type.cat == "2") sov = handle_bt_event_sov(sov,bet_type.cat);
                                if (bet_type.cat == "3") sov = handle_bt_event_sov(sov,bet_type.cat);
                                if (bet_type.cat == "10") sov = handle_bt_event_sov(sov,2);
                                if (bet_type.cat == "11") sov = handle_bt_event_sov(sov,3);
                            }
                        }
                        else sov = '-';
                        html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_sov',{'sov':sov});
                        html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                    }
                }
                
                var bts_full_index = bts_id;
                if (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") {
                    sov = handle_bt_event_sov(bet_type.sov,bet_type.cat);
                    bts_full_index = 'sov_'+bts_id+'_'+get_sov_index(sov);
                }
                
                // update the odd value, if set for the current event
                if (typeof event_selections != 'undefined' && typeof event_selections[bts_full_index] != 'undefined' && typeof event_selections[bts_full_index]['odd'] != 'undefined') {
                    odd = event_selections[bts_full_index]['odd'];
                    has_at_least_one_odd = true;
                }                
                
                var odd_mc = 'na';
                if (typeof event_selections != 'undefined' && typeof event_selections[bts_full_index] != 'undefined' && typeof event_selections[bts_full_index].mc != 'undefined') odd_mc = event_selections[bts_full_index].mc;
                var odd_selected = false;
                if (typeof event_selections[bts_full_index] != 'undefined' && event_selections[bts_full_index].selected == "1") odd_selected = true;
                
                
                var ev_odd_add_sel_link = false;
                if (typeof event_selections[bts_full_index] != 'undefined' && typeof event_selections[bts_full_index].add_sel_link != 'undefined') ev_odd_add_sel_link = event_selections[bts_full_index].add_sel_link;
                var odd_params = {'odd':odd,'bts_id':bts_id,'bt_id':bt_id,'event_id':event_params.event_id,'sov':sov,'cat':bet_type.cat,'mc':odd_mc,'selected':odd_selected,'add_sel_link':ev_odd_add_sel_link,'sel_name': bts_selection.name};
                
                //if (typeof bet_type.cat != 'undefined' && bet_type.cat == "3") {console.log(odd_params);}
                
                html += generate_odd_td(odd_params);
                
                // check if spacer between selections is required, based on selection count
                if (cc < sel_count) html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                cc++;
            }
            
        }
        
    } // end loop league bet types
    
    //if (has_at_least_one_odd == false) html = '';
    return html;
}

// this function is used to generate multiple sov values using a dropdown
function generate_btcat_sovrange_odds(event_params,bet_type,event_selections) {
    
    var sov_opts = ''; // dropdown HTML holder
    var sov_opts_done = {}; // list of SOVs handled
    
    var odds_sov = ''; // odds HTML holder
    var sel_count = count(bet_type.selections); // number of sels available for bt
    
    // get sov range
    var sov_from = parseFloat(bet_type.sov_from);
    var sov_to = parseFloat(bet_type.sov_to);
    var sov_inc = parseFloat(bet_type.sov_inc);
    
    var selected_sov = -1; // default selected sov
    
    var cc = 1; // counter
    
    // get the main line for the available SOV list
    selected_sov = round_decimals(find_main_line_sov(event_params,bet_type,event_selections),2);
    
    // loop selections, as we need to make sure all SOVs are available
    for (var bts in bet_type.selections) {
        var bts_selection = bet_type.selections[bts]; // selection info
        var sel_id = bts_selection['bts_id'];
        
        // for each sel, we need to populate the SOVs available
        for (var i = sov_from;i<=sov_to;i += sov_inc) {
            
            var def_sov = round_decimals(i,2); //sov value, to 2 decimal places
           
            var sel_index = 'sov_'+sel_id+'_'+get_sov_index(def_sov,true); // FE index used
            
            var show_hide_sov = 'sov_hide'; // part of css to show/hide main line and other sovs
            var selected_dd = ''; // dropdown var used to set selected value/SOV
            
            // selected/default SOV
            if (selected_sov == def_sov) {
                show_hide_sov = 'sov_show';
                selected_dd = 'selected="selected"';
            }
            
            // make sure we have an odd for this selection/sov
            if (typeof event_selections[sel_index] != 'undefined') {
                
                // setup sov as processed
                if (typeof sov_opts_done[def_sov] == 'undefined') {
                    
                    var sov_index = event_params.event_id+'_'+bet_type.bt_id+'_'+get_sov_index(def_sov);   
                    
                    //Added case for Cat 2 (European handicap) JB 2/8/2022 - Ticket BS-431
                    if (bet_type.cat == '2'){
                        $eur_hc_sov = get_sov_index(def_sov,2,true).replace('(', '').replace(')', '');
                        sov_opts += '<option class="sov_opt" '+selected_dd+' data-sov="'+get_sov_index(def_sov)+'" data-index="'+sov_index+'">'+$eur_hc_sov+'</option>';
                    }
                    else{
                        sov_opts += '<option class="sov_opt" '+selected_dd+' data-sov="'+get_sov_index(def_sov)+'" data-index="'+sov_index+'">'+def_sov+'</option>';
                    }
                    sov_opts_done[def_sov] = 1;
                }
                
                var disp_sov = handle_bt_event_sov(def_sov,bet_type.cat);
                var odd_selected = false;
                if (typeof event_selections[sel_index] != 'undefined' && event_selections[sel_index].selected == "1") odd_selected = true;
                
                var add_sel_link = event_selections[sel_index].add_sel_link;
                
                var css_class = 'sov_odd '+show_hide_sov+' btev_'+event_params.event_id+'_'+bet_type.bt_id+' btev_sov_'+event_params.event_id+'_'+bet_type.bt_id+'_'+get_sov_index(def_sov);
                var odd_params = {'odd':event_selections[sel_index].odd,'bts_id':bts_selection.bts_id,'bt_id':bet_type.bt_id,'event_id':event_params.event_id,'sov':def_sov,'cat':bet_type.cat,'mc':1,'selected':odd_selected,'add_sel_link':add_sel_link,'css_class':css_class};
                
                
                odds_sov += generate_odd_td(odd_params);
                
            }
            // selection/SOV not available, we still create the HTML for it, however we set odds at 0
            else {
                
                var css_class = 'sov_odd '+show_hide_sov+' btev_'+event_params.event_id+'_'+bet_type.bt_id+' btev_sov_'+event_params.event_id+'_'+bet_type.bt_id+'_'+get_sov_index(def_sov);
                
                // !IMPORTANT!!!!!!! ODD = 0!
                var odd_params = {'odd':0,'bts_id':bts_selection.bts_id,'bt_id':bet_type.bt_id,'event_id':event_params.event_id,'sov':'','cat':bet_type.cat,'mc':1,'selected':false,'add_sel_link':false,'css_class':css_class};
                
                odds_sov += generate_odd_td(odd_params);
            }
        }
        
        // not the last selection, we add a spacer
        if (cc < sel_count) odds_sov += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
        cc++;
    }
    
    // in case no sovs are available, we need to override the HTML generated, and have only selections with no odds
    if (count(sov_opts_done) == 0) {
        sov_opts = '<option value="-1">--</option>';
        var ccd = 1; // counter
        odds_sov = ''; // reset HTML, as this needs tobe overridden
        
        // loop selectiosn again and create new HTML output
        for (var bts in bet_type.selections) {
            def_sov = -1;
            var sel_index = 'sov_'+sel_id+'_'+get_sov_index(def_sov);
            var bts_selection = bet_type.selections[bts];
            
            var css_class = 'sov_odd sov_show btev_'+event_params.event_id+'_'+bet_type.bt_id+' btev_sov_'+event_params.event_id+'_'+bet_type.bt_id+'_'+get_sov_index(def_sov);
            
            // !IMPORTANT!!!!!!! ODD = 0!
            var odd_params = {'odd':0,'bts_id':bts_selection.bts_id,'bt_id':bet_type.bt_id,'event_id':event_params.event_id,'sov':'','cat':bet_type.cat,'mc':1,'selected':false,'add_sel_link':false,'css_class':css_class};
            
            odds_sov += generate_odd_td(odd_params);
            
            if (ccd < sel_count) odds_sov += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
            ccd++;
        }
    }
    
    // setup the dropdown HTML
    var sov_dd = '<select class="sov_opt_dd" onchange="change_sov_for_ev_in_list(\''+event_params.event_id+'\',\''+bet_type.bt_id+'\',$(\'option:selected\',this).attr(\'data-sov\'))">'+sov_opts+'</select>';
    
    return '<td>'+sov_dd+'</td>'+load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{})+odds_sov;
}
function generate_btcat3_odds_old(event_params,bet_type,event_selections) {
    var sov_td_set = false;
    var sov = ' ';
    var html = '';
    var odd = '-';
    
    var cc = 1;
    var sel_count = Object.keys(bet_type.selections).length;
    
    for (var bts_index in bet_type.selections) {
        
        var bts_selection = bet_type.selections[bts_index]; // current bet type selection info
        var bts_id = bts_selection.bts_id; // bts id
        var def_sov = round_decimals(bet_type.sov,2);
        bts_id = 'sov_'+bts_id+'_'+get_sov_index(def_sov);
        
        var add_sel_link = 'false';
        
        if (typeof event_selections[bts_id] != 'undefined') {
            var bt_sov = event_selections[bts_id];
            
                bt_sov['sov'] = round_decimals(bt_sov['sov'],2);
                //console.log('def sov',def_sov);
                //console.log('bt_sov',bt_sov);
                if (def_sov == bt_sov['sov']) {
                    //console.log('Display: ',bt_sov);
                    sov = handle_bt_event_sov(bt_sov['sov'],bet_type.cat);
                    odd = bt_sov['odd'];
                    add_sel_link = bt_sov.add_sel_link;
                }
            
        }
        // bet type sel not set, we setup the default values
        else {
            sov = 0;
            if (typeof event_selections[bts_id] != 'undefined' && event_selections[bts_id]['sov'] != 'undefined') handle_bt_event_sov(event_selections[bts_id]['sov'],bet_type.cat);
            else if (typeof bet_type.sov != 'undefined') sov = handle_bt_event_sov(bet_type.sov,bet_type.cat);
            odd = 0;
        }
        if (sov_td_set == false) {
            html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_sov',{'sov':sov});
            html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
            sov_td_set = true;
        }
        
        var odd_mc = 'na';
        if (typeof event_selections != 'undefined' && typeof event_selections[bts_id] != 'undefined' && typeof event_selections[bts_id].mc != 'undefined') odd_mc = event_selections[bts_id].mc;
        var odd_selected = false;
        if (typeof event_selections[bts_id] != 'undefined' && event_selections[bts_id].selected == "1") odd_selected = true;
        
        var odd_params = {'odd':odd,'bts_id':bts_selection.bts_id,'bt_id':bet_type.bt_id,'event_id':event_params.event_id,'sov':sov,'cat':bet_type.cat,'mc':odd_mc,'selected':odd_selected,'add_sel_link':add_sel_link};
        
        html += generate_odd_td(odd_params);
        
        // check if spacer between selections is required, based on selection count
        
        if (cc < sel_count) html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
        cc++;
    }
    
    return html;
}

function generate_odd_td(params) {
    
    var event_id = params.event_id;
    var odd = params.odd;
    var bt_id = params.bt_id;
    var bts_id = params.bts_id;
    var btd_id = 0;
    var sov = params.sov;
    var cat = params.cat;
    var mc = params.mc;
    var sel_name = params.sel_name;
    var selected = (typeof params.selected != 'undefined' && (params.selected == "1" || params.selected === true)) ? true : false;
    
    var css_class = '';
    var add_sel_link = '';
    var html = '';
    
    if (selected) css_class += ' selected';
    var odd_id =  'odd_'+event_id+'_'+bt_id+'_'+bts_id;
    if (odd <= bs_min_odd_val) {
        odd = '-';
        add_sel_link = false;
        css_class += ' disabled_odd';
    }
    else {
        add_sel_link = 'event_id='+event_id+'&bet_type_id='+bt_id+'&selection_id='+bts_id+'&sov='+sov+'&bt_cat='+cat;
    }
    
    if (typeof params.add_sel_link != 'undefined' && params.add_sel_link != false) add_sel_link = 'a='+params.add_sel_link;
    else {
        add_sel_link = false;
        odd = '-';
        css_class += ' disabled_odd';
    }
    
    odd = format_odd_value(odd);
    
    if (cat == "2" || cat == "3" || cat == "10" || cat == "11") {
        
        if (typeof sov == 'number') sov = round_decimals(sov,2);
        //Added the below, since the '+' in Handicap SOVs was resulting in the SOV not being considered a 'number', which was resulting in the selection odd not being highlighted (function slip_fin.js::mark_selections()
        else{
            if (cat == 10){
                replaceAll(sov.toString(),'\\+',''); 
                sov = round_decimals(sov,2);   
            }
        }
        
        odd_id += '_'+replaceAll(sov.toString(),'\\.','-');
    }
    if (cat === "5" && typeof params['btd_id'] != 'undefined') {
        odd_id+= '_'+params['btd_id'];
        btd_id = params['btd_id'];
    }
    if (cat == "7" && typeof params['btd_id'] != 'undefined') {
        odd_id += '_'+params['btd_id'];
        btd_id = params['btd_id'];
    }
    
    css_class += ' '+odd_id;
    
    css_class += ' mc_'+mc;
    
    if (typeof params.css_class != 'undefined') {
        css_class += ' '+params.css_class;
    }
    
    var ev_odds_params = {'odd':odd,'event_id':event_id,'selection_id':bts_id,'bt_id':bt_id,'btd_id':btd_id,'css_class':css_class,'sov':sov,'add_selection_link':add_sel_link, 'sel_name':sel_name};
    // append selection html for current event
    html += load_sb_tpl('sport_odds_league_event_bt_sel_odds',ev_odds_params);
    
    return html;
}

function generate_league_dynamic_events_html(league,params) {
    var events = league.events;
    var extra_html = '';
    var extra_html_sel = '';
    
    var cat7html = []; // array using cat7 bet type id as index, to segment data by bet type rather than by events
    
    for (e in events) {
        var event = events[e];
        
        var ev_name = get_event_name(event);
        
        var ev_stats = '';
        if (typeof event.has_stats != 'undefined' && event.has_stats && typeof event.br_id != 'undefined') {
            ev_stats = load_sb_tpl('sport_odds_league_event_icon_stats',{'stats_id':event.br_id});
        }
        var event_url = league.l_id+'-'+event.e_id;
        if (typeof event.url != 'undefined' && event.url != null && event.url != '') event_url = event.url;
        
        var ev_date = ev_time = ''; // date and time values
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        
        // params based on current event
        var ev_params = {
            'event_date'        : ev_date,
            'event_time'        : ev_time,
            'event_name'        : ev_name,
            'event_id'          : event.e_id,
            'league_id'         : league.l_id,
            'event_url'         : event_url,
            'bet_type_count'    : event.sel_count,
            'icons'             : ev_stats
        }
        //extra_html += build_dynamic_event_selections(event.selections,ev_params);
        
        for (var bt_index in league.bet_types) {
            var bet_type = league.bet_types[bt_index];
            
            if (typeof event.selections == 'object' && Object.keys(event.selections).length == 0) continue;
            if (typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == 1 && (sb_odds_display_dynamic_bt == true || bet_type.selected == 1)) {
                if (typeof bet_type.cat != 'undefined') { 
                    if(bet_type.cat == "4") {
                        extra_html += generate_league_dynamic_events_cat4_html(event,bet_type,ev_params);
                    }
                    else if(bet_type.cat == "5" || bet_type.cat == "71") {
                        extra_html += generate_league_dynamic_events_cat5_html(event,bet_type,ev_params);
                    }
                    else if(bet_type.cat == "6") {
                        if (sb_debug_odds) console.log("BT cat 6");
                        extra_html += generate_league_dynamic_events_cat6_html(event,bet_type,ev_params);
                    }
                    else if (bet_type.cat == "7") {
                        if (sb_debug_odds) console.log("BT cat 7: "+bet_type.bt_id);
                        if (typeof cat7html[bet_type.bt_id] == 'undefined') cat7html[bet_type.bt_id] = {'bt_info':bet_type,'events':[]};
                        event.ev_date = ev_date;
                        event.ev_time = ev_time;
                        event.name = ev_name;
                        event.l_id = league.l_id;
                        event.s_id = league.s_id;
                        cat7html[bet_type.bt_id]['events'].push(event);
                    }
                }
            }
            
        } // end league bet types loop
    }
    
    extra_html +=  generate_league_dynamic_events_cat7_html(cat7html);
    
    if (extra_html != '') extra_html = load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':extra_html,'css_class':'dyn_bt_ev_'+event.e_id});
    
    return extra_html;
}

function generate_league_dynamic_events_cat4_html(event,bet_type,ev_params) {
    
    var at_least_one_sel = false;
    var max_cols_per_row = 4;
    if (typeof sb_load_mobile != 'undefined' && sb_load_mobile == "1") {
        max_cols_per_row = 1;
    }
    if (typeof sb_one_odd != 'undefined' && sb_one_odd == "1") {
        max_cols_per_row = 2;
    }
    var bt_html = '';
    var tdw = 99;
    var title_colspan = ((max_cols_per_row * 2) + (max_cols_per_row - 1));
    if (max_cols_per_row == 1) title_colspan = 2;
    
    tdw = round_decimals(100/max_cols_per_row,3);
    if (isNaN(tdw)) tdw = '99%';
    else tdw += '%';
    
    var colcount = 0;
    
    for (var s in event.selections) {
        var sel = event.selections[s];
        var bts_id = sel.bts_id;
        var bt_id = sel.bt_id;
        var btd_id = sel.btd_id;
        
        // skip sels not related to this bet type
        if (bet_type.bt_id != bt_id) continue;
        
        var css_class = 'odd_'+event.e_id+'_'+bt_id+'_'+bts_id;
        if (typeof ev_params.hide_btd_id != 'undefined' && ev_params.hide_btd_id == "1")  css_class += '';
        else css_class += '_'+btd_id;
        if (sel['selected'] == "1") css_class += ' selected ';
        
        if (colcount == 0) {
            bt_html += '<tr class="odds_tr nohover">';
        }
        
        var add_sel_link = 'a='+sel.add_sel_link;
        bt_html += load_sb_tpl('sport_odds_antepost_event_sel',{'name':sel.name,'event_id':event.e_id,'selection_id':bts_id,'odd':sel.odd,'css_class':css_class,'sov':'','add_selection_link':add_sel_link,'td_width':tdw});
        
        colcount++;
        if (colcount >= max_cols_per_row) {
            bt_html += '</tr>';
            colcount = 0;
        }
        else bt_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
        at_least_one_sel = true;
        
    }
    
    if (!at_least_one_sel) return '';
    while (colcount < max_cols_per_row) {
        bt_html += '<td class="nodds" width="'+tdw+'"></td>'; // bts name
        bt_html += '<td class="nodds"></td>'; //bts odd
        // add spacer to all cells except last one
        if (colcount < (max_cols_per_row-1)) bt_html += '<td class="nodds"></td>'; //spacer
        colcount ++;
    }
    
    bt_html = load_sb_tpl('sport_odds_antepost_bt_title',{'colspan':title_colspan,'bet_type_name':bet_type.name})+bt_html;
    
    var params = $.extend(true,{},ev_params);
    params.bet_types_area = '<table class="antepost_odds_tbl odds_dynbt_cat4">'+bt_html+'</table>';//load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':bt_html,'css_class':'odds_tml_cat4'});
    var html = load_sb_tpl('sport_odds_league_event_dynbt_cotnainer',params);
    return html;
    
}
function generate_league_dynamic_events_cat4_html_old(event,bet_type,ev_params) {
    var cols_per_row = 1;
    var extra_html = '';
    var extra_html_sel = '';
    
    var col = 0; // col counter
    var scd = 0; // ??
    var show_heading = true;
    
    for (var bts_index in event.selections) {
        var event_sel = event.selections[bts_index];
        var bts_id = event_sel.bts_id;
        var bt_id = event_sel.bt_id;
        
        if (bet_type.bt_id == bt_id) {
            
            // show the heading for the event
            if (show_heading && col == 0) {
                var bt_params = $.extend(true,{},ev_params);
                bt_params.bet_type_name = bet_type.name;
                extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic_info',bt_params);//ev_sels;
                show_heading = false;
            }
            //
            var css_class = 'odd_'+event.e_id+'_'+bt_id+'_'+bts_id+'_'+event_sel.bet_type_dyn_id;
            if (event_sel['selected'] == "1") css_class += ' selected ';
            extra_html_sel += load_sb_tpl('sport_odds_league_event_row_dynamic_bts_odds',{'name':event_sel.name,'event_id':event.e_id,'selection_id':bts_id,'odd':format_odd_value(event_sel.odd),'css_class':css_class,'sov':'','add_selection_link':'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&selection_id='+bts_id+'&sov=&bt_cat='+bet_type.cat+'&btd_id='+event_sel.bet_type_dyn_id});
            col++;
            if (col == cols_per_row) {
                extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic',{'event_selections':extra_html_sel});//ev_sels;
                extra_html_sel = '';
                col = 0;
            }
            scd++;
        } // league bet type is same as event bet type
    
    } // end loop event selections
    // if cols not completed, add a new row
    if (col > 0 && col < cols_per_row) {
        // append new row
        extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic',{'event_selections':extra_html_sel});//ev_sels;
        extra_html_sel = '';
        col = 0;
    }
    if (scd > 0) {
        show_heading = true;
        extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic_end',{});
    }
    
    if (sb_debug_odds) console.log(show_head,scd,i,sc,bet_type);
    scd = 0;
    extra_html_sel = '';
        
    
    return extra_html;
}

function generate_league_dynamic_events_cat5_html(event,bet_type,ev_params) {
    var html = '';
    
    
    var bt_sels = '';
    for (var x in bet_type.selections) {
        bt_sels += load_sb_tpl('sport_odds_league_header_bt_sel',{'css_class':'','selection_info':'','selection_name':bet_type.selections[x].name});
        bt_sels += '<td class="bts_sp_l"></td>';
    }
    var has_dyn_bts = 0;
    for (var es in event.selections) {
        var evs = event.selections[es];
        if (bet_type.bt_id == evs.bt_id) has_dyn_bts++;
    }
    
    if (has_dyn_bts == 0) return '';
    
    var params = $.extend(true,{},ev_params);
    
    params.bet_type_name = bet_type.name;
    //params.colspan = Object.keys(bet_type.selections).length+1;
    params.colspan = (Object.keys(bet_type.selections).length*2)+1;
    params.bt_sels = bt_sels;
    html = load_sb_tpl('sport_odds_league_event_row_dynamic_info_cat5',params);
    
    var dyn_elems = [];
    for (var es in event.selections) {
        var esel = event.selections[es];
        if (bet_type.bt_id != esel.bt_id) continue;
        
        var css_class = '';
        if (typeof dyn_elems[esel.element_id1] == 'undefined') {
            dyn_elems[esel.element_id1] = {'name':esel.name,'sels':{}};
        }
        dyn_elems[esel.element_id1]['sels'][esel.bts_id] = esel;
    }
    
    for (var elem_id in dyn_elems) {
        var dyn_info = dyn_elems[elem_id];
        html += '<tr class="odds_tr"><td class="name odds_td odds_td_dyn">'+dyn_info.name+'</td>';
        for (var btid in bet_type.selections) {
            var bts_id = bet_type.selections[btid]['bts_id'];
            var sel_info = dyn_info['sels'][bts_id];
            
            //var sel_info = 
            var add_sel_link = false;
            var sel_info_odd = 0;
            var sel_info_dyn_id = 0;
            var css_class = '';
            var ev_sel_selected = 0;
            if (typeof sel_info != 'undefined') {
                if (typeof sel_info.add_sel_link != "undefined") add_sel_link = sel_info.add_sel_link;
                if (typeof sel_info.odd != "undefined") sel_info_odd = sel_info.odd;
                if (typeof sel_info.btd_id != "undefined") sel_info_dyn_id = sel_info.btd_id;
                if (typeof sel_info.selected != "undefined") ev_sel_selected = sel_info.selected;
            }
            
            console.log('sel_info',btid,bts_id,elem_id,sel_info_dyn_id);
            console.log(sel_info);
            
            
            css_class = 'odd_'+event.e_id+'_'+bet_type.bt_id+'_'+bts_id+'_'+sel_info_dyn_id;
            if (typeof sel_info != 'undefined' && sel_info['selected'] == "1") css_class += ' selected ';
            
            var ev_sel_info = {'event_id':event.e_id, 'cat':bet_type.cat, 'btd_id':sel_info_dyn_id, 'selected':ev_sel_selected, 'bt_id':bet_type.bt_id, 'bts_id':bts_id,'odd':sel_info_odd,'add_sel_link':add_sel_link,'css_class':css_class};
            
            //dyn_elem_html[esel.element_id1] += load_sb_tpl('sport_odds_league_event_bt_sel_odds',ev_sel_info);
            var odd_td = generate_odd_td(ev_sel_info);
            html += odd_td;
            html += '<td class="bts_sp_l"></td>';
        }
        html += '</tr>';
    }
    
    html += load_sb_tpl('sport_odds_league_event_row_dynamic_end_colspan',{'colspan':Object.keys(bet_type.selections).length+1});
    
    
    return html;
}

function generate_league_dynamic_bet_types_cat6(event,bet_type,ev_params) {
    // first check that this event has this particular bet type
    var has_dyn_bts = 0;
    for (var es in event.selections) {
        var evs = event.selections[es];
        if (bet_type.bt_id == evs.bt_id) has_dyn_bts++;
    }
    // bt not available for this event, return an empty string
    if (has_dyn_bts == 0) return '';
    
    var html = '';
    
    var lista_html = []; // holder for each list html tables
    for (var bts_index in event.selections) {
        var event_sel = event.selections[bts_index];
        var bts_id = event_sel.bts_id;
        var bt_id = event_sel.bt_id;
        
        // skip other bet types
        if (bet_type.bt_id != bt_id) continue;
        
        var list_id = 0;
        if (typeof event_sel.list_id != 'undefined' && event_sel.list_id != "") list_id = event_sel.list_id;
        
        var css_class = '';
        var td_id = 'odd_'+event.e_id+'_'+bt_id+'_'+bts_id+'_'+event_sel.bet_type_dyn_id;
        var add_sel_link = false;
        var sel_odd = '-';
        
        if (event_sel['selected'] == "1") css_class += ' selected ';
        // odd greater than allowed values, add selection allowed
        if (event_sel.odd > bs_min_odd_val) {
            // add sel link available
            if (typeof event_sel.add_sel_link != 'undefined' && event_sel.add_sel_link != false) {
                add_sel_link = 'a='+event_sel.add_sel_link;
                sel_odd = format_odd_value(event_sel.odd);
            }
        }
        // if add sel link is false, set odd as disabled
        if (!add_sel_link) {
            css_class += ' disabled_odd';
            sel_odd = '-';
        }
        
        css_class += td_id;
        
        var row_params = {'name':event_sel.name,'css_class':css_class,'add_selection_link':add_sel_link,'odd':sel_odd};
        if (typeof lista_html[list_id] == 'undefined') lista_html[list_id] = '';
        
        var tmp_html = load_sb_tpl('sport_odds_league_event_row_dynamic_bts_odds',row_params);
        lista_html[list_id] += '<tr class="odds_tr">'+tmp_html+'</tr>';
        
        //sport_odds_league_event_row_dynamic_bts_odds / no tr
        //sport_odds_league_event_dynamic_html
        //sport_odds_antepost_bt_title
    }
    
    var tbl_html = '';
    var list_count = 0;
    for (var list_id in lista_html) {
        if (list_count > 0) tbl_html += load_sb_tpl('sport_odds_league_header_bt_spacer',{});
        tbl_html += '<td valign="top" class="btcat6_list btcat6_list_'+list_id+'">';
        var ttl_html = load_sb_tpl('sport_odds_antepost_bt_title',{'colspan':2,'bet_type_name':'Lista '+list_id});
        tbl_html += html = load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':ttl_html+'<tr>'+lista_html[list_id]+'</tr>'});
        //tbl_html += lista_html[list_id];
        tbl_html += '</td>';
        list_count++;
    }
    
    console.log(tbl_html);
    
    return tbl_html;
}
function generate_league_dynamic_events_cat6_html(event,bet_type,ev_params) {
    
    console.log('generate_league_dynamic_events_cat6_html');
    
    //return tbl_html;
    var tbl_html = generate_league_dynamic_bet_types_cat6(event,bet_type,ev_params);
    if (tbl_html == '') return '';
    
    var params = $.extend(true,{},ev_params);
    params.bet_types_area = '<table class="sport_odds_league_event_dynbt_cotnainer"><tr>'+tbl_html+'</tr></table>';
    var html = load_sb_tpl('sport_odds_league_event_dynbt_cotnainer',params);
    
    return html;
}
function generate_league_dynamic_events_cat6_html_old(event,bet_type,ev_params) {
    var extra_html = '';
    var extra_html_sel = '';
    
    var col = 0; // col counter
    var scd = 0; // ??
    var show_heading = true;
    
    var has_dyn_bts = 0;
    for (var es in event.selections) {
        var evs = event.selections[es];
        if (bet_type.bt_id == evs.bt_id) has_dyn_bts++;
    }
    
    if (has_dyn_bts == 0) return '';
    
    var lista_html = [];
    
    for (var bts_index in event.selections) {
        var event_sel = event.selections[bts_index];
        var list_id = 0;
        if (typeof event_sel.list_id != 'undefined' && event_sel.list_id != "") list_id = event_sel.list_id;
        
        var bts_id = event_sel.bts_id;
        var bt_id = event_sel.bt_id;
        
        if (bet_type.bt_id == bt_id) {
            
            //
            var css_class = 'odd_'+event.e_id+'_'+bt_id+'_'+bts_id+'_'+event_sel.bet_type_dyn_id;
            var add_sel_link = false;
            var sel_odd = '-';
            if (event_sel['selected'] == "1") css_class += ' selected ';
            // add selection allowed
            if (event_sel.odd > bs_min_odd_val) {
                if (typeof event_sel.add_sel_link != 'undefined' && event_sel.add_sel_link != false) {
                    add_sel_link = 'a='+event_sel.add_sel_link;
                    sel_odd = format_odd_value(event_sel.odd);
                }
            }
            if (!add_sel_link) {
                css_class += ' disabled_odd';
            }
            
            //'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&selection_id='+bts_id+'&sov=&bt_cat='+bet_type.cat+'&btd_id='+event_sel.bet_type_dyn_id
            
            
            extra_html_sel += load_sb_tpl('sport_odds_league_event_row_dynamic_bts_odds',{'name':event_sel.name,'event_id':event.e_id,'selection_id':bts_id,'odd':sel_odd,'css_class':css_class,'sov':'','add_selection_link':add_sel_link});
            
            col++;
            if (col == 1) {
                if (typeof lista_html[event_sel.aams_lista] == 'undefined') lista_html[event_sel.aams_lista] = '';
                lista_html[event_sel.aams_lista] += load_sb_tpl('sport_odds_league_event_row_dynamic',{'event_selections':extra_html_sel});//ev_sels;
                extra_html_sel = '';
                col = 0;
            }
            scd++;
        } // league bet type is same as event bet type
    
    } // end loop event selections
    // if cols not completed, add a new row
    /*if (col > 0 && col < 4) {
        // append new row
        extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic',{'event_selections':extra_html_sel});//ev_sels;
        extra_html_sel = '';
        col = 0;
    }
    if (scd > 0) {
        show_heading = true;
        extra_html += load_sb_tpl('sport_odds_league_event_row_dynamic_end',{});
    }
    */
    if (sb_debug_odds) console.log(show_head,scd,i,sc,bet_type);
    scd = 0;
    extra_html_sel = '';
    var divw = 100;
    divw = divw/Object.keys(lista_html).length;
    
    var bt_params = $.extend(true,{},ev_params);
    bt_params.colspan = Object.keys(lista_html).length;
    bt_params.bet_type_name = bet_type.name;
    colspan_minus = Object.keys(lista_html).length - 1;
    bt_params.bt_sels = '<td colspan="'+colspan_minus+'"></td>';
    extra_html += '<tr>'+load_sb_tpl('sport_odds_league_event_row_dynamic_info_cat5',bt_params)+'</tr>';
    extra_html += '<tr>';
    
    for (var lid in lista_html)  {
        var lista = lista_html[lid];
        extra_html += '<td style="width:'+divw+'%;vertical-align:top;"><table style="padding: 5px;"><tr class="dyn_tbl_tr"><td colspan="2"><div class="dyn_bt_name">Lista '+lid+'</div></td></tr>' + lista + '</table></td>';
    }
    //extra_html+= '<div class="clear"></div>';
    
    extra_html += '</tr>';
    
    return extra_html;
}

// this function requires cat 7 bet types grouped by bet type id
// each event in the list needs to be part of the same league, and each bet type should have it's own event list
// returns full table html to be appended to the extra league space (for dynamic bet types)
function generate_league_dynamic_events_cat7_html(evbt_list) {
    
    var html = ''; // full output
    
    // loop all bet types in list
    for (var btid in evbt_list) {
        var bt = evbt_list[btid];
        // create the heading part of the bet types
        var colspan = 2 + count(bt['bt_info']['selections']);
        var bt_header = ''; // heaind part of the bet type
        var bt_html = ''; // html for all events within the bet type
        var btsii = 0;
        for (var bts_index in bt['bt_info']['selections']) {
            var bts = bt['bt_info']['selections'][bts_index];
            
            if (btsii > 0) {
                bt_header += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
            }
            btsii++;
            
            bt_header += load_sb_tpl('sport_odds_league_header_bt_sel',{'css_class':'','selection_info':bts.name,'selection_name':bts.name});
        }
        bt_header = load_sb_tpl('sport_odds_league_event_row_dynamic_info_cat7',{'colspan':2,'bet_type_name':bt['bt_info']['name'],'bt_sels':bt_header});
        
        // loop all events for this bet types
        for (var e in bt['events']) {
            var event = bt['events'][e];
            // setup <tr> with event info, additional details will be appended to same string
            var ev_html_params = {'event_date':event.ev_date,'event_time':event.ev_time,'event_url':'','league_id':event.l_id,'event_id':event.e_id,'event_name':event.name,'icons':'','bet_type_count':event.sel_count};
            var tmp = load_sb_tpl('sport_odds_league_event_info',ev_html_params);
            
            
            var btsi = 0;
            // next we loop all selections within the bet type
            for (var bts_index in bt['bt_info']['selections']) {
                var bts = bt['bt_info']['selections'][bts_index];
                // and we find the selection relevant to this event
                for (var es in event['selections']) {
                    var evsels = event['selections'][es];
                    // if not same selection id, skip
                    if (evsels['bts_id'] != bts['bts_id']) continue;
                    
                    if (btsi > 0) {
                        tmp += load_sb_tpl('sport_odds_league_event_bt_sel_odds_spacer',{});
                    }
                    btsi++;
                    
                    //evsels['odd'] = format_odd_value(evsels['odd']);
                    
                    // append selections odds for each event row
                    tmp += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'event_id':event.e_id,'selection_id':bts['bts_id'],'css_class':'','add_selection_link':'a='+evsels['add_sel_link'],'odd':evsels['odd'],'bt_id':bt['bt_info']['bt_id'],'btd_id':evsels['btd_id']});
                }
            }
            // generate the <tr> part for the event
            bt_html += load_sb_tpl('sport_odds_league_event_row_dynamic',{'event_selections':tmp});//'<tr>'+tmp+'</tr>';
            
        }
        // for each bet type prepend the heading to the html output and generate the table html
        var bttmp = bt_header+bt_html;
        html += load_sb_tpl('sport_odds_league_event_dynamic_html',{'css_class':'dyn_bt_'+bt['bt_info']['bt_id'],'html':bttmp});
    }
    
    return html;
}

function show_event_hr(hr) {
    
    display_contents(load_sb_tpl('sport_odds_search_results_hr_loader',{'search':hr}));
    
    var ajax_url = sb_ajax_url +'?action=search&search_by_hr='+hr+'&json=1';
    $.ajax({
        url: ajax_url,
        success: function(output) {
            build_the_search_ajax(hr,output,true);
        }
    });
}

// other ajax requests
function search_events(search_str) {
    if (typeof params != 'object') params = {};
    
    search_str = $.trim(search_str);
    sports_loc = 3;
    open_leagues = [];
    
    if (allow_hash_change) set_page_hash();
    
    if (search_str.length < 3) {
        display_contents(load_sb_tpl('sport_odds_short_search',{}));
        load_page_width('full');
        return;
    }
    
    var ajax_url = sb_ajax_url +'?action=search&search='+search_str+'&json=1';
    
    display_contents(load_sb_tpl('sport_odds_search_results_loader',{'search':search_str}));
    
    //var stateObj = { state : '' , rand : Math.random() };
    //history.pushState(stateObj, '', '#search/'+search_str);
    set_page_hash();
    
    $.ajax({
        url: ajax_url,
        success: function(output) {
            build_the_search_ajax(search_str,output);
        }
    });
    
    //display_contents('search for: '+search_str);
    //$.ajax
}

function create_most_played_stats_home(stats_data,div_id) {
    var selections_html = html = '';
    var big_sel = -1;
    var mid_sel = -1;
    var tmp_sels = Object.create(stats_data.selections);
    
    var order = tmp_sels.sort(function(a,b) {return a.perc - b.perc});
    
    var bts_s = order[0]['bts_id'];
    var bts_m = order[1]['bts_id'];
    var bts_b = order[2]['bts_id'];
    
    for (var i in stats_data.selections) {
        
        var selection = stats_data.selections[i];
        var sel_params = {};
        var odd_gen_params = {'event_id':stats_data.e_id,'bt_id':selection.bt_id,'bts_id':selection.bts_id,'sov':selection.sov,'cat':selection.cat,'mc':selection.mc,'selected':selection.selected,'add_sel_link':selection.add_sel_link,'odd':selection.odd};
        
        var add_sel_link = generate_odd_td(odd_gen_params);//'event_id='+stats_data.e_id+'&bet_type_id='+selection.bt_id+'&selection_id='+selection.bts_id+'&sov='+selection.sov+'&bt_cat='+selection.cat;
        var odd_html = add_sel_link;//load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':selection.odd,'event_id':stats_data.e_id,'selection_id':selection.bts_id,'css_class':'odd_'+stats_data.e_id+"_"+selection.bt_id+"_"+selection.bts_id});
        sel_params.selection_name = selection.name;
        sel_params.selection_odd = odd_html;
        sel_params.perc = selection.perc;
        var css_class = 'loop_'+i;
        if (bts_s == selection.bts_id) css_class += " prc_min";
        if (bts_m == selection.bts_id) css_class += " prc_mid";
        if (bts_b == selection.bts_id) css_class += " prc_max";
        sel_params.css_class = css_class;
        selections_html += load_sb_tpl('sport_odds_featured_event_stats_bt_odd',sel_params);
    }
    
    stats_data.odds_stats = selections_html;
    stats_data.link_text = stats_data.link_text;
    
    html = load_sb_tpl('sport_odds_featured_event_stats_html',stats_data);
    $(div_id).html(html);
}

function create_event_results_home(widget_id,results_data_raw) {
    
    results_data = get_valid_json(results_data_raw);
    if (results_data == false) return false;
    
    console.log('Parsing results for widget_id:',widget_id,results_data);
    
    var html = '';
    for (var i in results_data['events']) {
        var event = results_data['events'][i];
        
        var sel_ttl = sel_odd = '';
        for (var s in event.selections) {
            var selection = event.selections[s];
            var add_sel_link = '0';
            
            sel_ttl += load_sb_tpl('sport_odds_event_result_bts_sel_name',{'selection_name':selection.name,'css_class':''});
            sel_odd += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(selection.odd),'event_id':results_data.e_id,'selection_id':selection.bts_id,'css_class':selection.css_class});
        }
        var ev_res = load_sb_tpl('sport_odds_event_result_bts_html',{'selection_names':sel_ttl,'selection_odds':sel_odd});
        event.bet_type_result = ev_res;
        
        var ev_date = ev_time = ''; // date and time values
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        event.date = ev_date;
        event.time = ev_time;
        html += load_sb_tpl('sport_odds_event_result_html',event);
        
    }
    
    var max_ev = $("#"+widget_id).attr("data-cycle-max");
    var full_html = load_sb_tpl('sport_odds_event_results_widget_html',{'section_name':results_data.section_name,'results':html,'cycle_fx':'carousel','cycle_visible':max_ev});
    
    $("#"+widget_id).html(full_html);
    $('#'+widget_id+' .sb_results_home_side.cycle-slideshow').cycle();
    
    /*
    $(".sports_event_results").each(function() {
        
        var max_ev = $(this).attr("data-cycle-max");
        var full_html = load_sb_tpl('sport_odds_event_results_widget_html',{'section_name':results_data.section_name,'results':html,'cycle_fx':'carousel','cycle_visible':max_ev});
        $(this).html(full_html);
        $('.sb_results_home_side.cycle-slideshow',this).cycle();
    });*/
    
    
    //$(".sports_event_results").html(full_html);
    //$('.sb_results_home_side.cycle-slideshow').cycle();
}
function create_event_results_home_old(results_data) {
    var html = '';
    for (var i in results_data['events']) {
        var event = results_data['events'][i];
        
        var sel_ttl = sel_odd = '';
        for (var s in event.selections) {
            var selection = event.selections[s];
            var add_sel_link = '0';
            
            sel_ttl += load_sb_tpl('sport_odds_event_result_bts_sel_name',{'selection_name':selection.name,'css_class':''});
            sel_odd += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(selection.odd),'event_id':results_data.e_id,'selection_id':selection.bts_id,'css_class':selection.css_class});
        }
        var ev_res = load_sb_tpl('sport_odds_event_result_bts_html',{'selection_names':sel_ttl,'selection_odds':sel_odd});
        event.bet_type_result = ev_res;
        
        var ev_date = ev_time = ''; // date and time values
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        event.date = ev_date;
        event.time = ev_time;
        html += load_sb_tpl('sport_odds_event_result_html',event);
        
    }
    var full_html = load_sb_tpl('sport_odds_event_results_group_html',{'section_name':results_data.section_name,'results':html});
    $(".sports_event_results").html(full_html);
    $('.sb_results_home_side.cycle-slideshow').cycle();
}

function create_market_movers_home(movers_data) {
    
}
function open_fav_leagues() {
    display_contents("Work in progress");
    load_page_width('full',false);
}

function toggle_league_visibility(event,lid) {
    event.preventDefault();
    event.stopPropagation();
    if ($("#sleague_"+lid).hasClass("closed")) {
        open_league_visibility(event,lid);
    }
    else {
        $("#sleague_"+lid+" .league_data").slideUp(200).addClass("closed");
        $("#sleague_"+lid).addClass("closed");
    }
    return false;
}
function open_league_visibility(event,lid) {
    event.preventDefault();
    event.stopPropagation();
    if ($("#sleague_"+lid).hasClass("closed")) {
        $("#sleague_"+lid+" .league_data").slideDown(200).removeClass("closed");
        $("#sleague_"+lid).removeClass("closed");
    }
    return false;
}