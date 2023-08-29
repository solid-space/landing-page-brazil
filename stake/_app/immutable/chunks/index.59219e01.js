import{S as ue,b as ce,ae as fe,m as T,C as P,c as me,p as S,q as A,D as C,d as _e,k as M,u as E,Z as k,f as N,Q as V,E as R,a3 as he,j as w,z as ee,g as y,h as te,F,O,e as G,A as pe,w as ne,x as se,y as ie}from"./index.03b5aaf0.js";import{O as ge,P as be,E as ke,y as Be,Q as X,R as L}from"./index.5916f5fe.js";import{O as we}from"./index.7965c63f.js";import{T as oe}from"./index.492389d6.js";import{T as ae}from"./index.f4c6e1fa.js";import{l as z}from"./currencies.bbaf1c4b.js";import{i as g}from"./index.b135e261.js";import{z as J}from"./variables.85cd9913.js";import{M as Me}from"./index.36a91d4c.js";import{s as K}from"./index.615699a9.js";const B={suspended:g._("Suspended"),settled:g._("Settled"),yes:g._("Yes"),no:g._("No"),odd:g._("Odd"),even:g._("Even"),over:g._("Over"),under:g._("Under"),draw:g._("Draw"),or:g._("or"),hextech:g._("Hextech"),chemtech:g._("Chemtech"),mountain:g._("Mountain"),cloud:g._("Cloud"),ocean:g._("Ocean"),infernal:g._("Infernal")},ye=document.getElementsByTagName("body")[0],$=400,Ee=(s,e)=>{const t=s.getBoundingClientRect(),n=document.createElement("button"),{innerWidth:i,innerHeight:o}=window;window.requestAnimationFrame(()=>{const l=document.getElementById("betslipFooter")?"betslipFooter":"betslipBet",p=l==="betslipBet"?document.getElementById(`betslipBet_${e}`):document.getElementById("betslipFooter");if(p){const d=p.getBoundingClientRect();if(o-d.top!==0){n.className=s.className;const r=t.x,f=t.top;n.setAttribute("style",`
                    position: fixed;
                    width: ${t.width}px;
                    height: ${t.height}px;
                    border-radius: var(--border-radius-0-25);
                    top: ${f}px;
                    left: ${r}px;
                    background: var(--blue-500);
                    will-change: transform, opacity;
                    transform: translate(0, 0);
                    transform-origin: left top;
                    transition-property: transform, opacity;
                    transition-duration: ${$}ms;
                    z-index: ${J.betslip+1};
                    pointer-events: none;
                  `),ye.appendChild(n),window.requestAnimationFrame(()=>{const _=document.getElementById("right-sidebar"),b=l==="betslipFooter"?d.left:_?i-_.getBoundingClientRect().width+14:d.left,D=d.top,c=b-r,q=D-f,m=d.width/t.width,W=d.height/t.height;n.style.opacity="0.2",n.style.transform=`translate(${c}px, ${q}px) scale(${m}, ${W})`,n.style.zIndex=`${J.betslip+1}`,setTimeout(()=>{n.remove()},$-10)})}}})};function Oe(s){let e,t=(s[2]in B?s[12]._(B[s[2]]):s[2]??s[0].name)+"",n;return{c(){e=T("span"),n=ne(t),this.h()},l(i){e=S(i,"SPAN",{class:!0});var o=A(e);n=se(o,t),o.forEach(M),this.h()},h(){E(e,"class","name svelte-hktcf3"),k(e,"suspended-name",s[9]!==z.active)},m(i,o){N(i,e,o),V(e,n)},p(i,o){o&4101&&t!==(t=(i[2]in B?i[12]._(B[i[2]]):i[2]??i[0].name)+"")&&ie(n,t),o&512&&k(e,"suspended-name",i[9]!==z.active)},d(i){i&&M(e)}}}function ve(s){let e,t;return e=new ae({props:{$$slots:{default:[Oe]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){C(e.$$.fragment,n)},m(n,i){R(e,n,i),t=!0},p(n,i){const o={};i&33559045&&(o.$$scope={dirty:i,ctx:n}),e.$set(o)},i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){y(e.$$.fragment,n),t=!1},d(n){F(e,n)}}}function x(s){let e,t,n,i;const o=[Te,Ie],l=[];function p(d,u){return d[9]!==z.active?0:1}return e=p(s),t=l[e]=o[e](s),{c(){t.c(),n=G()},l(d){t.l(d),n=G()},m(d,u){l[e].m(d,u),N(d,n,u),i=!0},p(d,u){let r=e;e=p(d),e===r?l[e].p(d,u):(ee(),y(l[r],1,1,()=>{l[r]=null}),te(),t=l[e],t?t.p(d,u):(t=l[e]=o[e](d),t.c()),w(t,1),t.m(n.parentNode,n))},i(d){i||(w(t),i=!0)},o(d){y(t),i=!1},d(d){l[e].d(d),d&&M(n)}}}function Ie(s){var i;let e,t,n;return t=new we({props:{"data-test":"fixture-odds",alignArrow:s[1]?"left":"right",selected:s[7],odds:s[0]==="suspended"?0:(i=s[0])==null?void 0:i.odds}}),{c(){e=T("div"),P(t.$$.fragment),this.h()},l(o){e=S(o,"DIV",{class:!0});var l=A(e);C(t.$$.fragment,l),l.forEach(M),this.h()},h(){E(e,"class","odds svelte-hktcf3")},m(o,l){N(o,e,l),R(t,e,null),n=!0},p(o,l){var d;const p={};l&2&&(p.alignArrow=o[1]?"left":"right"),l&128&&(p.selected=o[7]),l&1&&(p.odds=o[0]==="suspended"?0:(d=o[0])==null?void 0:d.odds),t.$set(p)},i(o){n||(w(t.$$.fragment,o),n=!0)},o(o){y(t.$$.fragment,o),n=!1},d(o){o&&M(e),F(t)}}}function Te(s){let e,t;return e=new oe({props:{maxWidth:"100%",$$slots:{default:[Ae]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){C(e.$$.fragment,n)},m(n,i){R(e,n,i),t=!0},p(n,i){const o={};i&33559040&&(o.$$scope={dirty:i,ctx:n}),e.$set(o)},i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){y(e.$$.fragment,n),t=!1},d(n){F(e,n)}}}function Se(s){let e,t=(s[9]in B?s[12]._(B[s[9]]):s[12]._(B.suspended))+"",n;return{c(){e=T("span"),n=ne(t),this.h()},l(i){e=S(i,"SPAN",{class:!0});var o=A(e);n=se(o,t),o.forEach(M),this.h()},h(){E(e,"class","suspended-odds svelte-hktcf3")},m(i,o){N(i,e,o),V(e,n)},p(i,o){o&4608&&t!==(t=(i[9]in B?i[12]._(B[i[9]]):i[12]._(B.suspended))+"")&&ie(n,t)},d(i){i&&M(e)}}}function Ae(s){let e,t;return e=new ae({props:{$$slots:{default:[Se]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){C(e.$$.fragment,n)},m(n,i){R(e,n,i),t=!0},p(n,i){const o={};i&33559040&&(o.$$scope={dirty:i,ctx:n}),e.$set(o)},i(n){t||(w(e.$$.fragment,n),t=!0)},o(n){y(e.$$.fragment,n),t=!1},d(n){F(e,n)}}}function ze(s){let e,t,n,i,o,l,p,d;n=new oe({props:{maxWidth:"100%",$$slots:{default:[ve]},$$scope:{ctx:s}}});let u=!s[4]&&!(s[5]||s[6])&&x(s);return{c(){e=T("button"),t=T("div"),P(n.$$.fragment),i=me(),u&&u.c(),this.h()},l(r){e=S(r,"BUTTON",{"aria-label":!0,"data-test":!0,class:!0});var f=A(e);t=S(f,"DIV",{class:!0});var _=A(t);C(n.$$.fragment,_),i=_e(_),u&&u.l(_),_.forEach(M),f.forEach(M),this.h()},h(){var r;E(t,"class","outcome-content svelte-hktcf3"),k(t,"horizontal",s[1]),k(t,"center",s[4]||s[6]),E(e,"aria-label",o=s[0]==="suspended"?s[0]:(r=s[0])==null?void 0:r.name),E(e,"data-test","fixture-outcome"),E(e,"class","outcome svelte-hktcf3"),e.disabled=s[11],k(e,"isMulti",s[3]),k(e,"inactive",!s[8]),k(e,"selected",s[7])},m(r,f){N(r,e,f),V(e,t),R(n,t,null),V(t,i),u&&u.m(t,null),s[24](e),l=!0,p||(d=he(e,"click",s[13]),p=!0)},p(r,[f]){var b;const _={};f&33559045&&(_.$$scope={dirty:f,ctx:r}),n.$set(_),!r[4]&&!(r[5]||r[6])?u?(u.p(r,f),f&112&&w(u,1)):(u=x(r),u.c(),w(u,1),u.m(t,null)):u&&(ee(),y(u,1,1,()=>{u=null}),te()),(!l||f&2)&&k(t,"horizontal",r[1]),(!l||f&80)&&k(t,"center",r[4]||r[6]),(!l||f&1&&o!==(o=r[0]==="suspended"?r[0]:(b=r[0])==null?void 0:b.name))&&E(e,"aria-label",o),(!l||f&2048)&&(e.disabled=r[11]),(!l||f&8)&&k(e,"isMulti",r[3]),(!l||f&256)&&k(e,"inactive",!r[8]),(!l||f&128)&&k(e,"selected",r[7])},i(r){l||(w(n.$$.fragment,r),w(u),l=!0)},o(r){y(n.$$.fragment,r),y(u),l=!1},d(r){r&&M(e),F(n),u&&u.d(),s[24](null),p=!1,d()}}}function Pe(s,e,t){let n,i,o,l,p,d,u,r,f,_,b,D;O(s,ge,a=>t(18,d=a)),O(s,be,a=>t(19,u=a)),O(s,ke,a=>t(20,r=a)),O(s,Be,a=>t(21,f=a)),O(s,X,a=>t(22,_=a)),O(s,L,a=>t(23,b=a)),O(s,Me,a=>t(12,D=a));let{outcome:c}=e,{horizontal:q=!1}=e,{fixture:m}=e,{name:W}=e,{market:h}=e,{isMulti:Q=!1}=e,{hideOdds:U=!1}=e,{customBet:v=!1}=e,{customPlayerProps:I=!1}=e,{combinedMarkets:Y=[]}=e,H;const re=()=>{const a={betResponse:void 0,marketId:h==null?void 0:h.id,status:h==null?void 0:h.status,fixture:m,market:h,acceptedOdds:c==="suspended"?0:c==null?void 0:c.odds,...c};v?i?L.remove(a):L.add(a):I?i?X.remove(a):X.add(a):i?K.send({type:"REMOVE_BET",bet:a}):(K.send({type:"ADD_BET",bet:a}),Ee(H,a.id))};function le(a){pe[a?"unshift":"push"](()=>{H=a,t(10,H)})}return s.$$set=a=>{"outcome"in a&&t(0,c=a.outcome),"horizontal"in a&&t(1,q=a.horizontal),"fixture"in a&&t(14,m=a.fixture),"name"in a&&t(2,W=a.name),"market"in a&&t(15,h=a.market),"isMulti"in a&&t(3,Q=a.isMulti),"hideOdds"in a&&t(4,U=a.hideOdds),"customBet"in a&&t(5,v=a.customBet),"customPlayerProps"in a&&t(6,I=a.customPlayerProps),"combinedMarkets"in a&&t(16,Y=a.combinedMarkets)},s.$$.update=()=>{var a,j,Z;s.$$.dirty&32769&&t(9,o=(()=>c==="suspended"||(c==null?void 0:c.odds)===0?z.suspended:(c==null?void 0:c.status)??(h==null?void 0:h.status))()),s.$$.dirty&512&&t(8,n=o===z.active),s.$$.dirty&15745121&&t(7,i=(()=>c==="suspended"||!(m!=null&&m.id)?!1:v?(b==null?void 0:b[m.id])&&b&&c.id in b[m.id]:I?(_==null?void 0:_[m.id])&&_&&(c==null?void 0:c.id)in _[m.id]:(c==null?void 0:c.id)in f&&f[c.id].betResponse===void 0&&r===null)()),s.$$.dirty&344192&&t(17,l=!i&&Boolean(Y&&((a=d==null?void 0:d[m==null?void 0:m.id])==null?void 0:a.find(de=>Y.includes(de))))),s.$$.dirty&967136&&t(11,p=!i&&(!n||l||v&&((j=u[m==null?void 0:m.id])==null?void 0:j.includes(h==null?void 0:h.id))||I&&((Z=d[m==null?void 0:m.id])==null?void 0:Z.includes(h==null?void 0:h.id))))},[c,q,W,Q,U,v,I,i,n,o,H,p,D,re,m,h,Y,l,d,u,r,f,_,b,le]}class Xe extends ue{constructor(e){super(),ce(this,e,Pe,ze,fe,{outcome:0,horizontal:1,fixture:14,name:2,market:15,isMulti:3,hideOdds:4,customBet:5,customPlayerProps:6,combinedMarkets:16})}}export{Xe as O};