// the function is used to build and populate the odds for the home/landing section
function build_the_odds_ajax_home(output) {
    // get valid json object
    var home_odds_data = get_valid_json(output);
    
    // display error if object is NOT valid
    if (home_odds_data == false || typeof home_odds_data.errors != "undefined") {
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
            
            if ($(".soh_content_upcoming").attr("data-upcoming-version") != "undefined" && $(".soh_content_upcoming").attr("data-upcoming-version") != null && $(".soh_content_upcoming").attr("data-upcoming-version") != false) {
                league_params.version = $(".soh_content_upcoming").attr("data-upcoming-version");
            }
            if ($(".soh_content_upcoming").attr("data-max-events") != "undefined" && $(".soh_content_upcoming").attr("data-max-events") != null && $(".soh_content_upcoming").attr("data-max-events") != false) {
                league_params.max_events = $(".soh_content_upcoming").attr("data-max-events");
            }
            if ($(".soh_content_upcoming").attr("data-max-sport-events") != "undefined" && $(".soh_content_upcoming").attr("data-max-sport-events") != null && $(".soh_content_upcoming").attr("data-max-sport-events") != false) {
                league_params.max_sport_events = $(".soh_content_upcoming").attr("data-max-sport-events");
            }
            
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
        else {
            $('.soh_content_hot').html('');
        }
        
        /*
        // expecting football 1x2
        if (typeof home_odds_data.featured != 'undefined' && typeof home_odds_data.featured.selections != 'undefined' && Object.keys(home_odds_data.featured.selections).length == 3) {
            
            var feat_odds = jQuery.extend({},home_odds_data.featured);
            //create_most_played_stats_home(feat_odds,'.soh_content_feat_stats');
        }
        else $('.soh_content_feat_stats').html('qqq');
        */
        
        /*
        if (
            typeof home_odds_data.results != 'undefined' 
            && Object.keys(home_odds_data.results).length > 0
            && typeof home_odds_data.results.events != 'undefined' && Object.keys(home_odds_data.results.events).length > 0
        ) {
            var event_results = jQuery.extend({},home_odds_data.results);
            create_event_results_home(event_results);
        }*/
        if (
            typeof home_odds_data.market_movers != 'undefined' 
            && Object.keys(home_odds_data.market_movers).length > 0
            && typeof home_odds_data.market_movers != 'undefined' && Object.keys(home_odds_data.market_movers).length > 0
        ) {
            var event_movers = {};
            event_movers.widgets = jQuery.extend({},home_odds_data.market_movers);
            event_movers.title = home_odds_data.title.market_movers;
            create_market_movers_home(event_movers);
        }
        
        //======================================================================
        /// widgets related functionality
        //======================================================================
        
    }
    // reset opened leagues and remove css classes from menu
    open_leagues = [];
    $(".league_item_li.open").removeClass("open");
    $("#sports_odds .sports_scroll_content").html('');
    $("#sports_odds .sports_scroll_single_event").html('');
    
}

function format_odds_widget(widget_elem) {
    if (typeof user_odd_format != 'undefined') {
        if (user_odd_format == 'fraction') {
            current_odd_format = 'fraction';
        }
        else if (user_odd_format == 'american') {
            current_odd_format = 'american';
        }
        else if (user_odd_format == 'decimal') {
            current_odd_format = 'decimal';
        }
    }
    
    var fn_name = 'odd_decimal_to_'+current_odd_format;
    var fn = window[fn_name];
    if (typeof fn != 'function') {
        return;
    }
    
    $(".ev_sel_odd .odd",widget_elem).each(function() {
        var odd = $(this).text();
        var odd_new = fn(odd);
        if (odd_new == '-') return true;
        $(this).text(odd_new);
    });
    //widget_elem
}

// basic function to load and display the home section ajax contents
function load_homepage(get_new) {
    if (typeof xhr_ajax != 'undefined' && xhr_ajax != false && typeof xhr_ajax['get_odds'] != 'undefined' && xhr_ajax['get_odds'] != false) {
        xhr_ajax.abort();
    }
    //$(".sports_odds_home .soh_content").html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':''}));
    var home_url = 'home=1';
    
    if (typeof bs_widgets != 'undefined') {
        for (var w in bs_widgets) {
            var widget = bs_widgets[w];
            home_url += '&widget[]='+widget.ref;
        }
    }
    if (typeof bs_widgets_extra_params != 'undefined') {
        for (var w in bs_widgets_extra_params) {
            home_url += bs_widgets_extra_params[w];
        }
    }
    
    setTimeout(function() { get_sports_data('get_odds', home_url, 'build_the_odds_ajax_home'); }, 30);
    show_homepage();
}

function create_market_movers_home(movers_data_all_widgets) {
    
    if (typeof movers_data_all_widgets.widgets == 'undefined') return false;
    
    for (var mm_ref in movers_data_all_widgets.widgets) {
        var movers_data = movers_data_all_widgets.widgets[mm_ref];
        var bw_id = movers_data.bw_id;
        create_market_movers_for_div(bw_id,movers_data_all_widgets.title,movers_data);
    }
}
function create_market_movers_for_div(div_ref,movers_title,movers_data) {
    if (sb_debug) console.log('create_market_movers_for_div',div_ref,movers_data);
    var html = '';
    var events_html = '';
    
    var sels = {};
    for (var s in movers_data.sel_info) {
        sels[s] = movers_data.sel_info[s];
    }
    for (var i in movers_data.events) {
        var event = movers_data.events[i];
        var odds_html = '';
        
        var sel1_css_class = 'na';
        if (event.sel_1.value > event.sel_1.old_value) sel1_css_class = 'up';
        else if (event.sel_1.value < event.sel_1.old_value) sel1_css_class = 'down';
        
        var odd_id =  'odd_'+event.e_id+'_'+event.sel_1.bt_id+'_'+event.sel_1.bts_id;
        sel1_css_class += ' '+odd_id;
        
        odds_html += load_sb_tpl('sport_odds_market_movers_event_sel_name',{'selection_name':sels['sel_1'].name});
        var add_sel_link = 'a='+event.sel_1.add_sel_link;
        odds_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(event.sel_1.value),'event_id':event.e_id,'selection_id':sels['sel_1'].bts_id,'css_class':sel1_css_class});
        
        var sel2_css_class = 'na';
        if (event.sel_2.value > event.sel_2.old_value) sel2_css_class = 'up';
        else if (event.sel_2.value < event.sel_2.old_value) sel2_css_class = 'down';
        
        var odd_id =  'odd_'+event.e_id+'_'+event.sel_2.bt_id+'_'+event.sel_2.bts_id;
        sel2_css_class += ' '+odd_id;
        
        odds_html += load_sb_tpl('sport_odds_market_movers_event_sel_name',{'selection_name':sels['sel_2'].name});
        var add_sel_link = 'a='+event.sel_2.add_sel_link;
        odds_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(event.sel_2.value),'event_id':event.e_id,'selection_id':sels['sel_2'].bts_id,'css_class':sel2_css_class});
        
        var sel3_css_class = 'na';
        if (event.sel_3.value > event.sel_3.old_value) sel3_css_class = 'up';
        else if (event.sel_3.value < event.sel_3.old_value) sel3_css_class = 'down';
        
        var odd_id =  'odd_'+event.e_id+'_'+event.sel_3.bt_id+'_'+event.sel_3.bts_id;
        sel3_css_class += ' '+odd_id;
        
        odds_html += load_sb_tpl('sport_odds_market_movers_event_sel_name',{'selection_name':sels['sel_3'].name});
        var add_sel_link = 'a='+event.sel_3.add_sel_link;
        odds_html += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(event.sel_3.value),'event_id':event.e_id,'selection_id':sels['sel_3'].bts_id,'css_class':sel3_css_class});
        event.odds = odds_html;
        if ((event.competitor1.length + event.competitor2.length) > 30) {
            var cp1diff = 27 - event.competitor1.length;
            
            event.competitor2 = event.competitor2.substring(0,cp1diff)+'..';
        }
        events_html += load_sb_tpl('sport_odds_market_movers_event_html',event);
    }
    
    var events_cycle = events_css = '';
    if (typeof $(".soh_market_movers_bw_id_"+div_ref).attr('data-cycleinfo') != 'undefined') {
        var cycle_info = get_valid_json($(".soh_market_movers_bw_id_"+div_ref).attr('data-cycleinfo'));
        for (var c in cycle_info) {
            events_cycle += ' data-cycle-'+c+'="'+cycle_info[c]+'"';
        }
        events_css = 'cycle-slideshow';
    }
    html = load_sb_tpl('sport_odds_market_movers_html',{'section_name':movers_title,'events':events_html,'events_cycle':events_cycle,'events_css':events_css});
    if (sb_debug) console.log($(".soh_market_movers_bw_id_"+div_ref).length);
    $(".soh_market_movers_bw_id_"+div_ref).html(html);
    $(".soh_market_movers_bw_id_"+div_ref+" .cycle-slideshow").cycle();
    
    return true;
}


function create_pie_chart(jq_elem) {
    var json_attr = $(jq_elem).attr("data-jsonpie");
    var opts = get_valid_json(json_attr);
    
    $(jq_elem).easyPieChart(opts);
}



function create_event_results_home(widget_id,results_data_raw) {
    
    results_data = get_valid_json(results_data_raw);
    if (results_data == false) return false;
    
    if (sb_debug) console.log('Parsing results for widget_id:',widget_id,results_data);
    
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




function get_event_time_html(event) {
    if (typeof event.match_info == 'undefined') return 'X';
    
    var matchtime = '';
    var matchstatus = '';
    var e_id = event.e_id;
    var css_class = '';
    
    if (event.match_info.status == 'not_started') matchtime = 'Not started';
    else if (event.match_info.matchtime != '' && event.match_info.matchtime != null) {
        matchtime = event.match_info.matchtime;
        if (jQuery.isNumeric(matchtime)) {
            css_class += ' ev_has_mtime';
            if (typeof event.match_info.status != 'undefined') {
                if (typeof br_status[event.s_id] != 'undefined' && typeof br_status[event.s_id][event.match_info.status] != 'undefined') {
                    matchstatus = br_status[event.s_id][event.match_info.status];
                }
                else {
                     matchstatus = event.match_info.status;
                }
                css_class += ' ev_has_mstatus';
            }
            matchtime = replaceAll(matchtime,'_',' ');
            matchtime += " <span class='ev_mt_min'>min</span><span class='ev_mt_quot'>'</span>";
        }
    }
    else {
        if (typeof event.match_info.status != 'undefined') {
            if (typeof br_status[event.s_id] != 'undefined' && typeof br_status[event.s_id][event.match_info.status] != 'undefined') {
                matchstatus = br_status[event.s_id][event.match_info.status];
            }
            else {
                 matchstatus = event.match_info.status;
            }
            css_class += ' ev_has_mstatus';
        }
        matchtime = replaceAll(matchtime,'_',' ');
    }
    return load_sb_tpl("sports_event_time_v2",{'event_id':e_id,'time':matchtime,'status':matchstatus,'css_class':css_class});
}
function get_event_score_html(event) {
    if (typeof event.match_info == 'undefined') return '';
    if (typeof event.match_info.score == 'undefined') return '';
    
    var html = get_score_html(event.match_info.score);
    return '<span class="ml_event_score">'+html+'</span>';
}
function get_score_html(event_score) {
    if (typeof event_score != 'object') return event_score;
    if (typeof event_score.c1 == 'undefined' || typeof event_score.c2 == 'undefined') return '';
    
    if (event_score.c1 == '-') event_score.c1 = 0;
    if (event_score.c2 == '-') event_score.c2 = 0;
    
    out = '<span class="ev_m_score ev_m_score_1">'+event_score.c1+'</span><span class="ev_m_score_div"> - </span><span class="ev_m_score ev_m_score_2">'+event_score.c2+'</span>';
    
    return out;
}

var sb_menu_feautred_leagues = {};
function set_featured_leagues(div_id,leagues_list) {
    var json_leagues = get_valid_json(leagues_list);
    if (!json_leagues) return false;
    sb_menu_feautred_leagues[div_id] = json_leagues;
}
var sb_menu_feautred_antepost = {};
function set_featured_antepost(div_id,leagues_list) {
    var json_leagues = get_valid_json(leagues_list);
    if (!json_leagues) return false;
    sb_menu_feautred_antepost[div_id] = json_leagues;
}

function build_feautred_antepost() {
    if (sb_menu_data.events_antepost == false) return false;
    if (Object.keys(sb_menu_feautred_antepost).length == 0) return true;
    
    var events_index = {};
    var leagues_index = {};
    var sports_index = {};
    for (var i in sb_menu_data.leagues_antepost) {
        var lg = sb_menu_data.leagues_antepost[i];
        leagues_index[lg.l_id] = lg;
    }
    for (var i in sb_menu_data.sports_antepost) {
        var lg = sb_menu_data.sports_antepost[i];
        sports_index[lg.s_id] = lg;
    }
    
    for (var i in sb_menu_data.events_antepost) {
        var ante = sb_menu_data.events_antepost[i];
        events_index[ante.e_id] = ante;
    }
    
    for (var div_id in sb_menu_feautred_antepost) {
        var leagues = sb_menu_feautred_antepost[div_id];
        var lg_html = '';
        for (var i in leagues) {
            var league = leagues[i];
            var league_id = league['league_id'];
            var event_id = league['event_id'];
            var league_img = league['img'];
            if (typeof leagues_index[league_id] == 'undefined') continue;
            
            var sport_id = leagues_index[league_id]['s_id'];
            var sport_name = sports_index[sport_id]['name'];
            
            var image_css = 'noimage';
            var image_style = '';
            if (league_img != "") {
                image_css = '';
                image_style = 'style="background-image:url(\''+league_img+'\');"';
            }
            
            var league_name = leagues_index[league_id]['league_name'];
            var event_name = events_index[event_id]['competitor1'];
            //lg_html += '<a href="#league/'+league_id+'-undefined" class="league_item ajax_league_link" data-lid="'+league_id+'" onclick="toggle_league_menu(\''+league_id+'\');return false;"><span class="img">'+img+'</span><span>'+league_name+'</span></a>';
            var lg_params = {
                'league_link': '#league/'+league_id+'-undefined',
                'league_css_class': 'league_item '+image_css,
                'league_id': league_id,
                'event_id': event_id,
                'league_name': league_name,
                'event_name': event_name,
                'sport_name': sport_name,
                'image_css': image_css,
                'image_style': image_style,
            };
            lg_html += load_sb_tpl('sports_menu_featured_antepost_item',lg_params);
        }
        
        $("#"+div_id).html('<div class="featured_leagues_list">'+lg_html+'</div>');
    }
}

// ajax onsuccess callback function
function build_the_menu_ajax(output) {
    sb_menu_data = get_valid_json(output);
    build_the_menu();
    if (sb_menu_data == false) return false;
    build_feautred_antepost();
    if (Object.keys(sb_menu_feautred_leagues).length == 0) return true;
    if (typeof sb_menu_data.filters != 'undefined') return true;
    
    var html = '';
    var leagues_index = {};
    var sports_index = {};
    for (var i in sb_menu_data.leagues) {
        var lg = sb_menu_data.leagues[i];
        leagues_index[lg.l_id] = lg;
    }
    for (var i in sb_menu_data.sports) {
        var lg = sb_menu_data.sports[i];
        sports_index[lg.s_id] = lg;
    }
    
    for (var div_id in sb_menu_feautred_leagues) {
        var leagues = sb_menu_feautred_leagues[div_id];
        var lg_html = '';
        for (var i in leagues) {
            var league = leagues[i];
            var league_id = league['id'];
            var league_img = league['img'];
            
            if (league_id.indexOf(",") != "-1") {
                var sport_id = -1;
                var sport_name = '';
                var league_name = '';
                var lg_tpl_id = 'sports_menu_featured_league_gp_item';
                var league_link = '#leagues/'+league_id;
                
                console.log('GROUPED!',league);
                
                if (typeof league.groupname != 'undefined' && $.trim(league.groupname) != "") {
                    console.log("ABD",league.groupname);
                    league_name = league.groupname;
                }
                else {
                    var tmp = handle_grouped_ft_leagues(league_id,leagues_index,sports_index);
                    sport_id = tmp.sport_id;
                    sport_name = tmp.sport_name;
                    league_name = tmp.league_name;
                }
            }
            else {
                if (typeof leagues_index[league_id] == 'undefined') continue;
                
                var sport_id = leagues_index[league_id]['s_id'];
                var sport_name = sports_index[sport_id]['name'];
                var league_name = leagues_index[league_id]['league_name'];
                var lg_tpl_id = 'sports_menu_featured_league_item';
                var league_link = '#league/'+league_id+'-undefined';
            }
            
            var image_css = 'noimage';
            var image_style = '';
            if (league_img != "") {
                image_css = '';
                image_style = 'style="background-image:url(\''+league_img+'\');"';
            }
            
            //lg_html += '<a href="#league/'+league_id+'-undefined" class="league_item ajax_league_link" data-lid="'+league_id+'" onclick="toggle_league_menu(\''+league_id+'\');return false;"><span class="img">'+img+'</span><span>'+league_name+'</span></a>';
            var lg_params = {
                'league_link': league_link,
                'league_css_class': 'league_item',
                'league_id': league_id,
                'league_name': league_name,
                'sport_name': sport_name,
                'image_css': image_css,
                'image_style': image_style,
            };
            lg_html += load_sb_tpl(lg_tpl_id,lg_params);
        }
        $("#"+div_id).html('<div class="featured_leagues_list">'+lg_html+'</div>');
    }
    
}

function handle_grouped_ft_leagues(league_ids,leagues_index,sports_index) {
    var output = {
        'sport_id':-1,
        'sport_name':'N/A',
        'league_name':'Grouped',
    };
    
    var lnames = [];
    
    var leagues = league_ids.split(",");
    var lname = sname = '';
    for (var i in leagues) {
        if (i == "") continue;
        
        var lid = leagues[i];
        var sid = leagues_index[lid]['s_id'];
        
        if (typeof leagues_index[lid] == 'undefined') continue;
        if (lname == '') lname = leagues_index[lid]['league_name'];
        lnames[i] = leagues_index[lid]['league_name'];
        if (sname == '') sname = sports_index[sid]['name'];
    }
    if (lname != '') output.league_name = lname;
    if (sname != '') output.sport_name = sname;
    
    var newlname = '';
    var matches = [];
    var c = 0;
    for (var x in lnames) {
        
        if (c >= sb_max_leagues_url) break;
        
        var lnc = -1;
        if (lnames[x].indexOf(",") != -1) {
            //console.log("COMMA found in ",lnames[x]);
            lnc = lnames[x].indexOf(",");
        }
        if (lnames[x].indexOf(".") != -1) {
            lnc = lnames[x].indexOf(".");
        }
        
        if (lnc != "-1") {
            lnames[x] = lnames[x].substring(0,lnc);
        }
        
        var t = lnames[x].split(" ");
        var real_matches = [];
        for (var tt in t) {
            
            t[tt] = replaceAll(t[tt],"\\,","");
            t[tt] = replaceAll(t[tt],"\\.","");
            
            //console.log('AA',tt,t[tt]);
            
            if (typeof matches[t[tt]] == 'undefined') matches[t[tt]] = 0;
            matches[t[tt]]++;
        }
        c++;
    }
    
    var lgcount = lnames.length;
    
    for (var i in matches) {
        if (matches[i] == c) newlname += i+" ";
    }
    //console.log(matches);
    if ($.trim(newlname) != "") output.league_name = newlname;
    
    return output;
}
function open_grouped_leagues(league_ids) {
    var leagues = league_ids.split(",");
    var c = 0;
    for (var i in leagues) {
        if (i == "") continue;
        var lid = leagues[i];
        if (c >= sb_max_leagues_url) return;
        open_league_menu(lid,false);
        c++;
    }
}

function get_upcoming_events_custom(div_id,widget_settings_raw) {
    var widget_settings = get_valid_json(widget_settings_raw);
    if (!widget_settings) return false;
    
    var widget_settings_txt = JSON.stringify(widget_settings);
    
    get_sports_data("custom_upcoming_events","&custom_upcoming_events=1&widget_settings="+widget_settings_txt+"&div_id="+div_id,'display_upcoming_events_custom');
}

function display_upcoming_events_custom(input) {
    var json_data = get_valid_json(input);
    if (!json_data) return false;
    
    console.log('display_upcoming_events_custom');
    //console.log(json_data);
    
    var league_params = {};
    /*
    league_params.home = true;
    league_params.home_div = '#'+json_data.div_id;
    league_params.home_sports_div_css = 'upcoming';
    
    generate_league_html_home({"0":json_data},league_params);
    */
    
    var html = '';
    
    var league_name = false;
    
    for (var i in json_data['events']) {
        var event = json_data['events'][i];
        
        var sel_ttl = sel_odd = '';
        
        for (var b in json_data['bet_types']) {
            for (var s in json_data['bet_types'][b]['selections']) {
                var sel_info = json_data['bet_types'][b]['selections'][s];
                var sel_id = sel_info['bts_id'];
                var selection = event.selections[sel_id];
                
                var sel_name = sel_info['name'];
                var add_sel_link = 'false';
                if (typeof selection.add_sel_link != 'undefined') add_sel_link = 'a='+selection.add_sel_link;
                sel_ttl += load_sb_tpl('sport_odds_event_result_bts_sel_name',{'selection_name':sel_name,'css_class':''});
                sel_odd += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(selection.odd),'event_id':event.e_id,'selection_id':selection.bts_id,'css_class':selection.css_class});
            }
        }
        
        /*for (var s in json_data['bet_types'].selections) {
            var selection = event.selections[s];
            var add_sel_link = 'false';
            
            var sel_name = json_data['bet_types'][selection['bt_id']]['selections']['bts_name'];
            
            sel_ttl += load_sb_tpl('sport_odds_event_result_bts_sel_name',{'selection_name':sel_name,'css_class':''});
            sel_odd += load_sb_tpl('sport_odds_league_event_bt_sel_odds',{'add_selection_link':add_sel_link,'odd':format_odd_value(selection.odd),'event_id':results_data.e_id,'selection_id':selection.bts_id,'css_class':selection.css_class});
        }*/
        
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
        event.league_name = json_data['leagues'][event.l_id]['league_name'];
        if (league_name == false) {
            league_name = json_data['sec_title']+' - '+json_data['leagues'][event.l_id]['l_name'];
        }
        html += load_sb_tpl('sport_odds_upcoming_events_custom_single_ev_html',event);
    }
    
    var full_html = load_sb_tpl('sport_odds_upcoming_events_custom_widget_html',{'section_name':league_name,'results':html,'cycle_fx':'carousel','cycle_visible':10});
    
    $("#"+json_data['div_id']).html(full_html);
}

////////////////


function get_event_score_html(event) {
    if (typeof event.match_info == 'undefined') return '';
    if (typeof event.match_info.score == 'undefined') return '';
    
    var html = get_score_html(event.match_info.score);
    return '<span class="ml_event_score">'+html+'</span>';
}
function get_ev_list_score_time_html(ev_time,ev_score) {
    var html = '<div class="ev_list_area_time_score">';
    html += '<div class="ev_list_area_time_score_area">';
    html += ev_score;
    html += ev_time;
    html += '</div>';
    html += '</div>';
    
    return html;
}
function get_event_time_html(event) {
    if (typeof event.match_info == 'undefined') return '';
    
    var matchtime = '';
    var matchstatus = '';
    var e_id = event.e_id;
    var css_class = '';
    
    if (event.match_info.status == 'not_started') matchtime = 'Not started';
    else if (event.match_info.matchtime != '' && event.match_info.matchtime != null) {
        matchtime = event.match_info.matchtime;
        if (jQuery.isNumeric(matchtime)) {
            css_class += ' ev_has_mtime';
            if (typeof event.match_info.status != 'undefined') {
                if (typeof br_status[event.s_id] != 'undefined' && typeof br_status[event.s_id][event.match_info.status] != 'undefined') {
                    matchstatus = br_status[event.s_id][event.match_info.status];
                }
                else {
                     matchstatus = event.match_info.status;
                }
                css_class += ' ev_has_mstatus';
            }
            matchtime = replaceAll(matchtime,'_',' ');
            matchtime += " <span class='ev_mt_min'>min</span><span class='ev_mt_quot'>'</span>";
        }
    }
    else {
        if (typeof event.match_info.status != 'undefined') {
            if (typeof br_status[event.s_id] != 'undefined' && typeof br_status[event.s_id][event.match_info.status] != 'undefined') {
                matchstatus = br_status[event.s_id][event.match_info.status];
            }
            else {
                 matchstatus = event.match_info.status;
            }
            css_class += ' ev_has_mstatus';
        }
        matchtime = replaceAll(matchtime,'_',' ');
    }
    return load_sb_tpl("sports_event_time_v2",{'event_id':e_id,'time':matchtime,'status':matchstatus,'css_class':css_class});
}