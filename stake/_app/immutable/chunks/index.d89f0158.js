import{S as U,b as Z,a as j,m as G,p as I,q as P,k as d,u as k,Z as q,f as z,z as O,g as w,h as R,j as b,w as H,x as K,y as L,n as S,Q as M,C as V,D as C,E as N,F as T,c as A,e as B,d as F,O as x,a3 as $}from"./index.03b5aaf0.js";import{I as ee}from"./index.0bd21223.js";import{g as ae}from"./generatePath.242bee39.js";import{p as ie}from"./paths.e6bc493d.js";import{P as Q}from"./index.31c261ea.js";import{I as ne}from"./index.ae2c72a9.js";import{I as y}from"./index.38950c17.js";import{r as te}from"./index.36a91d4c.js";import{Z as le}from"./currencies.bbaf1c4b.js";import{s as re}from"./scrollTopContainer.dd74afa4.js";function fe(l){let e;return{c(){e=H(l[3])},l(a){e=K(a,l[3])},m(a,i){z(a,e,i)},p(a,i){i&8&&L(e,a[3])},i:S,o:S,d(a){a&&d(e)}}}function oe(l){let e,a;return{c(){e=G("a"),a=H(l[3]),this.h()},l(i){e=I(i,"A",{href:!0});var t=P(e);a=K(t,l[3]),t.forEach(d),this.h()},h(){k(e,"href",l[4])},m(i,t){z(i,e,t),M(e,a)},p(i,t){t&8&&L(a,i[3]),t&16&&k(e,"href",i[4])},i:S,o:S,d(i){i&&d(e)}}}function se(l){let e,a;return e=new Q({props:{width:"100%"}}),{c(){V(e.$$.fragment)},l(i){C(e.$$.fragment,i)},m(i,t){N(e,i,t),a=!0},p:S,i(i){a||(b(e.$$.fragment,i),a=!0)},o(i){w(e.$$.fragment,i),a=!1},d(i){T(e,i)}}}function me(l){let e,a,i,t;const o=[se,oe,fe],f=[];function r(n,m){return n[2]?0:n[1]?1:2}return a=r(l),i=f[a]=o[a](l),{c(){e=G("strong"),i.c(),this.h()},l(n){e=I(n,"STRONG",{class:!0});var m=P(e);i.l(m),m.forEach(d),this.h()},h(){k(e,"class","gameName svelte-rhtl4f"),q(e,"quick-game",l[0]==="quickGame")},m(n,m){z(n,e,m),f[a].m(e,null),t=!0},p(n,[m]){let u=a;a=r(n),a===u?f[a].p(n,m):(O(),w(f[u],1,1,()=>{f[u]=null}),R(),i=f[a],i?i.p(n,m):(i=f[a]=o[a](n),i.c()),b(i,1),i.m(e,null)),(!t||m&1)&&q(e,"quick-game",n[0]==="quickGame")},i(n){t||(b(i),t=!0)},o(n){w(i),t=!1},d(n){n&&d(e),f[a].d()}}}function ue(l,e,a){let{variant:i="normal"}=e,{horizontal:t}=e,{loading:o}=e,{name:f}=e,{gamePath:r}=e;return l.$$set=n=>{"variant"in n&&a(0,i=n.variant),"horizontal"in n&&a(1,t=n.horizontal),"loading"in n&&a(2,o=n.loading),"name"in n&&a(3,f=n.name),"gamePath"in n&&a(4,r=n.gamePath)},[i,t,o,f,r]}class ce extends U{constructor(e){super(),Z(this,e,ue,me,j,{variant:0,horizontal:1,loading:2,name:3,gamePath:4})}}function J(l){let e,a,i,t,o,f,r,n;a=new y({props:{icon:"play"}});const m=[he,ge],u=[];function D(s,c){return s[0]?0:1}return f=D(l),r=u[f]=m[f](l),{c(){e=G("div"),V(a.$$.fragment),i=A(),t=G("div"),o=G("strong"),r.c(),this.h()},l(s){e=I(s,"DIV",{class:!0});var c=P(e);C(a.$$.fragment,c),c.forEach(d),i=F(s),t=I(s,"DIV",{class:!0});var _=P(t);o=I(_,"STRONG",{});var g=P(o);r.l(g),g.forEach(d),_.forEach(d),this.h()},h(){k(e,"class","wrap-icon svelte-16aeiib"),q(e,"horizontal",l[4]&&l[2]!==0),k(t,"class","game-info-wrap game-group svelte-16aeiib"),q(t,"horizontal",l[4])},m(s,c){z(s,e,c),N(a,e,null),z(s,i,c),z(s,t,c),M(t,o),u[f].m(o,null),n=!0},p(s,c){(!n||c&20)&&q(e,"horizontal",s[4]&&s[2]!==0);let _=f;f=D(s),f===_?u[f].p(s,c):(O(),w(u[_],1,1,()=>{u[_]=null}),R(),r=u[f],r?r.p(s,c):(r=u[f]=m[f](s),r.c()),b(r,1),r.m(o,null)),(!n||c&16)&&q(t,"horizontal",s[4])},i(s){n||(b(a.$$.fragment,s),b(r),n=!0)},o(s){w(a.$$.fragment,s),w(r),n=!1},d(s){s&&d(e),T(a),s&&d(i),s&&d(t),u[f].d()}}}function ge(l){var i,t,o;let e=(((t=(i=l[7])==null?void 0:i.group)==null?void 0:t.translation)||((o=l[6])==null?void 0:o.name))+"",a;return{c(){a=H(e)},l(f){a=K(f,e)},m(f,r){z(f,a,r)},p(f,r){var n,m,u;r&64&&e!==(e=(((m=(n=f[7])==null?void 0:n.group)==null?void 0:m.translation)||((u=f[6])==null?void 0:u.name))+"")&&L(a,e)},i:S,o:S,d(f){f&&d(a)}}}function he(l){let e,a;return e=new Q({props:{width:"8ch"}}),{c(){V(e.$$.fragment)},l(i){C(e.$$.fragment,i)},m(i,t){N(e,i,t),a=!0},p:S,i(i){a||(b(e.$$.fragment,i),a=!0)},o(i){w(e.$$.fragment,i),a=!1},d(i){T(e,i)}}}function _e(l){let e,a,i,t,o,f;i=new ce({props:{horizontal:l[4],loading:l[0],gamePath:l[3],name:l[1],variant:l[5]}});let r=l[5]==="normal"&&J(l);return{c(){e=G("div"),a=G("div"),V(i.$$.fragment),t=A(),r&&r.c(),o=B(),this.h()},l(n){e=I(n,"DIV",{class:!0});var m=P(e);a=I(m,"DIV",{class:!0});var u=P(a);C(i.$$.fragment,u),u.forEach(d),m.forEach(d),t=F(n),r&&r.l(n),o=B(),this.h()},h(){k(a,"class","game-info-wrap svelte-16aeiib"),k(e,"class","game-info-container svelte-16aeiib"),q(e,"cover",l[5]==="quickGame")},m(n,m){z(n,e,m),M(e,a),N(i,a,null),z(n,t,m),r&&r.m(n,m),z(n,o,m),f=!0},p(n,[m]){const u={};m&16&&(u.horizontal=n[4]),m&1&&(u.loading=n[0]),m&8&&(u.gamePath=n[3]),m&2&&(u.name=n[1]),m&32&&(u.variant=n[5]),i.$set(u),(!f||m&32)&&q(e,"cover",n[5]==="quickGame"),n[5]==="normal"?r?(r.p(n,m),m&32&&b(r,1)):(r=J(n),r.c(),b(r,1),r.m(o.parentNode,o)):r&&(O(),w(r,1,1,()=>{r=null}),R())},i(n){f||(b(i.$$.fragment,n),b(r),f=!0)},o(n){w(i.$$.fragment,n),w(r),f=!1},d(n){n&&d(e),T(i),n&&d(t),r&&r.d(n),n&&d(o)}}}function de(l,e,a){let{loading:i}=e,{name:t}=e,{edge:o=0}=e,{gamePath:f}=e,{horizontal:r=!1}=e,{variant:n="normal"}=e,{provider:m}=e,{groupGames:u}=e;const D=u==null?void 0:u.find(s=>{var c;return((c=s==null?void 0:s.group)==null?void 0:c.type)===le.provider});return l.$$set=s=>{"loading"in s&&a(0,i=s.loading),"name"in s&&a(1,t=s.name),"edge"in s&&a(2,o=s.edge),"gamePath"in s&&a(3,f=s.gamePath),"horizontal"in s&&a(4,r=s.horizontal),"variant"in s&&a(5,n=s.variant),"provider"in s&&a(6,m=s.provider),"groupGames"in s&&a(8,u=s.groupGames)},[i,t,o,f,r,n,m,D,u]}class ve extends U{constructor(e){super(),Z(this,e,de,_e,j,{loading:0,name:1,edge:2,gamePath:3,horizontal:4,variant:5,provider:6,groupGames:8})}}function X(l){let e,a,i;return a=new Q({props:{height:"100%"}}),{c(){e=G("div"),V(a.$$.fragment),this.h()},l(t){e=I(t,"DIV",{class:!0});var o=P(e);C(a.$$.fragment,o),o.forEach(d),this.h()},h(){k(e,"class","placeholder svelte-aesi7n")},m(t,o){z(t,e,o),N(a,e,null),i=!0},i(t){i||(b(a.$$.fragment,t),i=!0)},o(t){w(a.$$.fragment,t),i=!1},d(t){t&&d(e),T(a)}}}function Y(l){let e,a,i;return a=new y({props:{icon:"archery"}}),{c(){e=G("div"),V(a.$$.fragment),this.h()},l(t){e=I(t,"DIV",{class:!0});var o=P(e);C(a.$$.fragment,o),o.forEach(d),this.h()},h(){k(e,"class","challenge-ribbon svelte-aesi7n")},m(t,o){z(t,e,o),N(a,e,null),i=!0},i(t){i||(b(a.$$.fragment,t),i=!0)},o(t){w(a.$$.fragment,t),i=!1},d(t){t&&d(e),T(a)}}}function be(l){let e,a,i,t,o,f,r,n,m,u,D,s;t=new ee({props:{src:l[9],alt:l[10],draggable:!1,loading:"lazy",imgixParams:{q:50,w:p},width:Math.floor(l[3]),height:Math.floor(l[3]*1.341)}});let c=l[2]&&X();n=new ve({props:{horizontal:!1,name:l[10],edge:l[0],provider:l[6],groupGames:l[7],gamePath:l[8],loading:l[2],isMobile:l[1],variant:l[5]}});let _=l[4]&&Y();return{c(){e=G("a"),a=G("div"),i=G("div"),V(t.$$.fragment),o=A(),c&&c.c(),f=A(),r=G("div"),V(n.$$.fragment),m=A(),_&&_.c(),this.h()},l(g){e=I(g,"A",{class:!0,"data-sveltekit-preload-data":!0,href:!0});var v=P(e);a=I(v,"DIV",{class:!0});var E=P(a);i=I(E,"DIV",{class:!0});var h=P(i);C(t.$$.fragment,h),o=F(h),c&&c.l(h),h.forEach(d),f=F(E),r=I(E,"DIV",{class:!0});var W=P(r);C(n.$$.fragment,W),W.forEach(d),E.forEach(d),m=F(v),_&&_.l(v),v.forEach(d),this.h()},h(){k(i,"class","image"),k(r,"class","info-wrap svelte-aesi7n"),q(r,"quick-game",l[5]==="quickGame"),k(a,"class","img-wrap wrap svelte-aesi7n"),k(e,"class","link svelte-aesi7n"),k(e,"data-sveltekit-preload-data","hover"),k(e,"href",l[8]),q(e,"is-mobile",l[1])},m(g,v){z(g,e,v),M(e,a),M(a,i),N(t,i,null),M(i,o),c&&c.m(i,null),M(a,f),M(a,r),N(n,r,null),M(e,m),_&&_.m(e,null),u=!0,D||(s=$(e,"click",l[14]),D=!0)},p(g,v){const E={};v&512&&(E.src=g[9]),v&1024&&(E.alt=g[10]),v&8&&(E.width=Math.floor(g[3])),v&8&&(E.height=Math.floor(g[3]*1.341)),t.$set(E),g[2]?c?v&4&&b(c,1):(c=X(),c.c(),b(c,1),c.m(i,null)):c&&(O(),w(c,1,1,()=>{c=null}),R());const h={};v&1024&&(h.name=g[10]),v&1&&(h.edge=g[0]),v&64&&(h.provider=g[6]),v&128&&(h.groupGames=g[7]),v&256&&(h.gamePath=g[8]),v&4&&(h.loading=g[2]),v&2&&(h.isMobile=g[1]),v&32&&(h.variant=g[5]),n.$set(h),(!u||v&32)&&q(r,"quick-game",g[5]==="quickGame"),g[4]?_?v&16&&b(_,1):(_=Y(),_.c(),b(_,1),_.m(e,null)):_&&(O(),w(_,1,1,()=>{_=null}),R()),(!u||v&256)&&k(e,"href",g[8]),(!u||v&2)&&q(e,"is-mobile",g[1])},i(g){u||(b(t.$$.fragment,g),b(c),b(n.$$.fragment,g),b(_),u=!0)},o(g){w(t.$$.fragment,g),w(c),w(n.$$.fragment,g),w(_),u=!1},d(g){g&&d(e),T(t),c&&c.d(),T(n),_&&_.d(),D=!1,s()}}}function ke(l){let e,a,i,t;return a=new ne({props:{$$slots:{default:[be]},$$scope:{ctx:l}}}),{c(){e=G("div"),V(a.$$.fragment),this.h()},l(o){e=I(o,"DIV",{class:!0,"data-analytics":!0});var f=P(e);C(a.$$.fragment,f),f.forEach(d),this.h()},h(){k(e,"class","wrap svelte-aesi7n"),k(e,"data-analytics",i="casino-sliders-"+l[10]+"-item")},m(o,f){z(o,e,f),N(a,e,null),t=!0},p(o,[f]){const r={};f&34815&&(r.$$scope={dirty:f,ctx:o}),a.$set(r),(!t||f&1024&&i!==(i="casino-sliders-"+o[10]+"-item"))&&k(e,"data-analytics",i)},i(o){t||(b(a.$$.fragment,o),t=!0)},o(o){w(a.$$.fragment,o),t=!1},d(o){o&&d(e),T(a)}}}const p=220;function we(l,e,a){let i,t,o,f,r;x(l,te,h=>a(13,r=h));let{card:n}=e,{edge:m=0}=e,{isMobile:u=!1}=e,{loading:D=void 0}=e,{width:s=p}=e,{hasChallenge:c=!1}=e,{variant:_="normal"}=e,{provider:g=void 0}=e,{groupGames:v=[]}=e;const E=()=>{re()};return l.$$set=h=>{"card"in h&&a(11,n=h.card),"edge"in h&&a(0,m=h.edge),"isMobile"in h&&a(1,u=h.isMobile),"loading"in h&&a(2,D=h.loading),"width"in h&&a(3,s=h.width),"hasChallenge"in h&&a(4,c=h.hasChallenge),"variant"in h&&a(5,_=h.variant),"provider"in h&&a(6,g=h.provider),"groupGames"in h&&a(7,v=h.groupGames)},l.$$.update=()=>{l.$$.dirty&2048&&a(12,{slug:i,name:t,thumbnailUrl:o}=n,i,(a(10,t),a(11,n)),(a(9,o),a(11,n))),l.$$.dirty&12288&&a(8,f=i&&r(ae(ie.game,{game:i}))||"")},[m,u,D,s,c,_,g,v,f,o,t,n,i,r,E]}class Ne extends U{constructor(e){super(),Z(this,e,we,ke,j,{card:11,edge:0,isMobile:1,loading:2,width:3,hasChallenge:4,variant:5,provider:6,groupGames:7})}}export{Ne as G};
