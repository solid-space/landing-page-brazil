import{S as P,b as S,a as z,m as I,C as u,p as q,q as C,D as $,k as _,u as D,f as d,E as m,j as i,g as c,F as p,O as E,o as H,c as k,d as v,n as L,H as T,z as j,h as F,I as J,J as K,K as M}from"./index.03b5aaf0.js";import{I as w}from"./index.38950c17.js";import{L as N}from"./index.60919683.js";import{S as b}from"./index.272a0ede.js";import{T as O}from"./index.ec1f5bcc.js";import{p as R}from"./prevPath.c4fb3d84.js";import{p as g}from"./paths.e6bc493d.js";function h(a){let t,n;return t=new w({props:{icon:a[0]}}),{c(){u(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,o){m(t,e,o),n=!0},p(e,o){const s={};o&1&&(s.icon=e[0]),t.$set(s)},i(e){n||(i(t.$$.fragment,e),n=!0)},o(e){c(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function V(a){let t,n,e=a[0]&&h(a);const o=a[2].default,s=T(o,a,a[3],null);return{c(){e&&e.c(),t=k(),s&&s.c()},l(r){e&&e.l(r),t=v(r),s&&s.l(r)},m(r,f){e&&e.m(r,f),d(r,t,f),s&&s.m(r,f),n=!0},p(r,f){r[0]?e?(e.p(r,f),f&1&&i(e,1)):(e=h(r),e.c(),i(e,1),e.m(t.parentNode,t)):e&&(j(),c(e,1,1,()=>{e=null}),F()),s&&s.p&&(!n||f&8)&&J(s,o,r,r[3],n?M(o,r[3],f,null):K(r[3]),null)},i(r){n||(i(e),i(s,r),n=!0)},o(r){c(e),c(s,r),n=!1},d(r){e&&e.d(r),r&&_(t),s&&s.d(r)}}}function A(a){let t,n;return t=new O({props:{size:"md",weight:"semibold",variant:"highlighted",tag:"h1",$$slots:{default:[V]},$$scope:{ctx:a}}}),{c(){u(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,o){m(t,e,o),n=!0},p(e,o){const s={};o&9&&(s.$$scope={dirty:o,ctx:e}),t.$set(s)},i(e){n||(i(t.$$.fragment,e),n=!0)},o(e){c(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function B(a){let t,n;return t=new w({props:{icon:"cross"}}),{c(){u(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,o){m(t,e,o),n=!0},p:L,i(e){n||(i(t.$$.fragment,e),n=!0)},o(e){c(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function G(a){let t,n,e,o;return t=new b({props:{horizontal:!0,x:"flex-start",y:"center",gap:"medium",$$slots:{default:[A]},$$scope:{ctx:a}}}),e=new N({props:{to:a[1],$$slots:{default:[B]},$$scope:{ctx:a}}}),{c(){u(t.$$.fragment),n=k(),u(e.$$.fragment)},l(s){$(t.$$.fragment,s),n=v(s),$(e.$$.fragment,s)},m(s,r){m(t,s,r),d(s,n,r),m(e,s,r),o=!0},p(s,r){const f={};r&9&&(f.$$scope={dirty:r,ctx:s}),t.$set(f);const l={};r&2&&(l.to=s[1]),r&8&&(l.$$scope={dirty:r,ctx:s}),e.$set(l)},i(s){o||(i(t.$$.fragment,s),i(e.$$.fragment,s),o=!0)},o(s){c(t.$$.fragment,s),c(e.$$.fragment,s),o=!1},d(s){p(t,s),s&&_(n),p(e,s)}}}function Q(a){let t,n,e;return n=new b({props:{horizontal:!0,stretch:!0,x:"space-between",y:"center",gap:"medium",$$slots:{default:[G]},$$scope:{ctx:a}}}),{c(){t=I("div"),u(n.$$.fragment),this.h()},l(o){t=q(o,"DIV",{class:!0});var s=C(t);$(n.$$.fragment,s),s.forEach(_),this.h()},h(){D(t,"class","wrap svelte-1e2qd1r")},m(o,s){d(o,t,s),m(n,t,null),e=!0},p(o,[s]){const r={};s&11&&(r.$$scope={dirty:s,ctx:o}),n.$set(r)},i(o){e||(i(n.$$.fragment,o),e=!0)},o(o){c(n.$$.fragment,o),e=!1},d(o){o&&_(t),p(n)}}}function U(a,t,n){let e;E(a,R,l=>n(4,e=l));let{$$slots:o={},$$scope:s}=t,{icon:r=void 0}=t,f=g.root;return H(()=>{n(1,f=e.includes("/sports")?g.sportRoot:g.casino)}),a.$$set=l=>{"icon"in l&&n(0,r=l.icon),"$$scope"in l&&n(3,s=l.$$scope)},[r,f,o,s]}class te extends P{constructor(t){super(),S(this,t,U,Q,z,{icon:0})}}export{te as P};