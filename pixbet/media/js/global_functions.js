var bs_js_url = '/media/js/'; // relative location of js files directory
var bs_css_url = '/media/css/'; // relative location of js files directory

// settings related to the date picker
if (typeof datepicker_date_format == 'undefined') datepicker_date_format = 'dd/mm/yy';
if (typeof datepicker_day_names == 'undefined') datepicker_day_names = ['Sunday', 'Monday', 'Tuesday',' Wednesday', 'Thursday', 'Friday', 'Saturday'];
if (typeof datepicker_day_names_short == 'undefined') datepicker_day_names_short = ['Su', 'Mo', 'Tu',' We', 'Th', 'Fr', 'Sa'];
if (typeof datepicker_month_names == 'undefined') datepicker_month_names = ['January', 'February', 'March',' April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
if (typeof datepicker_month_names_short == 'undefined') datepicker_month_names_short = ['Jan', 'Feb', 'Mar',' Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
if (typeof datepicker_first_day == 'undefined') datepicker_first_day = 1; // monday

jQuery(document).ready(function() {
    // check and retrieve the script to use the datepicker
    // the function checks if a datepicker is required before loading the assets
    use_datepicker();
    disable_search_button();
    disable_login_button();
    
    //Checks for the init_password_eye class to add a password reveal function   
    init_password_eye();
});

var bs_disabled_forms = {};
//formid = <form id=""
//buttonid = <button id="" if not set form will still be blocked, this adds disabled to button and adds css class "wait"
//addspin_to_button if set to true and buttonid exists, adds a spinner in front of the button
function disable_form_on_post(formid, buttonid, addspin_to_button){
    if (typeof bs_disabled_forms.formid != "undefined" && bs_disabled_forms.formid == true) {
        alert("Resubmit?");
        return false;
    }
    bs_disabled_forms.formid = true;
    $("#"+formid).addClass("disable_form_on_post");
    $("#"+formid+" #"+buttonid).prop("disabled",true).addClass("wait");
    if (typeof addspin_to_button != "undefined" && addspin_to_button == true) {
        $("#"+formid+" #"+buttonid).prepend("<span class='addspin_to_button'><i class='fa fa-circle-o-notch fa-spin'></i>&nbsp;</span>");
    }
    //alert("First allowed!");
    return true;
}

function disable_form_on_post_with_name(formid, button_name, addspin_to_button){
    if (typeof bs_disabled_forms.formid != "undefined" && bs_disabled_forms.formid == true) {
        alert("Resubmit?");
        return false;
    }
    bs_disabled_forms.formid = true;
    $("#"+formid).addClass("disable_form_on_post");
    $("#"+formid+" [name='"+button_name+"']").prop("disabled",true).addClass("wait");
    if (typeof addspin_to_button != "undefined" && addspin_to_button == true) {
        $("#"+formid+" [name='"+button_name+"']").prepend("<span class='addspin_to_button'><i class='fa fa-circle-o-notch fa-spin'></i>&nbsp;</span>");
    }
    //alert("First allowed!");
    return true;
}

// on normal forms that submit on page, the js var will be refreshed onload, so that is taken care by itself
// in case of ajax submits, the following method re-enables the form
function enable_form_on_post(formid,buttonid) {
    $("#"+formid).removeClass("disable_form_on_post");
    $("#"+formid+" #"+buttonid).prop("disabled",false).removeClass("wait");
    $("#"+formid+" #"+buttonid+" .addspin_to_button").remove();
    bs_disabled_forms.formid = false;
}


function use_datepicker() {
    if (jQuery(".datepicker").length <= 0) return;
    if (typeof jQuery.datepicker != "object") load_datepicker_assets();
    else init_datepicker();
}

function load_datepicker_assets() {
    // append the js
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    // dstrnisa - 2019-12-06 - add versioning on change
    script.setAttribute('src',bs_js_url+'jquery-ui.min.js?v=2019-12-06');
    
    document.getElementsByTagName("body")[0].appendChild(script);
    
    //append the css
    var css = document.createElement('link');
    css.setAttribute('type','text/css');
    css.setAttribute('rel','stylesheet');
    css.setAttribute('href',bs_css_url+'jquery-ui.structure.css');
    
    document.getElementsByTagName("head")[0].appendChild(css);
    
    
    script.onload = function() {
        jQuery(document).ready(function() {
            init_datepicker();
        });
    };
}

function init_datepicker() {
    jQuery(".datepicker").datepicker({
        'firstDay': datepicker_first_day,
        // check if datepicker is set to select a range
        // 2 datepickers are required, using attributes id, data-from, data-to
        // ex:  from date input <input type='textbox' class='datepicker dp_range' name="from" id="dp_from" data-to="dp_to">
        //      to date input <input type='textbox' class='datepicker dp_range' name="to" id="dp_to" data-to="dp_from">
        onClose: function(selectedDate) {
            if (jQuery(this).hasClass("dp_range")) {
                // check if date range start or end
                var from = false;
                var to = false;
                // check from/to values
                if (jQuery(this).attr("data-from") != 'undefined') from = jQuery(this).attr("data-from");
                if (jQuery(this).attr("data-to") != 'undefined') to = jQuery(this).attr("data-to");
                // set min max options based on from/to
                if (from != false) jQuery("#"+from).datepicker('option','maxDate',selectedDate);
                if (to != false) jQuery("#"+to).datepicker('option','minDate',selectedDate);
            }
        }
    });
    // formatting text
    jQuery(".datepicker").datepicker('option', 'dayNames', datepicker_day_names);
    jQuery(".datepicker").datepicker('option', 'dayNamesShort', datepicker_day_names_short);
    jQuery(".datepicker").datepicker('option', 'dayNamesMin', datepicker_day_names_short);
    jQuery(".datepicker").datepicker('option', 'monthNames', datepicker_month_names);
    jQuery(".datepicker").datepicker('option', 'monthNamesShort', datepicker_month_names_short);
    // managing the datepicker min/max dates
    jQuery(".datepicker.dp_future").datepicker("option", "minDate", 0 );
    jQuery(".datepicker.dp_past").datepicker("option", "maxDate", 0 );
    // allow fast selection of dates through month/year dropdowns
    jQuery(".datepicker.dp_fast").datepicker("option", "changeMonth", true );
    jQuery(".datepicker.dp_fast").datepicker("option", "changeYear", true );
    // additional update to list -100 / +100 years in dropdown
    jQuery(".datepicker.dp_fast").datepicker("option", "yearRange", "-100:+100" );
    
    // date format
    jQuery(".datepicker").datepicker("option","dateFormat",datepicker_date_format);
    
    // loop all datepickers available on page
    jQuery(".datepicker").each(function() { 
        // setting default value in datepicker inputs
        jQuery(this).datepicker('setDate', jQuery(this).attr('value'));
        // datepicker element has class `showclose`
        // this is used to apply a 'clear value' within the datepicker input
        if (jQuery(this).hasClass("showclose")) {
            // by default, each datepicker will create an id, if one is not set already
            jQuery(this).after('<div class="dp_close" data-dpid="'+jQuery(this).attr("id")+'"></div>');
        }
        
        // set max date that can be selected
        // requires attribute data-dp-maxdate="Y M D" format (example "-18Y -1M -1D") on datepicker input + class dp_maxdate
        if (jQuery(this).hasClass("dp_maxdate")) {
            var dp_dateset = jQuery(this).attr("data-dp-maxdate"); 
            //var dp_maxdate = new Date(dp_dateset);    
            jQuery(this).datepicker("option","maxDate", dp_dateset);
        }
        
        // set min date that can be selected
        // requires attribute data-dp-mindate="Y M D"  (example "-18Y -1M -1D")on datepicker input + class dp_mindate
        if (jQuery(this).hasClass("dp_mindate")) {
            var dp_dateset = jQuery(this).attr("data-dp-mindate");   
           // var dp_mindate = new Date(dp_dateset);     
            jQuery(this).datepicker("option","minDate", dp_mindate);
        }
    });
    // on click of close icon next to datepicker, datepicker input requires css class `showclose`
    jQuery(".dp_close").on("click", function(e) {
        e.preventDefault();
        // get data attribute dpid, this is the id of the datepicker element
        var dpid = jQuery(this).attr("data-dpid");
        // clear the value
        jQuery('#'+dpid).val('');
    });
}

// function to toggle between normal width and full width
function toggle_wide(noanim) {
    // set or remove css class 'noanim' on <body> tag
    // when set, no animation is generated
    if (typeof noanim != "undefined" && noanim == true) $("body").addClass("noanim");
    else $("body").removeClass("noanim");
    // set or remove css class 'wide' on <body> tag
    // toggles based on css if set
    if ($("body").hasClass("wide")) $("body").removeClass("wide");
    else $("body").addClass("wide");
}

// js does not have a replace all fn, we use a regex to replace all
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
// value is numeric?
function IsNumeric(sText) {
    // allowed chars
    var ValidChars = "0123456789.";
    if (typeof sText != 'number' && typeof sText != 'string') {
        //console.log('typeof sText',typeof sText);
        return false;
    }
    if (typeof sText == 'number') sText = sText.toString();
    var IsNumber=true;var Char;var dot = 0; // params used to validate input
    var loop_count = 0; // var used to check if characters have been looped
    // loop all chars
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        // check if char is allowed/valid
        Char = sText.charAt(i); if (ValidChars.indexOf(Char) == -1) {
            //console.log("NOT VALID CHAR",Char);
            IsNumber = false;break;
        }
        // each . will update counter
        if (Char=='.') dot++;
        
        loop_count++;// update loop counter
    }
    // more than 1 dot, not a number
    if (dot>1) IsNumber = false;
    if (loop_count == 0) IsNumber = false;
    // only the dot is here, not a valid number
    if (dot == 1 && loop_count == 1) IsNumber = false;
    
    //console.log("IsNumeric vals",sText,sText.length,dot,loop_count);
    // true or false
    return IsNumber;
}

// generic rounding
function round_decimals(original_number, decimals) {
    var result1 = original_number * Math.pow(10, decimals);
    var rounded_value = ((Math.round(result1)) / Math.pow(10, decimals)).toFixed(decimals);
    return rounded_value;
}
function floor_decimals(original_number, decimals) {
    
    if (original_number.toString().indexOf(".") == -1) {
        if (isNaN(original_number) || original_number == "") return original_number;
        return parseFloat(original_number).toFixed(decimals);
    }
    if (original_number.toString().indexOf(".") > -1) {
        var dec_places = original_number.toString().split('.')[1].length;
        if (dec_places == decimals) return original_number;
    }
    return (Math.floor(original_number * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
}
function ceil_decimals(original_number, decimals) {
    
    if (original_number.toString().indexOf(".") == -1) {
        if (isNaN(original_number) || original_number == "") return original_number;
        return parseFloat(original_number).toFixed(decimals);
    }
    if (original_number.toString().indexOf(".") > -1) {
        var dec_places = original_number.toString().split('.')[1].length;
        if (dec_places == decimals) return original_number;
    }
    return (Math.ceil(original_number * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
}
function handle_decimal_div(num1,num2) { 
    var decimals = 4;
    var x = (Math.floor((num1*1000/num2*1000) * Math.pow(10, decimals)) / Math.pow(10, decimals) / 1000000);
    return x;
}
function handle_decimal_sum(num1,num2) { 
    //return Math.round((num1+num2) * 1000) / 1000; 
    var decimals = 4;
    var x = (Math.floor(((num1*1000)+(num2*1000)) * Math.pow(10, decimals)) / Math.pow(10, decimals) / 1000000);
    return x;
}
function handle_decimal_mult(num1,num2) { 
    //return Math.round((num1*num2) * 1000) / 1000; 
    var decimals = 4;
    var x = (Math.floor(((num1*1000)*(num2*1000)) * Math.pow(10, decimals)) / Math.pow(10, decimals) / 1000000);
    return x;
}
function handle_decimal_sub(num1,num2) { 
    //return Math.round((num1-num2) * 1000) / 1000; 
    var decimals = 4;
    var x = (Math.floor(((num1*1000)-(num2*1000)) * Math.pow(10, decimals)) / Math.pow(10, decimals) / 1000000);
    return x;
}

// get a valid json object, or false on error (not a json encoded string)
function get_valid_json(json_str) {
    var is_json = true;
    if (typeof json_str == 'object') return json_str;
    // use a try / catch to disable js errors as much as possible
    try { var tmp = $.parseJSON(json_str); }
    catch(err) { is_json = false; }
    // return valid json object or false
    if (is_json) return tmp;
    else return false;
}

var display_time = [];
function display_user_time(div_elem,update_every_ms,dt_format){
    // setup a new index within the array object for the current request (using the div id as index for the js object)
    if (typeof display_time[div_elem] == 'undefined') display_time[div_elem] = false;
    if (typeof dt_format == 'undefined' || dt_format == false || dt_format == '') dt_format = '%h:%i';
    var dt = format_js_date_format(dt_format);
    // update the html for the element 
    $(div_elem).html(dt);
    // setup timer to update every update_every_ms (milliseconds)
    display_time[div_elem] = display_user_time_counter(div_elem,update_every_ms,dt_format);
}
// function to trigger change of time based on element
function display_user_time_counter(div_elem,update_every_ms,dt_format){
    if (typeof update_every_ms == 'undefined' || update_every_ms <= 0) update_every_ms = 10000;
    display_time[div_elem] = setTimeout(function() {
        display_user_time(div_elem,update_every_ms,dt_format);
    },update_every_ms);
}
function format_js_date_format(format) {
    // allowed formats
    // %dd = day in double digit
    // %dn = day name
    // %dsn = day name short
    // %d = day in single digit
    // %mm = month in double digit
    // %mn = month name
    // %msn = month name short
    // %m = month in single digit
    // %yy = year in 4 digits
    // %h = hour
    // %i = minutes
    // %s = seconds
    if (typeof format == 'undefined' || format === false || format == "") format = '%dd/%mm/%yy';
    // create new date object
    var dt = new Date();
    var dt_d = dt.getDate(); // day number
    var dt_dn = datepicker_day_names[dt.getDay()]; // day name
    var dt_dsn = datepicker_day_names_short[dt.getDay()]; // day name
    var dt_m = dt.getMonth(); // month number
    var dt_mn = datepicker_month_names[dt_m]; // month name
    var dt_msn = datepicker_month_names_short[dt_m]; // month name
    var dt_y = dt.getFullYear(); // full year XXXX
    
    var dt_h=dt.getHours(); // hours
    var dt_i=dt.getMinutes(); // mins
    var dt_s=dt.getSeconds(); // secs
    
    // double digits day and month number
    var dt_dd = dt_d; 
    var dt_mm = dt_m;
    if(dt_d<10)dt_dd="0"+dt_d;
    if(dt_m<10)dt_mm="0"+dt_m;
        
    // double digits for time 
    if(dt_h<10)dt_h="0"+dt_h;if(dt_i<10)dt_i="0"+dt_i;if(dt_s<10)dt_s="0"+dt_s;
    
    // start replacing values from the format
    var dt_out = format;
    dt_out = replaceAll(dt_out,'%dd',dt_dd);
    dt_out = replaceAll(dt_out,'%dn',dt_dn);
    dt_out = replaceAll(dt_out,'%dsn',dt_dsn);
    dt_out = replaceAll(dt_out,'%d',dt_d);
    dt_out = replaceAll(dt_out,'%mm',dt_mm);
    dt_out = replaceAll(dt_out,'%mn',dt_mn);
    dt_out = replaceAll(dt_out,'%msn',dt_msn);
    dt_out = replaceAll(dt_out,'%m',dt_m);
    dt_out = replaceAll(dt_out,'%yy',dt_y);
    dt_out = replaceAll(dt_out,'%y',dt_y);
    dt_out = replaceAll(dt_out,'%h',dt_h);
    dt_out = replaceAll(dt_out,'%i',dt_i);
    dt_out = replaceAll(dt_out,'%s',dt_s);
    
    return dt_out;
}

function display_notification(message,title) {
    // colorbox not set, we just display a basic alert box
    if (typeof $.colorbox == "undefined") {
        alert(message);
        return;
    }
    var tpl = 'notification_popup'; // name of the template to use for notifications
    
    // no tpl, we load the erro as alert direclty since we have no idea how the cbox is styled without additional classes
    if ($("#"+tpl).length != 1) {
        alert(message);
        return;
    }
    // next get the html of the selected template
    var html = '';
    var raw_html = $("#"+tpl).html();
    // replace the placeholders with the actual contents.
    html = replaceAll(raw_html,'{title}',title);
    html = replaceAll(html,'{notification}',message);
    // load the colorbox
    $.colorbox({
        html: html,
        fixed:true
    });
}

function display_bonus_popup(message_a,message_b,message_c) {
    // colorbox not set, we just display a basic alert box
    if (typeof $.colorbox == "undefined") {
        alert(message_b);
        return;
    }
    
     var tpl = 'bonus_popup'; // name of the template to use for notifications
    
    // no tpl, we load the erro as alert direclty since we have no idea how the cbox is styled without additional classes
    if ($("#"+tpl).length != 1) {
        alert(message_b);
        return;
    }
    // next get the html of the selected template
    var html = '';
    var raw_html = $("#"+tpl).html();
    // replace the placeholders with the actual contents.
    html = replaceAll(raw_html,'{message_a}',message_a);
    html = replaceAll(html,'{message_b}',message_b);
    html = replaceAll(html,'{message_c}',message_c);
    // load the colorbox
    $.colorbox({
        html: html,
        fixed:true,
        className: "cbox_bonus_popup"
    });
}


function display_custom_popup(tpl_id,params) {
    // colorbox not set, we just display a basic alert box
    if (typeof $.colorbox == "undefined") {
        alert("Error [POPUP_CBOX]");
        return;
    }
    
    if (typeof params == 'string') {
        params = JSON.parse(params);
    }
    
    // no tpl, we load the erro as alert direclty since we have no idea how the cbox is styled without additional classes
    if ($("#"+tpl_id).length != 1) {
        alert("Error [POPUP_TPL]");
        return;
    }
    // next get the html of the selected template
    var html = $("#"+tpl_id).html();
    
    for (var key in params) {
        html = replaceAll(html,'{'+key+'}',params[key]);
    }
    
    // load the colorbox
    $.colorbox({
        html: html,
        fixed:true,
        className: "cbox_bonus_popup"
    });
}

// jquery extension: unserialize
// confirm jquery is loaded first
if (typeof jQuery != 'undefined') {
/**
* $.unserialize
* Takes a string in format "param1=value1&param2=value2" and returns an object { param1: 'value1', param2: 'value2' }. If the "param1" ends with "[]" the param is treated as an array.
*
* usage var unserialized_url_array = $.unserialize(var query_string);
*/

(function(jQuery){
jQuery.unserialize = function(serializedString){
        var str = decodeURI(serializedString);
        var pairs = str.split('&');
        var obj = {}, p, idx, val;
        for (var i=0, n=pairs.length; i < n; i++) {
            p = pairs[i].split('=');
            idx = p[0];

            if (idx.indexOf("[]") == (idx.length - 2)) {
                // Eh um vetor
                var ind = idx.substring(0, idx.length-2)
                if (obj[ind] === undefined) {
                    obj[ind] = [];
                }
                obj[ind].push(p[1]);
            }
            else {
                obj[idx] = p[1];
            }
        }
        return obj;
    };
})(jQuery);
}

// Object.keys fallback for IE8
// the function is used to check length of objects (js assoc arrays are objects)
if (!Object.keys) Object.keys = function(o) {
    // not an object
    if (o !== Object(o)) {
        throw new TypeError('Object.keys called on a non-object');
    }
    // keys array and object index
    var k=[],p;
    // loop object keys
    for (p in o) {
        // has own property, it's a key, append key name to keys array
        if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    }
    return k;
}

function homepage_popup_cookie(){
    var $name = "homepage_popup_cookie";
    var $value = 1;
    var $days = 300;
    
    var $date = new Date();
    $date.setTime($date.getTime()+($days*24*60*60*1000));
    var $expires = "; expires="+$date.toGMTString();
    
    document.cookie = $name+"="+$value+$expires+"; path=/"; 
    $.colorbox.close();
}

function accept_cookie_footer(){
    var $name = "accept_cookie";
    var $value = 1;
    var $days = 7;
    
    var $date = new Date();
    $date.setTime($date.getTime()+($days*24*60*60*1000));
    var $expires = "; expires="+$date.toGMTString();
    
    document.cookie = $name+"="+$value+$expires+"; path=/";
    
    $(".fe_cookie_disclaimer").fadeOut("slow");
    $(".fe_has_cookies_disc").removeClass("fe_has_cookies_disc");
}

function accept_cookie_gdpr_notice(){
    var $name = "accept_gdpr_notice";
    var $value = 1;
    var $days = 300;
    
    var $date = new Date();
    $date.setTime($date.getTime()+($days*24*60*60*1000));
    var $expires = "; expires="+$date.toGMTString();
    
    document.cookie = $name+"="+$value+$expires+"; path=/"; 
    $.colorbox.close();
}

function change_fe_language(new_lang_id) {
    var url = '';
    
    if (window.location.search != "") {
        qstring = window.location.search;
        if (qstring.substring(0,1) == "?") qstring = qstring.substring(1);
        var href = $.unserialize(qstring);
        
        var new_qs = '';
        for (var i in href) {
            if (i == 'change_lang') continue;
            
            if (new_qs != '') new_qs += '&';
            new_qs += i+'='+href[i];
        }
        url = '?'+new_qs+'&';
    }
    else {
        url = '?';
    }
    
    
    url += 'change_lang='+new_lang_id;
    if (window.location.hash != '') url += window.location.search;
    window.location=url;
}

function form_on_submit(elem,prompt,wait_msg) {
    if ($(elem).hasClass("submitted")) {
        alert(wait_msg);
        return false;
    }
    if (typeof prompt == 'string') {
        var ans = confirm(prompt);
        if (!ans) return false;
    }
    
    $(elem).addClass("submitted").append("<div class='wait_msg'><i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i> <span class='txt'>"+wait_msg+"</span></div>");
    return true;
}


var is_fe_html_setup = false;
var allow_fe_html_init = false;
var fe_html_render_id = false;
function fe_html_setup(render_id) {
    // fn should always be called!
    
    // in case render id is not set, or -1, we enable the display of the form without any other changes
    if (typeof render_id == 'undefined' || render_id == "-1") {
        allow_fe_html_init = true;
        fe_html_render_id = -1;
        return true;
    }
    if (!is_fe_html_setup) {
        // append the js
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('src','https://www.google.com/recaptcha/api.js?render='+render_id);
    
        document.getElementsByTagName("body")[0].appendChild(script);
        
        script.onload = function() {
            grecaptcha.ready(function() {
                allow_fe_html_init = true;
                fe_html_render_id = render_id;
            });
        };
        
        is_fe_html_setup = true;
    }
}
var fe_html_setup_init_retries = 0;
function fe_html_setup_init(fn_name,elem_id) {
    if (!allow_fe_html_init) {
        
        fe_html_setup_init_retries++;
        if (fe_html_setup_init_retries < 5) {
            console.log("fe_html_setup_init not ready! retrying");
            setTimeout(function() {
                fe_html_setup_init(fn_name,elem_id);
            },100);
        }
        else {
            console.log("fe_html_setup_init not ready! stopped after "+fe_html_setup_init_retries+" retries");
        }
        
        return false;
    }
    // if render id was not set or -1, we allow displaying of the form, the logic behind will handle the rest
    if (fe_html_render_id == "-1") {
        if (typeof window[fn_name] == 'function') {
            console.log("fe_html_setup_init FN (nocaptcha)",fn_name);
            window[fn_name]();
        }
        else {
            console.log("FN: ",fn_name,"does not exist (nocaptcha)!");
        }
        return true;
    }
    
    grecaptcha.execute(fe_html_render_id, {action: "login"}).then(function(token) {
        // add token value to form
        $(elem_id).val(token);
        console.log("fe_html_setup_init OK - ",elem_id,$(elem_id).length,$(elem_id).val(),'||',token);
        if (typeof window[fn_name] == 'function') {
            console.log("fe_html_setup_init FN",fn_name);
            window[fn_name]();
        }
        else {
            console.log("FN: ",fn_name,"does not exist!");
        }
    });
    
    return true;
}

// Disable the transaction button while form is being submitted then enable it
function disable_search_button() {
    var is_form_submitted = false;
    $(".transaction-report form").on("submit", function() {
        if (is_form_submitted) return false;
        is_form_submitted = true;
        if(is_form_submitted == true) {
            $(".transaction-report .search").prop("disabled", true).css({
                "background-color": "grey",
                "opacity": '0.5',
                "cursor": "default"
            });
        }else {
            $('.transaction-report .search').prop("disabled", false).css('opacity', '1');
        }
    });
}

// Disable the login button and add a preloader while form is being submitted then enable it
var is_login_form_submitted = false;
function disable_login_button() {
    //$("#mobile_login_form, #login_page_login_form, #fe_login_box_popup form").on("submit", function() {
    $(document).on("submit", "#mobile_login_form, #login_page_login_form, #fe_login_box_popup form, .user_top_area form", function(){
        if (is_login_form_submitted) return false;
        is_login_form_submitted = true;
        if(is_login_form_submitted == true) {
            set_preloader_login_btn()
        }else {
            unset_preloader_login_btn();
        }        
    });
    
    return false;
}

function set_preloader_login_btn() {
    $(".login_btn").prop("disabled", true).addClass("login_btn_preloader_show");
}
function unset_preloader_login_btn() {
    $(".login_btn").prop("disabled", false).removeClass("login_btn_preloader_show");
}

//Used to set a password reveal eye in case of inputs with class password_eye_field
function init_password_eye() {  
    //1st we loop all fields with the specific class to add the eye icon                 
    $('.password_eye_field').each(function(i, field_obj) {  
        
        //init the parent id
        var parent_id = ""; 
        
        //if id does not exists create and assign a new random one          
        if(field_obj.id.length == 0){  
            //we assign a random id to the input
            var parent_id = $.now()+"_"+i; 
            field_obj.id = parent_id;
        }
        else parent_id = field_obj.id; 
        
        //we create the icon and we add a data attribute with the input id        
        $(field_obj).after('<i class="icon_eye" data-parent-id="'+parent_id+'"></i>');
    });          
}

//we create a click functionality that will toggle the text only for that particular gield    
$(document).on("click",".icon_eye", function() { 
    //we add the class to the icon to update the image  
    $(this).toggleClass('hide_eye');      
    
    //we get the data attribute (input id) from the icon
    var data_attribute = $(this).attr('data-parent-id');   
    
    //we update the input type
    var type = $('#' + data_attribute).attr('type') === "password" ? "text" : "password";
    $('#' + data_attribute).attr('type', type );  
});              

// used to load an image inside homepage banner popup
function colorbox_img_load() {
    $("#colorbox").css({"overflow":"visible"});
    $.colorbox.resize();
}

// used to display forced message popup or homepage banner popup
function check_and_display_home_popup() {
    // message centre forced message, so we stop any other colorbox requests
    if (typeof force_message_cb != "undefined" && force_message_cb === true) {  
    }
    // 
    else {
        jQuery(document).ready(function() {    
            $.colorbox({
                inline:true,
                href:"#homepage_popup",
                fixed:true,
                onOpen:function() {
                    $("body").css("overflow-y","hidden");
                    $("#colorbox").addClass("home-popup");
                    $.colorbox.resize();
                },
                onComplete: function() {
                    colorbox_img_load()
                },
                onClosed:function() {
                    $("body").css("overflow-y","scroll");
                    $("#colorbox").removeClass("home-popup");
                }
            });
        });
    }
}

//function used to sanitize inputs and remove possible tags
// input string str - Input that needs to be sanitized
// return false if str is empty
// return sanitized string if str is not empty 
function remove_tags(str) { 
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}