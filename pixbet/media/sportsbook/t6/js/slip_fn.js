var sb_is_live_slip = 0;
var sb_block_req = false;
var sb_slip_mode = ''; // slip mode real,fun,view,...
var sb_slip_block = false; // based on mode, some actions require to be stopped/not executed
var fold_stake_decimal_places = 2;
if (typeof bs_div_stake_complex != 'undefined' && bs_div_stake_complex === true) {
    fold_stake_decimal_places = 4;
}
jQuery(document).on("focus", "#sports_slip input", function() {
    $(this).select();
});
jQuery(document).on("keyup", ".fold_row_txt_input", function(event) {
    if (typeof event != 'undefined' && typeof event.keyCode != 'undefined' && event.keyCode == '13') {
        place_bet();
    }
});

function clear_slip() {
    $(".ev_sel_odd_result").removeClass("selected");
    
    if (sb_block_req) return false;
    var extra = 'clear_slip';
    get_sports_data('get_slip',extra,'build_the_slip_ajax');
    clearTimeout(timeout_refresh_slip);
    refresh_slip_count = 0;
    sb_slip_block=false;
    
    if (typeof close_betslip == 'function') {
        close_betslip();
    }
    return;
}

function remove_selection(tr_id) {  
    if (sb_block_req) return false;
    if (sb_slip_block) return false;
    if ($("#"+tr_id).length == 0) {
        var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':'Invalid selection'});
        $("#slip_errors").html(err_html);
        return false;
    }
    var ev_id = $("#"+tr_id).attr("data-evid");
    var bt_id = $("#"+tr_id).attr("data-btid");
    var bts_id = $("#"+tr_id).attr("data-btsid");
    var btd_id = $("#"+tr_id).attr("data-btdid");
    var sov = $("#"+tr_id).attr("data-sov");
    var extra = 'remove_selection=1&event_id='+ev_id+'&selection_id='+bts_id+'&bet_type_id='+bt_id+'&btd_id='+btd_id+'&sov='+sov;
    get_sports_data('get_slip',extra,'build_the_slip_ajax');
    return;
}

function add_selection(add_sel_qs) {
    
    //Un/highlight the selection immediately before making the call (it will be updated when the call returns)
    var sel = $("a[href*='"+add_sel_qs+"']").parent().get(0);
    $(sel).toggleClass('selected');
    
    // return false on firefox gives errors, thus we just skip requests rather than returning false
    if (sb_block_req) {}
    else if (add_sel_qs == "0" || add_sel_qs == false || add_sel_qs == 'false') {}
    else {
        var total_stake = get_total_stake();
        var extra = 'add_selection=1&'+add_sel_qs+'&total_stake='+total_stake;
        //mark_selection(event_id,selection_id);
        get_sports_data('get_slip',extra,'build_the_slip_ajax');
    }
    return;
}

function mark_selection(css_to_mark) {
    $('.'+css_to_mark).addClass("selected");
}
function unmark_selection(event_id,selection_id) {
    $(".odd_"+event_id+"_"+selection_id).removeClass("selected");
}
function unmark_all_selections(ev_sel_arr) {
    //if (typeof ev_sel_arr == 'undefined' || ev_sel_arr == false) 
    $(".ev_sel_odd.selected").removeClass("selected");
    $(".ev_sel_odd_result.selected").removeClass("selected");
    
}
function mark_selections(ev_sel_arr) {
    //console.log('Mark selections');
    //console.log(ev_sel_arr);
    for (var i in ev_sel_arr) {
        var odd_css = ev_sel_arr[i];
        mark_selection(odd_css);
    }
}

function change_banker(evid,selid) {
    if (sb_block_req) return false;
    if (sb_slip_block) return false;
    if ($("#bslip_content").hasClass("viewmode")) {
        return false;
    }
    if (sb_debug_slip) console.log(evid,selid);
    var checked = $("#mbanker_"+evid+"_"+selid).attr("data-checked");
    var is_on = 0;
    if (checked == "1") {
        //$("#mbanker_"+evid+"_"+selid).removeClass("fixed");
        $("#mbanker_"+evid+"_"+selid).attr("data-checked",0);
        is_on = 0;
    }
    else {
        //$("#mbanker_"+evid+"_"+selid).addClass("fixed");
        $("#mbanker_"+evid+"_"+selid).attr("data-checked",1);
        is_on = 1;
    }
    var banker_qs = 'event_id='+evid+'&selection_id='+selid+'&clicked='+is_on;
    get_sports_data('get_slip','&banker_clicked=1&'+banker_qs,'build_the_slip_ajax');
    
}

function change_slip_type(type) {
    if (sb_block_req) return false;
    if (sb_slip_block) return false;
    get_sports_data('get_slip','&change_slip_type='+type,'build_the_slip_ajax');
}

function is_bet_allowed() {
    var total_stake = get_total_stake();
    var slip_type = -1;
    if (typeof sb_slip_data != 'undefined' && typeof sb_slip_data.info != 'undefined' && typeof sb_slip_data.info.type != 'undefined') slip_type = sb_slip_data.info.type;
    if (slip_type == 1) return true;
    else if (slip_type == 0 && total_stake > 0) return true;
    // unknown
    return false;
}

function place_bet_live() {
    
    if (!is_bet_allowed()) return false;
    
    if (sb_block_req) return false;
    
    var url = $("#sports_slip *").serialize();
    get_sports_data('get_slip','&place_bet_live=1&'+url,'display_place_bet_live');
}
function place_bet(override) {
    if (!is_bet_allowed()) return false;
    
    if (sb_block_req) return false;
    
    if (typeof sb_slip_data != 'undefined' && typeof sb_slip_data.info != 'undefined' && typeof sb_slip_data.info.mode != 'undefined') {
        if (sb_slip_data.info.mode == 'fun') {
            
            if (typeof is_mobile_app != 'undefined' && is_mobile_app == "1") {
                //alert("You are not logged in!");
                var err_html = load_sb_tpl('sport_bslip_generic_error_holder',{'errors':'You are not logged in'});
                $("#slip_errors").html(err_html);
                return;
            }
            
            place_booking();
            return;
        }
    }
    
    if (typeof override != 'undefined' && override == true) override = true;
    else override = false;
    
    if (typeof sb_is_live_slip != 'undefined' && sb_is_live_slip == "1" && !override) {
        place_bet_live();
        return;
    }
    
    
    
    $(".slip_buttons_area").addClass("loading_slip");
    
    var url = $("#sports_slip *").serialize();
    get_sports_data('get_slip','&place_bet=1&'+url,'build_the_slip_ajax');
}
function place_booking() {
    if (!is_bet_allowed()) return false;
    
    // if slip is live, block the booking mode
    if (typeof sb_slip_data != 'undefined' 
        && typeof sb_slip_data.info != 'undefined' 
        && typeof sb_slip_data.info.is_live != 'undefined'
        && sb_slip_data.info.is_live == "1"
    ) {
        return false;
    }
    
    if (sb_block_req) return false;
    var url = $("#sports_slip *").serialize();
    get_sports_data('get_slip','&place_booking=1&'+url,'build_the_slip_ajax');
}
function req_auth() {
    if (sb_block_req) return false;
    refresh_slip_count=0;
    var url = $("#sports_slip *").serialize();
    get_sports_data('get_slip','&req_auth=1&'+url,'build_the_slip_ajax');
}

function singles_stake_change(event) {
    if (!IsNumeric($("#total_stake").val())) return false;
    
    var total_stake = $("#total_stake").val();
    total_stake = round_decimals(total_stake,2);
    
    
    //var max_win = sb_slip_data.info.total_odds * total_stake;
    var max_win = 0;
    var max_bonus = 0;
    if (typeof sb_slip_data.info.win_ml != 'undefined') {
        max_win = (parseFloat(sb_slip_data.info.win_ml)+parseFloat(sb_slip_data.info.bonus_ml))*parseFloat(total_stake);
        max_bonus = parseFloat(sb_slip_data.info.bonus_ml) * parseFloat(total_stake);
    }
    else if (typeof sb_slip_data.info.max_win != 'undefined') {
        max_win = sb_slip_data.info.max_win;
    }
    // check the max win
    if (typeof sb_slip_data.info.type != 'undefined') {
        // type: single 
        if (sb_slip_data.info.type == 0 && typeof sb_slip_data.info.max_win_single != 'undefined' && parseFloat(sb_slip_data.info.max_win_single) > 0) {
            if (max_win > parseFloat(sb_slip_data.info.max_win_single)) max_win = parseFloat(sb_slip_data.info.max_win_single);
        }
        // type: system
        else if (sb_slip_data.info.type == 1 && typeof sb_slip_data.info.max_win_system != 'undefined' && parseFloat(sb_slip_data.info.max_win_system) > 0) {
            if (max_win > parseFloat(sb_slip_data.info.max_win_system)) max_win = parseFloat(sb_slip_data.info.max_win_system);
        }
    }
    if (sb_debug_slip) console.log("max_win = sb_slip_data.info.total_odds * total_stake");
    if (sb_debug_slip) console.log(typeof total_stake,max_win,'=',sb_slip_data.info.total_odds,'*',total_stake);
    update_max_win(max_win);
    $("#max_bonus").text(round_decimals(max_bonus,2));
    if (max_bonus <= 0) $("#sports_slip .bonus_row").addClass("nobonus");
    else $("#sports_slip .bonus_row").removeClass("nobonus");
    
    if (typeof event != 'undefined' && event.keyCode == "13") {
        place_bet();
    }
    
}
function multisingles_stake_change() {
    if (!IsNumeric($("#line_stake").val())) return false;
    
    var line_stake = $("#line_stake").val();
    line_stake = round_decimals(line_stake,2);
    
    var total_stake = line_stake * sb_slip_data.info.lines;
    
    var min_win = sb_slip_data.info.min_win * line_stake;
    var max_win = sb_slip_data.info.total_odds * total_stake;
    
    if (sb_debug_slip) console.log("min_win = sb_slip_data.info.min_win * line_stake");
    if (sb_debug_slip) console.log(typeof total_stake,min_win,'=',sb_slip_data.info.min_win,'*',line_stake);
    
    if (sb_debug_slip) console.log("max_win = sb_slip_data.info.total_odds * total_stake");
    if (sb_debug_slip) console.log(typeof total_stake,max_win,'=',sb_slip_data.info.total_odds,'*',total_stake);
    
    update_min_win(min_win);
    update_max_win(max_win);
    $("#total_stake").text(round_decimals(total_stake,2));
}

function toggle_fold(fold_id,internal_call) {
    if (typeof internal_call == 'undefined' || internal_call != true) internal_call = false;
    if (sb_block_req) return false;
    if ($("#bslip_content").hasClass("viewmode")) {
        return false;
    }
    var active = ($("#cbox_fold_"+fold_id).val() == "1") ? true : false;
    if (active) {
        $("#fold_cbox_"+fold_id).removeClass("active");
        $("#cbox_fold_"+fold_id).val("0");
        
        $("#stake_fold_"+fold_id).val("");
        $("#stake_total_fold_"+fold_id).text("");
        
        if ($(".cbox input[value='1']").length == 0) {
            update_min_win(0);
            update_max_win(0);
        }
        $("#fold_row_extra_"+fold_id).removeClass("active");
        $("#fold_row_"+fold_id).removeClass("active");
        sb_slip_data.info.folds[fold_id]['active']=0;
        
        if (typeof sb_fold_total_stake[fold_id] != 'undefined') {
            delete sb_fold_total_stake[fold_id];
        }
        calculate_fold_values();
    }
    else {
        $("#fold_cbox_"+fold_id).addClass("active");
        $("#cbox_fold_"+fold_id).val("1");
        if (!internal_call) $("#stake_fold_"+fold_id).focus().select();
        sb_slip_data.info.folds[fold_id]['active']=1;
        calculate_fold_values();
    }
}

function toggle_all_folds() {
    if ($("#fold_col_toggler").hasClass("active")) {
        deactivate_all_folds();
        $("#fold_col_toggler").removeClass("active");
    }
    else {
        activate_all_folds();
        $("#fold_col_toggler").addClass("active");
    }
}

function activate_all_folds() {
    $("#bslip_folds_area .fold_row .fold_cbox").each(function() {
        /*
        $("#fold_cbox_"+fold_id).addClass("active");
        $("#cbox_fold_"+fold_id).val("1");
        if (!internal_call) $("#stake_fold_"+fold_id).focus().select();
        sb_slip_data.info.folds[fold_id]['active']=1;
        calculate_fold_values();
        */
        var fold_id = $(this).attr("data-foldid");
        $("#fold_cbox_"+fold_id).addClass("active");
        $("#cbox_fold_"+fold_id).val("1");
        //console.log(fold_id,sb_slip_data.info.folds[fold_id]);
        sb_slip_data.info.folds[fold_id]['active']=1;
    });
    calculate_fold_values();
}
function deactivate_all_folds() {
    $("#bslip_folds_area .fold_row .fold_cbox").each(function() {
        /*
        $("#fold_cbox_"+fold_id).addClass("active");
        $("#cbox_fold_"+fold_id).val("1");
        if (!internal_call) $("#stake_fold_"+fold_id).focus().select();
        sb_slip_data.info.folds[fold_id]['active']=1;
        calculate_fold_values();
        */
        var fold_id = $(this).attr("data-foldid");
        
        $("#fold_cbox_"+fold_id).removeClass("active");
        $("#cbox_fold_"+fold_id).val("0");
        
        $("#stake_fold_"+fold_id).val("");
        $("#stake_total_fold_"+fold_id).text("");
        
        if ($(".cbox input[value='1']").length == 0) {
            update_min_win(0);
            update_max_win(0);
        }
        $("#fold_row_extra_"+fold_id).removeClass("active");
        $("#fold_row_"+fold_id).removeClass("active");
        sb_slip_data.info.folds[fold_id]['active']=0;
        
        if (typeof sb_fold_total_stake[fold_id] != 'undefined') {
            delete sb_fold_total_stake[fold_id];
        }
    });
    calculate_fold_values();
}

// this function loops all folds, checks those that are active, and triggers a change to setup totals and win values
function check_for_folds_stake_changes() {
    if (typeof sb_slip_data != "undefined" && typeof sb_slip_data.info != "undefined" && typeof sb_slip_data.info.folds != "undefined") {
        for (var fid in sb_slip_data.info.folds) {
            var curr_fold = sb_slip_data.info.folds[fid];
            
            if (curr_fold.active == 0) continue;
            fold_stake_change(fid,curr_fold.bets);
        }
    }
}

var sb_fold_total_stake = {};
var sb_fold_total_timer = {};
// function used on keyup of change stake (for folds)
// the function then calls fold_stake_change() after a short timeout to allow user edit the fold stake
function fold_stake_change_keyup(fold_id,bets) {
    $("#total_stake_complex").val(0);
    if (typeof sb_fold_total_timer[fold_id] != "undefined") {
        clearTimeout(sb_fold_total_timer[fold_id]);
    }
    
    sb_fold_total_timer[fold_id] = setTimeout(function() {
        if (IsNumeric($("#stake_fold_"+fold_id).val()) && $("#stake_fold_"+fold_id).val() > 0) {
            //$("#stake_fold_"+fold_id).val(floor_decimals($("#stake_fold_"+fold_id).val(),2));
        }
        fold_stake_change(fold_id,bets);
    },300);
}
function fold_stake_onblur(fid) {
    if (typeof sb_fold_total_stake[fid] != 'undefined' && typeof sb_fold_total_stake[fid]['single_stake'] != 'undefined') {
        $("#stake_fold_"+fid).val(floor_decimals(sb_fold_total_stake[fid]['single_stake'],fold_stake_decimal_places));
    }
}
function fold_stake_change(fold_id,bets) {
    if (typeof bs_div_stake_complex != 'undefined' && bs_div_stake_complex === true) {
        fold_stake_decimal_places = 4;
    }
    
    $("#bslip_fold_divide_notice_area td").html('');
    $("#bslip_fold_divide_notice_area").hide();
    
    // something is going on already, stop process
    if (sb_block_req) return false;
    // not a numeric value
    if ($("#stake_fold_"+fold_id).val() != "" && !IsNumeric($("#stake_fold_"+fold_id).val())) {
        // reset stakes and wins for fold and calculate the remaining active folds
        $("#stake_fold_"+fold_id).val("");
        $("#stake_total_fold_"+fold_id).text("");
        if (typeof sb_fold_total_stake[fold_id] != 'undefined') {
            delete sb_fold_total_stake[fold_id];
        }
        calculate_fold_values();
        return false;
    }
    
    // if fold is not active, we set as active upon entering a valid numeric value 
    if ($("#cbox_fold_"+fold_id).val() != "1") {
        toggle_fold(fold_id,true);
    }
    /*if ($("#cbox_fold_"+fold_id).val() != "1") {
        $("#stake_fold_"+fold_id).val("");
        $("#stake_total_fold_"+fold_id).text("");
        $("#min_win").text("0.00");
        $("#max_win").text("0.00");
        $("#fold_row_extra_"+fold_id).removeClass("active");
        $("#fold_row_"+fold_id).removeClass("active");
        return false;
    }*/
    // important to have at least 1 bet set
    if (parseInt(bets) <= 0) {
        // reset the fold values
        $("#stake_fold_"+fold_id).val("");
        $("#fold_row_extra_"+fold_id).removeClass("active");
        $("#fold_row_"+fold_id).removeClass("active");
        calculate_fold_values();
        return false;
    }
    
    //set fold as active
    $("#fold_row_extra_"+fold_id).addClass("active");
    $("#fold_row_"+fold_id).addClass("active");
    
    // retrieve fold info for calculations
    var fold_info = sb_slip_data.info.folds[fold_id];
    var fold_stake = $("#stake_fold_"+fold_id).val();
    
    if (!IsNumeric(fold_stake) || isNaN(fold_stake)) {
        fold_stake = 0;
    }
    var total_stake = 0;
    var fold_win = 0;
    var fold_win_plus_bonus = 0;
    var fold_min_win = 0;
    var fold_bonus = 0;
    var fold_tstake = 0;
    var total_max_win = 0;
    var total_min_win = 0;
    
    // we need to check that the min stake / modulo per line is correctly set
    var fold_mod = (Math.round(fold_stake*100)%Math.round(global_bslip_min_stake_per_line*100))/100;
    // modulo has a remainder, meaning the stake is not allowed
    if (fold_mod != 0) {
        // get the difference, and calculate the closest floored value
        var fold_rem = (Math.round(fold_stake*100)/Math.round(global_bslip_min_stake_per_line*100))/100;
        var new_fold_stake = floor_decimals(global_bslip_min_stake_per_line*floor_decimals(fold_rem,2)*100,fold_stake_decimal_places);
        // override what the user inputted, and fold stake
        $("#stake_fold_"+fold_id).val(new_fold_stake);
        fold_stake = new_fold_stake;
    }
    
    fold_stake = floor_decimals(parseFloat(fold_stake),fold_stake_decimal_places);
    fold_tstake = fold_stake*bets; // total stake multiplied
    
    var win_ml = floor_decimals(parseFloat(fold_info.win_ml),2);
    var bonus_ml = parseFloat(fold_info.bonus_ml);
    //win_ml = floor_decimals(fold_info.win_ml,2);
    //bonus_ml = floor_decimals(fold_info.bonus_ml,2);;
    
    //console.log('win_ml',win_ml);
    
    fold_win = parseFloat(win_ml+bonus_ml)*fold_stake; // max win per fold
    
    fold_min_win = parseFloat(fold_info.smallest_line_win_ml+fold_info.smallest_line_bonus_ml)*fold_stake; // max win per fold
    fold_bonus = bonus_ml*fold_stake; // max win per fold 
    
    //console.log("FSC",fold_id,win_ml,bonus_ml,fold_stake);
    //console.log('fold_win1=',fold_win);
    var fold_win_tmp = (win_ml)*fold_stake;
    //console.log('fold_win2=',fold_win_tmp);
    
    fold_win_tmp = floor_decimals(win_ml,2)*fold_stake;
    //console.log('fold_win3=',fold_win_tmp);
    
    fold_win_tmp = floor_decimals(win_ml*fold_stake,2);
    //console.log('fold_win4=',fold_win_tmp);
    
    fold_win_tmp = floor_decimals(win_ml,2)*floor_decimals(fold_stake,2);
    fold_win_tmp = floor_decimals(fold_win_tmp,2);
    //console.log('fold_win5=',fold_win_tmp,floor_decimals(fold_stake,2));
    //fold_win = fold_win_tmp;
    
    //fold_win = (win_ml*fold_tstake)/bets;
    //console.log('fold_win',fold_win,win_ml,fold_tstake,bets);
    /*
    var tmp_win = win_ml*round_decimals(fold_tstake,2);
    fold_win = (tmp_win * fold_stake);
    
    var tmp_bonus = floor_decimals(bonus_ml*round_decimals(fold_tstake,2),2);
    tmp_bonus = (tmp_bonus * floor_decimals(fold_stake,2));
    
    fold_bonus = floor_decimals(tmp_bonus,2);
    fold_win_plus_bonus = fold_win + fold_bonus;*/
    
    if (sb_debug_slip) console.log(total,'||',round_decimals(total,2));
    // setup display values
    var curr_fold_stake_total = round_decimals(fold_tstake,2);
    if (!IsNumeric(curr_fold_stake_total)) curr_fold_stake_total = '';
    $("#stake_total_fold_"+fold_id).text(curr_fold_stake_total);
    $("#fold_max_win_"+fold_id).text(floor_decimals(fold_win,2));
    
    // set folds array default value if not set already
    if (typeof sb_fold_total_stake[fold_id] == 'undefined') {
        sb_fold_total_stake[fold_id] = {'single_stake':0,'total_stake':0,'max_win':0,'min_win':0};
    }
    
    if (!IsNumeric(fold_stake)) fold_stake = 0;
    if (!IsNumeric(fold_tstake)) fold_tstake = 0;
    if (!IsNumeric(fold_win)) fold_win = 0;
    
    if (!IsNumeric(fold_min_win)) fold_min_win = 0;
    if (!IsNumeric(fold_bonus)) fold_bonus = 0;
    if (!IsNumeric(fold_win_plus_bonus)) fold_win_plus_bonus = 0;
    
    // update the folds array
    sb_fold_total_stake[fold_id]['single_stake'] = fold_stake;
    sb_fold_total_stake[fold_id]['total_stake'] = fold_tstake;
    sb_fold_total_stake[fold_id]['max_win'] = fold_win;
    sb_fold_total_stake[fold_id]['min_win'] = fold_min_win;
    sb_fold_total_stake[fold_id]['max_bonus'] = fold_bonus;
    //sb_fold_total_stake[fold_id]['extra'] = fold_info.extra;
    //sb_fold_total_stake[fold_id]['extra_ml'] = fold_info.extra_ml;
    // calc values
    calculate_fold_values();
}

// the function handles fold values for integrale slips
function calculate_integrale_values() {
    var total_stake = 0;
    var total_max_win = 0;
    var total_min_win = 0;
    var total_max_bonus = 0;
    var biggest_win = 0;
    var smallest_win = -1;
    var biggest_ml_fold_id = 0;
    
    // loop all active folds
    for (var fid in sb_fold_total_stake) {
        // sum the totals
        total_max_win+=sb_fold_total_stake[fid]['max_win'];
        total_max_bonus+=sb_fold_total_stake[fid]['max_bonus'];
        total_stake+=sb_fold_total_stake[fid]['total_stake'];
        
        // calc biggest win for the current fold
        var biggest_line_win = (sb_fold_total_stake[fid]['single_stake']*sb_slip_data.info.folds[fid]['int_max_win_ml']) + (sb_fold_total_stake[fid]['single_stake']*sb_slip_data.info.folds[fid]['int_max_bonus_ml']);
        
        // calc smallest win for the current fold
        var smallest_line_win = (sb_fold_total_stake[fid]['single_stake']*sb_slip_data.info.folds[fid]['int_min_win_ml']) + (sb_fold_total_stake[fid]['single_stake']*sb_slip_data.info.folds[fid]['int_min_bonus_ml']);
        
        // override biggest/smallest win per slip, based on current values
        if (biggest_line_win > biggest_win) biggest_win = biggest_line_win;
        // in case smallest win was not set (using default value), override with current fold value
        if (smallest_win == -1) smallest_win = smallest_line_win;
        if (smallest_line_win < smallest_win) smallest_win = smallest_line_win;
        
        
        //$("#stake_fold_"+fid).val(floor_decimals(sb_fold_total_stake[fid]['single_stake'],fold_stake_decimal_places));
    }
    // for integrale, we do not show bonuses
    $("#sports_slip .bonus_row").removeClass("nobonus");
    
    // check the max win
    if (typeof sb_slip_data.info.type != 'undefined') {
        // type: single - this should never happen, but just in case we calculate the max win for single slips
        if (sb_slip_data.info.type == 0 && typeof sb_slip_data.info.max_win_single != 'undefined' && parseFloat(sb_slip_data.info.max_win_single) > 0) {
            if (total_max_win > parseFloat(sb_slip_data.info.max_win_single)) {
                total_max_win = parseFloat(sb_slip_data.info.max_win_single);
            }
        }
        // type: system
        else if (sb_slip_data.info.type == 1 && typeof sb_slip_data.info.max_win_system != 'undefined' && parseFloat(sb_slip_data.info.max_win_system) > 0) {
            if (total_max_win > parseFloat(sb_slip_data.info.max_win_system)) {
                total_max_win = parseFloat(sb_slip_data.info.max_win_system);
            }
            if (biggest_win > parseFloat(sb_slip_data.info.max_win_system)) {
                biggest_win = parseFloat(sb_slip_data.info.max_win_system);
            }
        }
    }
    // in case we had no updates to the smallest line (maybe no folds active?)
    if (smallest_win == -1) smallest_win = 0;
    
    // next we floor and display all values
    biggest_win = round_decimals(biggest_win,2);
    smallest_win = round_decimals(smallest_win,2);
    total_stake = ceil_decimals(total_stake,2);
    if (!IsNumeric(biggest_win)) biggest_win = '0.00';
    if (!IsNumeric(smallest_win)) smallest_win = '0.00';
    if (!IsNumeric(total_stake)) total_stake = '0.00';
    
    update_max_win(biggest_win);
    update_min_win(smallest_win);
    
    $("#total_stake").text(total_stake);
    $("#total_stake_folds").val(total_stake);
}

function calculate_fold_values() {
    
    if (typeof sb_slip_data.info != 'undefined' && typeof sb_slip_data.info.sb_sys_type != 'undefined' && sb_slip_data.info.sb_sys_type == 'int') {
        calculate_integrale_values();
        return;
    }

    var total_stake = 0;
    var total_max_win = 0;
    var total_max_win2 = 0;
    var total_min_win = 0;
    var smallest_min_win = -1;
    var total_max_bonus = 0;
    var biggest_win = 0;
    
    for (var fid in sb_fold_total_stake) {

        total_max_win += parseFloat(sb_fold_total_stake[fid]['max_win']);
        total_max_win2 += sb_fold_total_stake[fid]['max_win'];
    
        total_max_bonus += parseFloat(sb_fold_total_stake[fid]['max_bonus']);
    
        total_stake += sb_fold_total_stake[fid]['total_stake'];
    
        if (sb_fold_total_stake[fid]['max_win'] > biggest_win) biggest_win = sb_fold_total_stake[fid]['max_win'];
        if (smallest_min_win == "-1" || sb_fold_total_stake[fid]['min_win'] < smallest_min_win) smallest_min_win = sb_fold_total_stake[fid]['min_win'];

    }

    var total_max_win_plus_bonus = parseFloat(total_max_win);

    if (total_max_bonus <= 0) $("#sports_slip .bonus_row").addClass("nobonus");
    else $("#sports_slip .bonus_row").removeClass("nobonus");

    // check the max win
    if (typeof sb_slip_data.info.type != 'undefined') {
        // type: single 
        if (sb_slip_data.info.type == 0 && typeof sb_slip_data.info.max_win_single != 'undefined' && parseFloat(sb_slip_data.info.max_win_single) > 0) {
            if (total_max_win > parseFloat(sb_slip_data.info.max_win_single)) {
                total_max_win = parseFloat(sb_slip_data.info.max_win_single);
            }
        }
        // type: system
        else if (sb_slip_data.info.type == 1 && typeof sb_slip_data.info.max_win_system != 'undefined' && parseFloat(sb_slip_data.info.max_win_system) > 0) {
            if (total_max_win > parseFloat(sb_slip_data.info.max_win_system)) {
                total_max_win = parseFloat(sb_slip_data.info.max_win_system);
            }
            if (biggest_win > parseFloat(sb_slip_data.info.max_win_system)) {
                biggest_win = parseFloat(sb_slip_data.info.max_win_system);
            }
        }
    }
    
    if (smallest_min_win == "-1") smallest_min_win = 0;
    
    total_max_win = round_decimals(total_max_win_plus_bonus,2);
    smallest_min_win = round_decimals(smallest_min_win,2);
    total_max_bonus = round_decimals(total_max_bonus,2);
    if (typeof bs_div_stake_complex != 'undefined' && bs_div_stake_complex === true) {
        total_stake_normal = ceil_decimals(total_stake,2);
    }
    else {
        total_stake_normal = round_decimals(total_stake,2);
    }
    total_stake_complex = floor_decimals(total_stake,fold_stake_decimal_places);
    biggest_win = round_decimals(biggest_win,2);
    
    update_max_win(total_max_win);
    update_min_win(smallest_min_win);
    update_max_bonus(total_max_bonus);
    $("#total_stake").text(total_stake_normal);
    $("#total_stake_folds").val(total_stake_complex);
}

function get_total_stake() {
    if (!IsNumeric($("#total_stake").val())) return '0.00';
    
    var total_stake = $("#total_stake").val();
    total_stake = round_decimals(total_stake,2);
    
    return total_stake;
}

function print_slip(slip_id) {
    window.open('/modules/sports/print/print_slip.php?bs_id='+slip_id,'printslip','width=780,height=800');
}
function print_booking(slip_id) {
    window.open('/modules/sports/print/print_booking.php?bs_id='+slip_id,'printbooking','width=780,height=800');
}

var accept_odd_changes_value = 1;
function toggle_accept_odd_changes() {
    if (sb_slip_block) return false;
    var url = $("#sports_slip *").serialize();
    // currently off
    if ($("#accept_odd_changes_icon").hasClass("aoc_off")) {
        set_accept_odd_changes_on();
        get_sports_data('get_slip',url+'&accept_odd_changes=1','build_the_slip_ajax');
    }
    else {
        set_accept_odd_changes_off();
        get_sports_data('get_slip',url+'&accept_odd_changes=0','build_the_slip_ajax');
    }
    return false;
}
function check_and_set_accept_odd_changes_value() {
    if (typeof sb_slip_data == 'undefined') return false;
    if (typeof sb_slip_data.info == 'undefined') return false;
    if (typeof sb_slip_data.info.accept_odd_changes == 'undefined') return false;
    
    if (sb_slip_data.info.accept_odd_changes == "1") set_accept_odd_changes_on();
    else set_accept_odd_changes_off();
}
function set_accept_odd_changes_on() {
    accept_odd_changes_value=1;
    $("#accept_odd_changes_icon").removeClass("aoc_off");
    $("#accept_odd_changes_icon").addClass("aoc_on");
    //
}
function set_accept_odd_changes_off() {
    accept_odd_changes_value=0;
    $("#accept_odd_changes_icon").removeClass("aoc_on");
    $("#accept_odd_changes_icon").addClass("aoc_off");
    //
}

function login_enduser() {
    var post_data = $(".giroconto_wrapper *").serialize();
    $.ajax({
        url: slip_ajax_url+'?action=get_slip&login_enduser=1',
        method: "POST",
        data: post_data,
        success: function(output) {
            user_info = get_valid_json(output);
            if (!user_info || user_info == 'undefined' || user_info == null || user_info == 'false') {
                //do nothing
            }
            else {
                //get_sports_data('get_slip','','build_the_slip_ajax');
            }
            build_the_slip_ajax(output);
        }
    });
}

function autocomplete_subaccounts() {
    var ajax_url  = slip_ajax_url+'?action=filter_subaccounts';
    var paramName = 'user_search';
    
    $("#play_for_user_username").autocomplete({
        appendTo: "#subacc_list",
        delay: 150,
        source: function(request,response) {
            $.ajax({
                url: ajax_url,
                dataType: "json",
                data: {
                    user_search: request.term
                },
                success: function(data) {
                    response($.map(data.suggestions, function (item) {
                        return {
                            label: format_subaccount_item_display(item),//item.first_name+' '+item.last_name,
                            value: item.user
                        }
                    }));
                }
            });
        },
        minLength: 3,
        select: function(event, ui) {
            if ($("#play_for_user_password").length == 0) {
                $("#play_for_user_username").val(ui.item.value);
                login_enduser();
                return false;
            }
        }
    });
    
    $("#play_for_user_username").on("keyup",function(event) {
        if (typeof event == 'undefined' || event === true || event == false) {
            
        }
        else if (event.keyCode == "13") {
            if ($("#play_for_user_username").hasClass("nopin")) {
                login_enduser();
                return false;
            }
            $("#play_for_user_password").focus().select();
            return false;
        }
    })
    
    $("#play_for_user_password").keyup(function(event) {
        var key = 0;
        if (typeof event.keyCode != 'undefined') key = event.keyCode;
        else if (typeof event.which != 'undefined') key = event.which;
        // on enter key up
        if (key == "13") {
            login_enduser();
        }
    });
}

function filter_subaccounts(element,event) {
    if ($("#play_for_user_username_dd").val().length <= 2) return true;
    $("#subacc_list").html(load_sb_tpl('sport_bslip_shop_play_area_enduser_loggedout_searchusers',{'userslist':'loading'}));
    $.ajax({
        url: slip_ajax_url+'?action=filter_subaccounts&user_search='+$("#play_for_user_username_dd").val(),
        success: function(output) {
            var userslist = get_valid_json(output);
            if (!userslist || userslist.length == 0) {
                $("#subacc_list").html('');
            }
            else {
                var tmp_html = '';
                for (var i in userslist) {
                    var curruser = userslist[i];
                    tmp_html+=load_sb_tpl('sport_bslip_shop_play_area_enduser_loggedout_user_item',curruser);
                }
                $("#subacc_list").html(load_sb_tpl('sport_bslip_shop_play_area_enduser_loggedout_searchusers',{'userslist':tmp_html}));
            }
        }
    });
}
function set_subaccount_user(username) {
    $("#play_for_user_username").val(username);
    $("#play_for_user_username_dd").val(username);
    $("#subacc_list").html('');
}
function logout_subaccount() {
    get_sports_data('get_slip','clear_subacc=1','build_the_slip_ajax');
}
function set_subacc_transfer() {
    sat_val = 0;
    if ($("#cbox_subacc_transfer").is(":checked")) sat_val=1;
    get_sports_data('get_slip','subacc_transfer='+sat_val,'build_the_slip_ajax');
}

function divide_stake() {
    if (typeof bs_div_stake_complex != 'undefined' && bs_div_stake_complex === true) {
        divide_stake_complex();
    }
    else {
        divide_stake_normal();
    }
}
function divide_stake_normal() {
    
    $("#bslip_fold_divide_notice_area td").html('');
    $("#bslip_fold_divide_notice_area").hide();
    
    if (typeof global_bslip_min_stake_per_line == 'undefined') return false;
    if (global_bslip_min_stake_per_line <= 0) return false;
    // min stake per fold
    var min_fold_stake = global_bslip_min_stake_per_line;
    // inputted total stake
    var tot_stake_input = round_decimals($("#total_stake_for_div").val(),2);
    //console.log("Total stake: "+tot_stake_input);
    
    // verify that inputted stake has a numerical value
    if (isNaN(tot_stake_input)) {
        $("#total_stake_for_div").val('').focus().select();
        return false;
    }
    
    // check if at least one fold is active
    if ($("#bslip_folds_area .fold_row .fold_cbox.active").length == 0) {
        // no fold set as active, return error
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_no_active_folds',{});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        
        return false;
    }
    
    
    var total_comb = 0; // total combinations count
    // loop all folds that are active
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        // add totla combinations count
        total_comb += parseInt($(this).attr("data-comb"));
    });
    // no combinations selected, stop here
    if (total_comb == 0) {
        $("#total_stake_for_div").focus().select();
        return false;
    }
    
    // get the minimum stake per fold based on totla combinations
    var single_comb_stake = tot_stake_input / total_comb;
    //console.log("total combos:"+total_comb);
    //console.log("single combo:"+single_comb_stake);
    
    // check if stake should be updated to the nearest min fold stake
    var mod = (single_comb_stake / min_fold_stake) % 1 == 0 ? 0 : single_comb_stake % min_fold_stake;
    single_comb_stake = single_comb_stake - mod;
    //console.log("MOD single combo:"+single_comb_stake);
    
    // in case the single fold stake in less than min fold stake stop process and return error
    if (tot_stake_input > 0 && single_comb_stake < min_fold_stake) {
        
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_min_stake',{});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        $("#total_stake_for_div").focus().select();
        return false;
    }
    // round single combination stake
    single_comb_stake = round_decimals(single_comb_stake,2);
    //console.log("single combo 2:"+single_comb_stake);
    
    var total_stake_output = 0;
    var divide_folds_stake = {};
    // loop all active folds
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        var fold_id = $(this).attr("data-foldid");
        var fold_comb = $(this).attr("data-comb");
        
        // set fold stake and trigger change
        $("#stake_fold_"+fold_id).val(single_comb_stake);
        fold_stake_change(fold_id,fold_comb);
        // populate this js object to be used later
        divide_folds_stake[fold_id] = single_comb_stake;
    });
    // setup total stake currently in use
    total_stake_output = round_decimals($("#total_stake_folds").val(),2);
    //console.log('total_stake_output',total_stake_output);
    
    // get the difference from the inputted stake to the total stake in use
    var stake_diff = Math.round((tot_stake_input - total_stake_output) * 100) / 100;
    //console.log("STAKE DIFF",tot_stake_input,total_stake_output,parseFloat(stake_diff));
    
    // no difference in stake, we can stop here
    if (stake_diff <= 0) return true;
    
    var break_loop = false;
    var max_while_cc = 0;
    // next we loop until stake diff is greater than 0 or we decide to break the loop
    while (stake_diff > 0 && break_loop === false) {
        // loop all active folds
        $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
            var fold_id = $(this).attr("data-foldid");
            var fold_comb = $(this).attr("data-comb");
            // get the min stake that can be added of current fold based on combinations
            var tmp_stake = Math.round((min_fold_stake * fold_comb) * 100) / 100;
            // get the current single fold stake
            var fold_stake = divide_folds_stake[fold_id];
            fold_stake = parseFloat(Math.round((fold_stake) * 100) / 100);
            
            // the min stake can be added, and we have enough stake diff to add to current fold
            if (tmp_stake <= stake_diff) {
                //console.log("fold:",fold_id,fold_comb,tmp_stake,'|',divide_folds_stake[fold_id],'||',tmp_stake,stake_diff,fold_stake);
                // add the min stake to the fold
                //console.log('fold_stake before',fold_stake,min_fold_stake);
                fold_stake += parseFloat(Math.round((min_fold_stake) * 100) / 100);
                //console.log('fold_stake after',fold_stake);
                divide_folds_stake[fold_id] = fold_stake;
                // setup textbox value to new stake and calc fold change
                $("#stake_fold_"+fold_id).val(round_decimals(fold_stake,2));
                fold_stake_change(fold_id,fold_comb);
                // remove the stake added from stake difference
                stake_diff = Math.round((stake_diff - tmp_stake) * 100) / 100;
                //console.log('---------------------------------------',stake_diff);
            }
            // if stake is smaller than min allowed stake, break the loop
            if (stake_diff < min_fold_stake) {
                break_loop = true;
            }
            
        });
        // in case we keep looping, do a max of 10 loops and stop
        if (max_while_cc > 10) break_loop = true;
        max_while_cc++;
    }
    //console.log('stake_diff',stake_diff);
    // we still have some stake which we couldn't add to the folds
    if (stake_diff > 0) {
        // display notice to user and update total stake to divide with the total folds stake value 
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_error',{'total_fold_stake':round_decimals($("#total_stake_folds").val(),2)});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        $("#total_stake_for_div").val(round_decimals($("#total_stake_folds").val(),2)).focus().select();
    }
}
function divide_stake_complex() {
    $("#bslip_fold_divide_notice_area td").html('');
    $("#bslip_fold_divide_notice_area").hide();
    
    if (typeof global_bslip_min_stake_per_line == 'undefined') return false;
    if (global_bslip_min_stake_per_line <= 0) return false;
    // min stake per fold
    var min_fold_stake = parseFloat(global_bslip_min_stake_per_line);
    var min_fold_range = 0.0001;
    fold_stake_decimal_places = 4;
    // inputted total stake
    var tot_stake_input = parseFloat(floor_decimals($("#total_stake_for_div").val(),2));
    
    $("#total_stake_complex").val(tot_stake_input);
    
    // verify that inputted stake has a numerical value
    if (isNaN(tot_stake_input)) {
        $("#total_stake_for_div").val('').focus().select();
        return false;
    }
    
    // check if at least one fold is active
    if ($("#bslip_folds_area .fold_row .fold_cbox.active").length == 0) {
        // no fold set as active, return error
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_no_active_folds',{});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        
        return false;
    }
    
    
    var total_comb = 0; // total combinations count
    // loop all folds that are active
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        // add totla combinations count
        total_comb += parseInt($(this).attr("data-comb"));
    });
    // no combinations selected, stop here
    if (total_comb == 0) {
        $("#total_stake_for_div").focus().select();
        //console.log('total comb = 0')
        return false;
    }
    
    // get the minimum stake per fold based on totla combinations
    var single_comb_stake = handle_decimal_div(tot_stake_input,total_comb);
    
    
    
    if (tot_stake_input > 0 && single_comb_stake < min_fold_stake) {
        
        //console.log('tot_stake_input',tot_stake_input,single_comb_stake,min_fold_stake,total_comb)
        
        var min_stake_all_folds = floor_decimals(handle_decimal_mult(total_comb , min_fold_stake),2);
        
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_min_stake_complex',{'min_total_stake':min_stake_all_folds});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        return false;
    }
    
    
    var divide_folds_stake = {};
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        var fold_id = $(this).attr("data-foldid");
        var fold_comb = $(this).attr("data-comb");
        
        // set fold stake and trigger change
        $("#stake_fold_"+fold_id).val(floor_decimals(single_comb_stake,fold_stake_decimal_places));
        fold_stake_change(fold_id,fold_comb);
        // populate this js object to be used later
        divide_folds_stake[fold_id] = single_comb_stake;
    });
    
    divide_stake_diff_comples_v2(divide_folds_stake,single_comb_stake,total_comb,tot_stake_input,min_fold_range,fold_stake_decimal_places);
    
    if ((single_comb_stake*total_comb) < tot_stake_input) {
        //console.log("Stake diff AFTER: "+stake_diff);
    }
    
    calculate_fold_values();
    var total_stake_complex_user = $("#total_stake_for_div").val();
    
    $("#total_stake").text(total_stake_complex_user);
    $("#total_stake_complex").val(total_stake_complex_user);
    
}

function divide_stake_diff_comples_v2(divide_folds_stake,single_comb_stake,total_comb,tot_stake_input,min_fold_range,fold_stake_decimal_places) {
    //console.log('tot_stake_input',tot_stake_input);
    //console.log('single_comb_stake,total_comb,min_fold_range,fold_stake_decimal_places');
    //console.log(single_comb_stake,total_comb,min_fold_range,fold_stake_decimal_places);
    //console.log(divide_folds_stake);
    
    //console.log('-----------------------------------------');
    
    var min_stake_to_play = parseFloat(floor_decimals(handle_decimal_mult(single_comb_stake,total_comb),fold_stake_decimal_places));
    
    var stake_diff = parseFloat(floor_decimals(handle_decimal_sub(tot_stake_input,min_stake_to_play),2));
    
    if (stake_diff == 0 || stake_diff < single_comb_stake) {
        if (sb_debug) console.log("Stake cannot be divided anymore", stake_diff,min_stake_to_play);
        return;
    }
    
    //console.log(tot_stake_input,'-',min_stake_to_play,'=',stake_diff);
    
    //console.log("Loop Folds");
    
    var break_loop = false;
    while (break_loop == false) {
    
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        var fold_id = $(this).attr("data-foldid");
        var fold_comb = $(this).attr("data-comb");
        
        var min_stake_for_this_fold = parseFloat(floor_decimals(handle_decimal_mult(min_fold_range,fold_comb),fold_stake_decimal_places));
        
        //console.log("FOLD",fold_id,'comb',fold_comb,'min_stake_per_fold',min_stake_for_this_fold,'min_fold_range',min_fold_range);
        
        // stake less than min fold range, go to next loop
        if (stake_diff < min_fold_range) return;
        // the stake difference is bigger than we can use on this fold, go to next loop
        if (stake_diff < min_stake_for_this_fold) return;
        
        stake_diff = parseFloat(floor_decimals(handle_decimal_sub(stake_diff , min_stake_for_this_fold),fold_stake_decimal_places));
        
        divide_folds_stake[fold_id] = floor_decimals(handle_decimal_sum(parseFloat(divide_folds_stake[fold_id]) , parseFloat(min_fold_range)),fold_stake_decimal_places);
        
        //console.log("YES, we can give some of the stake to this fold",fold_id,stake_diff,'==',divide_folds_stake[fold_id]);
        
        $("#stake_fold_"+fold_id).val(divide_folds_stake[fold_id]);
        fold_stake_change(fold_id,fold_comb);
        
        if (stake_diff < min_fold_range) {
            //console.log("Breaking loop!",stake_diff,min_fold_range);
            break_loop = true;
        }
    });
    }
    
    //console.log(divide_folds_stake);
    var dt = 0;
    for (var f in divide_folds_stake) {
        var fs = parseFloat(floor_decimals(divide_folds_stake[f],fold_stake_decimal_places));
        var fold_comb = $("#bslip_folds_area .fold_row #fold_cbox_"+f).attr("data-comb");
        //console.log(f,fs,fold_comb);
        dt += (fs*fold_comb);
    }
    //console.log(dt);
    
    calculate_fold_values();
}

function divide_stake_diff_comples_v1(divide_folds_stake,single_comb_stake,total_comb,tot_stake_input,min_fold_range,fold_stake_decimal_places) {
    if ((single_comb_stake*total_comb) < tot_stake_input) {
        var stake_diff = parseFloat(round_decimals(tot_stake_input - (single_comb_stake*total_comb),fold_stake_decimal_places));
        
        if (stake_diff > min_fold_range) {
            
            //console.log("Stake diff: "+stake_diff);
            
            $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
                var fold_id = $(this).attr("data-foldid");
                var fold_comb = $(this).attr("data-comb");
                var min_stake_for_this_fold = min_fold_range*fold_comb;
                
                if (min_stake_for_this_fold < stake_diff && stake_diff >= min_fold_range) {
                    
                    var stake_to_add = parseFloat(round_decimals((stake_diff/min_stake_for_this_fold)*min_fold_range,fold_stake_decimal_places));
                    
                    if ((stake_diff - stake_to_add) >= 0) {
                    
                    var fold_stake = parseFloat(divide_folds_stake[fold_id]) + parseFloat(stake_to_add);
                    //console.log(fold_id,'stake_to_add:',stake_to_add,'pre_fold_stake',divide_folds_stake[fold_id],'fold_stake:',fold_stake,'||',stake_diff,min_stake_for_this_fold);
                    
                    stake_diff = stake_diff - stake_to_add;
                    
                    fold_stake = floor_decimals(fold_stake,fold_stake_decimal_places);
                    
                    $("#stake_fold_"+fold_id).val(fold_stake);
                    //console.log("QQQ STAKE DIFF",stake_diff);
                    fold_stake_change(fold_id,fold_comb);
                    divide_folds_stake[fold_id] = fold_stake;
                    
                    }
                    /*
                    console.log("min stake per fold",fold_id,(min_fold_range*fold_comb));
                    
                    var max_stake_diff_to_use = stake_diff / (min_fold_range*fold_comb);
                    console.log('OPOP',fold_id,max_stake_diff_to_use);
                    
                    var fold_stake = divide_folds_stake[fold_id] + (min_fold_range*fold_comb);
                    stake_diff = stake_diff - (min_fold_range*fold_comb);
                    divide_folds_stake[fold_id] = fold_stake;*/
                }
            });
        }
    }
}

function divide_stake_complex_old() {
    
    $("#bslip_fold_divide_notice_area td").html('');
    $("#bslip_fold_divide_notice_area").hide();
    
    if (typeof global_bslip_min_stake_per_line == 'undefined') return false;
    if (global_bslip_min_stake_per_line <= 0) return false;
    // min stake per fold
    var min_fold_stake = global_bslip_min_stake_per_line;
    var min_fold_range = 0.001;
    fold_stake_decimal_places = 3;
    // inputted total stake
    var tot_stake_input = round_decimals($("#total_stake_for_div").val(),2);
    //console.log("Total stake: "+tot_stake_input);
    
    $("#total_stake_complex").val(tot_stake_input);
    
    // verify that inputted stake has a numerical value
    if (isNaN(tot_stake_input)) {
        $("#total_stake_for_div").val('').focus().select();
        return false;
    }
    
    // check if at least one fold is active
    if ($("#bslip_folds_area .fold_row .fold_cbox.active").length == 0) {
        // no fold set as active, return error
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_no_active_folds',{});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        
        return false;
    }
    
    
    var total_comb = 0; // total combinations count
    // loop all folds that are active
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        // add totla combinations count
        total_comb += parseInt($(this).attr("data-comb"));
    });
    // no combinations selected, stop here
    if (total_comb == 0) {
        $("#total_stake_for_div").focus().select();
        //console.log('total comb = 0')
        return false;
    }
    
    // get the minimum stake per fold based on totla combinations
    var single_comb_stake = tot_stake_input / total_comb;
    //console.log("total combos:"+total_comb);
    //console.log("single combo:"+single_comb_stake);
    
    // check if stake should be updated to the nearest min fold stake
    var mod = ((single_comb_stake / min_fold_range) % 1 == 0) ? 0 : single_comb_stake % min_fold_range;
    //var mod2 = ((single_comb_stake / min_fold_stake) % 1 == 0) ? 0 : single_comb_stake % min_fold_stake;
    
    
    single_comb_stake = single_comb_stake - mod;
    //console.log("MOD single combo:"+single_comb_stake);
    
    // in case the single fold stake in less than min fold stake stop process and return error
    if (tot_stake_input > 0 && single_comb_stake < min_fold_stake) {
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_min_stake',{});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        $("#total_stake_for_div").focus().select();
        return false;
    }
    // round single combination stake
    //single_comb_stake = round_decimals(single_comb_stake,fold_stake_decimal_places);
    //console.log("single combo 2:"+single_comb_stake);
    
    var total_stake_output = 0;
    var divide_folds_stake = {};
    
    //console.log('single_comb_stake',single_comb_stake);
    
    // loop all active folds
    $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
        var fold_id = $(this).attr("data-foldid");
        var fold_comb = $(this).attr("data-comb");
        single_comb_stake = floor_decimals(single_comb_stake,fold_stake_decimal_places);
        // set fold stake and trigger change
        $("#stake_fold_"+fold_id).val(single_comb_stake);
        fold_stake_change(fold_id,fold_comb);
        // populate this js object to be used later
        divide_folds_stake[fold_id] = single_comb_stake;
    });
    
    //console.log('divide_folds_stake',divide_folds_stake);
    
    // setup total stake currently in use
    total_stake_output = round_decimals($("#total_stake_folds").val(),fold_stake_decimal_places);
    //console.log('total_stake_output',total_stake_output);
    
    // get the difference from the inputted stake to the total stake in use
    var stake_diff = Math.round((tot_stake_input - total_stake_output) * 1000) / 1000;
    //console.log("STAKE DIFF",tot_stake_input,total_stake_output,parseFloat(stake_diff));
    
    // no difference in stake, we can stop here
    if (stake_diff <= 0) {
        calculate_fold_values();
        return true;
    }
    
    var break_loop = false;
    var max_while_cc = 0;
    var tmp_stake = 0;
    // next we loop until stake diff is greater than 0 or we decide to break the loop
    while (stake_diff > 0 && break_loop === false) {
        // loop all active folds
        $("#bslip_folds_area .fold_row .fold_cbox.active").each(function() {
            var fold_id = $(this).attr("data-foldid");
            var fold_comb = $(this).attr("data-comb");
            // get the min stake that can be added of current fold based on combinations
            tmp_stake = Math.round((min_fold_range * fold_comb) * 1000) / 1000;
            // get the current single fold stake
            var fold_stake = divide_folds_stake[fold_id];
            //console.log("A"+fold_id,fold_stake);
            fold_stake = parseFloat(Math.round((fold_stake) * 1000) / 1000);
            //console.log("B"+fold_id,fold_stake);
            //console.log('=---------------=');
            
            // the min stake can be added, and we have enough stake diff to add to current fold
            if (tmp_stake <= stake_diff) {
                
                //console.log('tmp_stake',tmp_stake,stake_diff,'FS',fold_stake);
                
                // add the min stake to the fold
                fold_stake += parseFloat(Math.round((min_fold_range) * 1000) / 1000);
                //console.log('fsAA',fold_stake,parseFloat(Math.round((min_fold_range) * 1000) / 1000));
                fold_stake = floor_decimals(fold_stake,fold_stake_decimal_places);
                //console.log('fsBB',fold_stake);
                divide_folds_stake[fold_id] = fold_stake;
                // setup textbox value to new stake and calc fold change
                $("#stake_fold_"+fold_id).val(fold_stake);
                //console.log(round_decimals(fold_stake,fold_stake_decimal_places),"||",fold_stake,fold_stake_decimal_places);
                fold_stake_change(fold_id,fold_comb);
                // remove the stake added from stake difference
                stake_diff = Math.round((stake_diff - tmp_stake) * 1000) / 1000;
            }
            // if stake is smaller than min allowed stake, break the loop
            if (stake_diff < min_fold_range) {
                //console.log('stake_diff < min_fold_range',stake_diff,min_fold_range);
                break_loop = true;
            }
            
            //console.log('stake diff fold',fold_id,stake_diff);
            //if (fold_id == "6") break_loop = true;
        });
        // in case we keep looping, do a max of 10 loops and stop
        if (max_while_cc > 20) break_loop = true;
        max_while_cc++;
        //console.log('stake diff all',stake_diff,max_while_cc,tmp_stake);
    }
    
    //console.log('tot_stake_input',tot_stake_input,'SD',stake_diff,'#ttl stake folds',$("#total_stake_folds").val());
    
    //console.log('stake_diff',stake_diff);
    // we still have some stake which we couldn't add to the folds
    if (stake_diff > 0 && round_decimals($("#total_stake_folds").val(),2) != round_decimals(tot_stake_input,2)) {
        //console.log(stake_diff);
        // display notice to user and update total stake to divide with the total folds stake value 
        var notice_html = load_sb_tpl('sport_bslip_info_system_folds_divide_error',{'total_fold_stake':round_decimals($("#total_stake_folds").val(),2)});
        $("#bslip_fold_divide_notice_area td").html(notice_html);
        $("#bslip_fold_divide_notice_area").show();
        $("#total_stake_for_div").val(round_decimals($("#total_stake_folds").val(),2)).focus().select();
    }
    
    
    calculate_fold_values();
}
// function used on keypress of total folds stake field, 
// triggers the divide stake functionality on enter keypress
function div_stake_input_keypress(elem,event) {
    if (typeof bs_div_stake_complex != 'undefined' && bs_div_stake_complex === true) {
        if ($("#bslip_folds_area .fold_row .fold_cbox.active").length > 0) {
        // event exists, keycode 13 = entrer key
            divide_stake();
        }
    }
    else {
        // event exists, keycode 13 = entrer key
        if (typeof event != 'undefined' && typeof event.keyCode != 'undefined' && event.keyCode == "13") {
            divide_stake();
        }
    }
}

function play_slip(slip_id) {
    get_sports_data('get_slip','load_slip='+slip_id,'build_the_slip_ajax');
}

// toggle booked ticket area
function toggle_booked_ticket_area() {
    $(".load_booked_ticket_area").slideToggle(200, function() {
        $("#booked_ticket_code").focus().select();
    });
}

// booked ticket loader
function check_booked_ticket_code_keyup(event) {
    if (typeof event != 'undefined' && typeof event.keyCode != 'undefined' && event.keyCode == "13") {
        submit_booked_ticket_code();
    }
}
// submit booked ticket code
function submit_booked_ticket_code() {
    var code = $("#booked_ticket_code").val();
    get_sports_data('get_slip','&load_booking='+code,'build_the_slip_ajax');
}

function check_load_sports_bslip_id_keyup(event) {
    if (typeof event != 'undefined' && typeof event.keyCode != 'undefined' && event.keyCode == "13") {
        submit_load_sports_bslip_id();
    }
}
function submit_load_sports_bslip_id() {
    var slip_id = $("#load_sports_bslip_id").val();
    
    var ajax_url = sb_ajax_url;
    if (typeof slip_ajax_url != 'undefined' && slip_ajax_url != false) ajax_url = slip_ajax_url;
    
    ajax_url += '?action=get_slip&json=1&load_bslip_info=1&bs_id='+slip_id;
    
    $.colorbox({
        href: ajax_url,
        innerWidth:"80%", innerHeight:"85%",
        ajax: true,
        onComplete: function() {
        
        }
    });
    
}
function set_and_submit_sports_bslip_id(bs_code) {
    $("#load_sports_bslip_id").val(bs_code);
    
    var ajax_url = sb_ajax_url;
    if (typeof slip_ajax_url != 'undefined' && slip_ajax_url != false) ajax_url = slip_ajax_url;
    
    ajax_url += '?action=get_slip&json=1&load_bslip_info=1&bs_id='+bs_code;
    
    $.colorbox({
        href: ajax_url,
        innerWidth:"80%", innerHeight:"85%",
        ajax: true,
        onComplete: function() {
        
        }
    });
}

function cancel_slip() {
    
    var txt = 'Cancel ticket?';
    if (typeof global_translation_slip_confirm_cancel != 'undefined' && global_translation_slip_confirm_cancel != '') {
        txt = global_translation_slip_confirm_cancel;
    }
    var ans = confirm(txt);
    if (!ans) return false;
    
    get_sports_data('get_slip','&cancel_slip=1','build_the_slip_ajax');
}


// returns an object with all integrale info
function get_integrale_info() {
    if (typeof sb_slip_data.info == 'undefined') return false;
    if (typeof sb_slip_data.info.sb_sys_type == 'undefined') return false;
    if (sb_slip_data.info.sb_sys_type != 'int') return false;
    
    var output = {};
    output.min_win
}


function update_max_win(max_win) {
    $("#max_win").text(round_decimals(max_win,2));
}
function update_min_win(min_win) {
    $("#min_win").text(round_decimals(min_win,2));
}
function update_max_bonus(max_bonus) {
    $("#max_bonus").text(round_decimals(max_bonus,2));
}

function  shorten_player_name(name){
  parts = name.split(" ");
  if (parts.length <= 1) return name;
  parts[0] = parts[0].charAt(0);
  return parts.join(" ");
}