import{S as L,b as N,a as Q,T as b,C as W,D as X,E as Y,_ as v,a4 as w,j as d,g,F as x,R as j,O as i,U as $,ad as k,H as J,I as K,J as O,K as P}from"./index.03b5aaf0.js";import{A as ee}from"./index.1fc362e7.js";import{g as ne}from"./Submit.67c1f3b9.js";import{M as te}from"./index.36a91d4c.js";const se=t=>({}),p=t=>({}),oe=t=>({}),H=t=>({});function ae(t){let n;const r=t[19].label,s=J(r,t,t[23],p);return{c(){s&&s.c()},l(o){s&&s.l(o)},m(o,e){s&&s.m(o,e),n=!0},p(o,e){s&&s.p&&(!n||e&8388608)&&K(s,r,o,o[23],n?P(r,o[23],e,se):O(o[23]),p)},i(o){n||(d(s,o),n=!0)},o(o){g(s,o),n=!1},d(o){s&&s.d(o)}}}function re(t){let n;const r=t[19].buttons,s=J(r,t,t[23],H);return{c(){s&&s.c()},l(o){s&&s.l(o)},m(o,e){s&&s.m(o,e),n=!0},p(o,e){s&&s.p&&(!n||e&8388608)&&K(s,r,o,o[23],n?P(r,o[23],e,oe):O(o[23]),H)},i(o){n||(d(s,o),n=!0)},o(o){g(s,o),n=!1},d(o){s&&s.d(o)}}}function le(t){let n,r;const s=[{roundingType:t[6]},{amount:t[17]},{tooltipError:!1},{required:t[1]},{errorMessage:t[7]&&t[8]._(t[7])},{"data-testid":"send-rain-amount"},{maxEnabled:t[4]},{currency:t[5]},{max:t[3]},{disabled:t[10]||t[2]||t[11]},{name:t[0]},t[18]];let o={$$slots:{buttons:[re],label:[ae]},$$scope:{ctx:t}};for(let e=0;e<s.length;e+=1)o=b(o,s[e]);return n=new ee({props:o}),n.$on("blur",t[20]),n.$on("focus",t[21]),n.$on("max",t[22]),{c(){W(n.$$.fragment)},l(e){X(n.$$.fragment,e)},m(e,l){Y(n,e,l),r=!0},p(e,[l]){const u=l&396799?v(s,[l&64&&{roundingType:e[6]},l&131072&&{amount:e[17]},s[2],l&2&&{required:e[1]},l&384&&{errorMessage:e[7]&&e[8]._(e[7])},s[5],l&16&&{maxEnabled:e[4]},l&32&&{currency:e[5]},l&8&&{max:e[3]},l&3076&&{disabled:e[10]||e[2]||e[11]},l&1&&{name:e[0]},l&262144&&w(e[18])]):{};l&8388608&&(u.$$scope={dirty:l,ctx:e}),n.$set(u)},i(e){r||(d(n.$$.fragment,e),r=!0)},o(e){g(n.$$.fragment,e),r=!1},d(e){x(n,e)}}}function ue(t,n,r){const s=["name","required","disabled","max","maxEnabled","currency","roundingType"];let o=j(n,s),e,l,u,h,E;i(t,te,a=>r(8,l=a));let{$$slots:R={},$$scope:T}=n,{name:_}=n,{required:q=!1}=n,{disabled:y=!1}=n,{max:c=1/0}=n,{maxEnabled:S=!1}=n,{currency:A}=n,{roundingType:F="round"}=n;const C=ne(),{isSubmitting:D,disabled:I}=C;i(t,D,a=>r(10,h=a)),i(t,I,a=>r(11,E=a));let U=C.fields[_];const{error:M,value:m,focus:f}=U;i(t,M,a=>r(7,e=a)),i(t,f,a=>r(9,u=a));const V=a=>a===""?(m.set("0"),"0"):(m.set(a),a),Z=(()=>({...m,set:a=>{V(a)}}))(),z=()=>{k(f,u=!1,u)},B=()=>{k(f,u=!0,u)},G=()=>m.set(String(c));return t.$$set=a=>{n=b(b({},n),$(a)),r(18,o=j(n,s)),"name"in a&&r(0,_=a.name),"required"in a&&r(1,q=a.required),"disabled"in a&&r(2,y=a.disabled),"max"in a&&r(3,c=a.max),"maxEnabled"in a&&r(4,S=a.maxEnabled),"currency"in a&&r(5,A=a.currency),"roundingType"in a&&r(6,F=a.roundingType),"$$scope"in a&&r(23,T=a.$$scope)},[_,q,y,c,S,A,F,e,l,u,h,E,D,I,M,m,f,Z,o,R,z,B,G,T]}class ce extends L{constructor(n){super(),N(this,n,ue,le,Q,{name:0,required:1,disabled:2,max:3,maxEnabled:4,currency:5,roundingType:6})}}export{ce as A};
