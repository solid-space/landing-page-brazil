import{S as P,b as y,a as z,e as _,f as m,n as k,k as c,R as b,T as d,U as F,V as g,W as p,q as h,X as T,Y as C,Z as f,Q as M,_ as N,m as G,p as R,$ as I,a0 as U,w as W,x as q,y as D}from"./index.03b5aaf0.js";import{d as H}from"./index.d274af24.js";const $=160;var O=(n=>(n.ar="ar",n.de="de",n.en="en",n.es="es",n.fr="fr",n.id="id",n.ja="ja",n.ko="ko",n.pl="pl",n.pt="pt",n.fil="fil",n.ru="ru",n.tr="tr",n.vi="vi",n.zh="zh",n.fi="fi",n))(O||{});const v="sports_",V={ar:{name:"اَلْعَرَبِيَّةُ"},de:{name:"Deutsch",icon:"flag-de"},en:{name:"English",icon:"flag-gb"},es:{name:"Español",icon:"flag-es"},fr:{name:"Français",icon:"flag-fr"},hi:{name:"हिन्दी",icon:"flag-in"},id:{name:"Indonesian",icon:"flag-id"},ind:{name:"Indonesian",icon:"flag-id"},ja:{name:"日本語",icon:"flag-jp"},ko:{name:"한국어",icon:"flag-kr"},fil:{name:"Filipino",icon:"flag-ph"},pl:{name:"Polski",icon:"flag-pl"},pt:{name:"Português",icon:"flag-br"},ru:{name:"Pусский",icon:"flag-ru"},tr:{name:"Türkçe",icon:"flag-tr"},vi:{name:"Tiếng Việt",icon:"flag-vn"},zh:{name:"中文",icon:"flag-cn"},fi:{name:"Suomen",icon:"flag-fi"},[`${v}en`]:{name:"Sports",icon:"basketball"},[`${v}ru`]:{name:"Русский спорт",icon:"basketball"}},u={...V,challenges:{name:"Challenges",icon:"chat-challenges"},crash:{name:"Crash",icon:"chat-crash"},sports_en:{name:"Sports",icon:"chat-sports"}},B="https://flagicons.lipis.dev/flags/1x1/",A=n=>`${B}${n.toLowerCase()}.svg`,ee=n=>{var s,r;const{id:e}=n,t=n.name.startsWith(v)?"sports":"casino",a=n.name;return{id:e,iso:a,type:t,name:a in u&&((s=u[a])==null?void 0:s.name)||a,icon:a in u&&((r=u[a])==null?void 0:r.icon)||a}},E=n=>n?Date.parse(n.createdAt):0,Q=n=>n.reduce((t,a,s)=>{const r=E(a)-E(n[s-1])<H,i=t[t.length-1];return r&&i?[...t.slice(0,t.length-1),[...t[t.length-1],a]]:[...t,[a]]},[]),X=n=>({createdAt:n.createdAt,data:{__typename:"Timestamp"},user:{name:""}}),Y=n=>n.reduce((t,a)=>[...t,X(a[0]),...a],[]),ne=n=>{const e=Q(n);return Y(e)};function S(n){let e,t;function a(i,l){return l&1&&(e=null),e==null&&(e=!!i[0].includes("flag-")),e?J:Z}let s=a(n,-1),r=s(n);return{c(){r.c(),t=_()},l(i){r.l(i),t=_()},m(i,l){r.m(i,l),m(i,t,l)},p(i,l){s===(s=a(i,l))&&r?r.p(i,l):(r.d(1),r=s(i),r&&(r.c(),r.m(t.parentNode,t)))},d(i){r.d(i),i&&c(t)}}}function Z(n){let e,t,a,s=n[2]&&j(n),r=[{class:"svg-icon"},n[3]],i={};for(let l=0;l<r.length;l+=1)i=d(i,r[l]);return{c(){e=g("svg"),s&&s.c(),t=g("use"),this.h()},l(l){e=p(l,"svg",{class:!0});var o=h(e);s&&s.l(o),t=p(o,"use",{"xlink:href":!0}),h(t).forEach(c),o.forEach(c),this.h()},h(){T(t,"xlink:href",a=`#icon-${n[0]}`),C(e,i),f(e,"rounded",n[1]),f(e,"svelte-kjfvep",!0)},m(l,o){m(l,e,o),s&&s.m(e,null),M(e,t)},p(l,o){l[2]?s?s.p(l,o):(s=j(l),s.c(),s.m(e,t)):s&&(s.d(1),s=null),o&1&&a!==(a=`#icon-${l[0]}`)&&T(t,"xlink:href",a),C(e,i=N(r,[{class:"svg-icon"},o&8&&l[3]])),f(e,"rounded",l[1]),f(e,"svelte-kjfvep",!0)},d(l){l&&c(e),s&&s.d()}}}function J(n){let e,t,a,s=[{src:t=A(n[0].replace("flag-",""))},{alt:a=n[2]||n[0].replace("flag-","")},n[3]],r={};for(let i=0;i<s.length;i+=1)r=d(r,s[i]);return{c(){e=G("img"),this.h()},l(i){e=R(i,"IMG",{src:!0,alt:!0}),this.h()},h(){I(e,r),f(e,"rounded",n[1]),f(e,"svelte-kjfvep",!0)},m(i,l){m(i,e,l)},p(i,l){I(e,r=N(s,[l&1&&!U(e.src,t=A(i[0].replace("flag-","")))&&{src:t},l&5&&a!==(a=i[2]||i[0].replace("flag-",""))&&{alt:a},l&8&&i[3]])),f(e,"rounded",i[1]),f(e,"svelte-kjfvep",!0)},d(i){i&&c(e)}}}function j(n){let e,t;return{c(){e=g("title"),t=W(n[2])},l(a){e=p(a,"title",{});var s=h(e);t=q(s,n[2]),s.forEach(c)},m(a,s){m(a,e,s),M(e,t)},p(a,s){s&4&&D(t,a[2])},d(a){a&&c(e)}}}function K(n){let e,t=n[0]&&S(n);return{c(){t&&t.c(),e=_()},l(a){t&&t.l(a),e=_()},m(a,s){t&&t.m(a,s),m(a,e,s)},p(a,[s]){a[0]?t?t.p(a,s):(t=S(a),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:k,o:k,d(a){t&&t.d(a),a&&c(e)}}}function w(n,e,t){const a=["icon","rounded","alt"];let s=b(e,a),{icon:r}=e,{rounded:i=!1}=e,{alt:l=""}=e;return n.$$set=o=>{e=d(d({},e),F(o)),t(3,s=b(e,a)),"icon"in o&&t(0,r=o.icon),"rounded"in o&&t(1,i=o.rounded),"alt"in o&&t(2,l=o.alt)},[r,i,l,s]}class te extends P{constructor(e){super(),y(this,e,w,K,z,{icon:0,rounded:1,alt:2})}}export{$ as C,te as I,O as L,v as S,V as a,ne as b,ee as n};