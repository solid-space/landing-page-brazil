import{c as te}from"../chunks/combineLocales.3cb227b6.js";import{c as U}from"../chunks/get.2b2397e6.js";import{g as se,c as G}from"../chunks/seoPagination.dee57200.js";import{s as re}from"../chunks/utils.c8f55017.js";import{f as oe}from"../chunks/sanity.4036701c.js";import{w as ne}from"../chunks/index.d67a6375.js";import{S as ae,b as ie,a as le,C as P,c as I,e as H,D as w,d as V,E as y,f as v,g as h,h as W,j as k,F as S,k as _,O as q,z as X,n as Y,s as fe,m as M,w as B,p as T,q as C,x as j,Q as R,y as z,u as F}from"../chunks/index.03b5aaf0.js";import{S as me}from"../chunks/index.e55a5696.js";import{A as pe}from"../chunks/index.0406faed.js";import{a as ce}from"../chunks/index.9e640b67.js";import{B as ue}from"../chunks/index.5f9db4ae.js";import{E as _e}from"../chunks/index.20708f50.js";import{E as ge}from"../chunks/index.34a9c8c2.js";import{g as $e}from"../chunks/context.586c6dab.js";import{M as de}from"../chunks/index.7bc30f54.js";import{P as be}from"../chunks/Pagination.3711d18e.js";import{T as he}from"../chunks/index.ec1f5bcc.js";import{M as ke}from"../chunks/index.36a91d4c.js";import{m as E}from"../chunks/_messages.e424e8bd.js";import{p as ve}from"../chunks/stores.53eae6ef.js";const Pe=U(`{
  "promotions":  *[_type == "promotionFresh" && __i18n_lang == $lang && isDisplayed != false
      && !(_id in path("drafts.**"))] | order(orderRank) [$start...$end] {
          _id,
          title,
          slug {
            current
          },
          dateRange {
            start,
            end
          },
          'image': { 'asset': image.asset->{ url }  }
        },
  "categories":  *[_type == 'category' &&  __i18n_lang == $lang 
      && !(_id in path("drafts.**"))] {
        ...,
          name,
          slug {
            current
          },
          'image': {
            'asset': image.asset->{url,altText}
          },
        },
  "totalPromotionsCount": count(*[_type == "promotionFresh" && __i18n_lang == $lang
      && !(_id in path("drafts.**"))]
    ),
   "fallbackCategories":  *[_type == 'category' && __i18n_lang == "en" 
   && !(_id in path("drafts.**"))] {
     ...,
          name,
          slug {
            current
          },
          'image': {
            'asset': image.asset->{url,altText}
          },
        }
  } `),we=U(`{
    "fallbackPromotions":  *[
        _type == "promotionFresh" 
        && __i18n_lang == "en" 
        && isDisplayed != false
        && !($lang in __i18n_refs[]._key)
        && !(_id in path("drafts.**"))] | order(orderRank) [$start...$end] {
            _id,
            title,
            slug {
              current
            },
            dateRange {
              start,
              end
            },
            'image': { 'asset': image.asset->{ url }  }
          }
    }`),O=12,D=ne(!1),N=re["affiliate/campaigns"],ye=12,Se=async a=>{const t=await a.parent();try{D.set(!0);const{startValue:e,endValue:r,pageValue:s}=se(a,O);if(e===null)return{error:!0,seo:N};const[o,p]=await Promise.all([Pe(a,{start:e,end:r}),oe(a,"/promotions")]);if(!o)return{};const{promotions:m,categories:c,totalPromotionsCount:d,fallbackCategories:l}=o;let i=[];if(m.length<ye&&t.session.locale!=="en"){const u=e-d,g=r-d,$=await we(a,{start:u<0?0:u,end:g});i=$?$==null?void 0:$.fallbackPromotions:[]}const n=m.concat(i),f=te({original:c,fallback:l});return D.set(!1),{pageValue:s,promotions:n||[],categories:f,loading:D,error:!1,seo:p||N}}catch{return D.set(!1),{loading:D,error:!0,seo:N}}},st=Object.freeze(Object.defineProperty({__proto__:null,_BASE_LIMIT:O,load:Se},Symbol.toStringTag,{value:"Module"}));function Ee(a){var d;let t,e,r,s,o;const p=[Ce,Te,Me],m=[];function c(l,i){var n;return l[8]?0:((n=l[0])==null?void 0:n.length)===0?1:2}return t=c(a),e=m[t]=p[t](a),s=new be({props:{limit:O,offset:a[2]-1,listLength:((d=a[0])==null?void 0:d.length)||0}}),s.$on("previous",a[14]),s.$on("next",a[15]),{c(){e.c(),r=I(),P(s.$$.fragment)},l(l){e.l(l),r=V(l),w(s.$$.fragment,l)},m(l,i){m[t].m(l,i),v(l,r,i),y(s,l,i),o=!0},p(l,i){var u;let n=t;t=c(l),t===n?m[t].p(l,i):(X(),h(m[n],1,1,()=>{m[n]=null}),W(),e=m[t],e?e.p(l,i):(e=m[t]=p[t](l),e.c()),k(e,1),e.m(r.parentNode,r));const f={};i&4&&(f.offset=l[2]-1),i&1&&(f.listLength=((u=l[0])==null?void 0:u.length)||0),s.$set(f)},i(l){o||(k(e),k(s.$$.fragment,l),o=!0)},o(l){h(e),h(s.$$.fragment,l),o=!1},d(l){m[t].d(l),l&&_(r),S(s,l)}}}function Le(a){let t,e;return t=new ge({props:{$$slots:{default:[Ie]},$$scope:{ctx:a}}}),{c(){P(t.$$.fragment)},l(r){w(t.$$.fragment,r)},m(r,s){y(t,r,s),e=!0},p(r,s){const o={};s&65664&&(o.$$scope={dirty:s,ctx:r}),t.$set(o)},i(r){e||(k(t.$$.fragment,r),e=!0)},o(r){h(t.$$.fragment,r),e=!1},d(r){S(t,r)}}}function Me(a){var d,l;let t,e,r,s,o,p,m,c;return e=new pe({props:{categories:(d=a[6])==null?void 0:d.map(J)}}),o=new he({props:{variant:"highlighted",size:"lg",responsiveTypeScale:!0,tag:"h2",align:"left",$$slots:{default:[Ae]},$$scope:{ctx:a}}}),m=new ce({props:{articles:(l=a[0])==null?void 0:l.map(K)}}),{c(){t=M("div"),P(e.$$.fragment),r=I(),s=M("div"),P(o.$$.fragment),p=I(),P(m.$$.fragment),this.h()},l(i){t=T(i,"DIV",{class:!0,"data-nosnippet":!0});var n=C(t);w(e.$$.fragment,n),n.forEach(_),r=V(i),s=T(i,"DIV",{class:!0});var f=C(s);w(o.$$.fragment,f),p=V(f),w(m.$$.fragment,f),f.forEach(_),this.h()},h(){F(t,"class","group svelte-1vrqtbb"),F(t,"data-nosnippet",""),F(s,"class","group svelte-1vrqtbb")},m(i,n){v(i,t,n),y(e,t,null),v(i,r,n),v(i,s,n),y(o,s,null),R(s,p),y(m,s,null),c=!0},p(i,n){var $,L;const f={};n&64&&(f.categories=($=i[6])==null?void 0:$.map(J)),e.$set(f);const u={};n&65664&&(u.$$scope={dirty:n,ctx:i}),o.$set(u);const g={};n&1&&(g.articles=(L=i[0])==null?void 0:L.map(K)),m.$set(g)},i(i){c||(k(e.$$.fragment,i),k(o.$$.fragment,i),k(m.$$.fragment,i),c=!0)},o(i){h(e.$$.fragment,i),h(o.$$.fragment,i),h(m.$$.fragment,i),c=!1},d(i){i&&_(t),S(e),i&&_(r),i&&_(s),S(o),S(m)}}}function Te(a){let t,e,r;return e=new _e({props:{icon:"empty-promotions",$$slots:{default:[De]},$$scope:{ctx:a}}}),{c(){t=M("div"),P(e.$$.fragment),this.h()},l(s){t=T(s,"DIV",{class:!0});var o=C(t);w(e.$$.fragment,o),o.forEach(_),this.h()},h(){F(t,"class","empty-list-wrap svelte-1vrqtbb")},m(s,o){v(s,t,o),y(e,t,null),r=!0},p(s,o){const p={};o&65664&&(p.$$scope={dirty:o,ctx:s}),e.$set(p)},i(s){r||(k(e.$$.fragment,s),r=!0)},o(s){h(e.$$.fragment,s),r=!1},d(s){s&&_(t),S(e)}}}function Ce(a){let t,e;return t=new de({}),{c(){P(t.$$.fragment)},l(r){w(t.$$.fragment,r)},m(r,s){y(t,r,s),e=!0},p:Y,i(r){e||(k(t.$$.fragment,r),e=!0)},o(r){h(t.$$.fragment,r),e=!1},d(r){S(t,r)}}}function Ae(a){let t,e=a[7]._(E.latestPromotions)+"",r;return{c(){t=M("span"),r=B(e)},l(s){t=T(s,"SPAN",{});var o=C(t);r=j(o,e),o.forEach(_)},m(s,o){v(s,t,o),R(t,r)},p(s,o){o&128&&e!==(e=s[7]._(E.latestPromotions)+"")&&z(r,e)},d(s){s&&_(t)}}}function De(a){let t,e=a[7]._(E.noPromotions)+"",r;return{c(){t=M("span"),r=B(e)},l(s){t=T(s,"SPAN",{});var o=C(t);r=j(o,e),o.forEach(_)},m(s,o){v(s,t,o),R(t,r)},p(s,o){o&128&&e!==(e=s[7]._(E.noPromotions)+"")&&z(r,e)},d(s){s&&_(t)}}}function Ie(a){let t,e=a[7]._(E.failedToLoadPromotions)+"",r;return{c(){t=M("span"),r=B(e)},l(s){t=T(s,"SPAN",{});var o=C(t);r=j(o,e),o.forEach(_)},m(s,o){v(s,t,o),R(t,r)},p(s,o){o&128&&e!==(e=s[7]._(E.failedToLoadPromotions)+"")&&z(r,e)},d(s){s&&_(t)}}}function Ve(a){let t,e,r,s,o,p,m,c;t=new me({props:{seo:a[4]}}),r=new ue({props:{title:a[7]._(E.promotions),loading:a[8],isMobile:a[5],slug:"promotions"}});const d=[Le,Ee],l=[];function i(n,f){return n[3]?0:1}return o=i(a),p=l[o]=d[o](a),{c(){P(t.$$.fragment),e=I(),P(r.$$.fragment),s=I(),p.c(),m=H()},l(n){w(t.$$.fragment,n),e=V(n),w(r.$$.fragment,n),s=V(n),p.l(n),m=H()},m(n,f){y(t,n,f),v(n,e,f),y(r,n,f),v(n,s,f),l[o].m(n,f),v(n,m,f),c=!0},p(n,[f]){const u={};f&16&&(u.seo=n[4]),t.$set(u);const g={};f&128&&(g.title=n[7]._(E.promotions)),f&256&&(g.loading=n[8]),f&32&&(g.isMobile=n[5]),r.$set(g);let $=o;o=i(n),o===$?l[o].p(n,f):(X(),h(l[$],1,1,()=>{l[$]=null}),W(),p=l[o],p?p.p(n,f):(p=l[o]=d[o](n),p.c()),k(p,1),p.m(m.parentNode,m))},i(n){c||(k(t.$$.fragment,n),k(r.$$.fragment,n),k(p),c=!0)},o(n){h(t.$$.fragment,n),h(r.$$.fragment,n),h(p),c=!1},d(n){S(t,n),n&&_(e),S(r,n),n&&_(s),l[o].d(n),n&&_(m)}}}const J=a=>{var t,e;return{...a,url:`/promotions/category/${(t=a==null?void 0:a.slug)==null?void 0:t.current}`,title:a==null?void 0:a.name,asset:(e=a==null?void 0:a.image)==null?void 0:e.asset}},K=a=>({...a,url:`/promotions/promotion/${a.slug.current}`});function Fe(a,t,e){let r,s,o,p,m,c=Y,d=()=>(c(),c=fe(u,b=>e(8,m=b)),u),l;q(a,ke,b=>e(7,p=b)),q(a,ve,b=>e(9,l=b)),a.$$.on_destroy.push(()=>c());let{data:i}=t,{categories:n,promotions:f,loading:u,pageValue:g,error:$,seo:L}=i;d();const Q=$e();q(a,Q,b=>e(13,o=b));const Z=()=>G({action:"previous",pageValue:g,page:l}),x=()=>G({action:"next",pageValue:g,page:l});return a.$$set=b=>{"data"in b&&e(11,i=b.data)},a.$$.update=()=>{var b;a.$$.dirty&2048&&e(12,{categories:n,promotions:f,loading:u,pageValue:g,error:$,seo:L}=i,n,(e(0,f),e(11,i)),d(e(1,u)),(e(2,g),e(11,i)),(e(3,$),e(11,i)),(e(4,L),e(11,i))),a.$$.dirty&4096&&e(6,r=(b=n??[])==null?void 0:b.filter(A=>{if(A.slug.current==="casino"||A.slug.current==="sports")return A}).sort((A,ee)=>A.slug.current.localeCompare(ee.slug.current))),a.$$.dirty&8192&&e(5,s=o&&o<700)},[f,u,g,$,L,s,r,p,m,l,Q,i,n,o,Z,x]}class rt extends ae{constructor(t){super(),ie(this,t,Fe,Ve,le,{data:11})}}export{rt as component,st as universal};
