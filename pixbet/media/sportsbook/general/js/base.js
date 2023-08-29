// debug vars, set to true to enable that section debug
var sb_debug = false; // generic functionality debugging
var sb_debug_menu = false; // menu related debugging
var sb_debug_odds = false; // odds related debugging
var sb_debug_slip = false; // slip related debugging

var animation_duration = 200; // default animation duration in milliseconds

var sb_templates = []; // global js var, used to save the html of each template loaded. check fn: load_sb_tpl()

var sb_menu_data = false; // menu json object
var sb_slip_data = false; // slip json object
var sb_odds_data = false; // odds json object
var single_event_data = false; // single event json object

var av_leagues = []; // all leagues available, index = league_id, value = league_url
var open_leagues = []; // leagues that are open, index = league_id
var sports_loc = 0; // default home, 0 = home, 1 = leagues list, 2 = single event, 3 = content

if (typeof sb_max_leagues_url == 'undefined') var sb_max_leagues_url = 20;

var allow_hash_change = true; // param used to check if changing the hash url for the page is allowed by the system
var allow_custom_scroll = false; // custom scrolling based on browser
var browser_history_change = true; // allow browser hsitory url changes based on browser


// load a template and replace the parameters
// tpl = id of script containing the template
// params = js object with params and thier values
function load_sb_tpl(tpl,params) {
    // template not availableS
    if ($("#"+tpl).length != 1) return '';
    
    var raw_html = ''; // template raw output (including)
    // html already available in the globl js tpl var
    if (typeof sb_templates[tpl] != 'undefined') {
        raw_html = sb_templates[tpl];
    }
    // templat was not loaded yet,
    else {
        // load the template and set the raw_html output to the global js tpl var
        raw_html = $("#"+tpl).html();
        sb_templates[tpl] = raw_html;
    }
    // loop the html and replace all parameters
    var html = raw_html;
    for ( var pi in params) {
        html = replaceAll(html,'{'+pi+'}',params[pi]);
    }
    // return the parsed html
    return html;
}

// generic GET ajax function used for retrieving data
// ajax_url = full url of ajax file, including GET parameters / querystring
// fn_success = name of the function to be called on success, the function accepts only the ajax output as parameter
var xhr_ajax = [];
function get_sports_data(action,extra_qs,fn_success,fn_error,skip_filters) {   

    if(typeof sportsbook_t7 != "undefined" && sportsbook_t7 == 1 && action == "main"){ 
        action = "get_live_homepage_mobile_v7";    
    } 
    
    if ($("body").attr("viz") == "sl_window_blur") {
        // allow slip functions to run in the background
        if (action == 'get_slip' || action == 'set_odds_format') {}
        else if (typeof fn_success != 'undefined' && typeof window[fn_success] == 'function') {
            if (sb_debug) console.log('Function ',fn_success,'exists');
            window[fn_success]({});
        }
        
        return false;
    }
    
    // build the ajax url based on the supplied params
    // var sb_ajax_url should be set in the main page
    // add the action
    var ajax_url = sb_ajax_url;
    // for slip requests, we check if the url for the ajax request related to slips is set, and use that if set
    if (action == 'get_slip' || action == 'set_odds_format') {
        if (typeof slip_ajax_url != 'undefined' && slip_ajax_url != false) ajax_url = slip_ajax_url;
    }
    // append extra info
    ajax_url += '?action='+action+"&json=1";
    if (typeof sb_load_mobile != 'undefined' && sb_load_mobile == "1") {
        ajax_url += '&sm=1'; // param for mobile
    }
    if (typeof sb_one_odd != 'undefined' && sb_one_odd == "1") {
        ajax_url += '&sm=1'; // param for one odd for primary bet types
    }
    
    if (typeof sb_event_carousel != 'undefined' && sb_event_carousel == "1") {
        ajax_url += '&carousel=1'; // param for one odd for primary bet types
    }
    // temp settings
    if (typeof xhr_ajax[action] == 'undefined') {
        xhr_ajax[action] = false;
    }
    
    if (sb_debug) console.log('Called: `get_sports_data`',action,extra_qs,fn_success,fn_error);
    
    // confirm that the extra parameters value is a string
    if (typeof extra_qs == 'string') {
        // confirm that the first character is and '&' as we need it to combine with the current url
        if (extra_qs.substring(0,1) != '&') extra_qs = '&'+extra_qs;
        // append any extra parameters to the url
        ajax_url += extra_qs;
    }
    if (action == 'get_odds') {    
        //console.log("get_sports_data",skip_filters);
        if (typeof skip_filters != "undefined" && skip_filters == true) {}
        else if (typeof sb_sports_filters != 'undefined') ajax_url += '&'+sb_sports_filters;
        
        if(typeof sportsbook_t7 != "undefined" && sportsbook_t7 == 1){
            if(typeof(selected_day) != "undefined" && selected_day != "" && typeof(antepost_lobby) == "undefined"){ 
                ajax_url += "&date_value="+selected_day;    
            }
            
            if(typeof(selected_time) != "undefined" && selected_time != "" && typeof(antepost_lobby) == "undefined"){ 
                ajax_url += "&date_value="+selected_time;    
            }            
            //Added JB 6/10/2022 Ticket BSS-240
            device_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (typeof device_timezone !== 'undefined')ajax_url += "&tz="+device_timezone;
            
        }
    }
    
    if (sb_debug) console.log('AJAX URL:',ajax_url);
    
    var uniqid = new Date().getTime();
    if (typeof sb_time != 'undefined' && sb_time == true) console.log("Start AJAX -",uniqid);
    // do the ajax request

    let actionUrl = ajax_url

    if (ajax_url === '/modules/sports/ajax.php?action=get_slip&json=1') {
        actionUrl = '/modules/sports/ajax.php/slip.json'
    } else if (ajax_url.includes('modules/sports/ajax.php?action=get_odds&json=1&home=1&widget')) {
        actionUrl = '/modules/sports/ajax.php/odds.json'
    }

    console.log('action URL', actionUrl);

    xhr_ajax[action] = $.ajax({
        url: actionUrl,
        // sucessful response, this does not handle invalid requests
        success: function(output) {
            
            if (sb_debug) console.log('Success:',output);
            // confirm that the function exists
            if (typeof fn_success != 'undefined' && typeof window[fn_success] == 'function') {
                if (sb_debug) console.log('Function ',fn_success,'exists');
                window[fn_success](output);
                
            }
            
            var data_carousel = output.carousel;
            if (typeof data_carousel === 'object' &&
                typeof sb_event_carousel != 'undefined' && sb_event_carousel == 1 &&
                typeof sb_is_desktop != 'undefined' && sb_is_desktop == 1){
                build_event_carousel_menu_desktop(data_carousel);
            }
            
            var end = new Date().getTime();
            var diff = end - uniqid
            if (typeof sb_time != 'undefined' && sb_time == true) {
                console.log("OK - End AJAX - ",uniqid,end,'--',diff);
                var tmp_json = get_valid_json(output);
                if (typeof tmp_json.ajax_tt != 'undefined') console.log(tmp_json.ajax_tt);
                
            }
        },
        // error response (some kind of server error happend)
        error: function(err_obj, error) {
            if (sb_debug) console.log('Error:',err_obj,error);
            if (typeof fn_error != 'undefined' && typeof window[fn_error] == 'function') {
                if (sb_debug) console.log('Error function',fn_error,'exists');
                window[fn_error](err_obj, error);
            }
            else if (typeof fn_success != 'undefined' && typeof window[fn_success] == 'function') {
                if (sb_debug) console.log('Success function ',fn_success,'exists');
                window[fn_success](false);
            }
            if (typeof sb_time != 'undefined' && sb_time == true) console.log("ERR - End AJAX - ",uniqid,new Date().getTime());
        }
    });
}

function build_event_carousel_menu_desktop(data_carousel){ 
        
    if (data_carousel != ''){
    
        event_carousel_inner = "";
        
        for (var i in data_carousel) {
            
            var event_carousel_data = data_carousel[i];
            
            var ev_date = ev_time = ''; // date and time values
            var ev_tstamp = new Date(event_carousel_data.tstamp * 1000);
            ev_date = $.datepicker.formatDate(sb_ev_league_date_js,ev_tstamp);
            ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
            ev_time += ':';
            ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
                        
            var selections = event_carousel_data.selections;
            
            var odd_id = event_carousel_data.e_id;
            
            var selections_count = 0;
            var selections_html = '';
                    
            for (var i in selections) {
                var selection_data = selections[i];
                                
                var selection_params = {
                    "selection_odd": selection_data.odd,
                    "selection_link": selection_data.add_sel_link,    
                    "selection_name": selection_data.name,    
                    "odd_id": odd_id,    
                    "mc": selection_data.mc,    
                    "cat": selection_data.cat_id,    
                    "bts_id": selection_data.bts_id,    
                }
                
                selections_html += load_sb_tpl("sportsbook_event_carousel_sel_tpl", selection_params);
                selections_count++;
            }
            
            var event_carousel_params = {
               "competitor1": event_carousel_data.competitor1,     
               "competitor2": event_carousel_data.competitor2,
               "league_name": event_carousel_data.league_name,
               "ev_date": ev_date,
               "ev_time": ev_time,
               "selections": selections_html,
               "selections_count": selections_count,
            };
            
            event_carousel_inner += load_sb_tpl("sportsbook_event_carousel_tpl", event_carousel_params);
        }
        
        $(".sportsbook_event_carousel").html(event_carousel_inner);
    
    }
    
}

// the function handles the parsing of the page contents based on the hash (url)
function handle_page_hash() {
    allow_hash_change = false;
    // get page hash
    var hash_url = window.location.hash;
    if (typeof hash_url == 'undefined' || hash_url == '') hash_url = '';
    // 1st char is a # sign, we remove it
    if (hash_url.substring(0,1) == "#") hash_url = hash_url.substring(1);
    
    // league/leagues
    if (hash_url.substring(0,8) == 'leagues/' || hash_url.substring(0,7) == 'league/') {
        var lids = []; // array of league ids that need to be displayed
        // multiple leagues
        if (hash_url.substring(0,8) == 'leagues/') {
            lids = hash_url.substring(8).split(",");
            sports_loc = 1;
        }
        // single league
        if (hash_url.substring(0,7) == 'league/') {
            var tmp = hash_url.substring(7); // full hash after #league/
            var li = tmp.indexOf("-",0); // the first characters before the '-' is the league id
            // append the new league id to the list of leagues to display
            lids.push(tmp.substring(0,li));
        }
        // loop the currently opened leagues
        for (var i in open_leagues) { 
            var lid = open_leagues[i];
            // check if league is set as open in our new array
            if (lids.indexOf(lid) < 0) {
                // close the league as this is not required anymore
                close_league_menu(lid);
            }
        }
        // loop the new array and display the leagues accordingly
        for (var i in lids) {
            var lid = lids[i];
            var arr_pos = $.inArray(lid.toString(),open_leagues);
            if (arr_pos < 0 || arr_pos === false) open_league_menu(lid);
        }
                                                                                  
        //show the leagues section
        show_leagues();
    }
    // single event
    else if (hash_url.substring(0,6) == 'event/') {
        // get event url part
        var tmp = hash_url.substring(6);
        // split url, the format is as follows {league_id}-{event_id}-{event_url}
        var evobj = tmp.split("-");
        
        var lid = evobj[0]; // league id
        var eid = evobj[1]; // event id
        var eurl = evobj[2]; // event url (not really used at this point)
        // open the single event
        open_single_event(lid,eid,eurl);
    }
    //Single antepost event. Added JB 25/3/2022 - Ticket 12593
    else if (hash_url.substring(0,9) == 'outright/') {
        // get event url part
        var tmp = hash_url.substring(9);
        // split url, the format is as follows {league_id}-{event_id}-{event_url}
        var evobj = tmp.split("-");
        
        var lid = evobj[0]; // league id
        var eid = evobj[1]; // event id
        var eurl = evobj[2]; // event url (not really used at this point)
        // open the single event
        open_single_outright(lid,eid,eurl);
    }
    // search results
    else if (hash_url.substring(0,7) == 'search/') {
        // search for the request based on the url output (after search/)
        search_events(hash_url.substring(7));
        show_content('full');
        allow_hash_change = false;
    }
    // nothing found, we show the home
    else {
        // load home
        load_homepage();
        sports_loc = 0;
    }
    // continue params here
    
    allow_hash_change = true;
}

// the function is used to set the page hash (history) to the current url
// the function uses variables to handle such changes
function set_page_hash() {
    var hash_url = '';
    // home/main/landing
    if (sports_loc == 0) hash_url = '#home';
    // league listings
    if (sports_loc == 1) {
        // no leagues listed, this is the contents section
        if (open_leagues.length == 0) {
            hash_url = ''; // redirect to home!
            sports_loc = 3;
        }
        // only 1 league selected
        // for this, we display 1 league with id and league url
        else if (open_leagues.length == 1) {
            var lid = open_leagues[0];
            var lurl = av_leagues[lid];
            hash_url = '#league/'+lid+'-'+lurl;
            if (lid.indexOf('_') > -1) hash_url = '#';
        }
        else {
            for (var i in open_leagues) {
                var lid = open_leagues[i];
                if (lid.indexOf('_') > -1) continue;
                if (hash_url == '') hash_url = '#leagues/';
                else hash_url += ',';
                hash_url += lid;
            }
            if (hash_url == '') hash_url = '#';
        }
    }
    // single event
    if (sports_loc == 2) {
        // get event and league id and url and append
        var eid = single_event_data.e_id;
        var lid = single_event_data.l_id;
        hash_url = '#event/'+lid+'-'+eid+'-'+single_event_data.url;
    }
    
    // if browser history change is allowed
    if (browser_history_change) {
        history.pushState(stateObj, '', hash_url);
        var stateObj = { state : '' , rand : Math.random() };
    }
    
}

//Added JB 25/3/2022 - Ticket 12593
function set_page_hash_antepost(lid, eid){
    hash_url = '#outright/'+lid+'-'+eid;    
    // if browser history change is allowed
    if (browser_history_change) {
        history.pushState(stateObj, '', hash_url);
        var stateObj = { state : '' , rand : Math.random() };
    }    
}   


// function to handle back and forth history buttons (browser)
function handle_history_change() {
    // handle the change from history
    window.onpopstate = function(e) {
        // prevent default action (ie: going to that page)
        e.preventDefault();
        // set change of hash as false (do not change hash url)
        allow_hash_change = false;
        // handle the change in the hash url
        handle_page_hash();
        
    };
}

function get_unused_tpl() {
    var unused = '';
    $("script[type='html/template']").each(function() {
        var sid = $(this).attr("id");
        if (sid.substring(0,11) == 'sport_bslip') return true;
        if (typeof sb_templates[sid] == 'undefined') unused += '<div><input type="checkbox" id="cb_'+sid+'"><label for="cb_'+sid+'">'+sid+'</label></div>';
    });
    
    return unused;
}

function handle_bt_event_sov(sov,bt_cat) {
    var out = false;
    if (bt_cat == "1") {
        out = parseFloat(sov);
    }
    if (bt_cat == "2") {
        out = parseFloat(sov);
        if (out.toString().indexOf('.') >= 0) {
            out = sov;
        }
    }
    if (bt_cat == "3" || bt_cat == "11") {
        out = parseFloat(sov);
    }
    
    if (bt_cat == "10") {
        out = parseFloat(sov);
        if (out > 0) out = '+'+out;
        
    }
    return out;
}
// returns the sov value for use within array/object indexes
function get_sov_index(sov,cat_id,pretty_print) {
    
    //console.log('entered general-base.js:get_sov_index  ' + sov  + '   ' + cat_id + '   ' + pretty_print);
    
    
    if (typeof pretty_print == 'undefined' || pretty_print !== true) pretty_print = false;
    if (sov == '') return '0'.toString();
    if (sov == null) return '0'.toString();
    
    if (typeof cat_id != 'undefined' && cat_id == "2") {
        // sov for handicap to change as +1 = 1:0, -1 = 0:1
        if (pretty_print) {
            if (sov.toString().indexOf(":") > 0) return sov.toString();
            
            if (sov < 0) {
                var sov_pos = parseInt(sov) * -1;
                return '(0:'+parseInt(sov_pos).toString()+')';
            }
            else {
                return '('+parseInt(sov).toString()+':0)';
            }
        }
        return sov.toString();
    }
    if (typeof cat_id != 'undefined' && cat_id == "10") {
        // sov for handicap to change as +1 = 1:0, -1 = 0:1
        if (pretty_print) {
            if (sov.toString().indexOf(":") > 0) return sov.toString();
            sov = round_decimals(sov,2).toString();
            if (parseFloat(sov) > 0) sov = '+'+sov;
            
            return sov;
        }
        return sov.toString();
    }
    
    //Added JB 19/4/2021
    if (typeof cat_id != 'undefined' && cat_id == "15") {
        if (!pretty_print){
            sov = replaceAll(sov,'\\|','-'); 
            sov = replaceAll(sov,':','-');  
            return sov;
        }
    }    
    
    // format to 2 decimal places and convert to string
    if (typeof sov == 'number' || jQuery.isNumeric(sov)) {
        sov = round_decimals(sov,2).toString();
        if (typeof cat_id != 'undefined' && cat_id == "3") {
            return sov;
        }
    }
    // repalce the dot with a dash
    sov = replaceAll(sov,'\\.','-');
    sov = replaceAll(sov,'\\/','-');
    sov = replaceAll(sov,':','-');
    sov = replaceAll(sov,'\\|','-');
    
    return sov.toString();
}

function get_event_name(event) {
    var ev_name = '<span class="competitor1">'+event.competitor1+'</span>';
    if (typeof event.competitor2 != 'undefined' && event.competitor2 != '' && event.competitor2 != null) ev_name += ' <span class="competitor_div">-</span> <span class="competitor2">'+event.competitor2+'</span>';
    
    return ev_name;
}

function launch_stats(br_id) {
    if (br_stats_url == false) return;
    window.open(br_stats_url+"&matchid="+br_id,"BRSTATS","width=1000,height=700");
}
function launch_livescore() {
    if (br_livescore_url == false) return;
    window.open(br_livescore_url,"BRLSCORE","width=1000,height=700");
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// ODDS FORMATTING
//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function odd_decimal_to_fraction(odd) {
    if (typeof odd == 'string' && odd.indexOf("/") >= 0) return '-';
    var decimal = parseFloat(odd).toFixed(2);
    if (decimal <= 0) return '-';
    if (isNaN(decimal)) return '-';
    
    var num = (decimal-1) * 10000;
    var dom = 10000;
    
    num = Math.round(num);
    dom = Math.round(dom);
    
    var a = odd_conv_reduce(num,dom);
    num = a[0];
    dom = a[1];

    return(num+'/'+dom);
}
function odd_fraction_to_decimal(odd) {
    var a = odd.split('/');
    if(a.length == 2 && !isNaN(a[0]) && !isNaN(a[1])) {
        return parseFloat((a[0]/a[1])+1).toFixed(2)
    }
    return '-';
}
function odd_american_to_decimal(odd) {
    if (isNaN(odd)) return '-';
    if(odd > 0) {
        return((odd/100)+1).toFixed(2);
    } else {
        return((100/odd*-1)+1).toFixed(2);
    }
}
function odd_decimal_to_american(odd,norounding) {
    if (isNaN(odd)) return '-';
    if (typeof norounding == 'undefined') norounding = false;
    if (norounding !== true) norounding = false;
    var decimal = parseFloat(odd) -1;
    var american = '-';
    if(decimal < 1) {
        american = (100/decimal).toFixed(2);
        if (!norounding) american = american_rounding(american,0);
        american = '-'+american;
    } else {
        american = (decimal*100).toFixed(2);
        if (!norounding) american = american_rounding(american,0);
        american = '+'+american;
    }
    return american;
}
function odd_american_to_fraction(odd) {
    var new_odd = odd_american_to_decimal(odd);
    return odd_decimal_to_fraction(new_odd);
}
function odd_fraction_to_american(odd) {
    var new_odd = odd_fraction_to_decimal(odd);
    return odd_decimal_to_american(new_odd);
}

function change_odd_format(new_format) {
    
    get_sports_data('set_odds_format','new_format='+new_format,'change_odd_format_ajax');
    
    
}

function american_rounding(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

function change_odd_format_ajax(new_format) {
    if (new_format.substring(0,2) == "1.") {
        new_format = new_format.substring(2);
        $(".odd_format_link").removeClass("selected");
        $(".odd_format_"+new_format).addClass("selected");
        format_all_odds(new_format);
    }
    else {
        alert("ERROR");
    }
}

var current_odd_format = 'decimal';
function format_all_odds(convert_to) {
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
    
    var fn_name = 'odd_'+current_odd_format+'_to_'+convert_to;
    var fn = window[fn_name];
    if (typeof fn == 'function') {
        $(".ev_sel_odd .odd, .slip_sel_col_odd span").each(function() {
            var odd = $(this).text();
            var odd_new = fn(odd);
            if (odd_new == '-') return true;
            $(this).text(odd_new);
        });
        current_odd_format = convert_to;
        user_odd_format = convert_to;
    }
    else if (current_odd_format == convert_to) {
        user_odd_format = convert_to;
    }
    else {
        alert("Invalid format change - "+fn_name);
        return false;
    }
    return true;
}




function odd_conv_reduce(a,b) {
    var n  = new Array(2);
    var f = odd_conv_GCD(a,b);
    n[0] = a/f;
    n[1] = b/f;
    return n;
}
function odd_conv_GCD(num1,num2) {
    var a; var b;
    if (num1 < num2) {a = num2; b = num1;}
    else if (num1 > num2) {a = num1; b = num2;}
    else if (num1 == num2) {return num1;}
  while(1) {
    if (b == 0) {
            return a;
        }
    else {
         var temp = b;
         b = a % b;
         a = temp;
    }
  }
}


var orig_generate_odd_td = window.generate_odd_td;
window.generate_odd_td = function(params) {
    var odd = params.odd;
    if (current_odd_format == 'fraction') {
        odd = odd_decimal_to_fraction(odd);
    }
    else if (current_odd_format == 'american') {
        odd = odd_decimal_to_american(odd);
    }
    params.odd = odd;
    orig_generate_odd_td(params);
}

// the function is used on loading a league/event odds
function format_odd_value(odd) {
    if (typeof user_odd_format != 'undefined') {
        if (user_odd_format == 'fraction') {
            current_odd_format = 'fraction';
        }
        else if (user_odd_format == 'american') {
            current_odd_format = 'american';
        }
    }
    
    if (current_odd_format == 'fraction') {
        odd = odd_decimal_to_fraction(odd);
    }
    else if (current_odd_format == 'american') {
        odd = odd_decimal_to_american(odd);
    }
    return odd;
}


function find_and_convert_unix_dates(elem) {
    var unixtime = $(elem).attr("data-unixtime");
    if (typeof unixtime != 'undefined' && parseInt(unixtime) > 0) {
        var datetime = format_unix_date(unixtime);
        $(elem).text(datetime['datetime']);
    }
}

function format_unix_date(ev_tstamp_raw) {
    if (typeof sb_date_format_js == 'undefined') sb_date_format_js = 'dd/mm/yy';
    var ev_date = ev_time = ''; // date and time values
    
    ev_tstamp = new Date(ev_tstamp_raw * 1000);
    
    ev_date = $.datepicker.formatDate(sb_date_format_js,ev_tstamp);
    ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
    ev_time += ':';
    ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
    
    return {'date':ev_date,'time':ev_time,'datetime':ev_date+' '+ev_time};
}


function change_sov_for_ev_in_list(evid,btid,sov) {
    $(".sov_odd.btev_"+evid+'_'+btid).hide();
    $(".sov_odd.btev_sov_"+evid+'_'+btid+'_'+get_sov_index(sov)).show();
}

// find main line for a range of SOV values
function find_main_line_sov(event_params,bet_type,event_selections) {
    
    // get sov range
    var sov_from = parseFloat(bet_type.sov_from);
    var sov_to = parseFloat(bet_type.sov_to);
    var sov_inc = parseFloat(bet_type.sov_inc);
    
    var selected_sov = -1;
    
    var sovs = {}; // placeholder, to identify which sovs are available
    
    // loop all sovs based  on range
    for (var i = sov_from;i<=sov_to;i += sov_inc) {
        sovs[i] = {};
        var c = 0;
        var at_least_1_odd = false;
        for (var bts in bet_type.selections) {
            var sel_id = bet_type.selections[bts]['bts_id'];
            
            var def_sov = round_decimals(i,2);
            var sel_index = 'sov_'+sel_id+'_'+get_sov_index(def_sov);
            var odd = 0;
            if (typeof event_selections[sel_index] != 'undefined' && typeof event_selections[sel_index].odd != 'undefined') odd = event_selections[sel_index].odd;
            sovs[i][c] = odd;
            if (odd > bs_min_odd_val) at_least_1_odd = true;
            c++;
        }
        // no odds, delete the sov value for the following BT cats (2,3)
        if (!at_least_1_odd && bet_type.cat == "2") delete sovs[i];
        if (!at_least_1_odd && bet_type.cat == "3") delete sovs[i];
    }
        
    // hard coded for football only, we return 2.5 as sov value
    if (
        typeof event_params.sport_id != 'undefined' 
        && event_params.sport_id == "1" 
        && typeof sovs["2.5"] != "undefined" 
        && bet_type.cat == "3"
        && bet_type.bt_id == "562"
    ) {
        return 2.5;
    }
    
    
    if (typeof event_params.sport_id != 'undefined' && event_params.sport_id == "1" && typeof sovs["-1"] != "undefined" && bet_type.cat == "2") return -1;
    else if (bet_type.cat == "2") {
        if (count(sovs) == 0) return -1;
        var sov_closest = 0;
        var closest_pos = closest_neg = false;
        
        for (var x in sovs) {
            if (x < sov_closest) {
                if (closest_neg === false) closest_neg = x;
                else if (x > closest_neg) closest_neg = x;
            }
            else if (x > sov_closest) {
                if (closest_pos === false) closest_pos = x;
                else if (x < closest_pos) {
                    closest_pos = x;
                }
            }
        }
        
        if (closest_neg !== false) return closest_neg;
        else return closest_pos;
    }
    
    var sov_diff = {'diff':-1,'sov':false};
    var first_sov = -1;
    
    for (var x in sovs) {
        if (first_sov == -1) first_sov = x;
        if (sovs[x][0] == 0 && sovs[x][1] == 0) continue;
        var diff = 0;
        if (sovs[x][0] > sovs[x][1]) {
            diff = sovs[x][0] - sovs[x][1];
        }
        else {
            diff = sovs[x][1] - sovs[x][0];
        }
        
        if (sov_diff['diff'] == -1) {
            sov_diff['diff'] = diff;
            sov_diff['sov'] = x;
        }
        else if (sov_diff['diff'] > diff) {
            sov_diff['diff'] = diff;
            sov_diff['sov'] = x;
        }
    }
    
    if (sov_diff['sov'] === false) return first_sov;
    return sov_diff['sov'];
}

function count(obj) {
    if (typeof obj == "object") {
        return Object.keys(obj).length;
    }
    else if (typeof obj == 'string') {
        return obj.length;
    }
    return false;
}

//------------------------------------------------------------------------------
//Added JB  30/1/2023 -  BI-1065
//Gathers the single event information made available by the caller in var single_event_data, and builds and sends a message to SR using the srtmCommands if provided for the brand.
function handle_sportsradar_tracking(){

    try{
        
        if(typeof srtmCommands != 'object' || typeof srtmCommands.push != 'function'){
            //console.log('srtmCommands.push not found'); 
            return true;
        }
        
        //console.log('handle_sportsradar_tracking - entered function v2');
        
        if (typeof single_event_data !== 'object' || typeof single_event_data.e_id != 'string'){
            //console.log('handle_sportsradar_tracking - no data found');
            return true;
        } 
        //Event date (e.g. 2023-01-29T10:15:00+01:00)
        var event_date_time = '';
        if (typeof single_event_data.tstamp !== 'undefined' && Number.isInteger(parseInt(single_event_data.tstamp))){
            var timestamp = new Date(parseInt(single_event_data.tstamp) * 1000);
            var date = new Date(timestamp);
            date.setMilliseconds(0,0);
            var offset = date.getTimezoneOffset();
            var offsetDate = new Date(date.getTime() + (-1 * offset * 60 * 1000));
            var event_date_time = offsetDate.toISOString().slice(0, -5) + (offset <= 0 ? '+' : '-') + (Math.abs(offset / 60) < 10 ? '0' : '') + (Math.abs(offset / 60)) + ':' + (Math.abs(offset % 60) < 10 ? '0' : '') + (Math.abs(offset % 60));
        }
        //1X2 odds (if available)
        var odds_home = "", odds_draw = "", odds_away = "";
        if (typeof single_event_data.odds_3way == 'object'){
            if (typeof single_event_data.odds_3way['1'] == 'string') odds_home = parseFloat(single_event_data.odds_3way['1']).toFixed(3); // + '0';  //3 decimal places
            if (typeof single_event_data.odds_3way['X'] == 'string') odds_draw = parseFloat(single_event_data.odds_3way['X']).toFixed(3);
            if (typeof single_event_data.odds_3way['2'] == 'string') odds_away = parseFloat(single_event_data.odds_3way['2']).toFixed(3);
        }
        //Sport and League 
        var sport = "", league="";
        if (typeof single_event_data.sport_ref != 'undefined') sport = single_event_data.sport_ref.toLowerCase();
        else if (typeof single_event_data.sports_name != 'undefined') sport = single_event_data.sports_name.toLowerCase();      
        if (typeof single_event_data.l_name != 'undefined') league = single_event_data.l_name;    //As found in prematch structure
        else if (typeof single_event_data.league_name != 'undefined') league = single_event_data.league_name;  //As found in live structure
        
        //Build message object. Remaining fields obtained directly from event info, if available
        sportsEvent = {           
            match_id: (typeof single_event_data.e_id == 'string' ? single_event_data.e_id : ''),
            sr_match_id: (typeof single_event_data.br_id == 'string' ?  'sr:match:'+single_event_data.br_id : ''),
            team_home_name: (typeof single_event_data.competitor1 != 'undefined' ? single_event_data.competitor1 : ''), 
            team_home_name_short: '',
            team_home_logo: "",     
            team_away_name: (typeof single_event_data.competitor2 != 'undefined' ? single_event_data.competitor2 : ''),
            team_away_name_short: '',
            team_away_logo: '',
            scheduled: event_date_time,
            status: (typeof single_event_data.match_info != 'undefined' && single_event_data.match_info.bet_status != 'undefined' ? single_event_data.match_info.bet_status : 'not_started'),  //Bet status available in live only. For prematch use 'not_started'
            tournament_name: league,                                            
            sport: sport,
            odds_home: odds_home,
            odds_draw: odds_draw,
            odds_away: odds_away,
            language: typeof single_event_data.lang != 'undefined' ? single_event_data.lang :"en"            
        }
        //Send
        //console.log('handle_sportsradar_tracking - payload', {sportsEvent:sportsEvent});
        console.log(srtmCommands.push({event: "srt.retargeting", payload: {sportsEvent:sportsEvent}}));
        //console.log('handle_sportsradar_tracking - payload sent');
    }catch(err){        
        console.log(err);   
    }
    return true;
}
