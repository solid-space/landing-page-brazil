import{L as ce,M as ue,S as te,b as se,a as le,H as Q,m as T,c as K,C as M,p as k,q as C,k as h,d as O,D as N,u as F,v as H,Z as J,f as G,Q as L,E as X,a3 as ne,I as R,J as W,K as Z,j as q,g as D,F as B,o as _e,n as oe,A as me,w as ge,x as he,y as ve,O as be}from"./index.03b5aaf0.js";import{B as Y}from"./index.b73d347c.js";import{I as ie}from"./index.38950c17.js";import{C as we}from"./index.0a0332b1.js";import{w as Se}from"./index.d67a6375.js";const ae="@@slider",x=({index:s,currentIndex:e,slidesToShow:t,mobileView:a})=>{if(a)return!1;const l=s+1,n=e+t;return l>n},pe=s=>ce(ae,s),Ie=()=>ue(ae);const Ve=s=>({}),$=s=>({getFaded:s[12]}),Te=s=>({}),ee=s=>({getFaded:s[12]});function ke(s){var a;let e=((a=s[0])==null?void 0:a.translation)+"",t;return{c(){t=ge(e)},l(l){t=he(l,e)},m(l,n){G(l,t,n)},p(l,n){var i;n&1&&e!==(e=((i=l[0])==null?void 0:i.translation)+"")&&ve(t,e)},d(l){l&&h(t)}}}function Ce(s){var a;let e,t;return e=new we({props:{icon:(a=s[0])==null?void 0:a.icon,to:s[8],loading:s[1],$$slots:{default:[ke]},$$scope:{ctx:s}}}),{c(){M(e.$$.fragment)},l(l){N(e.$$.fragment,l)},m(l,n){X(e,l,n),t=!0},p(l,n){var d;const i={};n&1&&(i.icon=(d=l[0])==null?void 0:d.icon),n&256&&(i.to=l[8]),n&2&&(i.loading=l[1]),n&2097153&&(i.$$scope={dirty:n,ctx:l}),e.$set(i)},i(l){t||(q(e.$$.fragment,l),t=!0)},o(l){D(e.$$.fragment,l),t=!1},d(l){B(e,l)}}}function Fe(s){let e,t,a;return t=new ie({props:{icon:"backward"}}),{c(){e=T("div"),M(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=C(e);N(t.$$.fragment,n),n.forEach(h),this.h()},h(){F(e,"class","arrow-inner svelte-uvc3qv")},m(l,n){G(l,e,n),X(t,e,null),a=!0},p:oe,i(l){a||(q(t.$$.fragment,l),a=!0)},o(l){D(t.$$.fragment,l),a=!1},d(l){l&&h(e),B(t)}}}function qe(s){let e,t,a;return t=new ie({props:{icon:"forward"}}),{c(){e=T("div"),M(t.$$.fragment),this.h()},l(l){e=k(l,"DIV",{class:!0});var n=C(e);N(t.$$.fragment,n),n.forEach(h),this.h()},h(){F(e,"class","arrow-inner svelte-uvc3qv")},m(l,n){G(l,e,n),X(t,e,null),a=!0},p:oe,i(l){a||(q(t.$$.fragment,l),a=!0)},o(l){D(t.$$.fragment,l),a=!1},d(l){l&&h(e),B(t)}}}function De(s){let e,t,a,l,n,i,d,f,w,m,u,y,S;const p=s[19].title,v=Q(p,s,s[21],ee),c=v||Ce(s);i=new Y({props:{type:"button",class:"backward",disabled:s[7],$$slots:{default:[Fe]},$$scope:{ctx:s}}}),i.$on("click",s[11]),f=new Y({props:{type:"button",class:"forward",disabled:s[6],$$slots:{default:[qe]},$$scope:{ctx:s}}}),f.$on("click",s[10]);const E=s[19].default,g=Q(E,s,s[21],$);return{c(){e=T("div"),t=T("div"),a=T("div"),c&&c.c(),l=K(),n=T("div"),M(i.$$.fragment),d=K(),M(f.$$.fragment),w=K(),m=T("div"),g&&g.c(),this.h()},l(o){e=k(o,"DIV",{class:!0});var _=C(e);t=k(_,"DIV",{class:!0});var b=C(t);a=k(b,"DIV",{name:!0});var I=C(a);c&&c.l(I),I.forEach(h),l=O(b),n=k(b,"DIV",{class:!0});var A=C(n);N(i.$$.fragment,A),d=O(A),N(f.$$.fragment,A),A.forEach(h),b.forEach(h),w=O(_),m=k(_,"DIV",{class:!0,style:!0});var V=C(m);g&&g.l(V),V.forEach(h),_.forEach(h),this.h()},h(){F(a,"name","title"),F(n,"class","arrows svelte-uvc3qv"),F(t,"class","header svelte-uvc3qv"),F(m,"class","gallery scrollX hide-scrollbar svelte-uvc3qv"),H(m,"grid-auto-columns","calc("+(100/s[4]).toFixed(2)+"% - "+s[3]+"px)"),H(m,"gap",s[3]+1+"px"),J(m,"mobileView",s[2]),F(e,"class","slider svelte-uvc3qv")},m(o,_){G(o,e,_),L(e,t),L(t,a),c&&c.m(a,null),L(t,l),L(t,n),X(i,n,null),L(n,d),X(f,n,null),L(e,w),L(e,m),g&&g.m(m,null),s[20](m),u=!0,y||(S=ne(m,"scroll",s[9]),y=!0)},p(o,[_]){v?v.p&&(!u||_&2097152)&&R(v,p,o,o[21],u?Z(p,o[21],_,Te):W(o[21]),ee):c&&c.p&&(!u||_&259)&&c.p(o,u?_:-1);const b={};_&128&&(b.disabled=o[7]),_&2097152&&(b.$$scope={dirty:_,ctx:o}),i.$set(b);const I={};_&64&&(I.disabled=o[6]),_&2097152&&(I.$$scope={dirty:_,ctx:o}),f.$set(I),g&&g.p&&(!u||_&2097152)&&R(g,E,o,o[21],u?Z(E,o[21],_,Ve):W(o[21]),$),(!u||_&24)&&H(m,"grid-auto-columns","calc("+(100/o[4]).toFixed(2)+"% - "+o[3]+"px)"),(!u||_&8)&&H(m,"gap",o[3]+1+"px"),(!u||_&4)&&J(m,"mobileView",o[2])},i(o){u||(q(c,o),q(i.$$.fragment,o),q(f.$$.fragment,o),q(g,o),u=!0)},o(o){D(c,o),D(i.$$.fragment,o),D(f.$$.fragment,o),D(g,o),u=!1},d(o){o&&h(e),c&&c.d(o),B(i),B(f),g&&g.d(o),s[20](null),y=!1,S()}}}function Ee(s,e,t){let a,l,n,{$$slots:i={},$$scope:d}=e,{group:f}=e,{loading:w=!1}=e,{mobileView:m=!1}=e,{width:u}=e,{gap:y}=e,{slidesToShow:S}=e,{slidesToScroll:p}=e,{slideCount:v}=e,c,E=!1,g=!1,o=!0;function _(){c.scrollLeft?t(7,o=!1):t(7,o=!0);const r=Number(((c.scrollLeft+10)/a).toFixed(0));t(16,V=r),V+p>=v?t(6,E=!0):t(6,E=!1)}const b=()=>{g||(window.requestAnimationFrame(function(){_(),g=!1}),g=!0)},I=()=>{const r=p*a,j=c.scrollLeft+r;c.scrollTo({left:j,behavior:"smooth"})},A=()=>{const r=p*a,j=Math.max(0,c.scrollLeft-r);c.scrollTo({left:j,behavior:"smooth"})};let V=0;const re=({index:r})=>x({index:r,currentIndex:V,mobileView:m,slidesToShow:S});let P=Array.from({length:v});const z=r=>r.slideArray.map((j,de)=>x({index:de,currentIndex:r.currentIndex,mobileView:r.mobileView,slidesToShow:r.slidesToShow}));let U=Se(z({mobileView:m,currentIndex:V,slideArray:P,slidesToShow:S}));pe({fadedSlides:U,next:I}),_e(()=>{c.scrollLeft!==0&&t(5,c.scrollLeft=0,c)});function fe(r){me[r?"unshift":"push"](()=>{c=r,t(5,c)})}return s.$$set=r=>{"group"in r&&t(0,f=r.group),"loading"in r&&t(1,w=r.loading),"mobileView"in r&&t(2,m=r.mobileView),"width"in r&&t(13,u=r.width),"gap"in r&&t(3,y=r.gap),"slidesToShow"in r&&t(4,S=r.slidesToShow),"slidesToScroll"in r&&t(14,p=r.slidesToScroll),"slideCount"in r&&t(15,v=r.slideCount),"$$scope"in r&&t(21,d=r.$$scope)},s.$$.update=()=>{s.$$.dirty&8208&&(a=Math.floor(u/S)),s.$$.dirty&32768&&t(17,P=Array.from({length:v})),s.$$.dirty&196628&&t(18,l=z({mobileView:m,currentIndex:V,slideArray:P,slidesToShow:S})),s.$$.dirty&262144&&U.set(l),s.$$.dirty&1&&t(8,n=(f==null?void 0:f.to)||(f==null?void 0:f.slug)&&`/casino/group/${f==null?void 0:f.slug}`||null)},[f,w,m,y,S,c,E,o,n,b,I,A,re,u,p,v,V,P,l,i,fe,d]}class Ge extends te{constructor(e){super(),se(this,e,Ee,De,le,{group:0,loading:1,mobileView:2,width:13,gap:3,slidesToShow:4,slidesToScroll:14,slideCount:15})}}function Le(s){let e,t,a,l;const n=s[6].default,i=Q(n,s,s[5],null);return{c(){e=T("div"),i&&i.c(),this.h()},l(d){e=k(d,"DIV",{class:!0});var f=C(e);i&&i.l(f),f.forEach(h),this.h()},h(){F(e,"class","slide svelte-1yfsgqc"),J(e,"faded",s[0])},m(d,f){G(d,e,f),i&&i.m(e,null),t=!0,a||(l=ne(e,"click",s[7]),a=!0)},p(d,[f]){i&&i.p&&(!t||f&32)&&R(i,n,d,d[5],t?Z(n,d[5],f,null):W(d[5]),null),(!t||f&1)&&J(e,"faded",d[0])},i(d){t||(q(i,d),t=!0)},o(d){D(i,d),t=!1},d(d){d&&h(e),i&&i.d(d),a=!1,l()}}}function ye(s,e,t){let a,l,{$$slots:n={},$$scope:i}=e,{index:d}=e;const{fadedSlides:f,next:w}=Ie();be(s,f,u=>t(4,l=u));const m=()=>{a&&w()};return s.$$set=u=>{"index"in u&&t(3,d=u.index),"$$scope"in u&&t(5,i=u.$$scope)},s.$$.update=()=>{s.$$.dirty&24&&t(0,a=l[d])},[a,f,w,d,l,i,n,m]}class Pe extends te{constructor(e){super(),se(this,e,ye,Le,le,{index:3})}}export{Ge as G,Pe as S};