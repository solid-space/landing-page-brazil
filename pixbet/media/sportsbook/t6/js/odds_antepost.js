function build_the_odds_antepost_ajax(output) {
    // valida json object or false on error (invalid json)
    sb_odds_data = get_valid_json(output);
    // on error, load the error tempate and display
    if (sb_odds_data == false) $("#sports_odds .sports_scroll_content").html(load_sb_tpl('sport_odds_generic_error',{}));
    else build_the_odds_antepost();
}

function build_the_odds_antepost() {
    var sbo = new Date().getTime();
    if (typeof sb_time != 'undefined' && sb_time == true) console.log("START BUILD_THE_ODDS",sbo);
    // remove any error displayed
    $("#sports_odds .sports_scroll_content .generic_error").remove();
    // if no events are available, we show an error
    if (sb_odds_data == null || typeof sb_odds_data.events == 'undefined' || sb_odds_data.events == null || Object.keys(sb_odds_data.events).length == 0) {
        if (sb_odds_data == null || typeof sb_odds_data.l_id == 'undefined') {
            $("#sports_odds .sports_scroll_content").prepend(load_sb_tpl('sport_odds_generic_error',{}));
            
            return;
        }
    }
    
    // get league id
    var lid = sb_odds_data.l_id;
    var eid = sb_odds_data.e_id;
    var le_index = lid+"_"+eid;
    // add 'open' class to menu item
    $(".mleague_ap_"+eid).addClass("open");
    open_leagues.push(le_index.toString());
    
    var extra_params = {};
    // populate the parameters for the request
    generate_league_antepost_html(sb_odds_data,extra_params);
    
    // extra check for display purposes
    // if only 1 league is available, we do not allow the user to close such league
    if (open_leagues.length == 1) {
        $(".sleague_item .close_league").addClass("disabled");
    }
    // else, more than 1 league is available, we allow the user to close the leagues
    else {
        $(".sleague_item .close_league").removeClass("disabled");
    }
    sports_loc = 1;
    show_leagues();
    
    // reset hash url change
    allow_hash_change = true;
    if (allow_hash_change) set_page_hash_antepost(lid,eid); //Added JB 25/3/2022 - Ticket 12593   
    
    if (typeof sb_time != 'undefined' && sb_time == true) {
        var ebo = new Date().getTime();
        var diff = ebo - sbo;
        console.log("END BUILD_THE_ODDS",ebo);
        console.log("DIFF BUILD_THE_ODDS",diff);
    }
    
    //Added JB 25/1/2023 - Ticket BI-1065. 
    //Note: handle_sportsradar_tracking() and single_event_data are defind in base.js
    if (typeof handle_sportsradar_tracking == 'function'){
        single_event_data = sb_odds_data;
        handle_sportsradar_tracking();
    }    
    
}

function generate_league_antepost_html(league,params) {
    if (typeof league != 'object') {
        alert("ERROR!");
        return false;
    }
    
    
    dynamic_html = generate_league_antepost_events_html(league,params);
    if (dynamic_html == '') {
        dynamic_html = load_sb_tpl('sport_odds_league_event_row_no_odds',{error:'Quote non disponibili'});
        dynamic_html = load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':dynamic_html,'css_class':'antepost_odds_tbl antepost_nodds'})
    }
    
    var league_div_css_class = ' sport_ap_'+league.s_id;
    
    var css_class = ' nobtc';
    header_bt_more = load_sb_tpl('sport_odds_league_header_bt_more_antepost',{'css_class':css_class,'league_id':league.l_id,'event_id':league.e_id});
    
    // parameters used in generic template to generate league html
    var le_index = league.l_id+'_'+league.e_id;
    var ev_date = ev_time = ''; // date and time values
    var event = false;
    for (var e in league.events) {
        if (league.events[e]['e_id'] != league.e_id) continue;
        event = league.events[e];
        var ev_tstamp = new Date(event.tstamp * 1000);
        ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        
        var ev_name = get_event_name(event);
        break;
    }
    
    var lbt_groups = build_antepost_bet_type_groups_html(league);
    
    var league_params = {
        'le_identifier'                 : le_index,
        'league_id'                     : league.l_id,
        'sport_id'                      : league.s_id,
        'css_class'                     : league_div_css_class,
        'sport_name'                    : league.sports_name,
        'league_name'                   : league.league_name,
        
        'header_more'                   : header_bt_more,
        
        'antepost_date'                 : ev_date,
        'antepost_name'                 : ev_name,
        
        'league_bet_type_groups'        : lbt_groups, // get from tpl sport_odds_league_bet_types_groups
        'league_events_area'            : dynamic_html
    }
    
    // hide the home and single event contents
    $(".sports_odds_home").hide();
    $("#sports_odds .sports_scroll_single_event").html('').hide();
    
    if ($("#sleague_"+le_index).length == 1) {
        $("#sports_odds .sports_scroll_content #sleague_"+le_index).replaceWith(load_sb_tpl('sport_odds_league_start_antepost',league_params));
        //$("#sports_odds .sports_scroll_content #sleague_"+league.l_id).html(load_sb_tpl('sport_odds_league_start',league_params));
    }
    // prepend (last clicked 1st to show), override is set to off
    else $("#sports_odds .sports_scroll_content").prepend(load_sb_tpl('sport_odds_league_start_antepost',league_params));
    // show the odds area contents
    $("#sports_odds .sports_scroll_content").show();
    // hide the current league div, and create an animation to display league
    //$("#sleague_"+league.l_id).hide();
    $("#sleague_"+le_index).show();
    
    // append dynamic html to league div
    //$("#sleague_"+le_index+" .league_data").append(dynamic_html);
}

function generate_league_antepost_events_html(league,params) {
    var events = league.events;
    var extra_html = '';
    var extra_html_sel = '';
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
            'bet_type_count'    : event.bet_type_count,
            'icons'             : ev_stats
        }
        //extra_html += build_dynamic_event_selections(event.selections,ev_params);
        
        var bt_html_done = false;
        for (var bt_index in league.bet_types) {
            var bet_type = league.bet_types[bt_index];
            
            // hide bet types with no selections
            if (typeof event.selections == 'object' && Object.keys(event.selections).length == 0) continue;
            // display only selected bet types
            if (typeof bet_type.selected == 'undefined' || bet_type.selected != "1") continue;
            // no cat, we cannot proceed with the bet type
            if (typeof bet_type.cat == 'undefined') continue;
            
            // dynamic bt sels, single list
            if (bet_type.cat == "4") {
                extra_html += generate_league_antepost_events_btcat_4(event,bet_type,ev_params);
                continue;
            }
            // dynamic bt sels, multiple lists possible
            else if (bet_type.cat == "6") {
                extra_html += generate_league_antepost_events_btcat_4(event,bet_type,ev_params);
                continue;
            }
            else if (bet_type.cat == "1") {
                
                extra_html += generate_league_antepost_events_btcat_1(event,bet_type,ev_params);
                continue;
                
                var events_list_html = generate_league_events_html(league,{});
                
                var ev_headers = generate_league_events_header(league);
                var header_bt_html = ev_headers['bt'];
                var header_bts_html = ev_headers['bts'];
                var header_league_info = ev_headers['info'];
                var footer_spacer_html = ev_headers['footer'];
                
                var league_events_params = {
                    'league_id'                     : league.l_id,
                    'sport_id'                      : league.s_id,
                    'header_bet_types'              : header_bt_html, // get from tpl sport_odds_league_header_bt_name (loop)
                    'header_bt_selections'          : header_bts_html,
                    'events_list'                   : events_list_html,
                    'header_league_info'            : header_league_info,
                    'footer_area'                   : footer_spacer_html
                };
                extra_html += load_sb_tpl('sport_odds_league_events_area',league_events_params);
                
                //extra_html += load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':events_table,'css_class':'antepost_odds_tbl antepost_odds_tbl_normal'});
                continue;
            }
            
            //continue;
            
            
            if (typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == 1 && (sb_odds_display_dynamic_bt == true || bet_type.selected == 1)) {
                if (typeof bet_type.cat != 'undefined') { 
                    if(bet_type.cat == "4") {
                        extra_html += generate_league_dynamic_events_cat4_html(event,bet_type,ev_params);
                    }
                    else if(bet_type.cat == "5" || bet_type.cat == "7") {
                        extra_html += generate_league_dynamic_events_cat5_html(event,bet_type,ev_params);
                    }
                    else if(bet_type.cat == "6") {
                        extra_html += generate_league_dynamic_events_cat6_html(event,bet_type,ev_params);
                    }
                }
            }
            
        } // end league bet types loop
    }
    
    return extra_html;
}

function build_antepost_bet_type_groups_html(league) {
    
    var bt_html = '';
    var league_id = league.l_id;
    
    for (var b in league.bet_types) {
        var bt = league.bet_types[b];
        
        var css_class = '';
        if (typeof bt.selected != 'undefined' && bt.selected == 1) css_class += ' selected';
        
        //group_params = {'group_id':-1,'league_id':league_id,'group_name':bt.name,'css_class':css_class};
        var apbt_params = {'league_id':league.l_id,'event_id':league.e_id,'bet_type_name':bt.name,'css_class':css_class,'bet_type_id':bt.bt_id};
        bt_html += load_sb_tpl('sport_odds_league_bet_types_antepost_item',apbt_params);
    }
    
    var html = load_sb_tpl('sport_odds_league_bet_types_groups',{css_class:'open antepost_bt_groups',group_links: bt_html,bt_links:''});
    return html;
}
function league_odds_show_bt_antepost(lid,eid,bt_id) {
    // hide the currently visible bet type
    $("#sleague_"+lid+"_"+eid+" .lg_bt_ap_item").removeClass("selected");
    $("#sleague_"+lid+"_"+eid+" .lg_bt_ap_item#lg_bt_ap_"+bt_id).addClass("selected");
    
    get_sports_data('get_odds','lid='+lid+'&replace=1&bet_type_id='+bt_id+'&is_antepost=1&eid='+eid,'build_the_odds_antepost_ajax');
}

function generate_league_antepost_events_btcat_4(event,bet_type,ev_params) {
    
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
    }
    
    if (bt_html == '') return ''; //Added JB 4/4/2023 BSS-389
    
    while (colcount < max_cols_per_row) {
        bt_html += '<td class="nodds" width="'+tdw+'"></td>'; // bts name
        bt_html += '<td class="nodds"></td>'; //bts odd
        // add spacer to all cells except last one
        if (colcount < (max_cols_per_row-1)) bt_html += '<td class="nodds"></td>'; //spacer
        colcount ++;
    }
    
    bt_html = load_sb_tpl('sport_odds_antepost_bt_title',{'colspan':title_colspan,'bet_type_name':bet_type.name})+bt_html;
    
    var full_html = load_sb_tpl('sport_odds_league_event_dynamic_html',{'html':bt_html,'css_class':'antepost_odds_tbl'})
    
    return full_html;
}

function generate_league_antepost_events_btcat_1(event,bet_type,ev_params) {
    for (var s in event.selections) {
        for (var b in bet_type.selections) {
            if (bet_type.selections[b]['bts_id'] == event.selections[s]['bts_id']) {
                event.selections[s]['name'] = bet_type.selections[b]['name'];
            }
        }
    }
    ev_params.hide_btd_id = 1;
    return generate_league_antepost_events_btcat_4(event,bet_type,ev_params);
}