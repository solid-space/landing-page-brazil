import{S as V,b as U,a as j,m as y,p as E,q as I,k as h,u as k,f as d,z as D,a7 as q,ab as C,h as T,j as u,g as _,e as $,C as b,D as v,E as w,F as z,T as De,_ as Te,a4 as ye,w as P,x as F,y as O,c as N,d as M,Q as L,n as S,a8 as Ee,a9 as R,O as Ie,a0 as Q,P as we}from"./index.03b5aaf0.js";import{T as H}from"./index.ec1f5bcc.js";import{L as Le}from"./index.60919683.js";import{T as Be}from"./index.c74d3bd4.js";import{M as Se}from"./index.893ef0ef.js";import{g as Ne}from"./context.586c6dab.js";import{V as ze}from"./index.9407fe59.js";import{F as Me}from"./index.6e9148e5.js";function J(o,t,l){const e=o.slice();return e[5]=t[l]._type,e[6]=t[l].text,e[7]=t[l].marks,e[9]=l,e}function qe(o){let t,l;return t=new H({props:{responsiveTypeScale:!0,inline:!0,size:o[0],lineHeight:"150pct",tag:o[5],weight:o[7].includes("strong")?"semibold":"normal",$$slots:{default:[Ue]},$$scope:{ctx:o}}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&1&&(s.size=e[0]),n&2&&(s.tag=e[5]),n&2&&(s.weight=e[7].includes("strong")?"semibold":"normal"),n&1026&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function Ve(o){var f;let t,l;function e(...i){return o[4](o[7],...i)}const n=[{inline:!0},{size:o[0]},{variant:"subtle-link"},{responsiveTypeScale:!0},X(((f=o[2])==null?void 0:f.find(e).href)||"")];let s={$$slots:{default:[je]},$$scope:{ctx:o}};for(let i=0;i<n.length;i+=1)s=De(s,n[i]);return t=new Le({props:s}),{c(){b(t.$$.fragment)},l(i){v(t.$$.fragment,i)},m(i,r){w(t,i,r),l=!0},p(i,r){var c;o=i;const a=r&7?Te(n,[n[0],r&1&&{size:o[0]},n[2],n[3],r&6&&ye(X(((c=o[2])==null?void 0:c.find(e).href)||""))]):{};r&1026&&(a.$$scope={dirty:r,ctx:o}),t.$set(a)},i(i){l||(u(t.$$.fragment,i),l=!0)},o(i){_(t.$$.fragment,i),l=!1},d(i){z(t,i)}}}function Ue(o){let t=o[6]+"",l;return{c(){l=P(t)},l(e){l=F(e,t)},m(e,n){d(e,l,n)},p(e,n){n&2&&t!==(t=e[6]+"")&&O(l,t)},d(e){e&&h(l)}}}function je(o){let t,l=o[6]+"",e,n;return{c(){t=y("span"),e=P(l),n=N()},l(s){t=E(s,"SPAN",{});var f=I(t);e=F(f,l),f.forEach(h),n=M(s)},m(s,f){d(s,t,f),L(t,e),d(s,n,f)},p(s,f){f&2&&l!==(l=s[6]+"")&&O(e,l)},d(s){s&&h(t),s&&h(n)}}}function K(o,t){let l,e,n,s,f,i;function r(...m){return t[3](t[7],...m)}const a=[Ve,qe],c=[];function g(m,p){var B;return p&6&&(e=null),e==null&&(e=!!(m[7]&&((B=m[2])!=null&&B.some(r)))),e?0:1}return n=g(t,-1),s=c[n]=a[n](t),{key:o,first:null,c(){l=$(),s.c(),f=$(),this.h()},l(m){l=$(),s.l(m),f=$(),this.h()},h(){this.first=l},m(m,p){d(m,l,p),c[n].m(m,p),d(m,f,p),i=!0},p(m,p){t=m;let B=n;n=g(t,p),n===B?c[n].p(t,p):(D(),_(c[B],1,1,()=>{c[B]=null}),T(),s=c[n],s?s.p(t,p):(s=c[n]=a[n](t),s.c()),u(s,1),s.m(f.parentNode,f))},i(m){i||(u(s),i=!0)},o(m){_(s),i=!1},d(m){m&&h(l),c[n].d(m),m&&h(f)}}}function Ce(o){let t,l=[],e=new Map,n,s=o[1];const f=i=>i[9];for(let i=0;i<s.length;i+=1){let r=J(o,s,i),a=f(r);e.set(a,l[i]=K(a,r))}return{c(){t=y("p");for(let i=0;i<l.length;i+=1)l[i].c();this.h()},l(i){t=E(i,"P",{class:!0});var r=I(t);for(let a=0;a<l.length;a+=1)l[a].l(r);r.forEach(h),this.h()},h(){k(t,"class","inline-text")},m(i,r){d(i,t,r);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(t,null);n=!0},p(i,[r]){r&7&&(s=i[1],D(),l=q(l,r,f,1,i,s,e,t,C,K,null,J),T())},i(i){if(!n){for(let r=0;r<s.length;r+=1)u(l[r]);n=!0}},o(i){for(let r=0;r<l.length;r+=1)_(l[r]);n=!1},d(i){i&&h(t);for(let r=0;r<l.length;r+=1)l[r].d()}}}function X(o){let t="https://stake.com",l=o.startsWith(t),e=l?o.replace(t,""):o;return{external:!l&&o.startsWith("/")===!1,to:e}}function Pe(o,t,l){let{size:e="base"}=t,{children:n}=t,{markDefs:s}=t;const f=(r,{_key:a,_type:c})=>r.includes(a)&&c==="link",i=(r,{_key:a})=>r.includes(a);return o.$$set=r=>{"size"in r&&l(0,e=r.size),"children"in r&&l(1,n=r.children),"markDefs"in r&&l(2,s=r.markDefs)},[e,n,s,f,i]}class G extends V{constructor(t){super(),U(this,t,Pe,Ce,j,{size:0,children:1,markDefs:2})}}function Y(o,t,l){const e=o.slice();return e[7]=t[l],e[3]=l,e}function Z(o,t,l){const e=o.slice();return e[1]=t[l],e[3]=l,e}function A(o,t,l){const e=o.slice();return e[4]=t[l],e[6]=l,e}function Fe(o){let t=o[7]+"",l;return{c(){l=P(t)},l(e){l=F(e,t)},m(e,n){d(e,l,n)},p(e,n){n&1&&t!==(t=e[7]+"")&&O(l,t)},d(e){e&&h(l)}}}function x(o,t){let l,e,n,s;return e=new H({props:{tag:"span",weight:"bold",variant:"highlighted",$$slots:{default:[Fe]},$$scope:{ctx:t}}}),{key:o,first:null,c(){l=y("th"),b(e.$$.fragment),n=N(),this.h()},l(f){l=E(f,"TH",{});var i=I(l);v(e.$$.fragment,i),n=M(i),i.forEach(h),this.h()},h(){this.first=l},m(f,i){d(f,l,i),w(e,l,null),L(l,n),s=!0},p(f,i){t=f;const r={};i&513&&(r.$$scope={dirty:i,ctx:t}),e.$set(r)},i(f){s||(u(e.$$.fragment,f),s=!0)},o(f){_(e.$$.fragment,f),s=!1},d(f){f&&h(l),z(e)}}}function Oe(o){let t,l,e=[],n=new Map,s,f=o[0][0].cells;const i=r=>r[3];for(let r=0;r<f.length;r+=1){let a=Y(o,f,r),c=i(a);n.set(c,e[r]=x(c,a))}return{c(){t=y("thead"),l=y("tr");for(let r=0;r<e.length;r+=1)e[r].c();this.h()},l(r){t=E(r,"THEAD",{slot:!0});var a=I(t);l=E(a,"TR",{});var c=I(l);for(let g=0;g<e.length;g+=1)e[g].l(c);c.forEach(h),a.forEach(h),this.h()},h(){k(t,"slot","thead")},m(r,a){d(r,t,a),L(t,l);for(let c=0;c<e.length;c+=1)e[c]&&e[c].m(l,null);s=!0},p(r,a){a&1&&(f=r[0][0].cells,D(),e=q(e,a,i,1,r,f,n,l,C,x,null,Y),T())},i(r){if(!s){for(let a=0;a<f.length;a+=1)u(e[a]);s=!0}},o(r){for(let a=0;a<e.length;a+=1)_(e[a]);s=!1},d(r){r&&h(t);for(let a=0;a<e.length;a+=1)e[a].d()}}}function He(o){let t,l=[],e=new Map,n,s,f=o[1].cells;const i=r=>r[6];for(let r=0;r<f.length;r+=1){let a=A(o,f,r),c=i(a);e.set(c,l[r]=ee(c,a))}return{c(){t=y("tr");for(let r=0;r<l.length;r+=1)l[r].c();n=N()},l(r){t=E(r,"TR",{});var a=I(t);for(let c=0;c<l.length;c+=1)l[c].l(a);n=M(a),a.forEach(h)},m(r,a){d(r,t,a);for(let c=0;c<l.length;c+=1)l[c]&&l[c].m(t,null);L(t,n),s=!0},p(r,a){a&1&&(f=r[1].cells,D(),l=q(l,a,i,1,r,f,e,t,C,ee,n,A),T())},i(r){if(!s){for(let a=0;a<f.length;a+=1)u(l[a]);s=!0}},o(r){for(let a=0;a<l.length;a+=1)_(l[a]);s=!1},d(r){r&&h(t);for(let a=0;a<l.length;a+=1)l[a].d()}}}function We(o){return{c:S,l:S,m:S,p:S,i:S,o:S,d:S}}function Re(o){let t=o[4]+"",l;return{c(){l=P(t)},l(e){l=F(e,t)},m(e,n){d(e,l,n)},p(e,n){n&1&&t!==(t=e[4]+"")&&O(l,t)},d(e){e&&h(l)}}}function ee(o,t){let l,e,n;return e=new H({props:{tag:"span",$$slots:{default:[Re]},$$scope:{ctx:t}}}),{key:o,first:null,c(){l=y("td"),b(e.$$.fragment),this.h()},l(s){l=E(s,"TD",{});var f=I(l);v(e.$$.fragment,f),f.forEach(h),this.h()},h(){this.first=l},m(s,f){d(s,l,f),w(e,l,null),n=!0},p(s,f){t=s;const i={};f&513&&(i.$$scope={dirty:f,ctx:t}),e.$set(i)},i(s){n||(u(e.$$.fragment,s),n=!0)},o(s){_(e.$$.fragment,s),n=!1},d(s){s&&h(l),z(e)}}}function te(o,t){let l,e,n,s,f;const i=[We,He],r=[];function a(c,g){return c[3]===0?0:1}return e=a(t),n=r[e]=i[e](t),{key:o,first:null,c(){l=$(),n.c(),s=$(),this.h()},l(c){l=$(),n.l(c),s=$(),this.h()},h(){this.first=l},m(c,g){d(c,l,g),r[e].m(c,g),d(c,s,g),f=!0},p(c,g){t=c;let m=e;e=a(t),e===m?r[e].p(t,g):(D(),_(r[m],1,1,()=>{r[m]=null}),T(),n=r[e],n?n.p(t,g):(n=r[e]=i[e](t),n.c()),u(n,1),n.m(s.parentNode,s))},i(c){f||(u(n),f=!0)},o(c){_(n),f=!1},d(c){c&&h(l),r[e].d(c),c&&h(s)}}}function Ge(o){let t=[],l=new Map,e,n,s=o[0];const f=i=>i[3];for(let i=0;i<s.length;i+=1){let r=Z(o,s,i),a=f(r);l.set(a,t[i]=te(a,r))}return{c(){for(let i=0;i<t.length;i+=1)t[i].c();e=$()},l(i){for(let r=0;r<t.length;r+=1)t[r].l(i);e=$()},m(i,r){for(let a=0;a<t.length;a+=1)t[a]&&t[a].m(i,r);d(i,e,r),n=!0},p(i,r){r&1&&(s=i[0],D(),t=q(t,r,f,1,i,s,l,e.parentNode,C,te,e,Z),T())},i(i){if(!n){for(let r=0;r<s.length;r+=1)u(t[r]);n=!0}},o(i){for(let r=0;r<t.length;r+=1)_(t[r]);n=!1},d(i){for(let r=0;r<t.length;r+=1)t[r].d(i);i&&h(e)}}}function Qe(o){let t,l,e;return l=new Be({props:{$$slots:{body:[Ge],thead:[Oe]},$$scope:{ctx:o}}}),{c(){t=y("div"),b(l.$$.fragment),this.h()},l(n){t=E(n,"DIV",{class:!0});var s=I(t);v(l.$$.fragment,s),s.forEach(h),this.h()},h(){k(t,"class","table-wrap svelte-1h85dj6")},m(n,s){d(n,t,s),w(l,t,null),e=!0},p(n,[s]){const f={};s&513&&(f.$$scope={dirty:s,ctx:n}),l.$set(f)},i(n){e||(u(l.$$.fragment,n),e=!0)},o(n){_(l.$$.fragment,n),e=!1},d(n){n&&h(t),z(l)}}}function Je(o,t,l){let{rows:e}=t;return o.$$set=n=>{"rows"in n&&l(0,e=n.rows)},[e]}class Ke extends V{constructor(t){super(),U(this,t,Je,Qe,j,{rows:0})}}function le(o,t,l){const e=o.slice();return e[3]=t[l].text,e[5]=l,e}function ne(o,t){let l,e=t[3]+"",n,s,f;return{key:o,first:null,c(){l=y("span"),n=P(e),s=N(),this.h()},l(i){l=E(i,"SPAN",{id:!0});var r=I(l);n=F(r,e),s=M(r),r.forEach(h),this.h()},h(){k(l,"id",f=t[3].replace(/\s/g,"_")),this.first=l},m(i,r){d(i,l,r),L(l,n),L(l,s)},p(i,r){t=i,r&1&&e!==(e=t[3]+"")&&O(n,e),r&1&&f!==(f=t[3].replace(/\s/g,"_"))&&k(l,"id",f)},d(i){i&&h(l)}}}function Xe(o){let t=[],l=new Map,e,n=o[0];const s=f=>f[5];for(let f=0;f<n.length;f+=1){let i=le(o,n,f),r=s(i);l.set(r,t[f]=ne(r,i))}return{c(){for(let f=0;f<t.length;f+=1)t[f].c();e=$()},l(f){for(let i=0;i<t.length;i+=1)t[i].l(f);e=$()},m(f,i){for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(f,i);d(f,e,i)},p(f,i){i&1&&(n=f[0],t=q(t,i,s,1,f,n,l,e.parentNode,Ee,ne,e,le))},d(f){for(let i=0;i<t.length;i+=1)t[i].d(f);f&&h(e)}}}function Ye(o){let t,l;return t=new H({props:{inline:!0,tag:o[1],size:o[2],variant:"highlighted",responsiveTypeScale:!0,$$slots:{default:[Xe]},$$scope:{ctx:o}}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,[n]){const s={};n&2&&(s.tag=e[1]),n&4&&(s.size=e[2]),n&65&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function Ze(o,t,l){let{children:e}=t,{tag:n}=t,{size:s}=t;return o.$$set=f=>{"children"in f&&l(0,e=f.children),"tag"in f&&l(1,n=f.tag),"size"in f&&l(2,s=f.size)},[e,n,s]}class Ae extends V{constructor(t){super(),U(this,t,Ze,Ye,j,{children:0,tag:1,size:2})}}function re(o,t,l){const e=o.slice();return e[2]=t[l],e[4]=l,e}function ie(o,t){let l,e,n,s,f;return e=new G({props:{children:t[2].children,markDefs:t[2].markDefs,size:t[1]}}),{key:o,first:null,c(){l=y("li"),b(e.$$.fragment),n=N(),this.h()},l(i){l=E(i,"LI",{class:!0});var r=I(l);v(e.$$.fragment,r),n=M(r),r.forEach(h),this.h()},h(){var i;k(l,"class",s=R(`level-${(i=t[2])==null?void 0:i.level}`)+" svelte-dl87aw"),this.first=l},m(i,r){d(i,l,r),w(e,l,null),L(l,n),f=!0},p(i,r){var c;t=i;const a={};r&1&&(a.children=t[2].children),r&1&&(a.markDefs=t[2].markDefs),r&2&&(a.size=t[1]),e.$set(a),(!f||r&1&&s!==(s=R(`level-${(c=t[2])==null?void 0:c.level}`)+" svelte-dl87aw"))&&k(l,"class",s)},i(i){f||(u(e.$$.fragment,i),f=!0)},o(i){_(e.$$.fragment,i),f=!1},d(i){i&&h(l),z(e)}}}function xe(o){let t,l=[],e=new Map,n,s=o[0];const f=i=>i[4];for(let i=0;i<s.length;i+=1){let r=re(o,s,i),a=f(r);e.set(a,l[i]=ie(a,r))}return{c(){t=y("ul");for(let i=0;i<l.length;i+=1)l[i].c();this.h()},l(i){t=E(i,"UL",{class:!0});var r=I(t);for(let a=0;a<l.length;a+=1)l[a].l(r);r.forEach(h),this.h()},h(){k(t,"class","svelte-dl87aw")},m(i,r){d(i,t,r);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(t,null);n=!0},p(i,[r]){r&3&&(s=i[0],D(),l=q(l,r,f,1,i,s,e,t,C,ie,null,re),T())},i(i){if(!n){for(let r=0;r<s.length;r+=1)u(l[r]);n=!0}},o(i){for(let r=0;r<l.length;r+=1)_(l[r]);n=!1},d(i){i&&h(t);for(let r=0;r<l.length;r+=1)l[r].d()}}}function et(o,t,l){let{blocks:e}=t,{size:n="base"}=t;return o.$$set=s=>{"blocks"in s&&l(0,e=s.blocks),"size"in s&&l(1,n=s.size)},[e,n]}class tt extends V{constructor(t){super(),U(this,t,et,xe,j,{blocks:0,size:1})}}function se(o,t,l){const e=o.slice();return e[2]=t[l],e[4]=l,e}function fe(o,t){let l,e,n,s,f;return e=new G({props:{children:t[2].children,markDefs:t[2].markDefs,size:t[1]}}),{key:o,first:null,c(){l=y("li"),b(e.$$.fragment),n=N(),this.h()},l(i){l=E(i,"LI",{class:!0});var r=I(l);v(e.$$.fragment,r),n=M(r),r.forEach(h),this.h()},h(){var i;k(l,"class",s=R(`level-${(i=t[2])==null?void 0:i.level}`)+" svelte-1vwj7w5"),this.first=l},m(i,r){d(i,l,r),w(e,l,null),L(l,n),f=!0},p(i,r){var c;t=i;const a={};r&1&&(a.children=t[2].children),r&1&&(a.markDefs=t[2].markDefs),r&2&&(a.size=t[1]),e.$set(a),(!f||r&1&&s!==(s=R(`level-${(c=t[2])==null?void 0:c.level}`)+" svelte-1vwj7w5"))&&k(l,"class",s)},i(i){f||(u(e.$$.fragment,i),f=!0)},o(i){_(e.$$.fragment,i),f=!1},d(i){i&&h(l),z(e)}}}function lt(o){let t,l=[],e=new Map,n,s=o[0];const f=i=>i[4];for(let i=0;i<s.length;i+=1){let r=se(o,s,i),a=f(r);e.set(a,l[i]=fe(a,r))}return{c(){t=y("ol");for(let i=0;i<l.length;i+=1)l[i].c();this.h()},l(i){t=E(i,"OL",{class:!0});var r=I(t);for(let a=0;a<l.length;a+=1)l[a].l(r);r.forEach(h),this.h()},h(){k(t,"class","svelte-1vwj7w5")},m(i,r){d(i,t,r);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(t,null);n=!0},p(i,[r]){r&3&&(s=i[0],D(),l=q(l,r,f,1,i,s,e,t,C,fe,null,se),T())},i(i){if(!n){for(let r=0;r<s.length;r+=1)u(l[r]);n=!0}},o(i){for(let r=0;r<l.length;r+=1)_(l[r]);n=!1},d(i){i&&h(t);for(let r=0;r<l.length;r+=1)l[r].d()}}}function nt(o,t,l){let{blocks:e}=t,{size:n="base"}=t;return o.$$set=s=>{"blocks"in s&&l(0,e=s.blocks),"size"in s&&l(1,n=s.size)},[e,n]}class rt extends V{constructor(t){super(),U(this,t,nt,lt,j,{blocks:0,size:1})}}function oe(o){let t,l;return t=new H({props:{variant:"subtle",tag:"h3",$$slots:{default:[it]},$$scope:{ctx:o}}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&17&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function it(o){let t=o[0].title+"",l;return{c(){l=P(t)},l(e){l=F(e,t)},m(e,n){d(e,l,n)},p(e,n){n&1&&t!==(t=e[0].title+"")&&O(l,t)},d(e){e&&h(l)}}}function ae(o){let t,l;return t=new H({props:{$$slots:{default:[st]},$$scope:{ctx:o}}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&17&&(s.$$scope={dirty:n,ctx:e}),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function st(o){let t=o[0].description+"",l;return{c(){l=P(t)},l(e){l=F(e,t)},m(e,n){d(e,l,n)},p(e,n){n&1&&t!==(t=e[0].description+"")&&O(l,t)},d(e){e&&h(l)}}}function ce(o){let t,l;return t=new Se({props:{stacked:o[1],market:o[0],fixture:o[0].fixture}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&2&&(s.stacked=e[1]),n&1&&(s.market=e[0]),n&1&&(s.fixture=e[0].fixture),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function ft(o){var c,g;let t,l,e,n,s,f,i=((c=o[0])==null?void 0:c.title)&&oe(o),r=((g=o[0])==null?void 0:g.description)&&ae(o),a=o[0]&&ce(o);return{c(){t=y("div"),i&&i.c(),l=N(),r&&r.c(),e=N(),n=y("div"),s=y("div"),a&&a.c(),this.h()},l(m){t=E(m,"DIV",{class:!0});var p=I(t);i&&i.l(p),l=M(p),r&&r.l(p),e=M(p),n=E(p,"DIV",{class:!0});var B=I(n);s=E(B,"DIV",{class:!0});var W=I(s);a&&a.l(W),W.forEach(h),B.forEach(h),p.forEach(h),this.h()},h(){k(s,"class","outcome-wrapper svelte-1sf4qx4"),k(n,"class","outcome-wrap svelte-1sf4qx4"),k(t,"class","news-market svelte-1sf4qx4")},m(m,p){d(m,t,p),i&&i.m(t,null),L(t,l),r&&r.m(t,null),L(t,e),L(t,n),L(n,s),a&&a.m(s,null),f=!0},p(m,[p]){var B,W;(B=m[0])!=null&&B.title?i?(i.p(m,p),p&1&&u(i,1)):(i=oe(m),i.c(),u(i,1),i.m(t,l)):i&&(D(),_(i,1,1,()=>{i=null}),T()),(W=m[0])!=null&&W.description?r?(r.p(m,p),p&1&&u(r,1)):(r=ae(m),r.c(),u(r,1),r.m(t,e)):r&&(D(),_(r,1,1,()=>{r=null}),T()),m[0]?a?(a.p(m,p),p&1&&u(a,1)):(a=ce(m),a.c(),u(a,1),a.m(s,null)):a&&(D(),_(a,1,1,()=>{a=null}),T())},i(m){f||(u(i),u(r),u(a),f=!0)},o(m){_(i),_(r),_(a),f=!1},d(m){m&&h(t),i&&i.d(),r&&r.d(),a&&a.d()}}}function ot(o,t,l){let e,n,{market:s}=t;const f=Ne();return Ie(o,f,i=>l(3,n=i)),o.$$set=i=>{"market"in i&&l(0,s=i.market)},o.$$.update=()=>{o.$$.dirty&8&&l(1,e=n<600)},[s,e,f,n]}class at extends V{constructor(t){super(),U(this,t,ot,ft,j,{market:0})}}const ct=o=>{var e;let t={listTag:null,listBlocks:[]};const l=[];if(o!=null&&o.length)for(let n=0;n<o.length;n++){const s=o[n];((s==null?void 0:s.listItem)===void 0||(s==null?void 0:s.listItem)!==((e=o[n-1])==null?void 0:e.listItem))&&(t.listBlocks.length&&l.push(t),t={listTag:null,listBlocks:[]}),(s==null?void 0:s.listItem)===void 0?l.push(s):(s==null?void 0:s.listItem)==="bullet"?(t.listTag="ul",t.listBlocks=[...t.listBlocks,s]):(s==null?void 0:s.listItem)==="number"&&(t.listTag="ol",t.listBlocks=[...t.listBlocks,s]),n+1===o.length&&t.listBlocks.length&&l.push(t)}return l};function ue(o,t,l){const e=o.slice();return e[7]=t[l],e[9]=l,e}function _e(o,t,l){const e=o.slice();return e[13]=t[l],e}function he(o,t,l){const e=o.slice();return e[10]=t[l],e}function ut(o){var e,n;let t,l;return t=new G({props:{children:(e=o[7])==null?void 0:e.children,markDefs:(n=o[7])==null?void 0:n.markDefs,size:o[1]}}),{c(){b(t.$$.fragment)},l(s){v(t.$$.fragment,s)},m(s,f){w(t,s,f),l=!0},p(s,f){var r,a;const i={};f&16&&(i.children=(r=s[7])==null?void 0:r.children),f&16&&(i.markDefs=(a=s[7])==null?void 0:a.markDefs),f&2&&(i.size=s[1]),t.$set(i)},i(s){l||(u(t.$$.fragment,s),l=!0)},o(s){_(t.$$.fragment,s),l=!1},d(s){z(t,s)}}}function _t(o){let t,l;return t=new Ae({props:{tag:o[7].style,size:o[0],children:o[7].children}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.tag=e[7].style),n&1&&(s.size=e[0]),n&16&&(s.children=e[7].children),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function ht(o){let t,l;return t=new G({props:{children:o[7].children,markDefs:o[7].markDefs,size:o[1]}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.children=e[7].children),n&16&&(s.markDefs=e[7].markDefs),n&2&&(s.size=e[1]),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function mt(o){let t,l;return t=new ze({props:{type:o[7]._type,src:o[7].youtubeID}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.type=e[7]._type),n&16&&(s.src=e[7].youtubeID),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function gt(o){let t,l;return t=new ze({props:{type:o[7]._type,src:"https://player.vimeo.com/video/"+o[7].vimeoId+"?title=0&byline=0&portrait=0"}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.type=e[7]._type),n&16&&(s.src="https://player.vimeo.com/video/"+e[7].vimeoId+"?title=0&byline=0&portrait=0"),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function dt(o){let t,l,e=o[2]&&me(o);return{c(){e&&e.c(),t=$()},l(n){e&&e.l(n),t=$()},m(n,s){e&&e.m(n,s),d(n,t,s),l=!0},p(n,s){n[2]?e?(e.p(n,s),s&4&&u(e,1)):(e=me(n),e.c(),u(e,1),e.m(t.parentNode,t)):e&&(D(),_(e,1,1,()=>{e=null}),T())},i(n){l||(u(e),l=!0)},o(n){_(e),l=!1},d(n){e&&e.d(n),n&&h(t)}}}function pt(o){let t,l,e=o[3]&&$e(o);return{c(){e&&e.c(),t=$()},l(n){e&&e.l(n),t=$()},m(n,s){e&&e.m(n,s),d(n,t,s),l=!0},p(n,s){n[3]?e?(e.p(n,s),s&8&&u(e,1)):(e=$e(n),e.c(),u(e,1),e.m(t.parentNode,t)):e&&(D(),_(e,1,1,()=>{e=null}),T())},i(n){l||(u(e),l=!0)},o(n){_(e),l=!1},d(n){e&&e.d(n),n&&h(t)}}}function $t(o){let t,l,e;return{c(){t=y("img"),this.h()},l(n){t=E(n,"IMG",{class:!0,alt:!0,src:!0}),this.h()},h(){var n,s;k(t,"class","thumbnail"),k(t,"alt",l=(n=o[7].asset)==null?void 0:n.altText),Q(t.src,e=((s=o[7].asset)==null?void 0:s.url)+"?q=80&auto=format")||k(t,"src",e)},m(n,s){d(n,t,s)},p(n,s){var f,i;s&16&&l!==(l=(f=n[7].asset)==null?void 0:f.altText)&&k(t,"alt",l),s&16&&!Q(t.src,e=((i=n[7].asset)==null?void 0:i.url)+"?q=80&auto=format")&&k(t,"src",e)},i:S,o:S,d(n){n&&h(t)}}}function kt(o){let t,l;return t=new Ke({props:{rows:o[7].rows}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.rows=e[7].rows),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function bt(o){let t,l;return t=new rt({props:{blocks:o[7].listBlocks,size:o[1]}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.blocks=e[7].listBlocks),n&2&&(s.size=e[1]),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function vt(o){let t,l;return t=new tt({props:{blocks:o[7].listBlocks,size:o[1]}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&16&&(s.blocks=e[7].listBlocks),n&2&&(s.size=e[1]),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function me(o){let t,l,e=o[2],n=[];for(let f=0;f<e.length;f+=1)n[f]=pe(_e(o,e,f));const s=f=>_(n[f],1,1,()=>{n[f]=null});return{c(){for(let f=0;f<n.length;f+=1)n[f].c();t=$()},l(f){for(let i=0;i<n.length;i+=1)n[i].l(f);t=$()},m(f,i){for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(f,i);d(f,t,i),l=!0},p(f,i){if(i&20){e=f[2];let r;for(r=0;r<e.length;r+=1){const a=_e(f,e,r);n[r]?(n[r].p(a,i),u(n[r],1)):(n[r]=pe(a),n[r].c(),u(n[r],1),n[r].m(t.parentNode,t))}for(D(),r=e.length;r<n.length;r+=1)s(r);T()}},i(f){if(!l){for(let i=0;i<e.length;i+=1)u(n[i]);l=!0}},o(f){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)_(n[i]);l=!1},d(f){we(n,f),f&&h(t)}}}function ge(o){let t,l,e,n=o[13].tournament&&de(o);return{c(){t=y("div"),n&&n.c(),l=N(),this.h()},l(s){t=E(s,"DIV",{class:!0});var f=I(t);n&&n.l(f),l=M(f),f.forEach(h),this.h()},h(){k(t,"class","group")},m(s,f){d(s,t,f),n&&n.m(t,null),L(t,l),e=!0},p(s,f){s[13].tournament?n?(n.p(s,f),f&4&&u(n,1)):(n=de(s),n.c(),u(n,1),n.m(t,l)):n&&(D(),_(n,1,1,()=>{n=null}),T())},i(s){e||(u(n),e=!0)},o(s){_(n),e=!1},d(s){s&&h(t),n&&n.d()}}}function de(o){var e,n,s,f;let t,l;return t=new Me({props:{isOpenByDefault:!0,addTimeElements:!0,removePadding:!0,group:o[13].tournament.group,loading:!1,name:(e=o[13].tournament)==null?void 0:e.name,fixtureCount:o[13].tournament.activeFixtureCount,fixtureList:o[13].tournament.fixtureList,sortedTemplates:((f=(s=(n=o[13].tournament)==null?void 0:n.category)==null?void 0:s.sport)==null?void 0:f.templates)||[]}}),{c(){b(t.$$.fragment)},l(i){v(t.$$.fragment,i)},m(i,r){w(t,i,r),l=!0},p(i,r){var c,g,m,p;const a={};r&4&&(a.group=i[13].tournament.group),r&4&&(a.name=(c=i[13].tournament)==null?void 0:c.name),r&4&&(a.fixtureCount=i[13].tournament.activeFixtureCount),r&4&&(a.fixtureList=i[13].tournament.fixtureList),r&4&&(a.sortedTemplates=((p=(m=(g=i[13].tournament)==null?void 0:g.category)==null?void 0:m.sport)==null?void 0:p.templates)||[]),t.$set(a)},i(i){l||(u(t.$$.fragment,i),l=!0)},o(i){_(t.$$.fragment,i),l=!1},d(i){z(t,i)}}}function pe(o){var n;let t,l,e=((n=o[13].tournament)==null?void 0:n.slug)===o[7].tournament&&ge(o);return{c(){e&&e.c(),t=$()},l(s){e&&e.l(s),t=$()},m(s,f){e&&e.m(s,f),d(s,t,f),l=!0},p(s,f){var i;((i=s[13].tournament)==null?void 0:i.slug)===s[7].tournament?e?(e.p(s,f),f&20&&u(e,1)):(e=ge(s),e.c(),u(e,1),e.m(t.parentNode,t)):e&&(D(),_(e,1,1,()=>{e=null}),T())},i(s){l||(u(e),l=!0)},o(s){_(e),l=!1},d(s){e&&e.d(s),s&&h(t)}}}function $e(o){let t,l,e=o[3],n=[];for(let f=0;f<e.length;f+=1)n[f]=be(he(o,e,f));const s=f=>_(n[f],1,1,()=>{n[f]=null});return{c(){for(let f=0;f<n.length;f+=1)n[f].c();t=$()},l(f){for(let i=0;i<n.length;i+=1)n[i].l(f);t=$()},m(f,i){for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(f,i);d(f,t,i),l=!0},p(f,i){if(i&24){e=f[3];let r;for(r=0;r<e.length;r+=1){const a=he(f,e,r);n[r]?(n[r].p(a,i),u(n[r],1)):(n[r]=be(a),n[r].c(),u(n[r],1),n[r].m(t.parentNode,t))}for(D(),r=e.length;r<n.length;r+=1)s(r);T()}},i(f){if(!l){for(let i=0;i<e.length;i+=1)u(n[i]);l=!0}},o(f){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)_(n[i]);l=!1},d(f){we(n,f),f&&h(t)}}}function ke(o){let t,l;return t=new at({props:{market:o[10]}}),{c(){b(t.$$.fragment)},l(e){v(t.$$.fragment,e)},m(e,n){w(t,e,n),l=!0},p(e,n){const s={};n&8&&(s.market=e[10]),t.$set(s)},i(e){l||(u(t.$$.fragment,e),l=!0)},o(e){_(t.$$.fragment,e),l=!1},d(e){z(t,e)}}}function be(o){var n,s;let t,l,e=((n=o[10])==null?void 0:n.id)===((s=o[7])==null?void 0:s.marketId)&&ke(o);return{c(){e&&e.c(),t=$()},l(f){e&&e.l(f),t=$()},m(f,i){e&&e.m(f,i),d(f,t,i),l=!0},p(f,i){var r,a;((r=f[10])==null?void 0:r.id)===((a=f[7])==null?void 0:a.marketId)?e?(e.p(f,i),i&24&&u(e,1)):(e=ke(f),e.c(),u(e,1),e.m(t.parentNode,t)):e&&(D(),_(e,1,1,()=>{e=null}),T())},i(f){l||(u(e),l=!0)},o(f){_(e),l=!1},d(f){e&&e.d(f),f&&h(t)}}}function ve(o,t){let l,e,n,s,f,i;const r=[vt,bt,kt,$t,pt,dt,gt,mt,ht,_t,ut],a=[];function c(g,m){return m&16&&(e=null),g[7].listTag==="ul"?0:g[7].listTag==="ol"?1:g[7]._type==="table"?2:g[7]._type==="image"?3:g[7]._type==="market"?4:g[7]._type==="tournament"?5:g[7]._type==="vimeo"?6:g[7]._type==="youtube"?7:g[7].style==="normal"?8:(e==null&&(e=!!g[5].includes(g[7].style)),e?9:10)}return n=c(t,-1),s=a[n]=r[n](t),{key:o,first:null,c(){l=$(),s.c(),f=$(),this.h()},l(g){l=$(),s.l(g),f=$(),this.h()},h(){this.first=l},m(g,m){d(g,l,m),a[n].m(g,m),d(g,f,m),i=!0},p(g,m){t=g;let p=n;n=c(t,m),n===p?a[n].p(t,m):(D(),_(a[p],1,1,()=>{a[p]=null}),T(),s=a[n],s?s.p(t,m):(s=a[n]=r[n](t),s.c()),u(s,1),s.m(f.parentNode,f))},i(g){i||(u(s),i=!0)},o(g){_(s),i=!1},d(g){g&&h(l),a[n].d(g),g&&h(f)}}}function wt(o){let t,l=[],e=new Map,n,s=o[4];const f=i=>i[9];for(let i=0;i<s.length;i+=1){let r=ue(o,s,i),a=f(r);e.set(a,l[i]=ve(a,r))}return{c(){t=y("div");for(let i=0;i<l.length;i+=1)l[i].c();this.h()},l(i){t=E(i,"DIV",{class:!0});var r=I(t);for(let a=0;a<l.length;a+=1)l[a].l(r);r.forEach(h),this.h()},h(){k(t,"class","content-block svelte-uhfe8b")},m(i,r){d(i,t,r);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(t,null);n=!0},p(i,[r]){r&63&&(s=i[4],D(),l=q(l,r,f,1,i,s,e,t,C,ve,null,ue),T())},i(i){if(!n){for(let r=0;r<s.length;r+=1)u(l[r]);n=!0}},o(i){for(let r=0;r<l.length;r+=1)_(l[r]);n=!1},d(i){i&&h(t);for(let r=0;r<l.length;r+=1)l[r].d()}}}function zt(o,t,l){let e,{headingSize:n=void 0}=t,{textSize:s="base"}=t,{tournaments:f=[]}=t,{markets:i=void 0}=t,{blocks:r}=t;const a=["h1","h2","h3","h4","h5","h6"];return o.$$set=c=>{"headingSize"in c&&l(0,n=c.headingSize),"textSize"in c&&l(1,s=c.textSize),"tournaments"in c&&l(2,f=c.tournaments),"markets"in c&&l(3,i=c.markets),"blocks"in c&&l(6,r=c.blocks)},o.$$.update=()=>{o.$$.dirty&64&&l(4,e=ct(r))},[n,s,f,i,e,a,r]}class Nt extends V{constructor(t){super(),U(this,t,zt,wt,j,{headingSize:0,textSize:1,tournaments:2,markets:3,blocks:6})}}export{at as M,Nt as S,ct as g};
