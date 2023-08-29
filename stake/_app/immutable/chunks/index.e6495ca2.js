import{S as se,b as fe,a as ce,c as K,e as Y,d as Q,f as v,j as p,z as J,g,h as G,k as _,N as _e,C as B,D as j,E as L,F as C,H as X,I as V,J as U,K as x,A as de,a1 as pe,a2 as ge,m as z,p as E,q as M,u as R,v as A,w as T,x as D,Q as O,y as H,n as S,O as he,Z,P as be}from"./index.03b5aaf0.js";import{a as ve}from"./index.9181a536.js";import{I as me}from"./index.38950c17.js";import{F as we}from"./index.18ea2c37.js";import{B as ke}from"./index.b73d347c.js";import{U as u}from"./currencies.bbaf1c4b.js";import{T as ye}from"./index.8a6e022e.js";import{H as Ie}from"./index.5137e4dc.js";import{e as Se}from"./index.922d4a37.js";import{g as $e}from"./helpers.32057793.js";import{i as b}from"./index.b135e261.js";var ze=(o=>(o.none="none",o.bronze="bronze",o.silver="silver",o.gold="gold",o.platinum="platinum",o["wagered(500k)"]="wagered(500k)",o["wagered(1m)"]="wagered(1m)",o["wagered(2.5m)"]="wagered(2.5m)",o["wagered(5m)"]="wagered(5m)",o["wagered(10m)"]="wagered(10m)",o["wagered(25m)"]="wagered(25m)",o["wagered(50m)"]="wagered(50m)",o["wagered(100m)"]="wagered(100m)",o["wagered(250m)"]="wagered(250m)",o["wagered(500m)"]="wagered(500m)",o["wagered(1000m)"]="wagered(1000m)",o["wagered(2500m)"]="wagered(2500m)",o["wagered(5000m)"]="wagered(5000m)",o["wagered(10000m)"]="wagered(10000m)",o["wagered(25000m)"]="wagered(25000m)",o))(ze||{});const W={none:"vip-none",bronze:"vip-bronze",silver:"vip-silver",gold:"vip-gold",platinum:"vip-platinum-1",["wagered(500k)"]:"vip-platinum-2",["wagered(1m)"]:"vip-platinum-3",["wagered(2.5m)"]:"vip-platinum-4",["wagered(5m)"]:"vip-platinum-5",["wagered(10m)"]:"vip-platinum-6",["wagered(25m)"]:"vip-diamond-1",["wagered(50m)"]:"vip-diamond-2",["wagered(100m)"]:"vip-diamond-3",["wagered(250m)"]:"vip-diamond-4",["wagered(500m)"]:"vip-diamond-5",["wagered(1000m)"]:"vip-obsidian-1",["wagered(2500m)"]:"vip-obsidian-2",["wagered(5000m)"]:"vip-opal-1",["wagered(10000m)"]:"vip-opal-2",["wagered(25000m)"]:"vip-plutonium-1"},N={none:b._("None"),bronze:b._("Bronze"),silver:b._("Silver"),gold:b._("Gold"),platinum:b._("Platinum I"),"wagered(500k)":b._("Platinum II"),"wagered(1m)":b._("Platinum III"),"wagered(2.5m)":b._("Platinum IV"),"wagered(5m)":b._("Platinum V"),"wagered(10m)":b._("Platinum VI"),"wagered(25m)":b._("Diamond"),"wagered(50m)":b._("Diamond II"),"wagered(100m)":b._("Diamond III"),"wagered(250m)":b._("Diamond IV"),"wagered(500m)":b._("Diamond V"),"wagered(1000m)":b._("Obsidian I"),"wagered(2500m)":b._("Obsidian II"),"wagered(5000m)":b._("Opal I"),"wagered(10000m)":b._("Opal II"),"wagered(25000m)":b._("Plutonium")},dt=Object.values(W),pt=o=>{for(let e=o.length;e>=0;e--){const t=o[e];if(t in N)return{message:N[t],icon:W[t]}}return{message:N.none,icon:W.none}},Ee=o=>o in W?W[o]:W.none,Me=o=>o in N?N[o]:N.none;const Oe=o=>({}),te=o=>({});function Re(o){let e,t;return e=new Ie({props:{$$slots:{tooltip:[Ne],default:[Fe]},$$scope:{ctx:o}}}),{c(){B(e.$$.fragment)},l(n){j(e.$$.fragment,n)},m(n,l){L(e,n,l),t=!0},p(n,l){const i={};l&16387&&(i.$$scope={dirty:l,ctx:n}),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){g(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Te(o){let e,t,n;function l(s){o[10](s)}let i={$$slots:{default:[Ce]},$$scope:{ctx:o}};return o[3]!==void 0&&(i.node=o[3]),e=new ke({props:i}),de.push(()=>pe(e,"node",l)),e.$on("mouseover",o[11]),e.$on("mouseleave",o[12]),e.$on("click",o[13]),{c(){B(e.$$.fragment)},l(s){j(e.$$.fragment,s)},m(s,m){L(e,s,m),n=!0},p(s,m){const r={};m&16387&&(r.$$scope={dirty:m,ctx:s}),!t&&m&8&&(t=!0,r.node=s[3],ge(()=>t=!1)),e.$set(r)},i(s){n||(p(e.$$.fragment,s),n=!0)},o(s){g(e.$$.fragment,s),n=!1},d(s){C(e,s)}}}function De(o){let e,t=JSON.stringify(o[0])+"",n;return{c(){e=z("span"),n=T(t),this.h()},l(l){e=E(l,"SPAN",{class:!0});var i=M(e);n=D(i,t),i.forEach(_),this.h()},h(){R(e,"class","svelte-nc081s")},m(l,i){v(l,e,i),O(e,n)},p(l,i){i&1&&t!==(t=JSON.stringify(l[0])+"")&&H(n,t)},i:S,o:S,d(l){l&&_(e)}}}function Pe(o){let e,t=o[0].i+"",n;return{c(){e=z("div"),n=T(t),this.h()},l(l){e=E(l,"DIV",{class:!0,style:!0});var i=M(e);n=D(i,t),i.forEach(_),this.h()},h(){R(e,"class","tag-text"),A(e,"font-size","var(--text-size-"+o[1]+")")},m(l,i){v(l,e,i),O(e,n)},p(l,i){i&1&&t!==(t=l[0].i+"")&&H(n,t),i&2&&A(e,"font-size","var(--text-size-"+l[1]+")")},i:S,o:S,d(l){l&&_(e)}}}function Ae(o){let e,t;return e=new me({props:{icon:o[0].i.icon,style:"font-size: var(--text-size-"+o[1]+");"}}),{c(){B(e.$$.fragment)},l(n){j(e.$$.fragment,n)},m(n,l){L(e,n,l),t=!0},p(n,l){const i={};l&1&&(i.icon=n[0].i.icon),l&2&&(i.style="font-size: var(--text-size-"+n[1]+");"),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){g(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Fe(o){let e,t,n,l;const i=[Ae,Pe,De],s=[];function m(r,a){return typeof r[0].i=="object"&&"icon"in r[0].i?0:"i"in r[0]?1:2}return t=m(o),n=s[t]=i[t](o),{c(){e=z("span"),n.c(),this.h()},l(r){e=E(r,"SPAN",{class:!0,style:!0});var a=M(e);n.l(a),a.forEach(_),this.h()},h(){R(e,"class","wrap svelte-nc081s"),A(e,"color","color"in o[0]?o[0].color:"")},m(r,a){v(r,e,a),s[t].m(e,null),l=!0},p(r,a){let f=t;t=m(r),t===f?s[t].p(r,a):(J(),g(s[f],1,1,()=>{s[f]=null}),G(),n=s[t],n?n.p(r,a):(n=s[t]=i[t](r),n.c()),p(n,1),n.m(e,null)),(!l||a&1)&&A(e,"color","color"in r[0]?r[0].color:"")},i(r){l||(p(n),l=!0)},o(r){g(n),l=!1},d(r){r&&_(e),s[t].d()}}}function Ne(o){let e,t=o[0].name+"",n;return{c(){e=z("span"),n=T(t),this.h()},l(l){e=E(l,"SPAN",{slot:!0,class:!0});var i=M(e);n=D(i,t),i.forEach(_),this.h()},h(){R(e,"slot","tooltip"),R(e,"class","svelte-nc081s")},m(l,i){v(l,e,i),O(e,n)},p(l,i){i&1&&t!==(t=l[0].name+"")&&H(n,t)},d(l){l&&_(e)}}}function Be(o){let e,t=JSON.stringify(o[0])+"",n;return{c(){e=z("span"),n=T(t),this.h()},l(l){e=E(l,"SPAN",{class:!0});var i=M(e);n=D(i,t),i.forEach(_),this.h()},h(){R(e,"class","svelte-nc081s")},m(l,i){v(l,e,i),O(e,n)},p(l,i){i&1&&t!==(t=JSON.stringify(l[0])+"")&&H(n,t)},i:S,o:S,d(l){l&&_(e)}}}function je(o){let e,t=o[0].i+"",n;return{c(){e=z("div"),n=T(t),this.h()},l(l){e=E(l,"DIV",{class:!0,style:!0});var i=M(e);n=D(i,t),i.forEach(_),this.h()},h(){R(e,"class","tag-text"),A(e,"font-size","var(--text-size-"+o[1]+")")},m(l,i){v(l,e,i),O(e,n)},p(l,i){i&1&&t!==(t=l[0].i+"")&&H(n,t),i&2&&A(e,"font-size","var(--text-size-"+l[1]+")")},i:S,o:S,d(l){l&&_(e)}}}function Le(o){let e,t;return e=new me({props:{icon:o[0].i.icon,style:"font-size: var(--text-size-"+o[1]+");"}}),{c(){B(e.$$.fragment)},l(n){j(e.$$.fragment,n)},m(n,l){L(e,n,l),t=!0},p(n,l){const i={};l&1&&(i.icon=n[0].i.icon),l&2&&(i.style="font-size: var(--text-size-"+n[1]+");"),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){g(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function Ce(o){let e,t,n,l;const i=[Le,je,Be],s=[];function m(r,a){return typeof r[0].i=="object"&&"icon"in r[0].i?0:"i"in r[0]?1:2}return t=m(o),n=s[t]=i[t](o),{c(){e=z("span"),n.c(),this.h()},l(r){e=E(r,"SPAN",{class:!0,style:!0});var a=M(e);n.l(a),a.forEach(_),this.h()},h(){R(e,"class","wrap svelte-nc081s"),A(e,"color","color"in o[0]?o[0].color:"")},m(r,a){v(r,e,a),s[t].m(e,null),l=!0},p(r,a){let f=t;t=m(r),t===f?s[t].p(r,a):(J(),g(s[f],1,1,()=>{s[f]=null}),G(),n=s[t],n?n.p(r,a):(n=s[t]=i[t](r),n.c()),p(n,1),n.m(e,null)),(!l||a&1)&&A(e,"color","color"in r[0]?r[0].color:"")},i(r){l||(p(n),l=!0)},o(r){g(n),l=!1},d(r){r&&_(e),s[t].d()}}}function ne(o){let e,t;return e=new ye({props:{parentNode:o[3],$$slots:{default:[qe]},$$scope:{ctx:o}}}),{c(){B(e.$$.fragment)},l(n){j(e.$$.fragment,n)},m(n,l){L(e,n,l),t=!0},p(n,l){const i={};l&8&&(i.parentNode=n[3]),l&16385&&(i.$$scope={dirty:l,ctx:n}),e.$set(i)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){g(e.$$.fragment,n),t=!1},d(n){C(e,n)}}}function We(o){let e;return{c(){e=T("expires never")},l(t){e=D(t,"expires never")},m(t,n){v(t,e,n)},p:S,i:S,o:S,d(t){t&&_(e)}}}function He(o){let e,t,n;return t=new we({props:{value:o[4].expireAt}}),{c(){e=T("expires at: "),B(t.$$.fragment)},l(l){e=D(l,"expires at: "),j(t.$$.fragment,l)},m(l,i){v(l,e,i),L(t,l,i),n=!0},p:S,i(l){n||(p(t.$$.fragment,l),n=!0)},o(l){g(t.$$.fragment,l),n=!1},d(l){l&&_(e),C(t,l)}}}function Je(o){let e,t=o[4].message+"",n;return{c(){e=T("Reason: "),n=T(t)},l(l){e=D(l,"Reason: "),n=D(l,t)},m(l,i){v(l,e,i),v(l,n,i)},p:S,d(l){l&&_(e),l&&_(n)}}}function Ge(o){var P;let e,t,n=o[0].name+"",l,i,s,m,r,a;const f=[He,We],c=[];function d(h,w){var y,F;return(y=h[4])!=null&&y.expireAt?0:((F=h[4])==null?void 0:F.expireAt)===null?1:-1}~(s=d(o))&&(m=c[s]=f[s](o));let k=((P=o[4])==null?void 0:P.message)&&Je(o);return{c(){e=z("div"),t=z("div"),l=T(n),i=K(),m&&m.c(),r=K(),k&&k.c()},l(h){e=E(h,"DIV",{});var w=M(e);t=E(w,"DIV",{});var y=M(t);l=D(y,n),i=Q(y),m&&m.l(y),y.forEach(_),r=Q(w),k&&k.l(w),w.forEach(_)},m(h,w){v(h,e,w),O(e,t),O(t,l),O(t,i),~s&&c[s].m(t,null),O(e,r),k&&k.m(e,null),a=!0},p(h,w){var y;(!a||w&1)&&n!==(n=h[0].name+"")&&H(l,n),m&&m.p(h,w),(y=h[4])!=null&&y.message&&k.p(h,w)},i(h){a||(p(m),a=!0)},o(h){g(m),a=!1},d(h){h&&_(e),~s&&c[s].d(),k&&k.d()}}}function qe(o){let e;const t=o[9].tooltip,n=X(t,o,o[14],te),l=n||Ge(o);return{c(){l&&l.c()},l(i){l&&l.l(i)},m(i,s){l&&l.m(i,s),e=!0},p(i,s){n?n.p&&(!e||s&16384)&&V(n,t,i,i[14],e?x(t,i[14],s,Oe):U(i[14]),te):l&&l.p&&(!e||s&1)&&l.p(i,e?s:-1)},i(i){e||(p(l,i),e=!0)},o(i){g(l,i),e=!1},d(i){l&&l.d(i)}}}function Ke(o){let e,t,n,l,i;const s=[Te,Re],m=[];function r(f,c){return 1}e=r(),t=m[e]=s[e](o);let a=o[2]&&ne(o);return{c(){t.c(),n=K(),a&&a.c(),l=Y()},l(f){t.l(f),n=Q(f),a&&a.l(f),l=Y()},m(f,c){m[e].m(f,c),v(f,n,c),a&&a.m(f,c),v(f,l,c),i=!0},p(f,[c]){t.p(f,c),f[2]?a?(a.p(f,c),c&4&&p(a,1)):(a=ne(f),a.c(),p(a,1),a.m(l.parentNode,l)):a&&(J(),g(a,1,1,()=>{a=null}),G())},i(f){i||(p(t),p(a),i=!0)},o(f){g(t),g(a),i=!1},d(f){m[e].d(f),f&&_(n),a&&a.d(f),f&&_(l)}}}function Ye(o,e,t){var ee;let{$$slots:n={},$$scope:l}=e,{tag:i}=e,{user:s}=e,{fontSize:m="default"}=e,r,a=!1,f,c=!1,d=(ee=s==null?void 0:s.roles)==null?void 0:ee.find(I=>I.name===u.sportsbookFraudForceFlagged&&i.name==="Sports FF"||I.name===u.casinoFraudForceFlagged&&i.name==="Casino FF"?!0:I.name===i.name);const k=()=>{clearTimeout(r),t(2,a=!0)},P=()=>{c||(clearTimeout(r),t(2,a=!1),c=!1)},h=()=>{clearTimeout(r),t(2,a=!0),c=!0,r=setTimeout(()=>{t(2,a=!1)},5e3)};_e(()=>{clearTimeout(r)});function w(I){f=I,t(3,f)}const y=()=>{k()},F=()=>{P()},$=()=>{h()};return o.$$set=I=>{"tag"in I&&t(0,i=I.tag),"user"in I&&t(8,s=I.user),"fontSize"in I&&t(1,m=I.fontSize),"$$scope"in I&&t(14,l=I.$$scope)},[i,m,a,f,d,k,P,h,s,n,w,y,F,$,l]}class Qe extends se{constructor(e){super(),fe(this,e,Ye,Ke,ce,{tag:0,user:8,fontSize:1})}}const Ze=o=>{const t=[...o].sort((l,i)=>l.rank<i.rank?1:-1)[0];return t!=null&&t.flag&&t.flag in N?[{name:Me(t==null?void 0:t.flag),i:{icon:Ee(t==null?void 0:t.flag)}}]:[]},q=o=>typeof o=="number"&&o<10,Xe=o=>{const e=Ze((o==null?void 0:o.flags)||[]);let t=[];return t=[...t,...e],(q(o==null?void 0:o.leaderboardDailyWageredRank)||q(o==null?void 0:o.leaderboardDailyProfitRank))&&t.push({name:"playerOfTheDay",i:{icon:"emoji-player-of-the-day"}}),(q(o==null?void 0:o.leaderboardWeeklyWageredRank)||q(o==null?void 0:o.leaderboardWeeklyProfitRank))&&t.push({name:"playerOfTheWeek",i:{icon:"emoji-player-of-the-week"}}),o!=null&&o.isHighroller&&t.push({name:"highroller",i:{icon:"emoji-highroller"}}),t},ue={[u.sportsbookFraudForceFlagged]:{i:"🙅",name:"Sports FF"},[u.casinoFraudForceFlagged]:{i:"🙅‍♂️",name:"Casino FF"}},oe=[u.root,u.owner,u.whitelisted,u.abuser,u.fiatKycRequired,...Object.keys(ue)],le={noRole:[...oe,u.frozen,u.banned,u.houseExcluded,u.suspended],hasRole:oe},ie={[u.root]:"#ff9d02",[u.owner]:"#ff9d02",[u.admin]:"#ff9d02",[u.supportManager]:"#00E449",[u.sportsbookManager]:"#00E449",[u.communityManager]:"#ff9d02",[u.supportSenior]:"#00E449",[u.support]:"#00E449",[u.vipManager]:"#7f46fd",[u.developer]:"#ff9d02",[u.moderator]:"#3179F6",[u.bot]:"#3179F6",[u.whitelisted]:"#3179F6",[u.frozen]:"#ff0000",[u.banned]:"#ff0000",[u.houseExcluded]:"#ff0000",[u.suspended]:"#ff0000",[u.suspendedLevel1]:"#ff0000",[u.suspendedLevel2]:"#ff0000",[u.suspendedLevel3]:"#ff0000",[u.suspendedSportsbook]:"#ff0000"},Ve=o=>{if(!o)return{isBirthday:!1,years:null};const e=new Date,t=new Date(o),n=e.getFullYear()-t.getFullYear();return{isBirthday:Boolean(n&&e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()),years:n}},Ue=({user:o,meta:e,showIsMe:t})=>{var k,P,h,w,y,F;const n=(o==null?void 0:o.isMuted)||!1,l=e.hasRole?le.hasRole:le.noRole,i=e.id===(o==null?void 0:o.id),s=Xe(o),m=((o==null?void 0:o.roles)||[]).some($=>$.name===u.owner),{isBirthday:r,years:a}=Ve((o==null?void 0:o.createdAt)||!1),f=((o==null?void 0:o.roles)||[]).filter($=>!l.includes($.name)).map($=>({i:`${$.name[0].toUpperCase()}`,name:$.name,color:$.name in ie?ie[$.name]:"inherit"})),c=((o==null?void 0:o.roles)||[]).map($=>ue[$.name]);return[...s,t&&i&&{i:"ME",name:"Me",color:"var(--white)"},m&&{i:{icon:"owner"},name:o==null?void 0:o.name,color:"inherit"},r&&!Se&&{i:{icon:"birthday-emoji"},name:`${$e(a)} Birthday`,color:"inherit"},...c,...f,n&&{i:"M",name:(P=(k=o==null?void 0:o.community)==null?void 0:k.muteList)!=null&&P[0]?`Reason: "${(w=(h=o==null?void 0:o.community)==null?void 0:h.muteList)==null?void 0:w[0].message}" Expires: ${(F=(y=o==null?void 0:o.community)==null?void 0:y.muteList)==null?void 0:F[0].expireAt}`:"Muted",color:"inherit"}].filter(Boolean)};function ae(o,e,t){const n=o.slice();return n[9]=e[t],n}function xe(o){let e;const t=o[8].default,n=X(t,o,o[7],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,i){n&&n.m(l,i),e=!0},p(l,i){n&&n.p&&(!e||i&128)&&V(n,t,l,l[7],e?x(t,l[7],i,null):U(l[7]),null)},i(l){e||(p(n,l),e=!0)},o(l){g(n,l),e=!1},d(l){n&&n.d(l)}}}function et(o){let e,t,n,l=o[3],i=[];for(let a=0;a<l.length;a+=1)i[a]=re(ae(o,l,a));const s=a=>g(i[a],1,1,()=>{i[a]=null}),m=o[8].default,r=X(m,o,o[7],null);return{c(){e=z("div");for(let a=0;a<i.length;a+=1)i[a].c();t=K(),r&&r.c(),this.h()},l(a){e=E(a,"DIV",{class:!0});var f=M(e);for(let c=0;c<i.length;c+=1)i[c].l(f);t=Q(f),r&&r.l(f),f.forEach(_),this.h()},h(){R(e,"class","user-tags svelte-11j07e"),Z(e,"boxed",o[2]==="boxed")},m(a,f){v(a,e,f);for(let c=0;c<i.length;c+=1)i[c]&&i[c].m(e,null);O(e,t),r&&r.m(e,null),n=!0},p(a,f){if(f&15){l=a[3];let c;for(c=0;c<l.length;c+=1){const d=ae(a,l,c);i[c]?(i[c].p(d,f),p(i[c],1)):(i[c]=re(d),i[c].c(),p(i[c],1),i[c].m(e,t))}for(J(),c=l.length;c<i.length;c+=1)s(c);G()}r&&r.p&&(!n||f&128)&&V(r,m,a,a[7],n?x(m,a[7],f,null):U(a[7]),null),(!n||f&4)&&Z(e,"boxed",a[2]==="boxed")},i(a){if(!n){for(let f=0;f<l.length;f+=1)p(i[f]);p(r,a),n=!0}},o(a){i=i.filter(Boolean);for(let f=0;f<i.length;f+=1)g(i[f]);g(r,a),n=!1},d(a){a&&_(e),be(i,a),r&&r.d(a)}}}function re(o){let e,t,n;return t=new Qe({props:{tag:o[9],user:o[0],fontSize:o[1]}}),{c(){e=z("span"),B(t.$$.fragment),this.h()},l(l){e=E(l,"SPAN",{class:!0});var i=M(e);j(t.$$.fragment,i),i.forEach(_),this.h()},h(){R(e,"class","svelte-11j07e"),Z(e,"box",o[2]==="boxed")},m(l,i){v(l,e,i),L(t,e,null),n=!0},p(l,i){const s={};i&8&&(s.tag=l[9]),i&1&&(s.user=l[0]),i&2&&(s.fontSize=l[1]),t.$set(s),(!n||i&4)&&Z(e,"box",l[2]==="boxed")},i(l){n||(p(t.$$.fragment,l),n=!0)},o(l){g(t.$$.fragment,l),n=!1},d(l){l&&_(e),C(t)}}}function tt(o){let e,t,n,l;const i=[et,xe],s=[];function m(r,a){return r[3].length!==0?0:1}return e=m(o),t=s[e]=i[e](o),{c(){t.c(),n=Y()},l(r){t.l(r),n=Y()},m(r,a){s[e].m(r,a),v(r,n,a),l=!0},p(r,[a]){let f=e;e=m(r),e===f?s[e].p(r,a):(J(),g(s[f],1,1,()=>{s[f]=null}),G(),t=s[e],t?t.p(r,a):(t=s[e]=i[e](r),t.c()),p(t,1),t.m(n.parentNode,n))},i(r){l||(p(t),l=!0)},o(r){g(t),l=!1},d(r){s[e].d(r),r&&_(n)}}}function nt(o,e,t){let n,l,{$$slots:i={},$$scope:s}=e,{user:m}=e,{showIsMe:r=!1}=e,{fontSize:a="default"}=e,{variant:f=void 0}=e;const{meta:c}=ve();return he(o,c,d=>t(6,l=d)),o.$$set=d=>{"user"in d&&t(0,m=d.user),"showIsMe"in d&&t(5,r=d.showIsMe),"fontSize"in d&&t(1,a=d.fontSize),"variant"in d&&t(2,f=d.variant),"$$scope"in d&&t(7,s=d.$$scope)},o.$$.update=()=>{o.$$.dirty&97&&t(3,n=Ue({showIsMe:r,user:m,meta:l}).filter(d=>d&&"name"in d?d.name!=="betaCrash":!0))},[m,a,f,n,c,r,l,s,i]}class gt extends se{constructor(e){super(),fe(this,e,nt,tt,ce,{user:0,showIsMe:5,fontSize:1,variant:2})}}export{N as F,gt as U,pt as a,Me as b,ze as c,Ee as g,dt as v};