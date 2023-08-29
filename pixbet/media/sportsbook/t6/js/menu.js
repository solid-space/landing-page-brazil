// main menu js file
// the file is used to build the html for the current sports template
// ajax requests to retrieve data are set in the base.js file
// the function 'build_the_menu' is required, as this is called on completion of the menu ajax calls
// the object 'sb_menu_data' is created on success of the ajax and consists of 2 objects:
// - sb_menu_data.sports = list of sports and associations
// - sb_menu_data.leagues = list of leagues

var sb_sports_filters = '';

// ajax onsuccess callback function
function build_the_menu_ajax(output) { 
    sb_menu_data = get_valid_json(output);
    build_the_menu();
}

// populate the sports menu with sports, associations and leagues
function build_the_menu() {         
    var html = ''; // final output html
    
    var sports_html = ''; // html output related to sports 
    var assoc_html = ''; // html output related to associations (per sport)
    
    // the object is not set, we display an error
    if (typeof sb_menu_data != 'object') {
        // get the error template and append the generic error message
        var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_generic_error});
        $("#sports_menu .the_menu ul.tm_s").html(html);
        return false;
    }
    else if (typeof sb_menu_data.sports == 'undefined') {
        if (typeof sb_menu_data.errors != 'undefined') {
            var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_menu_data.errors});
            $("#sports_menu .the_menu ul.tm_s").html(html);
            return false;
        }
        else {
            var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_generic_error});
            $("#sports_menu .the_menu ul.tm_s").html(html);
            return false;
        }
    }
    
    // loop all sports
    for (var sport_index in sb_menu_data.sports) {
        // sport info
        var sport = sb_menu_data.sports[sport_index];
        var sport_name = sport['name'];
        var sport_id = sport['s_id'];
        var sport_assoc = sport['league_groups'];
        
        // setup the params for loading a template
        var sport_params = {'sport_id':sport_id,'sport_name':sport_name,'sport_link':'#sport/'+sport_id,'sport_assoc':'{sport_assoc_'+sport_id+'}','css_class':'closed'};
        // check if menu item should be opened
        if (typeof sport['open'] != 'undefined' && (sport['open'] == "1" || sport['open'] == 1)) sport_params.css_class = '';
        // load the html for the current sport element
        sports_html += load_sb_tpl('sports_menu_sport_item',sport_params);
        
        var assoc_html = ''; // setup a new list of assoc for th current sport
        if (sb_debug_menu) {
            console.log('sport_assoc');
            console.log(sport_assoc);
        }
        var assoc_processed = 0;
        for (var assoc_index in sport_assoc) {
            // association info
            var assoc = sport_assoc[assoc_index];
            var assoc_name = assoc['name'];
            var assoc_id = assoc['lg_id'];
            
            var assoc_flag = '_na';
            if (typeof assoc['assoc_special'] != 'undefined') assoc_flag = assoc['assoc_special'];
            else if (typeof assoc['assoc_priority'] != 'undefined') assoc_flag = assoc['assoc_priority'];
            
            // setup the assoc params
            var assoc_params = {'assoc_id':assoc_id,'assoc_name':assoc_name,'assoc_link':'#association/'+assoc_id,'assoc_leagues':'{assoc_leagues_'+assoc_id+'}','css_class':'closed'};
            // check if assoc should be displayed as open
            if (typeof assoc['open'] != 'undefined' && (assoc['open'] == "1" || assoc['open'] == 1)) assoc_params.css_class = '';
            
            if (typeof sb_menu_data['sort_type'] != 'undefined' && sb_menu_data['sort_type'] == 'assoc') assoc_params.css_class += ' assoc_p_'+assoc_flag;
            
            // load the html for the current assoc and append to assoc html string
            assoc_html += load_sb_tpl('sports_menu_assoc_item',assoc_params);
            
            assoc_processed++;
        }
        // the current sport has associations available
        if (assoc_html != '') {
            // load the opening and closing tags for the assoc html snippet
            assoc_html = load_sb_tpl('sports_menu_sport_start',{'sport_id':sport_id,'css_class':sport_params.css_class}) + assoc_html + load_sb_tpl('sports_menu_sport_end',{});
            
            // replace the sports assoc area with the updated assoc html code
            sports_html = replaceAll(sports_html,'{sport_assoc_'+sport_id+'}',assoc_html+'{sport_assoc_'+sport_id+'}');
            //console.log(assoc_html);
            //sports_html += ;
        }
        // append the sports html to the html list
        html += sports_html;
        sports_html = '';
        
    }
    
    // combine the leagues with associations and sports
    html = generate_assoc_leagues_html(html);
    
    build_the_menu_filter_management()
    
    html += build_the_menu_antepost();
    
    var body_is_wide = $("body").hasClass("wide");
    handle_menu_position(body_is_wide); 
    
    // update the menu html
    if (typeof sb_sports_menu_div != 'undefined' && sb_sports_menu_div != '' && $(sb_sports_menu_div).length >= 1) { 
        $(sb_sports_menu_div).html(html);
    }             
        
    $("#sports_menu .the_menu ul.tm_s").html(html);  
    
}

function build_the_menu_filter_management() {
    if (typeof sb_menu_data.filters != 'undefined' && typeof sb_menu_data.filters.day != 'undefined') {
        $(".menu_date_filter .dt_t").removeClass("selected");
        $(".menu_date_filter .dt_tt").removeClass("selected");
        $(".menu_date_filter .dt_h_icon").removeClass("selected").removeClass("noicon").html("");
        $(".menu_date_filter .dt_t.dt_d"+sb_menu_data.filters.day).addClass("selected");
    }
    else if (typeof sb_menu_data.filters != 'undefined' && typeof sb_menu_data.filters.hour != 'undefined') {
        $(".menu_date_filter .dt_t").removeClass("selected");
        $(".menu_date_filter .dt_tt").removeClass("selected");
        $(".menu_date_filter .dt_h_icon").addClass("selected");
        $(".menu_date_filter .dt_tt.dt_tt_"+sb_menu_data.filters.hour).addClass("selected");
    }
    else {
        $(".menu_date_filter .dt_t").removeClass("selected");
        $(".menu_date_filter .dt_tt").removeClass("selected");
        $(".menu_date_filter .dt_h_icon").removeClass("selected").removeClass("noicon").html("");
        $(".menu_date_filter .dt_t.dt_d_all").addClass("selected");
    }
    
    if (typeof sb_menu_data.filter_errors == 'undefined') {
        $("#sports_menu .menu_filter_errors .filter_errors").remove();
    }
    else {
        $("#sports_menu .menu_filter_errors .filter_errors").remove();
        $("#sports_menu .menu_filter_errors").prepend('<div class="filter_errors">'+load_sb_tpl("sport_odds_league_event_noevents",{})+'</div>');
        
        sb_sports_filters = '';
    }
}

function build_the_menu_antepost() {
    
    if (typeof display_antepost != 'undefined' && display_antepost == '0') {
        return '';
    }
    
    var html = ''; // final output html
    
    var sports_html = ''; // html output related to sports 
    var assoc_html = ''; // html output related to associations (per sport)
    
    // the object is not set, we display an error
    if (typeof sb_menu_data.sports_antepost == 'undefined') {
        return '';
    }
    
    // #TODO: create template 
    html = load_sb_tpl('sports_menu_sport_item_antepost_title',{});
    
    // loop all sports
    for (var sport_index in sb_menu_data.sports_antepost) {
        // sport info
        var sport = sb_menu_data.sports_antepost[sport_index];
        var sport_name = sport['name'];
        var sport_id = 'ap_'+sport['s_id'];
        var sport_assoc = sport['league_groups'];
        
        // setup the params for loading a template
        var sport_params = {'sport_id':sport_id,'sport_name':sport_name,'sport_link':'#sport/'+sport_id,'sport_assoc':'{sport_assoc_'+sport_id+'}','css_class':'closed antepost_sport'};
        // check if menu item should be opened
        if (typeof sport['open'] != 'undefined' && (sport['open'] == "1" || sport['open'] == 1)) sport_params.css_class = '';
        // load the html for the current sport element
        sports_html += load_sb_tpl('sports_menu_sport_item',sport_params);
        
        var assoc_html = ''; // setup a new list of assoc for th current sport
        if (sb_debug_menu) {
            console.log('sport_assoc');
            console.log(sport_assoc);
        }
        var assoc_processed = 0;
        for (var assoc_index in sport_assoc) {
            // association info
            var assoc = sport_assoc[assoc_index];
            var assoc_name = assoc['name'];
            var assoc_id = 'ap_'+assoc['lg_id'];
            // setup the assoc params
            var assoc_params = {'assoc_id':assoc_id,'assoc_name':assoc_name,'assoc_link':'#association/'+assoc_id,'assoc_leagues':'{assoc_leagues_'+assoc_id+'}','css_class':'closed'};
            // check if assoc should be displayed as open
            if (typeof assoc['open'] != 'undefined' && (assoc['open'] == "1" || assoc['open'] == 1)) assoc_params.css_class = '';
            // load the html for the current assoc and append to assoc html string
            assoc_html += load_sb_tpl('sports_menu_assoc_item',assoc_params);
            
            assoc_processed++;
        }
        // the current sport has associations available
        if (assoc_html != '') {
            // load the opening and closing tags for the assoc html snippet
            assoc_html = load_sb_tpl('sports_menu_sport_start',{'sport_id':sport_id,'css_class':sport_params.css_class}) + assoc_html + load_sb_tpl('sports_menu_sport_end',{});
            
            // replace the sports assoc area with the updated assoc html code
            sports_html = replaceAll(sports_html,'{sport_assoc_'+sport_id+'}',assoc_html+'{sport_assoc_'+sport_id+'}');
            //console.log(assoc_html);
            //sports_html += ;
        }
        // append the sports html to the html list
        html += sports_html;
        sports_html = '';
        
    }
    
    // combine the leagues with associations and sports
    html = generate_assoc_leagues_html_antepost(html);
    
    return html;
}

// populate leages in the sports and association available area
function generate_assoc_leagues_html(full_html) {
    var sport_html = []; // html per sport, using sport id as assoc index
    var assoc_html = []; // html per association, using assoc id as assoc index
    var sport_league_count = [];
    var assoc_league_count = [];
    
    var has_filters = false;
    if (typeof sb_menu_data.filters != 'undefined') {
        has_filters = true;
        var filter_out = '';
        if (typeof sb_menu_data.filters.day != 'undefined') {
            filter_out = 'filters[day]='+sb_menu_data.filters.day;
        }
        else if (typeof sb_menu_data.filters.hour != 'undefined') {
            filter_out = 'filters[hour]='+sb_menu_data.filters.hour;
        }
        sb_sports_filters = filter_out;
    }
    else {
        sb_sports_filters = '';
    }
    
    // loop all leagues available
    for (var league_index in sb_menu_data.leagues) {
        // league info
        var league = sb_menu_data.leagues[league_index];
        var league_name = league['league_name'];
        var league_id = league['l_id'];
        var sport_id = league['s_id'];
        var assoc_ids = (typeof league['lg_id'] == 'undefined' || league['lg_id'] == '') ? 0 : league['lg_id'];
        
        if (typeof sport_league_count[league.s_id] == 'undefined') sport_league_count[league.s_id] = 0;
        sport_league_count[league.s_id] += parseInt(league.evcount);
        
        av_leagues[league_id] = league['url'];
        
        // load the league html
        var css_class_li = 'league_item_li';
        if ($("#sports_odds #sleague_"+league_id).length) css_class_li += ' open';
        
        var lhtml = load_sb_tpl('sports_menu_league_item',{'league_id':league_id,'league_name':league_name,'league_link':'#league/'+league_id+'-'+league['url'],'league_css_class':'league_item','css_class':css_class_li,'league_url':league['url']});
        
        if (typeof sport_html[sport_id] == 'undefined') sport_html[sport_id] = '';
        
        // check if league is not linked to an association
        if (assoc_ids == 0 || assoc_ids == '' || assoc_ids == '-1' || assoc_ids == 'undefined' || assoc_ids.length == 0) {
            // set the leagues directly under th sport array
            sport_html[sport_id] += lhtml;
        }
        // league has 1 or more associations
        else {
            // loop the associations array
            for (var asin in assoc_ids) {
                // get association id
                var assoc_id = assoc_ids[asin];
                
                // set the leagues directly under the association array
                if (typeof assoc_html[assoc_id] == 'undefined') assoc_html[assoc_id] = '';
                assoc_html[assoc_id] += lhtml;
                
                if (typeof assoc_league_count[assoc_id] == 'undefined') assoc_league_count[assoc_id] = 0;
                assoc_league_count[assoc_id]+= parseInt(league.evcount);
            }
        
        
        }
    }
    
    // loop the sports html array
    for (var sid in sport_html) {
        // load the opening and closing tags
        if (sport_html[sid] != '') sport_html[sid] = load_sb_tpl('sports_menu_sport_start',{'sport_id':sid,'css_class':''}) + sport_html[sid] + load_sb_tpl('sports_menu_sport_end',{});
        // update the leagues html with the sport placeholder
        full_html = replaceAll(full_html,'{sport_assoc_'+sid+'}',sport_html[sid]);
        full_html = replaceAll(full_html,'{scount_'+sid+'}',sport_league_count[sid]);
    }
    // loop the assoc html array
    for (var aid in assoc_html) {
        // load the opening and closing tags
        if (assoc_html[aid] != '') assoc_html[aid] = load_sb_tpl('sports_menu_assoc_start',{'assoc_id':aid,'css_class':''}) + assoc_html[aid] + load_sb_tpl('sports_menu_assoc_end',{});
        // update the leagues html with the association placeholder
        full_html = replaceAll(full_html,'{assoc_leagues_'+aid+'}',assoc_html[aid]);
        full_html = replaceAll(full_html,'{acount_'+aid+'}',assoc_league_count[aid]);
    }
    //return the full html output
    return full_html;
}

function generate_assoc_leagues_html_antepost2(full_html) {
    var sport_html = []; // html per sport, using sport id as assoc index
    var assoc_html = []; // html per association, using assoc id as assoc index
    var sport_league_count = [];
    var assoc_league_count = [];
    
    var has_filters = false;
    if (typeof sb_menu_data.filters != 'undefined') {
        has_filters = true;
        var filter_out = '';
        if (typeof sb_menu_data.filters.day != 'undefined') {
            filter_out = 'filters[day]='+sb_menu_data.filters.day;
        }
        else if (typeof sb_menu_data.filters.hour != 'undefined') {
            filter_out = 'filters[hour]='+sb_menu_data.filters.hour;
        }
        sb_sports_filters = filter_out;
    }
    else {
        sb_sports_filters = '';
    }
    
    // loop all leagues available
    for (var league_index in sb_menu_data.leagues_events) {
        // league info
        var league = sb_menu_data.leagues_events[league_index];
        var league_name = league['league_name'];
        var league_id = 'ap_'+league['l_id'];
        var sport_id = 'ap_'+league['s_id'];
        var assoc_ids = (typeof league['lg_id'] == 'undefined' || league['lg_id'] == '') ? 0 : league['lg_id'];
        
        if (typeof sport_league_count[sport_id] == 'undefined') sport_league_count[sport_id] = 0;
        sport_league_count[sport_id] += parseInt(league.evcount);
        
        av_leagues[league_id] = league['url'];
        
        // load the league html
        var css_class_li = 'league_item_li';
        if ($("#sports_odds #sleague_"+league_id).length) css_class_li += ' open';
        
        var lhtml = load_sb_tpl('sports_menu_league_item_antepost',{'league_id':league['l_id'],'league_name':league_name,'league_link':'#league/ap/'+league['l_id']+'-'+league['url'],'league_css_class':'league_item','css_class':css_class_li,'league_url':league['url']});
        
        if (typeof sport_html[sport_id] == 'undefined') sport_html[sport_id] = '';
        
        // check if league is not linked to an association
        if (assoc_ids == 0 || assoc_ids == '' || assoc_ids == '-1' || assoc_ids == 'undefined' || assoc_ids.length == 0) {
            // set the leagues directly under th sport array
            sport_html[sport_id] += lhtml;
        }
        // league has 1 or more associations
        else {
            // loop the associations array
            for (var asin in assoc_ids) {
                // get association id
                var assoc_id = assoc_ids[asin];
                
                // set the leagues directly under the association array
                if (typeof assoc_html[assoc_id] == 'undefined') assoc_html[assoc_id] = '';
                assoc_html[assoc_id] += lhtml;
                
                if (typeof assoc_league_count[assoc_id] == 'undefined') assoc_league_count[assoc_id] = 0;
                assoc_league_count[assoc_id]+= parseInt(league.evcount);
            }
        
        
        }
    }
    
    // loop the sports html array
    for (var sid in sport_html) {
        // load the opening and closing tags
        if (sport_html[sid] != '') sport_html[sid] = load_sb_tpl('sports_menu_sport_start',{'sport_id':sid,'css_class':''}) + sport_html[sid] + load_sb_tpl('sports_menu_sport_end',{});
        // update the leagues html with the sport placeholder
        full_html = replaceAll(full_html,'{sport_assoc_'+sid+'}',sport_html[sid]);
        full_html = replaceAll(full_html,'{scount_'+sid+'}',sport_league_count[sid]);
        
    }
    // loop the assoc html array
    for (var aid in assoc_html) {
        // load the opening and closing tags
        if (assoc_html[aid] != '') assoc_html[aid] = load_sb_tpl('sports_menu_assoc_start',{'assoc_id':'ap_'+aid,'css_class':''}) + assoc_html[aid] + load_sb_tpl('sports_menu_assoc_end',{});
        // update the leagues html with the association placeholder
        full_html = replaceAll(full_html,'{assoc_leagues_ap_'+aid+'}',assoc_html[aid]);
        full_html = replaceAll(full_html,'{acount_ap_'+aid+'}',assoc_league_count[aid]);
    }
    //return the full html output
    return full_html;
}

function generate_assoc_leagues_html_antepost(full_html) {
    var sport_html = []; // html per sport, using sport id as assoc index
    var assoc_html = []; // html per association, using assoc id as assoc index
    var sport_league_count = []; // count number of events per sport
    var assoc_league_count = []; // count number of events per league group
    var assoc_counted = []; // used with assoc_league_count, checks if events per league have already been counted
    
    var has_filters = false;
    if (typeof sb_menu_data.filters != 'undefined') {
        has_filters = true;
        var filter_out = '';
        if (typeof sb_menu_data.filters.day != 'undefined') {
            filter_out = 'filters[day]='+sb_menu_data.filters.day;
        }
        else if (typeof sb_menu_data.filters.hour != 'undefined') {
            filter_out = 'filters[hour]='+sb_menu_data.filters.hour;
        }
        sb_sports_filters = filter_out;
    }
    else {
        sb_sports_filters = '';
    }
    
    
    // loop all leagues available
    for (var league_index in sb_menu_data.leagues_antepost) {
        var league = sb_menu_data.leagues_antepost[league_index];
        var sport_id = 'ap_'+league['s_id'];
        if (typeof sport_league_count[sport_id] == 'undefined') sport_league_count[sport_id] = 0;
        // count number of events per sport
        sport_league_count[sport_id] += parseInt(sb_menu_data.leagues_antepost[league_index]['evcount']);
    }
    
    for (var league_index in sb_menu_data.events_antepost) {
        var event = sb_menu_data.events_antepost[league_index];
        event.public_id = "";
        var event_name = get_event_name(event);
        var league_id = 'ap_'+event['l_id'];
        var sport_id = 'ap_'+event['s_id'];
        var event_id = event['e_id'];
        var assoc_ids = (typeof event['lg_id'] == 'undefined' || event['lg_id'] == '') ? 0 : event['lg_id'];
        
        if (typeof sport_league_count[sport_id] == 'undefined') sport_league_count[sport_id] = 0;
        
        //av_leagues[league_id] = league['url'];
        
        // load the league html
        var css_class_li = 'league_item_li';
        if ($("#sports_odds #sleague_"+event['l_id']+"_"+event_id).length) css_class_li += ' open';
        
        var lhtml = load_sb_tpl('sports_menu_league_item_antepost',{'league_id':event['l_id'],'event_id':event['e_id'],'event_name':event_name,'event_link':'#event/'+event['l_id']+'-'+event['e_id'],'league_css_class':'league_item','css_class':css_class_li,'event_url':''});
        
        if (typeof sport_html[sport_id] == 'undefined') sport_html[sport_id] = '';
        
        
        
        // check if league is not linked to an association
        if (assoc_ids == 0 || assoc_ids == '' || assoc_ids == '-1' || assoc_ids == 'undefined' || assoc_ids.length == 0) {
            // set the leagues directly under th sport array
            sport_html[sport_id] += lhtml;
        }
        // league has 1 or more associations
        else {
            // loop the associations array
            for (var asin in assoc_ids) {
                // get association id
                var assoc_id = assoc_ids[asin];
                
                // set the leagues directly under the association array
                if (typeof assoc_html[assoc_id] == 'undefined') assoc_html[assoc_id] = '';
                assoc_html[assoc_id] += lhtml;
                
                // verify that for the curent league and assoc (combined), we did not count the event count
                if (typeof assoc_counted[event.l_id+"_"+assoc_id] == 'undefined') {
                    if (typeof assoc_league_count[assoc_id] == 'undefined') assoc_league_count[assoc_id] = 0;
                    assoc_league_count[assoc_id] += parseInt(event.evcount);
                    assoc_counted[event.l_id+"_"+assoc_id] = 1;
                }
            }
        }
    }
    
    // loop the sports html array
    for (var sid in sport_html) {
        // load the opening and closing tags
        if (sport_html[sid] != '') sport_html[sid] = load_sb_tpl('sports_menu_sport_start',{'sport_id':sid,'css_class':''}) + sport_html[sid] + load_sb_tpl('sports_menu_sport_end',{});
        // update the leagues html with the sport placeholder
        full_html = replaceAll(full_html,'{sport_assoc_'+sid+'}',sport_html[sid]);
        full_html = replaceAll(full_html,'{scount_'+sid+'}',sport_league_count[sid]);
        
    }
    // loop the assoc html array
    for (var aid in assoc_html) {
        // load the opening and closing tags
        if (assoc_html[aid] != '') assoc_html[aid] = load_sb_tpl('sports_menu_assoc_start',{'assoc_id':'ap_'+aid,'css_class':''}) + assoc_html[aid] + load_sb_tpl('sports_menu_assoc_end',{});
        // update the leagues html with the association placeholder
        full_html = replaceAll(full_html,'{assoc_leagues_ap_'+aid+'}',assoc_html[aid]);
        full_html = replaceAll(full_html,'{acount_ap_'+aid+'}',assoc_league_count[aid]);
    }
    //return the full html output
    //console.log(full_html);
    return full_html;
}

// toggle (open or close) a menu item (sport or association)
// lid = item id
function toggle_sports_menu_li(lid) {
    // item is closed
    if ($("li#"+lid).hasClass("closed")) {
        open_sports_menu_li(lid);
    }
    // item is open
    else {
        close_sports_menu_li(lid);
    }
}

function open_sports_menu_li(lid) {
    // open (sliding) the sub menu
    $("ul.ul_"+lid).slideDown(animation_duration, function() {
        // on success (full slide) remove the css class closed from the sub menu and the main item
        $("ul.ul_"+lid).removeClass("closed");
        $("li#"+lid).removeClass("closed");
    });
}
function close_sports_menu_li(lid) {
    // close (sliding) the sub menu
    $("ul.ul_"+lid).slideUp(animation_duration, function() {
        // on success (full slide) add the css class closed on the sub menu and the main item
        $("ul.ul_"+lid).addClass("closed");
        $("li#"+lid).addClass("closed");
    });
}

// function to expand the menu (open all closed sports and associations)
function expand_full_menu() {
    // closed sports // first we expand the sports
    $("li.tm_s.closed").each(function() {
        // get the sport element id
        var sid = $(this).attr("id");
        open_sports_menu_li(sid);
    });
    // closed associations // expand after sports
    $("li.tm_a.closed").each(function() {
        var aid = $(this).attr("id");
        open_sports_menu_li(aid);
    });
}
function close_full_menu() {
    // opened associations // first we close the assoc
    $("li.tm_a").each(function() {
        var aid = $(this).attr("id");
        close_sports_menu_li(aid);
    });
    // opened sports // close after assoc
    $("li.tm_s").each(function() {
        var sid = $(this).attr("id");
        close_sports_menu_li(sid);
    });
}

// open/close league from menu to odds area
function toggle_league_menu(lid,url,filters,skip_filters) {  
    //neede to avoid to append leagues 
    if(typeof sportsbook_t7 != "undefined" && sportsbook_t7 == 1) $("#sports_odds .sports_scroll_content").html('');
   
    // single event is open
    if (sports_loc  == 2) {
        // remove the css class 'open' from any league menu
        $(".league_item_li.open").removeClass("open");
        // set the leagues contents area to empty
        $("#sports_odds .sports_scroll_content").html("");
        // close the single event
        close_single_event(true);
    }
    // contents section open
    else if (sports_loc == 3) {
        // reset leagues
        open_leagues = [];
        // set the leagues contents area to empty
        $("#sports_odds .sports_scroll_content").html('');
        // clear the search request
        clear_search();
    }
    
    // if the league is already open, we close it
    if ($("#sleague_"+lid).length) {
        close_league_menu(lid);
    }
    // open league
    else {
        open_league_menu(lid,true,filters,skip_filters);
    }
    
    //Needed to scroll the page on top after menu selection click
    $(window).scrollTop(0);    
    return false;
}
// open a league and highlight menu
function open_league_menu(lid,click_ev,filters,skip_filters) {
    if (typeof click_ev == 'undefined' || click_ev != true) {
        click_ev = false; // not a mouse click
    }
    //console.log('Open called',new Date().getTime());
    if (filters == 'is_antepost=1') {
        $(".mleague_ap_"+lid).addClass("open");
    }
    else {
        $(".mleague_"+lid).addClass("open");
    }
    var lurl = av_leagues[lid]; // get league url
    if (sb_debug_odds||sb_debug_menu) console.log("OPEN:",lid,lurl);
    
    // contents section is open
    if (sports_loc == 3) {
        // reset opened leagues and leagues section html
        open_leagues = [];
        $("#sports_odds .sports_scroll_content").html('');
    }
    // max leagues to display in hash url
    if (open_leagues.length >= sb_max_leagues_url) {
        allow_hash_change = false;
    }
    
    // reload league html in central area and push league id to open_leagues array
    if ($("#sleague_"+lid).length != 1) {
        $("#sports_odds .sports_scroll_content").prepend('<div id="sleague_'+lid+'"></div>');
    }
    // preloader removed to look faster
    //$("#sleague_"+lid).html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':'event_preload'}));
    
    show_leagues();
    if (click_ev) {
        //if (typeof xhr_ajax != 'undefined' && xhr_ajax['get_odds'] != 'undefined' && xhr_ajax['get_odds'] != false) xhr_ajax['get_odds'].abort();
    }
    
    var extra_url = 'lid='+lid+'&append=1';
    if (typeof filters != 'undefined') extra_url += '&'+filters;
    
    if (filters == 'is_antepost=1') {
        get_sports_data('get_odds',extra_url,'build_the_odds_antepost_ajax','build_the_odds_antepost_ajax',skip_filters);
    }
    else {
        get_sports_data('get_odds',extra_url,'build_the_odds_ajax','build_the_odds_ajax',skip_filters);
    }
    
}
// close a league and unhighlight menu
function close_league_menu(lid) {
    // if only 1 league is open, we cannot allow user to close it as than nothing will be visible
    if (open_leagues.length == 1) return;
    var lurl = av_leagues[lid]; // get league url
    if (sb_debug_odds||sb_debug_menu) console.log("CLOSE:",lid,lurl);
    
    // remove css class frmo menu and hide the league html
    $(".mleague_"+lid).removeClass("open");
    $("#sleague_"+lid).slideUp(animation_duration,function() { $("#sleague_"+lid).remove(); });
    // remove the league id from the open_leagues array
    var arr_pos = $.inArray(lid.toString(),open_leagues);
    open_leagues.splice(arr_pos,1);
    
    // check how manu leagues are open now (with the new league added to the list)
    // onyl 1 league available, do not allow user to remove last league
    if (open_leagues.length == 1) {
        $(".sleague_item .close_league").addClass("disabled");
    }
    else {
        $(".sleague_item .close_league").removeClass("disabled");
    }
    // set hash url if change is allowed
    if (allow_hash_change) set_page_hash();
}

function toggle_league_menu_antepost(eid,lid) {
    // single event is open
    if (sports_loc  == 2) {
        // remove the css class 'open' from any league menu
        $(".league_item_li.open").removeClass("open");
        // set the leagues contents area to empty
        $("#sports_odds .sports_scroll_content").html("");
        // close the single event
        close_single_event(true);
    }
    // contents section open
    else if (sports_loc == 3) {
        // reset leagues
        open_leagues = [];
        // set the leagues contents area to empty
        $("#sports_odds .sports_scroll_content").html('');
        // clear the search request
        clear_search();
    }
    
    //console.log('XX',$("#sleague_"+lid+"_"+eid).length,lid,eid)
    
    // if the league is already open, we close it
    if ($("#sleague_"+lid+"_"+eid).length == 1) {
        close_league_menu_antepost(eid,lid);
    }
    // open league
    else {
        open_league_menu_antepost(eid,lid,true);
    }
    
    $(window).scrollTop(0);
    return false;
}

function open_league_menu_antepost(eid,lid,click_ev,filters) {
    if (typeof click_ev == 'undefined' || click_ev != true) {
        click_ev = false; // not a mouse click
    }
    $(".mleague_ap_"+eid).addClass("open");
    var lurl = av_leagues[lid+"_"+eid]; // get league url
    if (sb_debug_odds||sb_debug_menu) console.log("OPEN:",lid,eid);
    
    // contents section is open
    if (sports_loc == 3) {
        // reset opened leagues and leagues section html
        open_leagues = [];
        $("#sports_odds .sports_scroll_content").html('');
    }
    allow_hash_change = false;
    
    if ($("#sleague_"+lid+"_"+eid).length != 1) {
        if(typeof is_antepost != "undefined" && is_antepost == 1) $("#sports_odds .sports_scroll_content").html('<div id="sleague_'+lid+'_'+eid+'"></div>');
        else $("#sports_odds .sports_scroll_content").prepend('<div id="sleague_'+lid+'_'+eid+'"></div>');
    }
    
    show_leagues();
    if (click_ev) {
        //if (typeof xhr_ajax != 'undefined' && xhr_ajax['get_odds'] != 'undefined' && xhr_ajax['get_odds'] != false) xhr_ajax['get_odds'].abort();
    }
    
    var extra_url = 'lid='+lid+'&eid='+eid+'&append=1&is_antepost=1';
    if (typeof filters != 'undefined') extra_url += '&'+filters;
    get_sports_data('get_odds',extra_url,'build_the_odds_antepost_ajax');
    
}

function close_league_menu_antepost(eid,lid) {
    console.log('close eid: ',eid,$(".mleague_ap_"+eid).length);
    // if only 1 league is open, we cannot allow user to close it as than nothing will be visible
    if (open_leagues.length == 1) return;
    var lurl = av_leagues[lid+"_"+eid]; // get league url
    if (sb_debug_odds||sb_debug_menu) console.log("CLOSE:",eid,lurl);
    
    // remove css class frmo menu and hide the league html
    $(".mleague_ap_"+eid).removeClass("open");
    $("#sleague_"+lid+"_"+eid).slideUp(animation_duration,function() { $("#sleague_"+lid+"_"+eid).remove(); });
    // remove the league id from the open_leagues array
    var arr_pos = $.inArray(lid+"_"+eid.toString(),open_leagues);
    console.log(lid+"_"+eid.toString(),arr_pos);
    open_leagues.splice(arr_pos,1);
    
    // check how manu leagues are open now (with the new league added to the list)
    // onyl 1 league available, do not allow user to remove last league
    if (open_leagues.length == 1) {
        $(".sleague_item .close_league").addClass("disabled");
    }
    else {
        $(".sleague_item .close_league").removeClass("disabled");
    }
    
    if (allow_hash_change) set_page_hash();
}

var filter_menu_val = false;
function filter_menu_by_day(day_num) {
    if (typeof day_num == 'undefined') return false;
    if (isNaN(parseInt(day_num))) return false;
    
    filter_menu_val = 'd'+day_num;
    get_sports_data('get_menu_filter','filters[day]='+day_num,'build_the_menu_ajax');
}
function filter_menu_by_hour(hr_num) {
    if (typeof hr_num == 'undefined') return false;
    if (isNaN(parseInt(hr_num))) return false;
    
    var selected_opt = $("#sports_menu .menu_date_filter .dt_h_area .dt_tt_"+hr_num).text();
    if (selected_opt == '') return false;
    
    filter_menu_val = 'h'+hr_num;
    get_sports_data('get_menu_filter','filters[hour]='+hr_num,'build_the_menu_ajax');
    
    $("#sports_menu .menu_date_filter .dt_h_area .dt_h_icon").addClass("noicon").html("<span>"+selected_opt+'</span>');
    $("#sports_menu .menu_date_filter .dt_h_area").removeClass("show_time");
    
}
function toggle_filter_menu_by_hour(hr_num) {
    if (filter_menu_val == 'h'+hr_num) {
        reset_filter_menu();return;
    }
    filter_menu_by_hour(hr_num);
}

function toggle_filter_menu_by_day(day_num) {
    if (filter_menu_val == 'd'+day_num) {
        reset_filter_menu();return;
    }
    filter_menu_by_day(day_num);
}
function reset_filter_menu() {
    filter_menu_val = false;
    get_sports_data('get_menu',false,'build_the_menu_ajax');
}
$(document).ready(function() {
    
    $("#sports_menu .menu_date_filter .dt_h_area").on("click", function(e) {
        
        var container = $("#sports_menu .menu_date_filter .dt_h_icon");
        // clicked on icon
        if (container.is(e.target) || container.has(e.target).length > 0) {
            if ($("#sports_menu .menu_date_filter .dt_h_icon").hasClass("noicon")) {
                $("#sports_menu .menu_date_filter .dt_h_area").removeClass("show_time").removeClass("selected");
                $("#sports_menu .menu_date_filter .dt_h_icon").removeClass("noicon").removeClass("selected").html("");
                reset_filter_menu();
            }
            else {
                toggle_time_filter_dd();
            }
        }
        else {
            
        }
    });
});
function toggle_time_filter_dd() {
    if ($("#sports_menu .menu_date_filter .dt_h_area").hasClass("show_time")) {
        $("#sports_menu .menu_date_filter .dt_h_area").removeClass("show_time");
    }
    else {
        $("#sports_menu .menu_date_filter .dt_h_area").addClass("show_time");
    }
}



// populate the sports menu with sports, associations and leagues
function build_the_sport_menu_ajax_betsat(output) { 
    sb_menu_data = get_valid_json(output);
        
    var html = ''; // final output html
    
    var sports_html = ''; // html output related to sports 
    var assoc_html = ''; // html output related to associations (per sport)
    
    // the object is not set, we display an error
    if (typeof sb_menu_data != 'object') {
        // get the error template and append the generic error message
        var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_generic_error});
        $("#sports_menu .the_menu ul.tm_s").html(html);
        return false;
    }
    else if (typeof sb_menu_data.sports == 'undefined') {
        if (typeof sb_menu_data.errors != 'undefined') {
            var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_menu_data.errors});
            $("#sports_menu .the_menu ul.tm_s").html(html);
            return false;
        }
        else {
            var html = load_sb_tpl('sports_menu_sport_error',{'error':sb_generic_error});
            $("#sports_menu .the_menu ul.tm_s").html(html);
            return false;
        }
    }
    
    // loop all sports
    for (var sport_index in sb_menu_data.sports) {
        // sport info
        var sport = sb_menu_data.sports[sport_index];
        var sport_name = sport['name'];
        var sport_id = sport['s_id'];
        var sport_assoc = sport['league_groups'];
        
        // setup the params for loading a template
        var sport_params = {'sport_id':sport_id,'sport_name':sport_name,'sport_link':'#sport/'+sport_id,'sport_assoc':'{sport_assoc_'+sport_id+'}','css_class':'closed'};
        // check if menu item should be opened
        if (typeof sport['open'] != 'undefined' && (sport['open'] == "1" || sport['open'] == 1)) sport_params.css_class = '';
        // load the html for the current sport element
        sports_html += load_sb_tpl('sports_menu_sport_item',sport_params);
        
        var assoc_html = ''; // setup a new list of assoc for th current sport
        if (sb_debug_menu) {
            console.log('sport_assoc');
            console.log(sport_assoc);
        }
        var assoc_processed = 0;
        for (var assoc_index in sport_assoc) {
            // association info
            var assoc = sport_assoc[assoc_index];
            var assoc_name = assoc['name'];
            var assoc_id = assoc['lg_id'];
            
            var assoc_flag = '_na';
            if (typeof assoc['assoc_special'] != 'undefined') assoc_flag = assoc['assoc_special'];
            else if (typeof assoc['assoc_priority'] != 'undefined') assoc_flag = assoc['assoc_priority'];
            
            // setup the assoc params
            var assoc_params = {'assoc_id':assoc_id,'assoc_name':assoc_name,'assoc_link':'#association/'+assoc_id,'assoc_leagues':'{assoc_leagues_'+assoc_id+'}','css_class':'closed'};
            // check if assoc should be displayed as open
            if (typeof assoc['open'] != 'undefined' && (assoc['open'] == "1" || assoc['open'] == 1)) assoc_params.css_class = '';
            
            if (typeof sb_menu_data['sort_type'] != 'undefined' && sb_menu_data['sort_type'] == 'assoc') assoc_params.css_class += ' assoc_p_'+assoc_flag;
            
            // load the html for the current assoc and append to assoc html string
            assoc_html += load_sb_tpl('sports_menu_assoc_item',assoc_params);
            
            assoc_processed++;
        }
        // the current sport has associations available
        if (assoc_html != '') {
            // load the opening and closing tags for the assoc html snippet
            assoc_html = load_sb_tpl('sports_menu_sport_start',{'sport_id':sport_id,'css_class':sport_params.css_class}) + assoc_html + load_sb_tpl('sports_menu_sport_end',{});
            
            // replace the sports assoc area with the updated assoc html code
            sports_html = replaceAll(sports_html,'{sport_assoc_'+sport_id+'}',assoc_html+'{sport_assoc_'+sport_id+'}');
            //console.log(assoc_html);
            //sports_html += ;
        }
        // append the sports html to the html list
        html += sports_html;
        sports_html = '';
        
    }
    
    // combine the leagues with associations and sports
    html = generate_assoc_leagues_html(html);
    
    build_the_menu_filter_management()
    
    html += build_the_menu_antepost();
    
    var body_is_wide = $("body").hasClass("wide");
    handle_menu_position(body_is_wide); 
    
    // update the menu html
    if (typeof sb_sports_menu_div != 'undefined' && sb_sports_menu_div != '' && $(sb_sports_menu_div).length >= 1) { 
        $(sb_sports_menu_div).html(html);
    }             
        
    $("#sports_menu .the_menu ul.tm_s").html(html);  
    
}