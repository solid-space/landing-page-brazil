import{S as x,b as P,a as B,C as c,D as m,E as _,j as $,g as p,F as g,O as C,a5 as D,c as E,d as I,f as d,k as b,w as k,x as w,y as L}from"./index.03b5aaf0.js";import{M as j}from"./index.36a91d4c.js";import{B as h}from"./index.b73d347c.js";import{S as q}from"./index.272a0ede.js";import{i as v}from"./index.b135e261.js";const u={previous:v._("Previous"),next:v._("Next")};function z(o){let e=o[3]._(u.previous)+"",s;return{c(){s=k(e)},l(t){s=w(t,e)},m(t,a){d(t,s,a)},p(t,a){a&8&&e!==(e=t[3]._(u.previous)+"")&&L(s,e)},d(t){t&&b(s)}}}function F(o){let e=o[3]._(u.next)+"",s;return{c(){s=k(e)},l(t){s=w(t,e)},m(t,a){d(t,s,a)},p(t,a){a&8&&e!==(e=t[3]._(u.next)+"")&&L(s,e)},d(t){t&&b(s)}}}function M(o){let e,s,t,a;return e=new h({props:{disabled:o[1]===0,testId:"pagination-previous",$$slots:{default:[z]},$$scope:{ctx:o}}}),e.$on("click",o[4]),t=new h({props:{disabled:o[0]<o[2],testId:"pagination-next",$$slots:{default:[F]},$$scope:{ctx:o}}}),t.$on("click",o[5]),{c(){c(e.$$.fragment),s=E(),c(t.$$.fragment)},l(n){m(e.$$.fragment,n),s=I(n),m(t.$$.fragment,n)},m(n,i){_(e,n,i),d(n,s,i),_(t,n,i),a=!0},p(n,i){const f={};i&2&&(f.disabled=n[1]===0),i&136&&(f.$$scope={dirty:i,ctx:n}),e.$set(f);const l={};i&5&&(l.disabled=n[0]<n[2]),i&136&&(l.$$scope={dirty:i,ctx:n}),t.$set(l)},i(n){a||($(e.$$.fragment,n),$(t.$$.fragment,n),a=!0)},o(n){p(e.$$.fragment,n),p(t.$$.fragment,n),a=!1},d(n){g(e,n),n&&b(s),g(t,n)}}}function N(o){let e,s;return e=new q({props:{horizontal:!0,gap:"larger",x:"center",$$slots:{default:[M]},$$scope:{ctx:o}}}),{c(){c(e.$$.fragment)},l(t){m(e.$$.fragment,t)},m(t,a){_(e,t,a),s=!0},p(t,[a]){const n={};a&143&&(n.$$scope={dirty:a,ctx:t}),e.$set(n)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){p(e.$$.fragment,t),s=!1},d(t){g(e,t)}}}function O(o,e,s){let t;C(o,j,r=>s(3,t=r));let{listLength:a}=e,{offset:n}=e,{limit:i}=e;const f=D(),l=()=>f("previous"),S=()=>f("next");return o.$$set=r=>{"listLength"in r&&s(0,a=r.listLength),"offset"in r&&s(1,n=r.offset),"limit"in r&&s(2,i=r.limit)},[a,n,i,t,l,S]}class Q extends x{constructor(e){super(),P(this,e,O,N,B,{listLength:0,offset:1,limit:2})}}export{Q as P};