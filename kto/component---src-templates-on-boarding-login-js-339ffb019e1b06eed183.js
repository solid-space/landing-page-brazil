"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[69],{798:function(e,a,o){o.d(a,{Z:function(){return m}});var t=o(1865),n=o(1950),i=o(7219),r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"a second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"a minute",other:"{{count}} minutes"},aboutXHours:{one:"about an hour",other:"about {{count}} hours"},xHours:{one:"an hour",other:"{{count}} hours"},xDays:{one:"a day",other:"{{count}} days"},aboutXWeeks:{one:"about a week",other:"about {{count}} weeks"},xWeeks:{one:"a week",other:"{{count}} weeks"},aboutXMonths:{one:"about a month",other:"about {{count}} months"},xMonths:{one:"a month",other:"{{count}} months"},aboutXYears:{one:"about a year",other:"about {{count}} years"},xYears:{one:"a year",other:"{{count}} years"},overXYears:{one:"over a year",other:"over {{count}} years"},almostXYears:{one:"almost a year",other:"almost {{count}} years"}},d=function(e,a,o){var t,n=r[e];return t="string"==typeof n?n:1===a?n.one:n.other.replace("{{count}}",a.toString()),null!=o&&o.addSuffix?o.comparison&&o.comparison>0?"in "+t:t+" ago":t},s=o(9526),m={code:"en-CA",formatDistance:d,formatLong:{date:(0,s.Z)({formats:{full:"EEEE, MMMM do, yyyy",long:"MMMM do, yyyy",medium:"MMM d, yyyy",short:"yyyy-MM-dd"},defaultWidth:"full"}),time:(0,s.Z)({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:(0,s.Z)({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},formatRelative:t.Z,localize:n.Z,match:i.Z,options:{weekStartsOn:0,firstWeekContainsDate:1}}},1655:function(e,a,o){o.d(a,{Z:function(){return g}});var t={lessThanXSeconds:{one:"menos de un segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"medio minuto",lessThanXMinutes:{one:"menos de un minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"alrededor de 1 hora",other:"alrededor de {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 día",other:"{{count}} días"},aboutXWeeks:{one:"alrededor de 1 semana",other:"alrededor de {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"alrededor de 1 mes",other:"alrededor de {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"alrededor de 1 año",other:"alrededor de {{count}} años"},xYears:{one:"1 año",other:"{{count}} años"},overXYears:{one:"más de 1 año",other:"más de {{count}} años"},almostXYears:{one:"casi 1 año",other:"casi {{count}} años"}},n=function(e,a,o){var n,i=t[e];return n="string"==typeof i?i:1===a?i.one:i.other.replace("{{count}}",a.toString()),null!=o&&o.addSuffix?o.comparison&&o.comparison>0?"en "+n:"hace "+n:n},i=o(9526),r={date:(0,i.Z)({formats:{full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d MMM y",short:"dd/MM/y"},defaultWidth:"full"}),time:(0,i.Z)({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,i.Z)({formats:{full:"{{date}} 'a las' {{time}}",long:"{{date}} 'a las' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'el' eeee 'pasado a la' p",yesterday:"'ayer a la' p",today:"'hoy a la' p",tomorrow:"'mañana a la' p",nextWeek:"eeee 'a la' p",other:"P"},s={lastWeek:"'el' eeee 'pasado a las' p",yesterday:"'ayer a las' p",today:"'hoy a las' p",tomorrow:"'mañana a las' p",nextWeek:"eeee 'a las' p",other:"P"},m=function(e,a,o,t){return 1!==a.getUTCHours()?s[e]:d[e]},l=o(8486),u={ordinalNumber:function(e,a){return Number(e)+"º"},era:(0,l.Z)({values:{narrow:["AC","DC"],abbreviated:["AC","DC"],wide:["antes de cristo","después de cristo"]},defaultWidth:"wide"}),quarter:(0,l.Z)({values:{narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:(0,l.Z)({values:{narrow:["e","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],wide:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]},defaultWidth:"wide"}),day:(0,l.Z)({values:{narrow:["d","l","m","m","j","v","s"],short:["do","lu","ma","mi","ju","vi","sá"],abbreviated:["dom","lun","mar","mié","jue","vie","sáb"],wide:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]},defaultWidth:"wide"}),dayPeriod:(0,l.Z)({values:{narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"}},defaultFormattingWidth:"wide"})},c=o(974),h=o(6723),g={code:"es",formatDistance:n,formatLong:r,formatRelative:m,localize:u,match:{ordinalNumber:(0,c.Z)({matchPattern:/^(\d+)(º)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,h.Z)({matchPatterns:{narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes de la era com[uú]n)/i,/^(despu[eé]s de cristo|era com[uú]n)/i]},defaultParseWidth:"any"}),quarter:(0,h.Z)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º)? trimestre/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,h.Z)({matchPatterns:{narrow:/^[efmajsond]/i,abbreviated:/^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,wide:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^e/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^en/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i]},defaultParseWidth:"any"}),day:(0,h.Z)({matchPatterns:{narrow:/^[dlmjvs]/i,short:/^(do|lu|ma|mi|ju|vi|s[áa])/i,abbreviated:/^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,wide:/^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^j/i,/^v/i,/^s/i],any:[/^do/i,/^lu/i,/^ma/i,/^mi/i,/^ju/i,/^vi/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:(0,h.Z)({matchPatterns:{narrow:/^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,any:/^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mn/i,noon:/^md/i,morning:/mañana/i,afternoon:/tarde/i,evening:/tarde/i,night:/noche/i}},defaultParseWidth:"any"})},options:{weekStartsOn:1,firstWeekContainsDate:1}}},5728:function(e,a,o){o.d(a,{E:function(){return n}});var t=o(4854);const n=()=>{var e;const a=(0,t.useStaticQuery)("1938745570"),{otherBannersApi:{values:o}}=a,n=(null==o||null===(e=o[0])||void 0===e?void 0:e.otherBanners.filter((e=>"registration"===e.type))[0])||null;return{image:n?n.background:null,imageMobile:n?n.backgroundMobile:null,text:n?n.banner_title_text:null,textColor:n?n.text_color:null}}},7707:function(e,a,o){o.r(a),o.d(a,{Head:function(){return I},default:function(){return O}});var t,n,i=o(1880),r=(o(7207),o(7294)),d=o(2788),s=o(4854),m=o(7536),l=o(9484),u={lessThanXSeconds:{one:"menos de um segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"meio minuto",lessThanXMinutes:{one:"menos de um minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"aproximadamente 1 hora",other:"aproximadamente {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 dia",other:"{{count}} dias"},aboutXWeeks:{one:"aproximadamente 1 semana",other:"aproximadamente {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"aproximadamente 1 mês",other:"aproximadamente {{count}} meses"},xMonths:{one:"1 mês",other:"{{count}} meses"},aboutXYears:{one:"aproximadamente 1 ano",other:"aproximadamente {{count}} anos"},xYears:{one:"1 ano",other:"{{count}} anos"},overXYears:{one:"mais de 1 ano",other:"mais de {{count}} anos"},almostXYears:{one:"quase 1 ano",other:"quase {{count}} anos"}},c=function(e,a,o){var t,n=u[e];return t="string"==typeof n?n:1===a?n.one:n.other.replace("{{count}}",String(a)),null!=o&&o.addSuffix?o.comparison&&o.comparison>0?"daqui a "+t:"há "+t:t},h=o(9526),g={date:(0,h.Z)({formats:{full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d 'de' MMM 'de' y",short:"dd/MM/y"},defaultWidth:"full"}),time:(0,h.Z)({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,h.Z)({formats:{full:"{{date}} 'às' {{time}}",long:"{{date}} 'às' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},f={lastWeek:function(e){var a=e.getUTCDay();return"'"+(0===a||6===a?"último":"última")+"' eeee 'às' p"},yesterday:"'ontem às' p",today:"'hoje às' p",tomorrow:"'amanhã às' p",nextWeek:"eeee 'às' p",other:"P"},p=function(e,a,o,t){var n=f[e];return"function"==typeof n?n(a):n},v=o(8486),b={ordinalNumber:function(e,a){return Number(e)+"º"},era:(0,v.Z)({values:{narrow:["aC","dC"],abbreviated:["a.C.","d.C."],wide:["antes de Cristo","depois de Cristo"]},defaultWidth:"wide"}),quarter:(0,v.Z)({values:{narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:(0,v.Z)({values:{narrow:["j","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],wide:["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]},defaultWidth:"wide"}),day:(0,v.Z)({values:{narrow:["d","s","t","q","q","s","s"],short:["dom","seg","ter","qua","qui","sex","sáb"],abbreviated:["dom","seg","ter","qua","qui","sex","sáb"],wide:["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"]},defaultWidth:"wide"}),dayPeriod:(0,v.Z)({values:{narrow:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"manhã",afternoon:"tarde",evening:"noite",night:"madrugada"},abbreviated:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"manhã",afternoon:"tarde",evening:"noite",night:"madrugada"},wide:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"manhã",afternoon:"tarde",evening:"noite",night:"madrugada"}},defaultWidth:"wide",formattingValues:{narrow:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"da manhã",afternoon:"da tarde",evening:"da noite",night:"da madrugada"},abbreviated:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"da manhã",afternoon:"da tarde",evening:"da noite",night:"da madrugada"},wide:{am:"AM",pm:"PM",midnight:"meia-noite",noon:"meio-dia",morning:"da manhã",afternoon:"da tarde",evening:"da noite",night:"da madrugada"}},defaultFormattingWidth:"wide"})},y=o(6723),w={code:"pt",formatDistance:c,formatLong:g,formatRelative:p,localize:b,match:{ordinalNumber:(0,o(974).Z)({matchPattern:/^(\d+)(º|ª)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,y.Z)({matchPatterns:{narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes da era comum|depois de cristo|era comum)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes da era comum)/i,/^(depois de cristo|era comum)/i]},defaultParseWidth:"any"}),quarter:(0,y.Z)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º|ª)? trimestre/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,y.Z)({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,wide:/^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ab/i,/^mai/i,/^jun/i,/^jul/i,/^ag/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:(0,y.Z)({matchPatterns:{narrow:/^[dstq]/i,short:/^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,abbreviated:/^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,wide:/^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^d/i,/^s/i,/^t/i,/^q/i,/^q/i,/^s/i,/^s/i],any:[/^d/i,/^seg/i,/^t/i,/^qua/i,/^qui/i,/^sex/i,/^s[áa]/i]},defaultParseWidth:"any"}),dayPeriod:(0,y.Z)({matchPatterns:{narrow:/^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,any:/^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^meia/i,noon:/^meio/i,morning:/manh[ãa]/i,afternoon:/tarde/i,evening:/noite/i,night:/madrugada/i}},defaultParseWidth:"any"})},options:{weekStartsOn:1,firstWeekContainsDate:4}},M=o(798),x=o(1655),P=o(4684),W=o(4546),C=o(498),_=o(4555),k=o(8209),j=o(6644),Z=o(2814),E=o(5553),S=o(334),q=o(8891),A=o(5728),T=o(6007),H=o(6463);const L={en:l.Z,pt:w,ca:M.Z,pe:x.Z,cl:x.Z},z="pt",X=d.default.div.withConfig({displayName:"login__Content",componentId:"sc-qq5yt0-0"})(["position:relative;display:flex;flex-direction:column;justify-content:center;height:100%;background-color:",";form{max-width:80%;width:100%;margin:0 auto;}",";"],P.lB.white,P.SJ.desktop(t||(t=(0,i.Z)(["\n    form {\n      max-width: 500px;\n    }\n  "])))),N=d.default.h1.withConfig({displayName:"login__Headline",componentId:"sc-qq5yt0-1"})(["",""],P.SJ.maxTablet(n||(n=(0,i.Z)(["\n    font-size: 1.2em;\n    margin-bottom: 1.5em;\n  "])))),D=(0,d.default)(s.Link).withConfig({displayName:"login__ForgotPassword",componentId:"sc-qq5yt0-2"})(["color:",";text-align:center;margin:2rem 0 0.5rem 0;display:block;"],P.lB.black),B=d.default.div.withConfig({displayName:"login__JoinNowWrapper",componentId:"sc-qq5yt0-3"})(["text-align:center;"]),Y=(0,d.default)(s.Link).withConfig({displayName:"login__JoinNow",componentId:"sc-qq5yt0-4"})(["color:",";"],P.lB.green);var O=e=>{var a,o,t;const{lang:n}=(0,S.m)(),{isMobile:i}=(0,C.Z)(),{image:d,imageMobile:l,text:u,textColor:c}=(0,A.E)(),h=null===(a=(0,H.Z)())||void 0===a?void 0:a.onSuccess,[g,f,p]=(0,j.Z)(["sports","casino","register"]),{register:v,handleSubmit:b,formState:{errors:y}}=(0,m.cI)({mode:"onChange"}),{0:w,1:M}=(0,r.useState)(!1),{0:x,1:P}=(0,r.useState)(!1),{0:O,1:I}=(0,r.useState)(!1),{1:R}=(0,r.useState)(),{loginUser:U,isLoggedIn:V,user:F,loginBlocked:G}=(0,r.useContext)(W.V),J=(0,k.Z)("mgaLicense"),K=_.Z.getValue("lastVisitedPage"),Q=_.Z.getValue("lobby"),$=null==e||null===(o=e.location)||void 0===o||null===(t=o.state)||void 0===t?void 0:t.redirectURL;G&&"undefined"!=typeof window&&(0,s.navigate)("/blocked"),(0,r.useEffect)((()=>{V&&(h?(0,s.navigate)((0,q.dl)(h),{replace:!0}):$?(0,s.navigate)((0,q.dl)($),{replace:!0}):K&&"/"!==K&&"/reset/"!==K&&"/pt/"!==K&&"/pt/reset/"!==K&&"/sportsbook-menu/"!==K&&"/pt/sportsbook-menu/"!==K?(0,s.navigate)((0,q.dl)(K)):Q&&Q.indexOf("/pt/")>=0?(0,s.navigate)((0,q.dl)(Q)):J?(0,s.navigate)("/"+f+"/"):(0,s.navigate)("/"+g+"/"))}),[V,F,$]),(0,r.useEffect)((()=>{var e,a;R(null==L?void 0:L[z]),null===(e=window)||void 0===e||null===(a=e.dataLayer)||void 0===a||a.push({event:"login_click"})}),[]);const ee=(0,T.C)((async e=>{var a,o;I(!0);try{var t,i;null===(t=window)||void 0===t||null===(i=t.ReactNativeWebView)||void 0===i||i.postMessage(JSON.stringify({message_code:"LOGIN"}))}catch(m){console.error(m)}const d=await U({username:null===(a=e.username)||void 0===a?void 0:a.trim().toLowerCase(),password:null===(o=e.password)||void 0===o?void 0:o.trim(),token:null==e?void 0:e.recaptchaToken});if(!d.ok)if(I(!1),174===d.error.messageCode)P(null==n?void 0:n.login.error.the_login_failed_please_check_your_username_and_password);else if(420===d.error.messageCode)P(n.login.error.ReCaptcha_verification_failure_code_420);else if(7===d.error.messageCode)P(null==n?void 0:n.login.error.self_exclusion);else if(19===d.error.messageCode)P(null==n?void 0:n.login.error.cool_off);else if(33===d.error.messageCode){var s;P(r.createElement("p",null,(null==n||null===(s=n.login.error.user_login_is_disabled)||void 0===s?void 0:s.replace("{{SUPPORT_EMAIL}}",""))+" ",r.createElement("a",{className:"error",href:"mailto:"+Z.B.GATSBY_SUPPORT_EMAIL},Z.B.GATSBY_SUPPORT_EMAIL)))}else 197===d.error.messageCode?P(null==n?void 0:n.account["not-verified"]):280===d.error.messageCode?P(null==n?void 0:n.login.error.KYCpepper):70===d.error.messageCode?P(null==n?void 0:n.login.error.wrongEmail):34===d.error.messageCode?ae(d.error):27===d.error.messageCode?P(null==n?void 0:n.account.verification.contactSupport):223===d.error.messageCode?P(null==n?void 0:n.login.error.keycloakTimeout):P(d.error.message)}),"LOGIN"),ae=e=>{var a,o;if(null==e||null===(a=e.data)||void 0===a||!a.lockedUntil)return P(e.message);const t=new Date((null==e||null===(o=e.data)||void 0===o?void 0:o.lockedUntil)+"Z");P(null==n?void 0:n.login.error.accountLocked.replaceAll("[time]",t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})))};return G?r.createElement(r.Fragment,null):r.createElement(E.SplitLayout,{img:i?l:d,text:u,textColor:c,hideLeftSideOnMobile:!0,hideMobileCTA:!0},r.createElement(X,null,r.createElement("form",{onSubmit:b(ee)},r.createElement(N,null," ",null==n?void 0:n.login.header," "),r.createElement(E.Field,{label:null==n?void 0:n.userProfile.username,errors:y,maxLength:"100",id:"username",hasBeenSubmitted:w,formProperties:v("username",{required:!0})}),r.createElement(E.FieldPassword,{errors:y,id:"password",hasBeenSubmitted:w,formProperties:v("password",{required:!0})}),r.createElement(E.Button,{id:"login",expand:!0,disabled:O,onClick:()=>{w||M(!0)}},null==n?void 0:n.common.login),r.createElement(E.Message,{error:!0,text:x,id:"errorMessage"}),r.createElement(D,{id:"forgotPassword",to:"/forgot-password/"},r.createElement("span",null,null==n?void 0:n.login.forgotPassword)),r.createElement(B,null,r.createElement("span",null,null==n?void 0:n.login.dontHaveAnAccount),r.createElement(Y,{id:"joinNow",to:"/"+p+"/"},r.createElement("span",null,null==n?void 0:n.login.register))),r.createElement(E.RecaptchaMessage,null))))};const I=()=>{var e,a;const{lang:o}=(0,S.m)();return r.createElement(E.Seo,{title:null==o||null===(e=o.seo)||void 0===e?void 0:e.login_title,description:null==o||null===(a=o.seo)||void 0===a?void 0:a.login_description,aditionalScriptLinks:["https://www.google.com/recaptcha/enterprise.js?render="+Z.B.GATSBY_RECAPTCHA_KEY]})}}}]);