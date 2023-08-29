// this files contains all js related to the single event functionality

// the file is used to build the html for the current single event sports template
// ajax requests to retrieve data are set in the base.js file
// the object 'single_event_data' is created on success of the ajax calls
// the object returns a json encoded array with event and odds information

if (typeof sl_body_width == 'undefined') {
    var sl_body_width = 'full';
}

function open_single_event(l_id,ev_id,ev_url) {
    // retrieve single event data and display
    get_sports_data('get_odds','lid='+l_id+'&event_id='+ev_id,'display_single_event');
    // change hash url
    if (allow_hash_change) set_page_hash();
    $("#sports_odds .sports_scroll_single_event").html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':''}))
    show_event();    
}

//Added JB 25/3/2022 - Ticket 12593
function open_single_outright(l_id,ev_id,ev_url){    
    // retrieve single event data and display
    get_sports_data('get_odds','is_antepost=1&lid='+l_id+'&eid='+ev_id,'build_the_odds_antepost_ajax');
    // change hash url
    if (allow_hash_change) set_page_hash();
    $("#sports_odds .sports_scroll_single_event").html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':''}))
    show_event();    
}

   
function close_single_event(reset_leagues) {
    // set reset to true of false
    if (typeof reset_leagues != 'undefined' && (reset_leagues == true || reset_leagues == "1")) reset_leagues = true;
    else reset_leagues = false;
    // reset leagues will start new list
    if (reset_leagues) {
        // reset open leagues
        open_leagues = [];
        $(".league_item_li.open_league").removeClass("open_league");
        return;
    }
    // remove all css classes with open_league (display of check mark in menu)
    $(".league_item_li.open_league").removeClass("open_league").addClass("open");
    // if no leagues are available, load the homepage
    if (open_leagues.length == 0) {
        load_homepage();
        sports_loc = 0;
    }
    // show the leagues that are open
    else {
        show_leagues();
        sports_loc = 1;
    }
    // change hash url
    if (allow_hash_change) set_page_hash();
}

// display functions

function generate_single_event_bt_groups(event) {
    // bt categories are not available for the current event
    if (typeof event.league_bet_types_categories == 'undefined' || event.league_bet_types_categories == null || event.league_bet_types_categories == false) return '';
    
    bt_cat = event.league_bet_types_categories;
    bet_types = event.bet_types;
    
    var allowed_cats = [];
    
    var acc = 0;
    for (var c in bt_cat) {
        var cat = bt_cat[c];
        for (var b in bet_types) {
            var bt = bet_types[b];
            for (var i in bt.bc_id) {
                if (cat.bc_id == bt.bc_id[i]) {
                    //console.log('Found '+cat.bc_id+' for bt: '+bt.bt_id);
                    
                    allowed_cats[cat.bc_id] = cat;
                    acc++;
                }
            }
        }
    }
    
    var html = inner_html = '';
    for (var c in bt_cat) {
        var cat = bt_cat[c];
        if (typeof allowed_cats[cat.bc_id] != "undefiend") {
            //console.log(cat,$("#sport_single_event_bt_cat_item").length);
            var xx = load_sb_tpl('sport_single_event_bt_cat_item',cat);
            //console.log(xx);
            inner_html +=  xx;
        }
    }
    html = load_sb_tpl('sport_single_event_bt_cat_holder',{'groups':inner_html});
    return html;
}

function display_single_event(raw_event) {
    // get a valid json objecdt or false on error
    var event = get_valid_json(raw_event);
    single_event_data = event;
    
    // event info not available
    // invalid json object
    if (event == false || event == null) {
        // throw a generic error
        var html = load_sb_tpl('sport_odds_generic_error',{});
        if (event == null) {
            single_event_data = {};
            single_event_data.e_id = '-1';
        }
    }
    // errors occured, return error string
    else if (typeof event.errors != 'undefined') {
        var html = load_sb_tpl('sport_odds_custom_error',{'error':event.errors});
    }
    else if (typeof event.e_id == 'undefined') {
        var html = load_sb_tpl('sport_odds_generic_error',{});
        if (event == null) {
            single_event_data = {};
            single_event_data.e_id = '-1';
        }
    }
    // event ok!
    else {
        var ev_name = get_event_name(event);
        
        var event_odds = generate_single_event_bt_groups(event);
        
        // generate the html for all bet types within the single event
        event_odds += generate_single_event_bet_types(event,event.bet_types);
        
        var ev_date = ev_time = ''; // date and time values
        // format the unix timestamp to milliseconds
        var ev_tstamp = new Date(event.tstamp * 1000);
        // convert date object to date string based on format
        ev_date = $.datepicker.formatDate(sb_date_format_js,ev_tstamp);
        // set the time based on the date object
        ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
        ev_time += ':';
        ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
        
        var css_class = 'sport_'+event.s_id+' league_'+event.l_id;
        
        var html = load_sb_tpl('sport_single_event_start',{'sports_name':event.sports_name,'league_name':event.league_name,'event_date':ev_date,'event_time':ev_time,'event_name':ev_name,'event_odds':event_odds,'css_class':css_class,'sport_id':event.s_id});
    }
    
    $(".sports_odds_home").slideUp(animation_duration);
    $("#sports_odds .sports_scroll_single_event").html(html).slideDown(animation_duration);
    $("#sports_odds .sports_scroll_content").slideUp(animation_duration);
    $("#sports_menu .tm_l.league_item_li.open").addClass("open_league");
    $("#sports_menu .tm_l.league_item_li.open").removeClass("open");
    //web_open_wide(0);
    //single_event_scroll_top = $("#sports_odds .sports_scroll").not('.scroll-wrapper').scrollTop();
    if (allow_custom_scroll && sl_body_width != 'fixed') {
        $("#sports_odds .single_scroll").scrollbar();
    }
    
    sports_loc = 2;                                                                       
    show_event();
    set_page_hash();
    
    setTimeout(function() {
        //alert("WORK IN PROGRESS");
    },100);

    //Added JB 24/1/2022 - BI-1065 - Make call to communicate event data to Sportradar    
    //Note that this uses var single_event_data defined in base.js and set here
    if (typeof handle_sportsradar_tracking == 'function'){
        handle_sportsradar_tracking();
    }

    return false;
    
}
function generate_single_event_bet_types(event,event_bet_types,allowed_cats) {  

    var bet_types = jQuery.extend(true,{},event_bet_types);
    var html = '';
    
    //console.log(allowed_cats, typeof allowed_cats);
    
    var cols = {};
    var allowed_bt_count = 0;
    for (var bt_index in bet_types) {
        var bet_type = bet_types[bt_index];
        bet_types[bt_index].allow_bt = true;
        if (typeof allowed_cats != 'undefined' && allowed_cats != null && allowed_cats != false) {
            //console.log("CHECK BT CAT "+allowed_cats);
            bet_types[bt_index].allow_bt = false;
            for (var c in bet_type.bc_id) {
                //console.log('CHECK BTC '+bet_type.bc_id[c]);
                if (allowed_cats == bet_type.bc_id[c]) {
                    bet_types[bt_index].allow_bt = true;
                }
            }
            if (bet_types[bt_index].allow_bt) allowed_bt_count++;
        }
        else allowed_bt_count++;
        if (typeof bet_type.col != 'undefined') {
            if (typeof cols[bet_type.col] == 'undefined') cols[bet_type.col] = '';
            //else cols[bet_type.col]++;
        }
    }
    //console.log(cols);
    var has_cols = false
    if (Object.keys(cols).length < 2) {
        cols = {'col1':'','col2':''};
        var btcount = Object.keys(bet_types).length;
        var col1_max = Math.ceil(allowed_bt_count/2);
        var col2_max = allowed_bt_count-col1_max;
    }
    else has_cols = true;
    //console.log(has_cols);
    
    var btloop = 0; // loop counter for bet types
    for (var bt_index in bet_types) {
        var bet_type = bet_types[bt_index];
        //console.log(bet_type.bt_id, bet_type.allow_bt, bet_type.col);
        if (bet_type.allow_bt == false) {
            //console.log("HIDE", bet_type.name);
            continue;
        }
        else {
            //console.log("SHOW", bet_type.name);
        }
        
        if (has_cols == false) {
            if (btloop >= col1_max) bet_type.col = 'col2';
            else bet_type.col = 'col1';
            
            if (typeof global_single_ev_bt_display != 'undefined' && global_single_ev_bt_display == 'alternate') {
                if ((btloop % 2) == "0") bet_type.col = 'col1';
                else bet_type.col = 'col2';
            }
        }
        
        var bts_counter = 0; // bet type selections counter for current bet type
        for (var bts_index in bet_type.selections) {
            bts_counter++;
        }
        
        
        if (typeof bet_type.dynamic != 'undefined' && bet_type.dynamic == "1") { 
            //var xxx=generate_single_event_bet_types_normal(event,bet_type);
            var dyn_html = generate_single_event_bet_types_dynamic(event,bet_type);
            cols[bet_type.col] += dyn_html;
        }
        else if (bts_counter >= global_single_bts_per_row) {
            cols[bet_type.col] += generate_single_event_bet_types_multi(event,bet_type);
        }
        else {
            cols[bet_type.col] += generate_single_event_bet_types_normal(event,bet_type);
        }
        
        btloop++;
    }
    
    var html = '';
    for (var col_index in cols) {
        var curr_col = cols[col_index];
        var col_html = load_sb_tpl('sport_single_event_bet_type_col',{'css_class':'bet_types_col_'+col_index,'event_odds':curr_col});
        html += col_html;
    }
    
    html = load_sb_tpl('sport_single_event_bet_type_cols_holder',{'html':html});
    
    return html;
}
function generate_single_event_bet_types_multi(event,bet_type,count) {
    var html = '';
    var header_html = '';
    
    var btsc = 0; // bet type selections counter
    var colcount = 4; // max cols
    var tdw = (100/colcount);
    var cc = 1; // col counter
    var selections_html = '';
    var selections_spacers = '';
    var has_at_least_one_odd = 0;
    
    var bet_type_name = bet_type.name;
    
    for (var bts_index in bet_type.selections) {
        var sel = bet_type.selections[bts_index];
        
        if (cc > 1) {
            if (btsc < colcount) selections_spacers += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
        }
        else {
            if (typeof bet_type.sov != 'undefined') {
                var sov_val = get_sov_index(sel.sov,bet_type.cat,true);
                bet_type_name = bet_type.name+' <span class="bt_sov">'+sov_val+'</span>';
            }
        }
        var sel_css_class = '';
        var sel_sov = '';
        var bt_id = bet_type.bt_id;
        if (typeof sel.bt_id != 'undefined') bt_id = sel.bt_id;
        var add_sel_link = 'a='+sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bt_id+'&selection_id='+sel.bts_id+'&sov='+sel.sov+'&bt_cat='+bet_type.cat;
        var odd_val = '-';
        if (sel.odd > bs_min_odd_val) {
            has_at_least_one_odd++;
            odd_val = round_decimals(sel.odd,2);
        }
        
        var odd_id =  'odd_'+event.e_id+'_'+bt_id+'_'+sel.bts_id;
        if (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") {
            var sov = bet_type.sov;
            if (typeof sov == 'number') sov = round_decimals(bet_type.sov,2);
            odd_id += '_'+get_sov_index(sov);
        }
        sel_css_class += ' '+odd_id;
        if (typeof sel.selected != 'undefined' && sel.selected == "1") sel_css_class += ' selected';
        if (typeof sel.mc != 'undefined') sel_css_class += ' mc_'+sel.mc;
        
        var sel_html_params = {'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':sel_css_class,'odd':format_odd_value(odd_val),'sov':sel_sov,'name':sel.name,'add_selection_link':add_sel_link,'extra':'width="'+tdw+'%"'};
        selections_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',sel_html_params);
        
        if (sel.odd > bs_min_odd_val) has_at_least_one_odd++;
        if (btsc < colcount) selections_spacers += '<td class="odds_res"></td>';
        
        if (cc == colcount) {
            cc = 0;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':selections_html,'css_class':''});
            selections_html = '';
        }
        cc++;
        btsc++;
    }
    if (has_at_least_one_odd == 0) return '';
    // last row was not added, as the cols created is smaller than the colcounjt for the bt
    if (cc <= colcount) {
        html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':selections_html,'css_class':''});
    }
    colcount_plus_spaces = colcount + colcount - 1;
    
    header_html = load_sb_tpl('sport_single_event_bet_type_normal_name',{'bet_type_name':bet_type_name,'colspan':colcount_plus_spaces,'bet_type_desc':bet_type.description,'selections_spacers':selections_spacers,'bt_id':bet_type.bt_id});
    
    
    var css_class = '';
    if (typeof bet_type.bc_id != 'undefined') {
        for (var c in bet_type.bc_id) {
            var cat = bet_type.bc_id[c];
            css_class += ' bci_'+cat;
        }
    }
    css_class += ' btid_'+bet_type.bt_id;
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':css_class,'rows':header_html+html});
}
function generate_single_event_bet_types_cat2(event,bet_type,count) {
    var html = '';
    var head_selections_spacers_html = '';
    var head_selections_html = '';
    var body_selections_html = '';
    var bet_type_name = bet_type.name;
    
    var btsc = 0;
    var colspan = 0;
    var td_w = (90/bet_type.selections.length);
    
    for (var bts_index in bet_type.selections) {
        var sel = bet_type.selections[bts_index];
        if (btsc > 0) {
            head_selections_spacers_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
            head_selections_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
            body_selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            colspan++; // header spacer
        }
        else {
            var sov_val = handle_bt_event_sov(sel.sov,bet_type.cat);
            body_selections_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_sov',{'sov':sov_val});
            colspan++;
        }
        colspan++;// header col
        var sov = '';
        if (typeof sel.sov != 'undefined') sov = sel.sov;
        var body_css_class = '';
        if (typeof sel.selected != 'undefined' && sel.selected == "1") body_css_class = ' selected';
        if (typeof sel.mc != 'undefined') body_css_class+= ' mc_'+sel.mc;
        
        var sel_name = sel.name;
        if (typeof sel.group != 'undefined' && sel.group == '1') sel_name = event.competitor1;
        else if (typeof sel.group != 'undefined' && sel.group == 'x') sel_name = sb_draw_text;
        else if (typeof sel.group != 'undefined' && sel.group == '2') sel_name = event.competitor2;
        
        
        head_selections_spacers_html += '<td class="odds_res"></td>';
        head_selections_html += load_sb_tpl('sport_single_event_bet_type_header_sel',{'selection_name':sel_name});
        
        var add_sel_link = 'a='+sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&selection_id='+sel.bts_id+'&sov='+sel.sov+'&bt_cat='+bet_type.cat;
        
        body_selections_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':body_css_class,'odd':format_odd_value(sel.odd),'sov':sov,'name':sel.name,'add_selection_link':add_sel_link,'extra':'width="'+td_w+'%"'});
        
        btsc++;
    }
    
    var bt_params = {'selections_spacers':head_selections_spacers_html,'bet_type_name':bet_type_name,'bet_type_desc':bet_type.description,'colspan':colspan,'bt_id':bet_type.bt_id};
    html = load_sb_tpl('sport_single_event_bet_type_normal_name',bt_params);
    
    var body_html = load_sb_tpl('sport_single_event_bet_type_odd_normal_row',{'selections':body_selections_html});
    
    html += body_html;
    
    var css_class = '';
    if (typeof bet_type.bc_id != 'undefined') {
        for (var c in bet_type.bc_id) {
            var cat = bet_type.bc_id[c];
            css_class += ' bcid_'+cat;
        }
    }
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':css_class,'rows':html});
}
function generate_single_event_bet_types_cat3_old(event,bet_type,count) {
    var html = '';
    var bet_type_name = bet_type.name;
    
    var btxs_id = bet_type.bt_id+'_'+get_sov_index(bet_type.sov);
    
    var btsc = 0;
    var colspan = 0;
    var td_w = (90/bet_type.selections.length);
    
    colspan = ((bet_type.selections.length*2)); // sov|sel|sp|sel
    
    if (typeof event.bet_types[btxs_id] == 'undefined') return 'x'+btxs_id+'<hr>';
    return 'y'+btxs_id+'<hr>';
    
    var sel_sov = [];
    for (var bts_index in bet_type.selections) {
        var sel = bet_type.selections[bts_index];
        for (var sov_index in sel.sov) {
            var row_sov = sel.sov[sov_index];
            row_sov.name = sel.name;
            
            if (typeof sel_sov[row_sov['sov']] == 'undefined') sel_sov[row_sov['sov']] = [];
            sel_sov[row_sov['sov']][sel.bts_id] = row_sov;
        }
    }
    
    
    head_selections_spacers_html = body_selections_html = '';
    
    for (var s in sel_sov) {
        var sel = sel_sov[s];
        var row_sov = s;
        var row_html = '';
        
        var first_sel_sov = true;
        for (var x in sel) {
            var row_sel = sel[x];
            var add_sel_link = 'a='+row_sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&selection_id='+row_sel.bts_id+'&sov='+row_sel.sov+'&bt_cat='+bet_type.cat;
            
            if (first_sel_sov) {
                var sov_val = handle_bt_event_sov(row_sel.sov,bet_type.cat);
                row_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_sov',{'sov':sov_val});
                first_sel_sov = false;
            }
            else {
                row_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            }
            var sov_f = get_sov_index(row_sel.sov);
            //console.log(row_sel.sov,sov_f);
            body_css_class = 'odd_bt3_'+event.e_id+'_'+row_sel.bts_id+'_sov'+sov_f;
            
            row_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':row_sel.bts_id,'css_class':body_css_class,'odd':format_odd_value(row_sel.odd),'sov':row_sel.sov,'name':row_sel.name,'add_selection_link':add_sel_link,'extra':'width="'+td_w+'%"'});
            
        }
        
        html += load_sb_tpl('sport_single_event_bet_type_odd_normal_row',{'selections':row_html});
    }
    var bt_params = {'selections_spacers':'','bet_type_name':bet_type_name,'bet_type_desc':bet_type.description,'colspan':colspan,'bt_id':bet_type.bt_id};
    var header_html = load_sb_tpl('sport_single_event_bet_type_normal_name',bt_params);
    
    var css_class = '';
    if (typeof bet_type.bc_id != 'undefined') {
        for (var c in bet_type.bc_id) {
            var cat = bet_type.bc_id[c];
            css_class += ' bcid_'+cat;
        }
    }
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':css_class,'rows':header_html+html});
    
}

function generate_single_event_bet_types_normal(event,bet_type,count) {
    
    var html = '';
    var head_selections_spacers_html = '';
    var head_selections_html = '';
    var body_selections_html = '';
    var bet_type_name = bet_type.name;
    
    var btsc = 0;
    var colspan = 0;
    var has_at_least_one_odd = 0;
    var td_w = (100/bet_type.selections.length);
    for (var bts_index in bet_type.selections) {
        var sel = bet_type.selections[bts_index];
        
        var bt_id = bet_type.bt_id;
        if (typeof sel.bt_id != 'undefined') bt_id = sel.bt_id;
        
        if (btsc > 0) {
            head_selections_spacers_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
            head_selections_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
            body_selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            colspan++; // header spacer
        }
        else {
            if (typeof bet_type.sov != 'undefined' || (typeof bet_type.cat != 'undefined' && bet_type.cat == "2")) {
                /*
                head_selections_spacers_html += '<td class="odds_res odds_res_sov"></td>';
                head_selections_html += load_sb_tpl('sport_odds_league_header_bt_sel_sov',{'sov':bet_type.sov});
                body_selections_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds_sov',{'sov':sel.sov});
                
                head_selections_spacers_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
                head_selections_html += load_sb_tpl('sport_single_event_bet_type_header_sel_spacer',{});
                body_selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
                colspan++;// sov
                colspan++;// header spacer
                */
                var sov_val = get_sov_index(sel.sov,bet_type.cat,true);
                bet_type_name += ' <span class="bt_sov">'+sov_val+'</span>';
            }
        }
        colspan++;// header col
        var sov = '';
        if (typeof sel.sov != 'undefined') sov = sel.sov;
        var body_css_class = '';
        
        if (typeof sel.selected != 'undefined' && sel.selected == "1") body_css_class = ' selected';
        if (typeof sel.mc != 'undefined') body_css_class+= ' mc_'+sel.mc;
        
        var sel_name = sel.name;
        if (typeof sel.group != 'undefined' && sel.group == '1') sel_name = event.competitor1;
        else if (typeof sel.group != 'undefined' && sel.group == 'x') sel_name = sb_draw_text;
        else if (typeof sel.group != 'undefined' && sel.group == '2') sel_name = event.competitor2;
        
        //console.log('sel');
        //console.log(sel);
        
        head_selections_spacers_html += '<td class="odds_res"></td>';
        head_selections_html += load_sb_tpl('sport_single_event_bet_type_header_sel',{'selection_name':sel_name});
        
        var add_sel_link = 'a='+sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bt_id+'&selection_id='+sel.bts_id+'&sov='+sel.sov+'&bt_cat='+bet_type.cat;
        if (sel.odd <= bs_min_odd_val) {
            sel.odd = '-';
            add_sel_link = false;
            body_css_class += ' disabled_odd';
        }
        else has_at_least_one_odd++;
        
        var odd_id =  'odd_'+event.e_id+'_'+bt_id+'_'+sel.bts_id;
        if (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") {
            var sov = bet_type.sov;
            if (typeof sov == 'number') sov = round_decimals(bet_type.sov,2);
            odd_id += '_'+get_sov_index(sov);
        }
        body_css_class += ' '+odd_id;
        
        body_selections_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':body_css_class,'odd':format_odd_value(sel.odd),'sov':sov,'name':sel.name,'add_selection_link':add_sel_link,'extra':'width="'+td_w+'%"'});
        
        btsc++;
    }
    
    if (has_at_least_one_odd == 0) return '';
    
    var bt_index_h = bet_type.bt_id
    if (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") {
        bt_index_h += '_'+get_sov_index(sov);
    }
    var bt_params = {'selections_spacers':head_selections_spacers_html,'bet_type_name':bet_type_name,'bet_type_desc':bet_type.description,'colspan':colspan,'bt_id':bt_index_h};
    html = load_sb_tpl('sport_single_event_bet_type_normal_name',bt_params);
    
    var body_html = load_sb_tpl('sport_single_event_bet_type_odd_normal_row',{'selections':body_selections_html});
    
    html += body_html;
    
    var css_class = '';
    if (typeof bet_type.bc_id != 'undefined') {
        for (var c in bet_type.bc_id) {
            var cat = bet_type.bc_id[c];
            css_class += ' bcid_'+cat;
        }
    }
    css_class += ' btid_'+bt_index_h;
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':css_class,'rows':html});
}

function toggle_single_cat(cat_id) {    
    
    $(".single_ev_btc_wrapper .bci_link").removeClass('selected');
    //$('.bet_types_col .odds_table').addClass('hide_btcol');
    
    if ($.isNumeric(cat_id) && cat_id > 0) {
        $(".single_ev_btc_wrapper .bci_link.bcil_"+cat_id).addClass('selected');
        //$('.bet_types_col .odds_table.bcid_'+cat_id).removeClass('hide_btcol');
        var event_odds = generate_single_event_bet_types(single_event_data,single_event_data.bet_types,cat_id);
    }
    else {
        $(".single_ev_btc_wrapper .bci_link.bcil_0").addClass('selected');
        //$('.bet_types_col .odds_table').removeClass('hide_btcol');
        var event_odds = generate_single_event_bet_types(single_event_data,single_event_data.bet_types);
    }
    
    $(".bet_types_cols_holder").replaceWith(event_odds);
}






function generate_single_event_bet_types_dynamic_cat4(event,bet_type,count) {

    return '';
    var html = '';
    var header_html = '';
    
    var btsc = 0; // bet type selections counter
    var colcount = 2; // max cols
    var cc = 1; // col counter
    var selections_html = '';
    var selections_spacers = '';
    
    
    var bt_sels = [];
    
    for (var bti_index in event.bet_types) {
        if (event.bet_types[bti_index]['bt_id'] == bet_type.bt_id) {
            bt_sels = event.bet_types[bti_index]['selections'];
            break;
        }
    }
    
    for (var bts_index in bt_sels) {
        var sel = bt_sels[bts_index];
        if (typeof sel == "undefined"){
            console.log('generate_single_event_bet_types_dynamic_cat4 - sel undefined');
            continue;
        }
        if (sel == null) continue;
        if (typeof sel.odd == 'undefined' || sel.odd <= bs_min_odd_val) {
            continue;
        }
        
        
        if (cc > 1) {
            if (btsc < colcount) selections_spacers += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
        }
        var sel_css_class = 'odd_'+event.e_id+'_'+sel.bt_id+'_'+sel.bts_id+'_'+sel.btd_id;
        var sel_sov = '';
        var add_selection_link = 'a='+sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&btd_id='+sel.btd_id+'&sov='+sel_sov+'&bt_cat='+bet_type.cat+'&selection_id=0';
        selections_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':sel_css_class,'odd':format_odd_value(sel.odd),'sov':sel_sov,'name':sel.name,'add_selection_link':add_selection_link});
        if (btsc < colcount) selections_spacers += '<td class="odds_res"></td>';
        
        if (cc == colcount) {
            cc = 0;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':selections_html,'css_class':''});
            selections_html = '';
        }
        cc++;
        btsc++;
    }
    //console.log(bet_type,btsc);
    if (btsc == 0) return '';
    colcount_plus_spaces = colcount + colcount - 1;
    
    header_html = load_sb_tpl('sport_single_event_bet_type_normal_name',{'bet_type_name':bet_type.name,'colspan':colcount_plus_spaces,'bet_type_desc':bet_type.description,'selections_spacers':selections_spacers,'bt_id':bet_type.bt_id});
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':'odds_tbl_cat4','rows':header_html+html});
}

function generate_single_event_bet_types_dynamic_cat5_na(event,bet_type,count) {
    
    if (typeof gauci_test != 'undefined' && gauci_test === true && typeof bet_type.bt_id != 'undefined' && bet_type.bt_id == "1168") {
        return generate_single_event_bet_types_dynamic_cat5_gauci(event,bet_type,count);
    }
    
    var header_html = subheader_html = row_html = html = '';
    var sels_array = [];
    
    // loop bet type selections
    // create html for header with selection names
    // populate sel_array array with order of bet type selections
    subheader_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':''});
    for (var s in bet_type.selections) {
        var bts = bet_type.selections[s];
        header_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':bts.name});
        subheader_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':''});
        sels_array[bts.bts_id] = bts;
    }
    // append to the html, the name of the bet type, and the selections
    html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_header',{'bet_type_name':bet_type.name,'bt_sels':header_html});
    //html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':subheader_html,'css_class':'odd'});
    
    // next we loop all the selections available for the event
    // while looping, we populate the array sel_rows using the element id as first index
    // creating and other array for the selections for each element
    // an element is a player
    var sel_rows = [];
    for (var e in event.selections) {
        var ev_sel = event.selections[e];
        // event sel not in bet type
        if (typeof sels_array[ev_sel.bts_id] == 'undefined') {
            continue;
        }
        
        // create the first index using the element if not available
        if (typeof sel_rows[ev_sel.element_id1] == 'undefined') {
            sel_rows[ev_sel.element_id1] = {'competitor':ev_sel.name,'sels':[]};
            // loop the bt selections to create order of selections
            for (var sa in sels_array) {
                sel_rows[ev_sel.element_id1]['sels'][sa] = [];
            }
        }
        // now, we populate the selection info with the event selection
        sel_rows[ev_sel.element_id1]['sels'][ev_sel.bts_id] = ev_sel;
    }
    // in case we have no rows available, we stop here and return an empty string as html output
    if (sel_rows.length == 0) return '';
    
    // at this point we have a list of elements (players)
    // and each element has the selections available for each element
    // we loop each element to create a row in the html output
    var row_css_class = 'odd'; // row css
    for (var r in sel_rows) {
        var row = sel_rows[r];
        // each row display element (player)
        row_html = load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':row['competitor']});
        // loop the selections per row
        for (var i in row.sels) {
            var sel = row.sels[i];
            
            // setup params to generate the td containing link to add selection
            var sel_params = sel;
            sel_params.event_id = event.e_id;
            sel_params.cat = sel.cat_id;
            row_html += generate_odd_td(sel_params);
        }
        // update html with current row and clear the row html
        html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':row_html,'css_class':row_css_class+' cat5_row'});
        row_html = '';
        // alternate row css
        if (row_css_class == 'odd') row_css_class = 'even';
        else row_css_class = 'odd';
        
    }
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':'odds_tbl_cat5 odds_tbl_bt_'+bet_type.bt_id,'rows':html});
    
}

function generate_single_event_bet_types_dynamic_cat5(event,bet_type,count){      
    
    var header_html = subheader_html = row_html = html = '';
    var sels_array = [];
    
    // loop bet type selections
    // create html for header with selection names
    // populate sel_array array with order of bet type selections
    subheader_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':''});
    for (var s in bet_type.selections) {
        var bts = bet_type.selections[s];
        header_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':bts.name});
        subheader_html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':''});
        sels_array[bts.bts_id] = bts;
    }
    // append to the html, the name of the bet type, and the selections
    html += load_sb_tpl('sport_single_event_bet_type_fixed_sels_header',{'bet_type_name':bet_type.name,'bt_sels':header_html});
    //html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':subheader_html,'css_class':'odd'});
    
    // next we loop all the selections available for the event
    // while looping, we populate the array sel_rows using the element id as first index
    // creating and other array for the selections for each element
    // an element is a player
    var sel_rows = [];
    for (var e in event.selections) {
        var ev_sel = event.selections[e];
        // event sel not in bet type
        if (typeof sels_array[ev_sel.bts_id] == 'undefined') {
            continue;
        }
        
        // create the first index using the element if not available
        if (typeof sel_rows[ev_sel.element_id1] == 'undefined') {
            sel_rows[ev_sel.element_id1] = {'competitor':ev_sel.name,'sels':[]};
            // loop the bt selections to create order of selections
            for (var sa in sels_array) {
                sel_rows[ev_sel.element_id1]['sels'][sa] = [];
            }
        }
        // now, we populate the selection info with the event selection
        sel_rows[ev_sel.element_id1]['sels'][ev_sel.bts_id] = ev_sel;        
    }
    
    // in case we have no rows available, we stop here and return an empty string as html output
    if (sel_rows.length == 0) return '';
    
    // at this point we have a list of elements (players)
    // and each element has the selections available for each element
    // we loop each element to create a row in the html output
    var row_css_class = 'odd'; // row css
    for (var r in sel_rows) {
        var row = sel_rows[r];
        // each row display element (player)
        row_html = load_sb_tpl('sport_single_event_bet_type_fixed_sels_sel_header',{'bts_name':row['competitor']});
        
        // since bet type sels might have a different sort order
        // we loop the selections, and match the info from the dynamic bet type selection row
        for (var s in bet_type.selections) {
            var bts = bet_type.selections[s];
            // selection info from row
            var sel = row.sels[bts.bts_id];
            
            var sel_params = sel;
            sel_params.event_id = event.e_id;
            sel_params.cat = sel.cat_id;
            sel_params.sel_name = bts.name;
            row_html += generate_odd_td(sel_params);
        }
        
        // update html with current row and clear the row html
        html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':row_html,'css_class':row_css_class+' cat5_row'});
        row_html = '';
        // alternate row css
        if (row_css_class == 'odd') row_css_class = 'even';
        else row_css_class = 'odd';
        
    }
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':'odds_tbl_cat5 odds_tbl_bt_'+bet_type.bt_id,'rows':html});
    
}

function generate_single_event_bet_types_cat3(event,bet_type,count) {
    
    var btsc = 0; // bet type selections counter
    var cc = 1; // col counter
    var bt_sels = bet_type.selections;
    var sel_count = Object.keys(bt_sels).length;
    var bt_cat = bet_type.cat;
    
    var col_count = (sel_count * 2) - 1; // including spacers in between selection, -1 = remove last spacer after selection
    var cell_width = 90/sel_count;
    cell_width += '%';
    
    if (bt_cat != "10") {
        col_count += 1; // add sov value on the side
    }
    else {
        cell_width = 100/sel_count;cell_width += '%'; // sov value not displayed. we remove the 10% space for sov display
    }
    
    if (bet_type.bt_id == "1114") console.log("CAT10BT",bet_type);
    
    var html = header_html = '';
    
    //return '<div style="border:1px solid red;margin:10px;padding:10px;">'+bet_type.name+'</div>';
    
    html += load_sb_tpl('sport_single_event_bet_type_normal_name',{'bet_type_name':bet_type.name,'bet_type_desc':bet_type.name,'colspan':col_count});
    
    var sov_from = parseFloat(bet_type.sov_from);
    var sov_to = parseFloat(bet_type.sov_to);
    var sov_inc = parseFloat(bet_type.sov_inc);
    
    if (sov_inc <= 0) {
        if (bet_type.cat == "10") console.log("sov_inc <= 0",sov_inc,bet_type.bt_id);
        return '';
    }
    
    var at_least_one_sov = false;
    var row_css_class = 'odd'; // row css
    for (var i = sov_from;i<=sov_to;i += sov_inc) {
        
        var def_sov = round_decimals(i,2);
        
        var row_html = '';
        var c = 0;
        for (var selid in bt_sels) {
            var bt_sel = bt_sels[selid];
            
            var sel_index = 'sov_'+bt_sel.bts_id+'_'+get_sov_index(def_sov);
            
            if (typeof event.selections[sel_index] == 'undefined') {
                if (bet_type.bt_id == "1114") console.log('sel_index not found',sel_index,def_sov,get_sov_index(def_sov),event.selections);
                continue;
            }
            
            var sel = event.selections[sel_index];
            
            var sel_css_class = 'odd_'+event.e_id+'_'+sel.bt_id+'_'+sel.bts_id+'_'+get_sov_index(def_sov);
            if (typeof sel.selected != "undefined" && sel.selected == "1") sel_css_class += ' selected';
            if (typeof sel.mc != 'undefined') sel_css_class += ' mc_'+sel.mc;
            
            var sel_odd = sel.odd;
            var add_selection_link = 'a='+sel.add_sel_link;//'event_id='+event.e_id+'&bet_type_id='+bet_type.bt_id+'&btd_id='+sel.btd_id+'&sov='+sel_sov+'&bt_cat='+bet_type.cat+'&selection_id=0';
            var sel_sov = '';
            
            if (sel_odd <= bs_min_odd_val) {
                sel_odd = '-';
                add_selection_link = false;
                sel_css_class += ' disabled_odd';
            }
            else {
                sel_odd = format_odd_value(sel_odd);
            }
            
            //if (bet_type.cat == "10") console.log("CAT10",bt_sel);
            
            var sel_name = bt_sel.name;
            if (bt_cat == "10") {
                //console.log(bt_sel);
                var sel_sov_disp = i;
                if (bt_sel.bts_ref == "2" || bt_sel.bts_ref == "AHC_2" || bt_sel.bts_ref == "AWAY"){
                    sel_sov_disp = (i*-1);
                }
                sel_sov_disp = get_sov_index(sel_sov_disp,10,true);
                if (i != 0) {
                    sel_name += " ("+sel_sov_disp+")";
                }
            }
            
            row_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':sel_css_class,'odd':sel_odd,'sov':def_sov,'name':sel_name,'add_selection_link':add_selection_link,"extra":"style='width:"+cell_width+"'"});
            
            c++;
            
            
            if (c < sel_count) row_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
        }
        

        if (row_html != '' && bt_cat != "10" && bt_cat != "2") { //Normal SOVs (e.g. 1.50)
            var sov_tpl_id = 'sport_single_event_bet_type_header_sel_extra';
            if ($("#sport_single_event_bet_type_header_sel_extra").length == 0) sov_tpl_id = 'sport_single_event_bet_type_header_sel';
            row_html = load_sb_tpl(sov_tpl_id,{'selection_name':def_sov,'extra':"style='width:10%;'"}) + row_html;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':row_html,'css_class':row_css_class+' cat3_row'});
            at_least_one_sov = true;
        }
        else if (row_html != '' && bt_cat == "10") { //Asian handicap; Here the SOV was included with the selection name
            var sov_tpl_id = 'sport_single_event_bet_type_header_sel_extra';
            if ($("#sport_single_event_bet_type_header_sel_extra").length == 0) sov_tpl_id = 'sport_single_event_bet_type_header_sel';
            //row_html = load_sb_tpl(sov_tpl_id,{'selection_name':def_sov,'extra':"style='width:10%;'"}) + row_html;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':row_html,'css_class':row_css_class+' cat3_row'});
            at_least_one_sov = true;
        }
        //Added JB 2/8/2022 - Ticket BS-431
        else if (row_html != '' && bt_cat == "2"){ //European handicap, e.g. -2 should be displayed as 0:2
            var sov_tpl_id = 'sport_single_event_bet_type_header_sel_extra';
            if ($("#sport_single_event_bet_type_header_sel_extra").length == 0) sov_tpl_id = 'sport_single_event_bet_type_header_sel';
            def_sov = get_sov_index(def_sov,2,true).replace('(', '').replace(')', '');
            row_html = load_sb_tpl(sov_tpl_id,{'selection_name':def_sov,'extra':"style='width:10%;'"}) + row_html;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':row_html,'css_class':row_css_class+' cat3_row'});
            at_least_one_sov = true;            
        }
                
        row_html = '';
        // alternate row css
        if (row_css_class == 'odd') row_css_class = 'even';
        else row_css_class = 'odd';
    }
    
    if (at_least_one_sov) {
        return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':'odds_tbl_cat3 odds_tbl_bt_'+bet_type.bt_id,'rows':html});
    }
    return '';
}

function generate_single_event_bet_types_dynamic(event,bet_type,count) {
    var html = '';
    var header_html = '';     
    
    //console.log(bet_type.cat);
    
    if (bet_type.cat == "4") {   
        return generate_single_event_bet_types_dynamic_cat4(event,bet_type,count);
    }
    else if (bet_type.cat == "6"){ //Added JB Ticket 12593 //JJJJBBBB
        return generate_league_antepost_events_btcat_4(event,bet_type,{hide_btd_id:1}); //Function in /sportsbook/t6/js/odds_antepost.js
    }
    if (bet_type.cat == "5" || bet_type.cat == "7") {   
        //console.log("CAT 5",bet_type.name);       
        return generate_single_event_bet_types_dynamic_cat5(event,bet_type,count);
    }
    
    if (bet_type.cat == "2" || bet_type.cat == "3" || bet_type.cat == "10" || bet_type.cat == "11") {
        return generate_single_event_bet_types_cat3(event,bet_type,count);
    }
    
    var btsc = 0; // bet type selections counter
    var colcount = 5; // max cols
    var cc = 1; // col counter
    var selections_html = '';
    var selections_spacers = '';
    var bt_sels = bet_type.selections;
    
    for (var bts_index in bt_sels) {
        var sel = bt_sels[bts_index];
        if (typeof sel || typeof sel.odd == 'undefined' || sel.odd <= bs_min_odd_val) {
            continue;
        }
        
        
        if (cc > 1) {
            if (btsc < colcount) selections_spacers += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
            selections_html += load_sb_tpl('sport_single_event_bet_type_odd_spacer',{});
        }
        var sel_css_class = '';
        var sel_sov = '';
        selections_html += load_sb_tpl('sport_single_event_bet_type_odd_dynamic',{'event_id':event.e_id,'selection_id':sel.bts_id,'css_class':sel_css_class,'odd':format_odd_value(sel.odd),'sov':sel_sov,'name':sel.name});
        if (btsc < colcount) selections_spacers += '<td class="odds_res"></td>';
        
        if (cc == colcount) {
            cc = 0;
            html += load_sb_tpl('sport_single_event_bet_type_dynamic_row',{'selections':selections_html,'css_class':''});
            selections_html = '';
        }
        cc++;
        btsc++;
    }
    //console.log(bet_type,btsc);
    if (btsc == 0) return '';
    colcount_plus_spaces = colcount + colcount - 1;
    
    header_html = load_sb_tpl('sport_single_event_bet_type_normal_name',{'bet_type_name':bet_type.name,'colspan':colcount_plus_spaces,'bet_type_desc':bet_type.description,'selections_spacers':selections_spacers,'bt_id':bet_type.bt_id});
    
    return load_sb_tpl('sport_single_event_bet_type_wrapper',{'css_class':'','rows':header_html+html});
}