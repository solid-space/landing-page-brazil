import{y as n,C as r,r as h,p as A,K as T,L as f,M as R,E}from"./index.5916f5fe.js";import{n as c}from"./index.bd6c5768.js";import{f as C}from"./currencies.bbaf1c4b.js";import{s as d}from"./index.bda872f9.js";import{b as g}from"./variables.85cd9913.js";import{G as S}from"./index.03b5aaf0.js";import{M as I,i as L}from"./interpreter.e65554fa.js";const N=(t,e)=>{window.innerWidth>=g.sidebarFullWidth&&d.set("betslip"),n.add(e.bet)},b=(t,e)=>{n.remove(e.bet.id)},M=()=>{n.acceptNewOdds()},D=()=>{r.repeatStake()},w=()=>{n.removeAll()},y=(t,e)=>{e.type!=="RETAIN_FAILED_SELECTION"&&n.removeBetResponses()},k=()=>{n.removeSuccessfulBets()},P=(t,e)=>{r.replaceBets(e.bets)},V=()=>{window.innerWidth>=g.sidebarFullWidth&&d.set("betslip")},x=()=>{d.set("betslip")},F=Object.freeze(Object.defineProperty({__proto__:null,acceptNewOdds:M,addBet:N,removeAllBets:w,removeBet:b,removeBetResponses:y,removeSuccessfulBets:k,repeatStake:D,replaceBets:P,switchToBetSlip:x,switchToBetSlipOnDesktop:V},Symbol.toStringTag,{value:"Module"})),W=()=>S(h).length>1,K=()=>S(A)===!1,j=Object.freeze(Object.defineProperty({__proto__:null,hasMultipleIdententicalFixtureBets:W,hasNoBetsWithChangedOdds:K},Symbol.toStringTag,{value:"Module"})),m={on:{SPORTSBOOK_RECONNECT:"idle"}},G={id:"betslipMachine",initial:"betSlip",states:{betSlip:{initial:"single",id:"betslip",states:{single:{id:"single",initial:"idle",on:{SPORTSBOOK_DISCONNECT:"#single.disconnected"},states:{idle:{on:{TO_MULTI:{target:"#multi"},REPEAT_STAKE:{actions:"repeatStake"},SINGLE_BET:{target:"fetching"},ADD_BET:{actions:["addBet","switchToBetSlipOnDesktop"]},REMOVE_BET:{actions:"removeBet"},CLEAR_SELECTION:{actions:"removeAllBets"},REPLACE_BETS:{actions:["replaceBets","switchToBetSlip"],target:"#single"}}},fetching:{entry:"removeBetResponses",invoke:{src:"placeSingleBet",onDone:{target:"completedBet",actions:(t,e)=>{var o,B;const{data:s}=e,i=s.filter(a=>(a==null?void 0:a.type)==="success");if(i.length!==0){const a=(B=(o=i[0])==null?void 0:o.bet)==null?void 0:B.currency,O=i.reduce((v,l)=>{var p;return v+((p=l==null?void 0:l.bet)==null?void 0:p.amount)},0);c.singleSportBet.open({count:i.length,currency:a,amount:O})}r.assignResultToBets(s)}}}},completedBet:{exit:["removeBetResponses"],on:{RETAIN_SELECTION:{target:"idle"},TO_MULTI:{target:"#multi",actions:"removeAllBets"},RETAIN_FAILED_SELECTION:{target:"idle",actions:"removeSuccessfulBets"},CLEAR_SELECTION:{target:"idle",actions:"removeAllBets"},ADD_BET:{actions:["removeAllBets","switchToBetSlipOnDesktop","addBet"],target:"idle"},REMOVE_BET:{actions:"removeBet",target:"idle"},REPLACE_BETS:{actions:["replaceBets","switchToBetSlip"],target:"idle"}}},disconnected:{id:"#single.disconnected",...m}}},multi:{id:"multi",initial:"idle",on:{SPORTSBOOK_DISCONNECT:"#multi.disconnected"},states:{idle:{on:{TO_SINGLE:{target:"#single"},MULTI_BET:{target:"fetching"},ADD_BET:{actions:["addBet","switchToBetSlipOnDesktop"]},CLEAR_SELECTION:{actions:"removeAllBets"},REMOVE_BET:{actions:"removeBet"},REPLACE_BETS:{actions:["replaceBets","switchToBetSlip"]}}},fetching:{entry:"removeBetResponses",invoke:{src:"placeMultiBet",onDone:{target:"completedBet",actions:(t,e)=>{const{data:s}=e;if(s.type==="success"){const{amount:i,currency:o}=s.variables;s.bet.outcomes.length===1?c.singleSportBet.open({count:1,currency:o,amount:i}):c.multiSportBet.open({amount:C(i,o),currency:o})}E.set(s)}},onError:{target:"idle"}}},completedBet:{exit:()=>{E.set(null)},on:{TO_SINGLE:{actions:"removeAllBets",target:"#single"},RETAIN_SELECTION:{target:"idle"},RETAIN_FAILED_SELECTION:{target:"idle"},CLEAR_SELECTION:{actions:"removeAllBets",target:"idle"},ADD_BET:{actions:["removeAllBets","addBet"],target:"idle"},REMOVE_BET:{actions:"removeAllBets",target:"idle"},REPLACE_BETS:{actions:["replaceBets","switchToBetSlip"],target:"idle"}}},disconnected:{id:"#multi.disconnected",...m}}}}}}},_=I(G,{services:{placeMultiBet:f,placeSingleBet:R},guards:j,actions:F}),u=L(_,{deferEvents:!0});u.onTransition(t=>{t.changed&&T.set(t.value)});T.set(_.initialState.value);u.start();export{u as s};
