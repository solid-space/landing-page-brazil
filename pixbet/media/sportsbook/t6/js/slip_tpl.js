// betting slip js file
// the file is used to build the html for the current sports template
// ajax requests to retrieve data are set in the base.js file
// the function 'build_the_slip' is required, as this is called on completion of the slip ajax calls
// the object 'sb_slip_data' is created on success of the ajax and consists of 2 objects:
// - sb_menu_data.slip = list of events and selections for the current slip
// - sb_menu_data.info = list of information (ex: folds, bonuses, ...)

function build_the_slip_ajax(output) {
    
    sb_slip_data = get_valid_json(output);
    if (sb_slip_data == false) {
        //get_sports_data('get_slip','','build_the_slip_ajax');
        if ($("#sports_odds .sports_scroll_content .output_log").length == 0) {
            $("#sports_odds .sports_scroll_content").append("<div class='output_log'></div>");
            clear_output_log();
            
            var err_txt = $("#sport_bslip_generic_error_text").html();
            var err_slip = load_sb_tpl('sport_bslip_generic_error',{'error':err_txt});
            var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':err_slip});
            $("#slip_errors").html(err_html);
            
        }
        $("#sports_odds .sports_scroll_content .output_log").append("<div style='margin: 10px;background:#000;color:#eee'>"+output+"</div>");
        return;
    }
    
    $(".slip_buttons_area button").removeClass("loading_slip");
    build_the_slip();
    sb_block_req=false;
    return;
    /*else if (typeof sb_slip_data.info != 'undefined' && typeof sb_slip_data.info.errors == 'object') {
        var err_slip = '';
        for (var e in sb_slip_data.info.errors) {
            var err = sb_slip_data.info.errors[e];
            err_slip += load_sb_tpl('sport_bslip_generic_error',{'error':err});
        }
        var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':err_slip});
        $("#slip_errors").html(err_html);
        
        return;
    }*/
    
}
function clear_output_log() {
    $("#sports_odds .sports_scroll_content .output_log").html("<a href='javascript:clear_output_log();'>Clear output</a>&nbsp;&nbsp;<a href='javascript:reload_slip()'>Reload slip</a>");
    return false;
}
function reload_slip() {
    get_sports_data('get_slip','reload=1','build_the_slip_ajax');
    return false;
}

var sel_to_mark = [];
function build_the_slip() {      
    
    var scroll_slip_to_bottom = false;
    
    $("#bslip_content").removeClass("viewmode").removeClass("errormode");
    var bslip_css_class = '';
    
    var selections_html = '';
    sel_to_mark = [];
    sb_slip_block = false;
    sb_fold_total_stake = {}; // reset folds info
    
    var slips_data = sb_slip_data.slip; // bslip selections (events, bet types, odds)
    var slip_info = sb_slip_data.info; // bslip info (sel count, col count, total stake + other info)
    
    if (typeof slip_info != 'undefined' && typeof slip_info.mode != 'undefined') {
        //$("#bslip_content").addClass('bslip_mode_'+slip_info.mode);
        sb_mode = slip_info.mode;
        if (sb_mode == 'view') sb_slip_block = true;
        if (sb_mode == 'auth') sb_slip_block = true;
    }
    if (typeof slip_info != "undefined" && typeof slip_info.state != "undefined" && slip_info.state != "5") {
        clearTimeout(timeout_refresh_slip);
        timeout_refresh_slip = false;
        start_refresh_slip = false;
    }
    
    if (typeof slip_info != 'undefined' && typeof slip_info.total_odds != 'undefined' && typeof user_odd_format != "undefined") {
        var fn_name = 'odd_decimal_to_'+user_odd_format;
        var fn = window[fn_name];
        if (typeof fn == 'function') {
            var total_odds = slip_info.total_odds;
            total_odds = fn(total_odds);
            if (total_odds !== false && total_odds != null) {
                slip_info.total_odds = total_odds;
            }
        }
        //slip_info.total_odds
    }
    
    //unmark_all_selections();
    
    // loop the event selections
    for (var event_index in slips_data) {
        // get event info
        var event = slips_data[event_index];
        selections_html += build_the_slip_event_row(event,sel_to_mark);
    }
    
    var no_events = false;
    if (selections_html == '') no_events = true;
    
    // check if selections are present, if not, load the no sel template
    if (no_events) selections_html = load_sb_tpl('sport_bslip_no_selections',{});
    else {
        selections_html += load_sb_tpl('sport_bslip_accept_odd_change',{});
        selections_html += load_sb_tpl('sport_bslip_selections_clear',{});
    }
    
    // add the starting and closing templates for the selections area
    selections_html = load_sb_tpl('sport_bslip_selections_start',{}) + selections_html + load_sb_tpl('sport_bslip_selections_end',{});
    
    //#TODO
    // so far so good
    
    // part 2 - building the slip information area (stake/bonus...)
    var bslip_info_html = build_the_slip_info(slip_info);
    
    var slip_extra_top = slip_extra_bottom = ''; // todo - get template
    var place_bet_css = "";
    if (no_events) place_bet_css = "noevents";
    var place_bet_html = load_sb_tpl('sport_bslip_buttons',{"css_class": place_bet_css});
    //if (no_events) place_bet_html = '';
    
    if (typeof slip_info != 'undefined') {
        
        if (typeof slip_info.is_live != 'undefined' && slip_info.is_live == "1") sb_is_live_slip=1;
        else sb_is_live_slip=0;
        
        // request auth button
        if (
            (typeof slip_info.extra != 'undefined' && (typeof slip_info.extra.request_auth != 'undefined' || (typeof slip_info.state != 'undefined' && slip_info.state == "5")))
        ) {
            if (typeof slip_info.state != 'undefined' && slip_info.state == "5") {
                var slip_id = '';
                if (typeof slip_info.extra.aams_slip_id != 'undefined' && slip_info.extra.aams_slip_id != null) slip_id = slip_info.extra.aams_slip_id;
                else slip_id = slip_info.extra.slip_id;
                if (slip_id != null) {
                var auth_params = {'slip_id':slip_id};
                place_bet_html = load_sb_tpl('sport_bslip_buttons_req_auth_notice',auth_params);
                bslip_css_class = 'viewmode';
                start_refresh_slip = true;
                }
            }
            else {
                bslip_css_class = 'mixmode';
                place_bet_html = '';
                slip_extra_bottom = load_sb_tpl('sport_bslip_buttons_req_auth',{});
                
            }
            scroll_slip_to_bottom = true;
        }
        // view mode
        else if (
            //(typeof slip_info != 'undefined' && typeof slip_info.state != 'undefined' && slip_info.state != "0") 
            //|| 
            (typeof slip_info != 'undefined' && typeof slip_info.mode != 'undefined' && slip_info.mode == 'view')
        ) {
            place_bet_html = '';
            
            bslip_css_class = 'viewmode';
            scroll_slip_to_bottom = true;
        }
        if (typeof slip_info.extra != 'undefined' && typeof slip_info.extra.play_for_end_user != 'undefined') {
            if (typeof slip_info.extra.subacc_transfer != 'undefined' && slip_info.extra.subacc_transfer == '1') {
                slip_info.extra.play_for_end_user['subacc_transfer'] = 'checked="checked"';
            }
            else {
                slip_info.extra.play_for_end_user['subacc_transfer'] = '';
            }
            slip_extra_top = load_sb_tpl('sport_bslip_shop_play_area_enduser_loggedin',slip_info.extra.play_for_end_user);
        }
        else if (typeof slip_info.extra != 'undefined' && typeof slip_info.extra.load_play_for_end_user != 'undefined') {
            slip_extra_top = load_sb_tpl('sport_bslip_shop_play_area_enduser_loggedout',{});
        }

    }
    
    // load the generic structure of the bslip and update values
    var structure_params = {'slip_extra_top':slip_extra_top,'slip_selection':selections_html,'slip_stake':bslip_info_html,'place_bet':place_bet_html,'slip_extra_bottom':slip_extra_bottom};
    
    structure_params = bslip_handle_structure(structure_params,slip_info);
    
    var structure_html = load_sb_tpl('sport_bslip_template',structure_params);
    
    // display the bslip
    $("#bslip_content").html(structure_html).addClass(bslip_css_class);
    if (bslip_css_class == "viewmode") {
        $("#bslip_content input[type=text]").each(function() {
            //$(this).prop("disabled",true);
            var input_name = $(this).attr("name");
            // change inputs that are related to stake
            if (typeof input_name != 'undefined' && input_name.indexOf("stake")>=0) {
                var input_css = (typeof $(this).attr("class") != 'undefined') ? $(this).attr("class") : '';
                var input_id = '';
                if (typeof $(this).attr("id") != "undefined") input_id = ' id="spn_'+$(this).attr("id")+'"';
                var input_val = $(this).val();
                input_val = round_decimals(input_val,2);
                var html = '<span class="input_replacer '+input_css+'"'+input_id+'>'+input_val+'</span>';
                $(html).insertAfter($(this));
                $(this).hide();
            }
        });
    }
    
    // update settings for the bslip
    update_bslip_info(slip_info);
    if (typeof allow_tiptip == 'undefined') allow_tiptip = false;
    if (allow_tiptip) {
        $(".tiptip").tooltip({
            tooltipClass: "pos_right",
            position: {
                my: "right center",
                at: "left center"
            }
        });
        $(document).tooltip({
            tooltipClass: 'pos_right',
            position: {
                my: "right center",
                at: "left center"
            },
            items: ".slip_event_info, .slip_sel_row",
            content: function() {
                var cnt = $(".event_info_tooltip",$(this)).html();
                
                var element = $( this );
                var cnt = $(".event_info_tooltip ",element).html();
                return cnt;
            }
        });
    }
    
    //setTimeout(function() {
        unmark_all_selections(sel_to_mark);
        mark_selections(sel_to_mark);
    //},100);
    if (typeof slip_info != 'undefined' && typeof slip_info.balance != 'undefined') {
        var acc_bal = bonus_bal = with_bal = false;
        if (typeof slip_info.balance['account'] != 'undefined' && slip_info.balance['account'] != "") {
            acc_bal = slip_info.balance['account'];
        }
        if (typeof slip_info.balance['bonus'] != 'undefined' && slip_info.balance['bonus'] != "") {
            bonus_bal = slip_info.balance['bonus'];
        }
        if (typeof slip_info.balance['with'] != 'undefined' && slip_info.balance['with'] != "") {
            with_bal = slip_info.balance['with'];
        }
        update_user_balance(acc_bal,bonus_bal,with_bal);
    }
    if (typeof slip_info != 'undefined') {
        if (typeof sb_slip_data.info.errors == 'object') {
            var err_slip = '';
            for (var e in sb_slip_data.info.errors) {
                var err = sb_slip_data.info.errors[e];
                err_slip += load_sb_tpl('sport_bslip_generic_error',{'error':err});
            }
            var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':err_slip});
            $("#slip_errors").html(err_html);
            scroll_slip_to_bottom = true;
        }
    }
    else {
        if (typeof sb_slip_data.errors != 'undefined') {
            var err_slip = '';
            for (var e in sb_slip_data.errors) {
                var err = sb_slip_data.errors[e];
                console.log(err);
                if (err != 'undefined' && err != '' && err != null) err_slip += load_sb_tpl('sport_bslip_generic_error',{'error':err});
            }
            var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':err_slip});
            $("#slip_errors").html(err_html);
        }
    }
    
    check_and_set_accept_odd_changes_value();
    var clear_quickbet_fields = false;
    
    if (typeof sb_slip_data != 'undefined'  && typeof sb_slip_data.info != 'undefined' && typeof sb_slip_data.info.extra != 'undefined' && typeof sb_slip_data.info.extra.slip_action != 'undefined') {
        if (sb_slip_data.info.extra.slip_action == 'add_selection' || sb_slip_data.info.extra.slip_action == 'add_quickbet' || sb_slip_data.info.extra.slip_action == 'place_bet') scroll_slip_to_bottom = true;
        if (sb_slip_data.info.extra.slip_action == 'add_quickbet') clear_quickbet_fields = true;
    }
    
    //console.log("SCROLL TO BTM!",scroll_slip_to_bottom);
    //if (scroll_slip_to_bottom) {
        //$("#sports_slip .sports_scroll").animate({ scrollTop : $("#bslip_content").height() },0);
    //} 
    
    if (start_refresh_slip) {
        refresh_the_slip_countdown();
    }
    else {
        refresh_slip_count = 0;
    }
    
    autocomplete_subaccounts();
    if (typeof quickbet_autocomplete == 'function') quickbet_autocomplete(clear_quickbet_fields);
    
    if (typeof slip_info != 'undefined' && typeof slip_info.extra != 'undefined' && typeof slip_info.extra.load_booking != 'undefined') {
        $("#booked_ticket_code").val(slip_info.extra.load_booking);
        $(".load_booked_ticket_area").addClass("open");
    }
    
    if (typeof slip_info != 'undefined' && typeof slip_info.extra != 'undefined' && typeof slip_info.extra.focus != 'undefined') {
        var focus_field = slip_info.extra.focus;
        if (focus_field == 'username') $("#play_for_user_username").focus().select();
        else if (focus_field == 'password') $("#play_for_user_password").focus().select();
        else if (focus_field == 'total_stake') {
            if ($("input#total_stake").length == 1){
                $("#total_stake").focus().select();
            }
            else if ($(".fold_row input.fold_row_txt_input").length > 0) {
                $(".fold_row input.fold_row_txt_input").first().focus().select();
            }
        }
        else if (focus_field == 'load_booking') {
            $("#booked_ticket_code").focus().select();
        }
        else if (focus_field == 'print_slip') {
            $("#print_slip").focus();
        }
    }
    
    check_for_folds_stake_changes();
}

// this function will override the betting slip removing any html when slip has been placed
// both normal betting and bookings
function bslip_handle_structure(structure_params,slip_info) {
    if (typeof slip_info == 'undefined' || typeof slip_info.state == 'undefined') {
        return structure_params;
    }
    if (typeof slip_info.mode == 'undefined' || slip_info.mode != 'view') {
        return structure_params;
    }
    
    var slip_extra_top = structure_params.slip_extra_top;
    var selections_html = structure_params.slip_selection;
    var bslip_info_html = structure_params.slip_stake;
    var place_bet_html = structure_params.place_bet;
    var slip_extra_bottom = structure_params.slip_extra_bottom;
    
    var slip_state = slip_info.state;
    var slip_id = slip_code = print_slip_id = '';
    if (typeof slip_info.extra.aams_slip_id != 'undefined' && slip_info.extra.aams_slip_id != null) {
        slip_id = slip_info.extra.aams_slip_id;
        slip_code = slip_id;
    }
    else if (typeof slip_info.extra.slip_id != 'undefined' && slip_info.extra.slip_id != null) {
        slip_id = slip_info.extra.slip_id;
        if (typeof slip_info.bs_code != "undefined" && slip_info.bs_code != "") {
            slip_code = slip_info.bs_code;
        }
    }
    if (typeof slip_info.extra.print_slip != 'undefined') print_slip_id = slip_info.extra.print_slip;
    
    // allowed buttons
    var show_cancel = show_print = show_print_booking = show_last = false;
    
    if (typeof slip_info.slip_type != 'undefined' && slip_info.slip_type == 'prematch') {
        show_last = true;
    }
    if (typeof slip_info.can_be_cancelled != "undefined" && slip_info.can_be_cancelled == "1") {
        show_cancel = true;
    }
    
    var bslip_notice = '';
    var bslip_notice_css = '';
    
    // booked ticket
    if (slip_state == "8") {
        bslip_info_html = '';
        slip_extra_top = '';
        selections_html = '';
        
        //place_bet_html += load_sb_tpl('sport_bslip_button_booked_slip_id',{'booking_id':slip_info.extra.slip_id});
        //place_bet_html += '<div class="clear clear_slip_id"></div>';
        
        bslip_notice = '<div class="bs_booking_id">'+slip_id+'</div>';
        bslip_notice_css = 'book';
        
        show_print_booking = true;
        print_slip_id = slip_id;
        
    }
    //cancelled
    else if (slip_state == "1") {
        bslip_info_html = '';
        bslip_notice = 'Ticket cancelled';
        if (typeof global_translation_slip_cancelled != 'undefined' && global_translation_slip_cancelled != "") {
            bslip_notice = global_translation_slip_cancelled;
        }
        bslip_notice_css = 'ticket_cancelled_notice';
    }
    //running
    else if (slip_state == "0") {
        
        bslip_info_html = '';
        selections_html = '';
        
        if (typeof global_translation_slip_played != 'undefined') bslip_notice = '<div class="bs_slip_id">'+global_translation_slip_played+'</div>';
        if (slip_code != '') bslip_notice += '<div class="bs_slip_id bs_code">'+slip_code+'</div>';
        bslip_notice_css = 'green';
        
        show_print = true;
    }
    else if (slip_state == "7") {    
        bslip_info_html = '';
        selections_html = '';
        
        if (typeof global_translation_slip_played != 'undefined') bslip_notice = '<div class="bs_slip_id">'+global_translation_slip_not_autorized+'</div>';
        if (slip_code != '') bslip_notice += '<div class="bs_slip_id bs_code">'+slip_code+'</div>';
        bslip_notice_css = 'red';
        
        show_print = true;
    }
    else show_last = false;
    
    place_bet_html += load_sb_tpl('sport_bslip_button_notice',{'css_class':bslip_notice_css,'notice':bslip_notice});
    var btn_html = '';
    if (show_print) {
        btn_html += load_sb_tpl('sport_bslip_button_print_slip',{'slip_id':print_slip_id});
    }
    else if (show_print_booking) {
        btn_html += load_sb_tpl('sport_bslip_button_print_slip_booking',{'slip_id':print_slip_id});
    }
    if (show_last) {
        btn_html += load_sb_tpl('sport_bslip_button_load_last_slip',{'slip_id':print_slip_id});
    }
    
    btn_html += load_sb_tpl('sport_bslip_button_clear_slip',{});
    
    if (show_cancel) {
        btn_html += load_sb_tpl('sport_bslip_button_cancel_slip',{});
    }
    
    place_bet_html += load_sb_tpl('sport_bslip_button_holder',{'buttons':btn_html});
    
    var output = {'slip_extra_top':slip_extra_top,'slip_selection':selections_html,'slip_stake':bslip_info_html,'place_bet':place_bet_html,'slip_extra_bottom':slip_extra_bottom};
    
    return output;
}

var refresh_slip_count = 0; // counter of refreshes done on slip
var start_refresh_slip = false; // when true, slip is refreshed every X seconds
var timeout_refresh_slip = false;// timeout interval param for refresh slip
function refresh_the_slip_countdown() {
    if (!start_refresh_slip) return;
    // reset timeout
    clearTimeout(timeout_refresh_slip);
    // max count reached, stop and show reload btn
    if (refresh_slip_count > 60) {
        $(".bs_slip_req_auth_btn.slip_buttons_area").removeClass("slip_button_hide");
        $(".req_auth_loader .preloader").hide();
        refresh_slip_count = 0;
        return;
    }
    // some other request on slip, stop and show reload btn
    if (sb_block_req) {
        $(".bs_slip_req_auth_btn.slip_buttons_area").removeClass("slip_button_hide");
        $(".req_auth_loader .preloader").hide();
        return;
    }
    refresh_slip_count ++;
    // setup the slip css
    $(".bs_slip_req_auth_btn.slip_buttons_area").addClass("slip_button_hide");
    $(".req_auth_loader .preloader").show();
    // set ttimeout to reload
    timeout_refresh_slip = setTimeout(function() {
        refresh_the_slip_countdown();
        reload_slip();
    },1000);
    
}

function build_the_slip_event_row(event,sel_to_mark) {
    
    //console.log(' JB build_the_slip_event_row', event);
    
    // get selections available
    var sel_count = Object.keys(event.sels).length; // selections count
    // no selections, event should not be displayed
    if (sel_count == 'undefined' || sel_count <= 0) return '';
    
    var html = ''; // output value
    
    // gather event information
    var event_id = event.e_id;
    if (typeof event.competitor1 == 'undefined' && typeof event.c1 != 'undefined') event.competitor1 = event.c1;
    if (typeof event.competitor2 == 'undefined' && typeof event.c2 != 'undefined') event.competitor2 = event.c2;
    var ev_teams = get_event_name(event);
    var sport_name = event.sport_name;
    var league_name = event.league_name;
    var ev_date = ev_time = ''; // date and time values
    // format the unix timestamp to milliseconds
    
    var ev_tstamp = new Date(event.tstamp * 1000);
    // convert date object to date string based on format
    ev_date = $.datepicker.formatDate(sb_date_format_js,ev_tstamp);
    // set the time based on the date object
    ev_time = (ev_tstamp.getHours() > 9) ? ev_tstamp.getHours() : "0"+ev_tstamp.getHours();
    ev_time += ':';
    ev_time += (ev_tstamp.getMinutes() > 9) ? ev_tstamp.getMinutes() : "0"+ev_tstamp.getMinutes();
    
    // populate the tiptip parameters and get the html for the tiptip
    var ev_tiptip_params = {'sport_name':sport_name,'league_name':league_name,'team_names':ev_teams,'event_date':ev_date,'event_time':ev_time};
    var ev_ttip_html = load_sb_tpl('sport_bslip_event_info_tooltip',ev_tiptip_params);
    
    var event_css_class = '';
    if (typeof event.event_off != "undefined" && event.event_off == "1") event_css_class ='event_off';
    
    var event_params = {'teams':ev_teams,'event_info':ev_ttip_html,'event_id':event_id,'event_css_class':event_css_class,'multibanker':''};
    
    if (sb_slip_data.info.type == "1" || sb_slip_data.info.type == "2") {
        event_params['multibanker'] = get_multibanker_for_event(event);
    }
    
    html = load_sb_tpl('sport_bslip_event_row',event_params);
    
    
    var sc = 0; // loop counter
    
    // now we loop the selections of this event
    for (sel_index in event.sels) {
        sc++; // loop counter updated
        var pos = sc;
        if (sc == 1) pos = 'first';
        if (sc >= sel_count) pos = 'last';
        
        if (event.sels[sel_index] == null) continue;
        
        html += build_the_slip_event_selection_row(event.sels[sel_index],pos,event_id,sb_slip_data.info.type,event_css_class);
            
        // append event and selection to array sel_to_mark
        // the array is used after a shorttimeout to set the selection in the odds area as marked
        if (sb_slip_data.info.mode != "view") {
            //if (typeof sel_to_mark[event_id] == 'undefined') sel_to_mark[event_id] = [];
            //sel_to_mark[event_id].push(event.sels[sel_index].bts_id);
            
            var to_mark = 'odd_'+event.e_id+'_'+event.sels[sel_index].bt_id+'_'+event.sels[sel_index].bts_id;
            if (typeof event.sels[sel_index].btd_id != 'undefined' && event.sels[sel_index].btd_id != "" && event.sels[sel_index].btd_id > 0) {
                to_mark += '_'+event.sels[sel_index].btd_id;
            }
            if (typeof event.sels[sel_index].bt_cat_id != 'undefined' && (event.sels[sel_index].bt_cat_id =="2" || event.sels[sel_index].bt_cat_id =="3" || event.sels[sel_index].bt_cat_id =="10" || event.sels[sel_index].bt_cat_id =="11")) {
                var sov_index = get_sov_index(event.sels[sel_index].sov);
                to_mark += '_'+sov_index;
                
            }
            sel_to_mark.push(to_mark);
            sov_index = '0';
            if (typeof event.sels[sel_index].sov != 'undefined') {
                sov_index = get_sov_index(event.sels[sel_index].sov);
            }
            to_mark = 'eol_'+event.e_id+"_"+event.sels[sel_index].bts_id+'_'+sov_index+'_'+event.sels[sel_index].btd_id;
            
            //Added JB 31/12/2021 - Ticket 8080. In the events list page the SOV for this category is being set as, e.g. 3, whereas on the live is being set as 3-00. Including both versions 
            if (typeof event.sels[sel_index].bt_cat_id != 'undefined' && (event.sels[sel_index].bt_cat_id =="9")){
                to_mark_v2 =  'eol_'+event.e_id+"_"+event.sels[sel_index].bts_id+'_'+String(sov_index).replace('-00', '')+'_'+event.sels[sel_index].btd_id;  
            }else to_mark_v2 = '';            
            
            //Added JB 31/12/2021 - Ticket 8080.  to handle tain bet types having a RT appended to the selection
            to_mark = String(to_mark).replace('_RT', '_0');
                        
            
            sel_to_mark.push(to_mark);
            if (to_mark_v2 != "") sel_to_mark.push(to_mark_v2);
        }
    }
    
    return html;
}

function get_multibanker_for_event(event) {
    
    var banker_active = 0;
    var bt_id = 0;
    for (var sel_index in event.sels) {
        if (typeof event.sels[sel_index]['banker'] != 'undefined' && event.sels[sel_index]['banker'] == "1") {
            banker_active = 1;
            bt_id = event.sels[sel_index]['bt_id'];
            break;
        }
    }
    var multibanker_params = {'event_id':event.e_id,'selection_id':'-1','bet_type_id':bt_id,'css_class':'','checked':'0'};
    if (banker_active == 1) {
        multibanker_params.checked='1';
        multibanker_params.css_class='fixed';
    }
    
    return load_sb_tpl('sport_bslip_event_selection_multi_banker',multibanker_params);
}

function build_the_slip_event_selection_row(selection,pos,event_id,slip_type,extra_row_css) { 
    var sel_id = selection.bts_id;
    var multibanker_html = ''; // html for banker button (if bslip is set to multi singles)
    
    var html = ''; // output html
    
    // slip type 2 = multi singles
    if (1==2) {
        // multi banker params
        var multibanker_params = {'event_id':event_id,'selection_id':'-1','bet_type_id':selection.bet_type_id,'css_class':'','checked':'0'};
        // banker is active/checked
        if (typeof selection.banker != 'undefined' && selection.banker == 1) {
            multibanker_params.checked='1';
            multibanker_params.css_class='fixed';
        }
        
        // get multi banker html
        multibanker_html = load_sb_tpl('sport_bslip_event_selection_multi_banker',multibanker_params);
    }
    // get the tooltip template for selections
    var sel_name = selection.sel_name;
    var bt_name = selection.bt_name;
    
    
    if (selection.bt_cat_id == "2") bt_name += ' '+get_sov_index(selection.sov,2,true)+'';
    if (selection.bt_cat_id == "10") {
        var sov_disp = selection.sov;
        if (typeof selection.sov_inverted != "undefined") {
            sov_disp = (selection.sov*-1);
        }
        bt_name += ' '+get_sov_index(sov_disp,10,true)+'';
        //console.log("CAT10!",selection,sov_disp,bt_name);
    }
    if (selection.bt_cat_id == "3" || selection.bt_cat_id == "11") sel_name += ' '+selection.sov+'';
    if (selection.bt_cat_id == "9") bt_name += ' '+selection.sov+'';
    
    if (selection.bt_cat_id == "12" || selection.bt_cat_id == "13") {
        var tmp = selection.sov.split("/");
        
        var sov_displayed_already = true;
        if (bt_name.indexOf("{sov1}") == -1 || bt_name.indexOf("{sov2}") == -1) {
            console.log("btsov check",bt_name.indexOf("{sov1}"),bt_name.indexOf("{sov2}"),sov_displayed_already)
            bt_name = tmp[0]+" "+bt_name;
            sov_displayed_already = false;
        }
        if ((sel_name.indexOf("{sov1}") == -1 || sel_name.indexOf("{sov2}") == -1) && !sov_displayed_already) {
            console.log("selsov check",sel_name.indexOf("{sov1}"),sel_name.indexOf("{sov2}"),sov_displayed_already)
            sel_name += " "+tmp[1];
            sov_displayed_already = false;
        }
        
        if (typeof tmp[0] != "undefined" && tmp[0] != null && tmp[0] != "") {
            bt_name = replaceAll(bt_name,"{sov1}",tmp[0]);
            sel_name = replaceAll(sel_name,"{sov1}",tmp[0]);
        }
        if (typeof tmp[1] != "undefined" && tmp[1] != null && tmp[1] != "") {
            bt_name = replaceAll(bt_name,"{sov2}",tmp[1]);
            sel_name = replaceAll(sel_name,"{sov2}",tmp[1]);
        }
        if (typeof tmp[2] != "undefined" && tmp[2] != null && tmp[2] != "") {
            bt_name = replaceAll(bt_name,"{sov3}",tmp[2]);
            sel_name = replaceAll(sel_name,"{sov3}",tmp[2]);
        }
        
        console.log(bt_name,'|',sel_name,'|',sov_displayed_already);
        
    }
    
    //Added JB 21/4/2021. Note: check Display Categories page on OC for disp_cat (x_id)
    if(selection.bt_cat_id == "15" && typeof selection.disp_cat != 'undefined'){
        
        disp_cat = selection.disp_cat;
        var all_sovs = selection.sov.split("|");
        
        if (disp_cat == 6 && all_sovs.length==2){ //From time; to time (minutes)
            bt_name += " "+all_sovs[0]+"-"+all_sovs[1];
        }
        if (disp_cat == 7 && all_sovs.length==2){ //From time; To time (mm:ss)
            bt_name += " "+all_sovs[0]+"-"+all_sovs[1];
        }        
        else if (disp_cat == 8 && all_sovs.length==3){ //Totals (1 decimal point); From time (mm:ss); To time (mm:ss)
            sel_name += " "+all_sovs[0];
            bt_name += " "+all_sovs[1]+"-"+all_sovs[2];
        }
        else if (disp_cat == 9 && all_sovs.length==3){ //Totals (1 decimal point); From time (mins); To time (mins)
            sel_name += " "+all_sovs[0];
            bt_name += " "+all_sovs[1]+"-"+all_sovs[2];            
        }
        else if (disp_cat == 10 && all_sovs.length==3){ //HCP (1 decimal point);  From time (mins); To time (mins)
            sel_name += " "+all_sovs[0];
            bt_name += " "+all_sovs[1]+"-"+all_sovs[2];
        }
        else if (disp_cat == 11 && all_sovs.length==3){ //Goal Nr; from time (minutes); to time (minutes)
            bt_name += " " + all_sovs[0]+ "  "+all_sovs[1]+"-"+all_sovs[2];
        }
        
        //-- Goalscorer
        else if (disp_cat == 12 && typeof selection.extra_ids[all_sovs[0]] != 'undefined'){ //Player_id. The SOV refers to a player id, but we display the player name
            sel_name = shorten_player_name(selection.extra_ids[all_sovs[0]]);
        }        
        else if (disp_cat == 13 && typeof selection.extra_ids[all_sovs[0]] != 'undefined' && all_sovs.length==2){ //Player_id; Goal nr. The first SOV refers to a player id, but we display the player name. The second SOV is the Goal number
            bt_name += " " + all_sovs[1];  //Goal nr                                                      //This is a single selection model (YES), so the player name is displayed instead of the selection name
            sel_name = shorten_player_name(selection.extra_ids[all_sovs[0]]);
        }                                                         
        /*
        //Not in use yet
        else if (disp_cat == 14 && typeof selection.player_name != 'undefined' && all_sovs.length==2 ){ //Player_id; Goal nr. The first SOV refers to a player id, but we display the player name. The second SOV is the Goal number
            bt_name += " " + all_sovs[1];                                                        //Multi-selection, so the selection name is displayed   
            sel_name = shorten_player_name(selection.player_name);
        }
        */
        else if (disp_cat == 15 &&  typeof selection.extra_ids[all_sovs[0]] != 'undefined' && all_sovs.length==2){ //Player_id; Goal nr. The first SOV refers to a player id, but we display the player name. The second SOV is the Goal number
            bt_name += " " + all_sovs[1];                                                                                             //Unlke display category 13, this is a mult-selection model (E.g. Goalscorer Nth Goal 1X2
            sel_name =  shorten_player_name(selection.extra_ids[all_sovs[0]]) + " - " + sel_name;
        }
        
        //----
        else if (disp_cat == 16 && all_sovs.length==2){ //Quarter Nr (integer); Point Nr (integer)
            bt_name += " " + all_sovs[0]+ "  "+all_sovs[1];        
        }
        else if (disp_cat == 17 && all_sovs.length==2){ //Quarter Nr (integer); Totals (decimal)
            sel_name += " " + all_sovs[1];
            bt_name += " " + all_sovs[0];
        }        
        else if (disp_cat == 18 && all_sovs.length==3){ //HCP (1 decimal point);  From time (integer); To time (integer)
            sel_name += " "+all_sovs[0];
            bt_name += " "+all_sovs[1]+"-"+all_sovs[2];
        }  
        else if (disp_cat == 20 && all_sovs.length==2){ //Set Nr (integer); Game Nr (integer)
            bt_name += " " + all_sovs[0] + "/" + all_sovs[1];
        } 
        else if (disp_cat == 22 && all_sovs.length==2){ //Period Nr (integer); Goal Nr (integer)
            bt_name += " " + all_sovs[0] + "/" + all_sovs[1];
        }
        else if (disp_cat == 23 && all_sovs.length==2){ //Period Nr (integer); HCP (1 decimal point)
            sel_name += " "+all_sovs[1];
            bt_name += " "+all_sovs[0]
        }
        else if (disp_cat == 24 &&  typeof selection.extra_ids[all_sovs[1]] != 'undefined' && all_sovs.length==2){ //Inning Nr (integer); Player (name); (multi-selection)      
            bt_name += " "+all_sovs[0]+" - " + shorten_player_name(selection.extra_ids[all_sovs[1]]);
        }
        else if (disp_cat == 25 && all_sovs.length==2){ //Inning Nr (integer) ; Totals (decimal)
            sel_name += " " + all_sovs[1];
            bt_name += " " + all_sovs[0];
        }
        else if (disp_cat == 26 && all_sovs.length==3 &&  typeof selection.extra_ids[all_sovs[1]] != 'undefined'){ //Inning Nr (integer); Player; Totals (decimal)
            sel_name += " " + all_sovs[2];
            bt_name += " "+all_sovs[0]+" - " + shorten_player_name(selection.extra_ids[all_sovs[1]]);
        }
        else if (disp_cat == 27 && all_sovs.length==4){ //Inning Nr (integer); Over Nr (integer); Delivery Nr (integer); Totals (decimal)
            sel_name += " " + all_sovs[3];
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1]+"/" +all_sovs[2]; 
        }
        else if (disp_cat == 28 && all_sovs.length==3){ //Inning Nr (integer) ; Over Nr (integer); Totals (decimal)
            sel_name += " " + all_sovs[2];
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
        }        
        else if (disp_cat == 29 && all_sovs.length==2){ //Inning Nr (integer); Over Nr (integer)
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
        }        
        else if (disp_cat == 30 && all_sovs.length==2 && typeof selection.extra_ids[all_sovs[0]] != 'undefined'){ //Player; Total (decimal)
            sel_name += " " + all_sovs[1];
            bt_name += " " + shorten_player_name(selection.extra_ids[all_sovs[0]]);
        }
        else if (disp_cat == 31 && all_sovs.length==2){ //Inning Nr (integer); Dismissal Nr (integer)
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
        }        
        else if (disp_cat == 32 && all_sovs.length==3){ //Inning Nr (integer); Dismissal Nr (integer); Total (decimal)
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
            sel_name += " " + all_sovs[2];
        }
        else if (disp_cat == 33 && all_sovs.length==3){ //Day Nr; Session Nr; Totals
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
            sel_name += " " + all_sovs[2];
        }
        else if (disp_cat == 34 && all_sovs.length==2){ //Inning Nr (integer) ; Milestone (integer)
            bt_name += " "+all_sovs[0]+"/" +all_sovs[1];
        } 
        else if (disp_cat == 35 && typeof selection.extra_ids[all_sovs[0]] != 'undefined' && all_sovs.length==3){ //Player; Inning Nr (integer); Milestone (integer)  (Selections are YES/NO)
            bt_name += " "+ shorten_player_name(selection.extra_ids[all_sovs[0]]) + all_sovs[1]+"/" +all_sovs[2];
        }
    }
    
    var max_chars_total = 40;
    
    if (sel_name.length > 18) {
        sel_name = sel_name.substring(0,15)+'...';
    }
    max_chars_total = max_chars_total - sel_name.length;
    if (bt_name.length > (max_chars_total-3)) {
        bt_name = bt_name.substring(0,(max_chars_total-3))+'...';
    }
    
    var sel_odd = format_odd_value(selection.odd);
    
    var sel_info = load_sb_tpl('sport_bslip_event_selection_tooltip',{'bet_type_name':bt_name,'selection_name':sel_name,'odd':sel_odd});
    
    // load the selection row html
    var selection_params = {
        'event_id':event_id,
        'multi_banker':multibanker_html,
        'selection_name':sel_name,
        'bet_type_name':bt_name,
        'odd':sel_odd,
        'selection_id':sel_id,
        'bet_type_id':selection.bt_id,
        'css_class':'',
        'selection_info':sel_info,
        'btd_id':selection.btd_id,
        'sov':selection.sov
    };
    // last selection of event, we set a differenct css class
    if (pos == 'last') selection_params.css_class = 'last';
    // get OLD odd value using selection.odd_change
    if (typeof selection.odd_change != 'undefined') {
        selection_params.css_class += ' odd_change';
        if (selection.odd_change > selection.odd) selection_params.css_class += ' oddc_dn';
        else selection_params.css_class += ' oddc_up';
        selection_params.odd = load_sb_tpl('sport_bslip_event_selection_odd_change',{'odd_change':selection.odd_change,'odd':sel_odd});
    }
    selection_params.css_class += ' '+extra_row_css;
    if (typeof selection.bt_off != 'undefined' && selection.bt_off == "1") {
        selection_params.css_class += ' bt_off';
    }
    
    html = load_sb_tpl('sport_bslip_event_selection_row',selection_params);
    if (pos == 'last') html += load_sb_tpl('sport_bslip_event_selection_last_row',selection_params);
    
    return html;
}

function update_bslip_info(slip_info) {
    if (typeof slip_info == 'undefined') return false;
    
    if (typeof slip_info.type != 'undefined' && slip_info.type == "0") $("#slip_tab_0").addClass("active");
    if (typeof slip_info.type != 'undefined' && slip_info.type == "1") $("#slip_tab_1").addClass("active");
    
    if (slip_info.selections == 0) return;
    
    var err_html = '';
    if (typeof slip_info.errors != 'undefined' && Object.keys(slip_info.errors).length > 0) {
        for (var e in slip_info.errors) {
            var slip_err = slip_info.errors[e];
            err_html += load_sb_tpl('sport_bslip_generic_error',{'error':slip_err});
        }
        err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':err_html});
        
    }
    $("#slip_errors").html(err_html);
    if (slip_info.type == "0") singles_stake_change();
    else if (slip_info.type == "1") multisingles_stake_change();

}
function build_the_slip_info(slip_info,loop) {
    //console.log(slip_info,loop);
    if (typeof slip_info == 'undefined' || typeof slip_info.type == 'undefined') return '';
    if (slip_info.selections == 0) return '';
    
    var html = '';
    var total_stake = 0;
    if (slip_info.type == "1") {
        if (typeof slip_info.folds != 'undefined') {
            html = load_sb_tpl('sport_bslip_info_system_folds_start',slip_info);
            for (var ci in slip_info.folds) {
                var curr_combi = slip_info.folds[ci];
                var fold_type_name = get_fold_type_tr(curr_combi.fold_id);
                var css_class = '';
                var row_css = '';
                if (
                    typeof sb_lang_id != 'undefined' 
                    && sb_lang_id == "2" 
                    && typeof slip_info.sb_sys_type != 'undefined' 
                    && slip_info.sb_sys_type == 'int' 
                    && typeof curr_combi.sb_integrale != 'undefined' 
                    && curr_combi.sb_integrale == "1"
                ) {
                    fold_type_name = "Integrale";
                    if (total_stake <= 0) {
                        curr_combi.active = "1";
                        css_class = "active";
                    }
                    row_css = 'sb_integrale';
                    
                }
                var fold_stake = curr_combi.fold_stake;
                if (fold_stake == 0) fold_stake = '';
                var combi_params = {'fold_id':curr_combi.fold_id,'fold_stake':fold_stake,'combination':curr_combi.cmb,'bets':curr_combi.bets,'cbox_css_class':css_class,'active':curr_combi.active,'bets_name':fold_type_name,'row_css':row_css};
                if (curr_combi.active == "1") combi_params.cbox_css_class = 'active';
                html += load_sb_tpl('sport_bslip_info_system_folds_item',combi_params);
                total_stake += fold_stake;
            }
            html += load_sb_tpl('sport_bslip_info_system_folds_end',slip_info);
        }
        // we use jquery extend to clone the object
        // if we do not clone the object, any updates to the clone properties will also affect the original object
        var slip_params = jQuery.extend({}, slip_info);
        slip_params.min_win = '0.00';
        slip_params.max_win = round_decimals(slip_params.max_win,2);
        slip_params.total_stake = round_decimals(slip_params.total_stake,2);
        // integrale slip
        if (typeof slip_info.sb_sys_type != 'undefined' && slip_info.sb_sys_type == 'int') {
            // calculate some integrale things
            //get_integrale_info()
            html += load_sb_tpl('sport_bslip_info_int_bet',slip_params);
        }
        else {
            html += load_sb_tpl('sport_bslip_info_system_bet',slip_params);
        }
        
    } else {
        html = load_sb_tpl('sport_bslip_info_single_bet',slip_info);
    }
    
    return html;
}

function display_place_bet_live(data) {
    // display loader
    if ($("#bslip_content #live_preloader").length == 0) {
        $("#bslip_content").append("<div id='live_preloader'></div>");
        $("#bslip_content #live_preloader").html(load_sb_tpl('sport_odds_generic_preloader',{'css_class':'l_ploader'}));
    }
    // get json data from slip
    var json = get_valid_json(data);
    // handle errors, invalid object
    if (json == false) {
        build_the_slip_ajax(data);
        return false;
    }
    // handle errors, data not available
    if (typeof json.info.extra == 'undefined' || typeof json.info.extra.pbl_wait_time == 'undefined') {
        build_the_slip_ajax(data);
        return false;
    }
    // get waittime from script, this is only used to place_bet after x time, the php script handles the check for time waiting
    var waittime = (parseInt(json.info.extra.pbl_wait_time)+1)*1000; // add an extra second to the wait time just in case
    // block requests
    sb_block_req=true;
    // call placebet after wait time
    setTimeout(function() {
        sb_block_req=false;
        place_bet(true);
    },waittime);
}