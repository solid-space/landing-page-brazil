import{w as je}from"./index.d67a6375.js";import{C as Qe}from"./CurrentAnnouncements.generated.99164eee.js";import{a7 as ze,M as ve,V as Se,e as Ye,a2 as Fe}from"./index.36a91d4c.js";import{f as le}from"./loadHelpers.abbaab45.js";import{S as x,b as ee,a as ne,C as F,c as J,e as R,D as O,d as K,E as V,f as S,z as W,g,h as X,j as _,F as w,k as y,O as v,a5 as re,m as ue,w as I,p as oe,q as me,x as M,u as se,Q as fe,y as L,G as Oe,a6 as ke,n as He}from"./index.03b5aaf0.js";import{I as Je,c as j,F as Ve,U as Ke}from"./currencies.bbaf1c4b.js";import{M as We}from"./index.7bc30f54.js";import{S as _e,n as ge,F as pe,c as Te}from"./Submit.67c1f3b9.js";import{c as we,a as Ce}from"./convert.d57c05b4.js";import{v as qe}from"./index.9cf5ab9b.js";import{I as Pe}from"./InputField.31eeb121.js";import{T as Xe}from"./TfaInput.3a99ccc5.js";import{A as Ze}from"./AmountField.1ee37717.js";import{T as $e}from"./ToggleField.4a6297f0.js";import{C as xe}from"./Currency.ef653d40.js";import{O as en}from"./OAuthField.3ca1621d.js";import{T as nn}from"./index.ec1f5bcc.js";import{B as Ee}from"./index.b73d347c.js";import{i as A}from"./index.b135e261.js";import{b as be,i as an,j as tn}from"./index.a7940b8a.js";import{n as $}from"./index.bd6c5768.js";import{a as ln}from"./stores.969cc8ed.js";import{a as De,d as rn,c as te,b as un,e as on}from"./object.b3149e8a.js";import{c as mn}from"./Lazy.9b465cb4.js";import{a as sn}from"./index.9181a536.js";import{e as fn}from"./index.d274af24.js";import"./iovation.5a864d11.js";const Ea=ze("@closedAnnouncements",[]),Da=(()=>({...je([]),fetch:async a=>{try{const e=await le({doc:Qe,variables:{},load:a});return(e==null?void 0:e.currentAnnouncements)||[]}catch{return null}}}))(),cn={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"TipLimit"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"currency"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CurrencyEnum"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"info"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currency"},arguments:[{kind:"Argument",name:{kind:"Name",value:"currency"},value:{kind:"Variable",name:{kind:"Name",value:"currency"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"tipMin"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"value"}}]}}]}}]}}]}}]},Ae={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"SendTipMeta"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}},{kind:"Field",alias:{kind:"Name",value:"self"},name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"hasTfaEnabled"}},{kind:"Field",name:{kind:"Name",value:"isTfaSessionValid"}},{kind:"Field",name:{kind:"Name",value:"balances"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"available"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"}},{kind:"Field",name:{kind:"Name",value:"currency"}}]}},{kind:"Field",name:{kind:"Name",value:"vault"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"}},{kind:"Field",name:{kind:"Name",value:"currency"}}]}}]}}]}}]}}]},N={fiatError:A._("Tipping is only available via crypto."),amount:A._("Amount"),isPublic:A._("Public"),isPublicExplain:A._("Tip will appear in global chat as a message"),tfaToken:A._("Two Factor"),sendTip:A._("Send Tip"),min:A._("Min"),name:A._("Name"),submit:A._("Submit"),instruction:A._("Please check your Email for an email code."),newCode:A._("Request a new code"),code:A._("Email Code"),unknownError:A._("An unknown error occurred. The transaction has not been processed.")};function dn(t){let n,a,e,i,l,f,u,r,d,m;n=new Pe({props:{required:!0,name:"name",focused:!t[3],"data-test":"tip-name",$$slots:{label:[bn]},$$scope:{ctx:t}}}),e=new Ze({props:{"data-test":"tip-amount",name:"amount",required:!0,currency:t[2],focused:Boolean(t[3]),$$slots:{buttons:[Tn],label:[_n]},$$scope:{ctx:t}}});let k=t[4]&&ye(t),c=t[1]===!1&&!t[7]&&Ne(t);const q=[vn,Nn],C=[];function s(o,h){return o[6]?0:1}return u=s(t),r=C[u]=q[u](t),{c(){F(n.$$.fragment),a=J(),F(e.$$.fragment),i=J(),k&&k.c(),l=J(),c&&c.c(),f=J(),r.c(),d=R()},l(o){O(n.$$.fragment,o),a=K(o),O(e.$$.fragment,o),i=K(o),k&&k.l(o),l=K(o),c&&c.l(o),f=K(o),r.l(o),d=R()},m(o,h){V(n,o,h),S(o,a,h),V(e,o,h),S(o,i,h),k&&k.m(o,h),S(o,l,h),c&&c.m(o,h),S(o,f,h),C[u].m(o,h),S(o,d,h),m=!0},p(o,h){const P={};h&8&&(P.focused=!o[3]),h&4352&&(P.$$scope={dirty:h,ctx:o}),n.$set(P);const E={};h&4&&(E.currency=o[2]),h&8&&(E.focused=Boolean(o[3])),h&4355&&(E.$$scope={dirty:h,ctx:o}),e.$set(E),o[4]?k?(k.p(o,h),h&16&&_(k,1)):(k=ye(o),k.c(),_(k,1),k.m(l.parentNode,l)):k&&(W(),g(k,1,1,()=>{k=null}),X()),o[1]===!1&&!o[7]?c?(c.p(o,h),h&130&&_(c,1)):(c=Ne(o),c.c(),_(c,1),c.m(f.parentNode,f)):c&&(W(),g(c,1,1,()=>{c=null}),X());let D=u;u=s(o),u===D?C[u].p(o,h):(W(),g(C[D],1,1,()=>{C[D]=null}),X(),r=C[u],r?r.p(o,h):(r=C[u]=q[u](o),r.c()),_(r,1),r.m(d.parentNode,d))},i(o){m||(_(n.$$.fragment,o),_(e.$$.fragment,o),_(k),_(c),_(r),m=!0)},o(o){g(n.$$.fragment,o),g(e.$$.fragment,o),g(k),g(c),g(r),m=!1},d(o){w(n,o),o&&y(a),w(e,o),o&&y(i),k&&k.d(o),o&&y(l),c&&c.d(o),o&&y(f),C[u].d(o),o&&y(d)}}}function kn(t){let n,a;return n=new nn({props:{align:"center",$$slots:{default:[Vn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function bn(t){let n,a=t[8]._(N.name)+"",e;return{c(){n=ue("span"),e=I(a),this.h()},l(i){n=oe(i,"SPAN",{slot:!0});var l=me(n);e=M(l,a),l.forEach(y),this.h()},h(){se(n,"slot","label")},m(i,l){S(i,n,l),fe(n,e)},p(i,l){l&256&&a!==(a=i[8]._(N.name)+"")&&L(e,a)},d(i){i&&y(n)}}}function _n(t){let n,a=t[8]._(N.amount)+"",e;return{c(){n=ue("span"),e=I(a),this.h()},l(i){n=oe(i,"SPAN",{slot:!0});var l=me(n);e=M(l,a),l.forEach(y),this.h()},h(){se(n,"slot","label")},m(i,l){S(i,n,l),fe(n,e)},p(i,l){l&256&&a!==(a=i[8]._(N.amount)+"")&&L(e,a)},d(i){i&&y(n)}}}function he(t){let n,a;return n=new Ee({props:{size:"sm",disabled:t[0],variant:"neutral",noShadow:!0,type:"button",$$slots:{default:[pn]},$$scope:{ctx:t}}}),n.$on("click",t[11]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.disabled=e[0]),i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function pn(t){let n=t[8]._(N.min)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.min)+"")&&L(a,n)},d(e){e&&y(a)}}}function Tn(t){let n,a,e=t[1]===!1&&he(t);return{c(){e&&e.c(),n=R()},l(i){e&&e.l(i),n=R()},m(i,l){e&&e.m(i,l),S(i,n,l),a=!0},p(i,l){i[1]===!1?e?(e.p(i,l),l&2&&_(e,1)):(e=he(i),e.c(),_(e,1),e.m(n.parentNode,n)):e&&(W(),g(e,1,1,()=>{e=null}),X())},i(i){a||(_(e),a=!0)},o(i){g(e),a=!1},d(i){e&&e.d(i),i&&y(n)}}}function ye(t){let n,a;return n=new Xe({props:{name:"tfaToken","data-test":"tip-tfa",$$slots:{label:[gn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function gn(t){let n,a=t[8]._(N.tfaToken)+"",e;return{c(){n=ue("span"),e=I(a),this.h()},l(i){n=oe(i,"SPAN",{slot:!0});var l=me(n);e=M(l,a),l.forEach(y),this.h()},h(){se(n,"slot","label")},m(i,l){S(i,n,l),fe(n,e)},p(i,l){l&256&&a!==(a=i[8]._(N.tfaToken)+"")&&L(e,a)},d(i){i&&y(n)}}}function Ne(t){let n,a;return n=new $e({props:{name:"isPublic",type:"checkbox","data-test":"tip-public",$$slots:{explain:[yn],label:[hn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function hn(t){let n=t[8]._(N.isPublic)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.isPublic)+"")&&L(a,n)},d(e){e&&y(a)}}}function yn(t){let n=t[8]._(N.isPublicExplain)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.isPublicExplain)+"")&&L(a,n)},d(e){e&&y(a)}}}function Nn(t){let n,a;return n=new _e({props:{loading:t[0],"data-test":"tip-submit",$$slots:{default:[Sn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.loading=e[0]),i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function vn(t){let n,a;return n=new en({props:{$$slots:{default:[On]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&4353&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Sn(t){let n=t[8]._(N.sendTip)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.sendTip)+"")&&L(a,n)},d(e){e&&y(a)}}}function Fn(t){let n=t[8]._(N.sendTip)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.sendTip)+"")&&L(a,n)},d(e){e&&y(a)}}}function On(t){let n,a;return n=new _e({props:{loading:t[0],$$slots:{default:[Fn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.loading=e[0]),i&4352&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Vn(t){let n=t[8]._(N.fiatError)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&256&&n!==(n=e[8]._(N.fiatError)+"")&&L(a,n)},d(e){e&&y(a)}}}function wn(t){let n,a,e,i,l,f;n=new xe({props:{currencies:t[10]}});const u=[kn,dn],r=[];function d(m,k){return m[7]&&!m[5]?0:1}return e=d(t),i=r[e]=u[e](t),{c(){F(n.$$.fragment),a=J(),i.c(),l=R()},l(m){O(n.$$.fragment,m),a=K(m),i.l(m),l=R()},m(m,k){V(n,m,k),S(m,a,k),r[e].m(m,k),S(m,l,k),f=!0},p(m,[k]){let c=e;e=d(m),e===c?r[e].p(m,k):(W(),g(r[c],1,1,()=>{r[c]=null}),X(),i=r[e],i?i.p(m,k):(i=r[e]=u[e](m),i.c()),_(i,1),i.m(l.parentNode,l))},i(m){f||(_(n.$$.fragment,m),_(i),f=!0)},o(m){g(n.$$.fragment,m),g(i),f=!1},d(m){w(n,m),m&&y(a),r[e].d(m),m&&y(l)}}}function Cn(t,n,a){let e,i;v(t,ve,s=>a(8,i=s));let{loading:l=!1}=n,{enableTfaOnly:f}=n,{currencyField:u}=n,{name:r}=n,{requiresTfa:d}=n,{canFiatTip:m}=n,{hasOauth:k}=n;const c=re(),q=Je.filter(s=>s!==j.gold),C=()=>{c("min")};return t.$$set=s=>{"loading"in s&&a(0,l=s.loading),"enableTfaOnly"in s&&a(1,f=s.enableTfaOnly),"currencyField"in s&&a(2,u=s.currencyField),"name"in s&&a(3,r=s.name),"requiresTfa"in s&&a(4,d=s.requiresTfa),"canFiatTip"in s&&a(5,m=s.canFiatTip),"hasOauth"in s&&a(6,k=s.hasOauth)},t.$$.update=()=>{t.$$.dirty&4&&a(7,e=u in Ve)},[l,f,u,r,d,m,k,e,i,c,q,C]}class Ie extends x{constructor(n){super(),ee(this,n,Cn,wn,ne,{loading:0,enableTfaOnly:1,currencyField:2,name:3,requiresTfa:4,canFiatTip:5,hasOauth:6})}}const qn={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"SendTipEmailCode"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"amount"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Float"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"chatId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"currency"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CurrencyEnum"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sendTipEmailCode"},arguments:[{kind:"Argument",name:{kind:"Name",value:"amount"},value:{kind:"Variable",name:{kind:"Name",value:"amount"}}},{kind:"Argument",name:{kind:"Name",value:"chatId"},value:{kind:"Variable",name:{kind:"Name",value:"chatId"}}},{kind:"Argument",name:{kind:"Name",value:"currency"},value:{kind:"Variable",name:{kind:"Name",value:"currency"}}},{kind:"Argument",name:{kind:"Name",value:"userId"},value:{kind:"Variable",name:{kind:"Name",value:"userId"}}}]}]}}]},Pn={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"SendTip"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"amount"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Float"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"chatId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"currency"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CurrencyEnum"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"emailCode"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"isPublic"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"oauthToken"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"tfaToken"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sendTip"},arguments:[{kind:"Argument",name:{kind:"Name",value:"amount"},value:{kind:"Variable",name:{kind:"Name",value:"amount"}}},{kind:"Argument",name:{kind:"Name",value:"chatId"},value:{kind:"Variable",name:{kind:"Name",value:"chatId"}}},{kind:"Argument",name:{kind:"Name",value:"currency"},value:{kind:"Variable",name:{kind:"Name",value:"currency"}}},{kind:"Argument",name:{kind:"Name",value:"emailCode"},value:{kind:"Variable",name:{kind:"Name",value:"emailCode"}}},{kind:"Argument",name:{kind:"Name",value:"isPublic"},value:{kind:"Variable",name:{kind:"Name",value:"isPublic"}}},{kind:"Argument",name:{kind:"Name",value:"oauthToken"},value:{kind:"Variable",name:{kind:"Name",value:"oauthToken"}}},{kind:"Argument",name:{kind:"Name",value:"tfaToken"},value:{kind:"Variable",name:{kind:"Name",value:"tfaToken"}}},{kind:"Argument",name:{kind:"Name",value:"userId"},value:{kind:"Variable",name:{kind:"Name",value:"userId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"amount"}},{kind:"Field",name:{kind:"Name",value:"currency"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}},{kind:"Field",name:{kind:"Name",value:"sendBy"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"balances"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"available"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"}},{kind:"Field",name:{kind:"Name",value:"currency"}}]}},{kind:"Field",name:{kind:"Name",value:"vault"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"amount"}},{kind:"Field",name:{kind:"Name",value:"currency"}}]}}]}}]}}]}}]}}]},Me=async t=>{try{const n=await le({doc:Pn,variables:{...t,amount:Number(t.amount)||0,isPublic:t.currency in Ve?!1:t.isPublic},load:{fetch}}),a=n==null?void 0:n.sendTip;if(a)return $.tipSent.open({currency:a.currency,amount:a.amount,name:a.user.name}),!0}catch(n){$.error.open({message:Se(n)})}return!1},Le=async t=>{try{if(!t)throw new Error;const n=await le({doc:qn,variables:{amount:Number(t.amount),chatId:t.chatId,currency:t.currency,userId:t.userId},load:{fetch}});if(n!=null&&n.sendTipEmailCode)return $.emailSent.open({email:Oe(ln)??""}),!0}catch(n){$.error.open({message:Se(n)})}return!1},En=async t=>{var a;const n=await le({doc:Ae,variables:{name:t},load:{fetch}});if(((a=n==null?void 0:n.user)==null?void 0:a.id)===void 0){$.userNotFound.open();return}return n.user},Ge=async t=>{const n=await En(t.name),a=Oe(be);if(!n)return;if(a===null){$.error.open({message:N.unknownError});return}return{...t,userId:n.id,chatId:a}},Be=(t,n)=>{const{minTipGetter:a,balancesGetter:e}=n;return De().shape({currency:rn().oneOf(Object.values(j)).required(),name:te().required(),amount:mn(()=>un().min(a().original,ge.min({min:a().converted})).max(e().original,ge.max({max:e().converted})).required()),isPublic:on(),...t.requiresTfa?{tfaToken:te().required().min(6).max(6)}:{},...t.hasOauth&&{oauthToken:te().required()}})};function Dn(t){let n,a;return n=new Ie({props:{loading:t[7],canFiatTip:t[4],hasOauth:t[5],enableTfaOnly:t[1],requiresTfa:t[3],currencyField:j[t[6]],name:t[2]}}),n.$on("min",t[25]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i[0]&128&&(l.loading=e[7]),i[0]&16&&(l.canFiatTip=e[4]),i[0]&32&&(l.hasOauth=e[5]),i[0]&2&&(l.enableTfaOnly=e[1]),i[0]&8&&(l.requiresTfa=e[3]),i[0]&64&&(l.currencyField=j[e[6]]),i[0]&4&&(l.name=e[2]),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function An(t){let n,a;return n=new pe({props:{disabled:t[7]||t[0],"data-test":"tip-form",$$slots:{default:[Dn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i[0]&129&&(l.disabled=e[7]||e[0]),i[0]&510|i[1]&2&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function In(t,n,a){let e,i,l,f,u,r,d,m,k,c;v(t,Ye,b=>a(20,l=b)),v(t,qe,b=>a(23,r=b));let{disabled:q}=n,{enableTfaOnly:C}=n,{initialCurrency:s}=n,{isPublic:o}=n,{amount:h}=n,{name:P}=n,{requiresTfa:E=!1}=n,{canFiatTip:D=!1}=n,{hasOauth:U=!1}=n;const Q=re();let{data:p,loading:z,refetch:Z}=Re.query({currency:s},{requestPolicy:"network-only"});v(t,p,b=>a(24,d=b)),v(t,z,b=>a(21,f=b));let ce={currency:s,name:P,amount:h,isPublic:o,...E&&{tfaToken:""},...U&&{oauthToken:""}};const Y=Be({hasOauth:U,requiresTfa:E},{minTipGetter:()=>({original:e,converted:c(e)}),balancesGetter:()=>k});let G;const{fields:B,isSubmitting:ae}=Te({initialValues:ce,validationSchema:Y,onSubmit:async b=>{if(a(19,G=await Ge(b)),!G)return;await Le(G)&&G&&Q("complete",G)}});v(t,ae,b=>a(22,u=b));const H=B.currency.value;v(t,H,b=>a(6,m=b));const ie=we({currency:H});v(t,ie,b=>a(27,c=b));const T=Ce({currency:H});v(t,T,b=>a(26,k=b));const de=()=>B.amount.value.set(String(e));return t.$$set=b=>{"disabled"in b&&a(0,q=b.disabled),"enableTfaOnly"in b&&a(1,C=b.enableTfaOnly),"initialCurrency"in b&&a(16,s=b.initialCurrency),"isPublic"in b&&a(17,o=b.isPublic),"amount"in b&&a(18,h=b.amount),"name"in b&&a(2,P=b.name),"requiresTfa"in b&&a(3,E=b.requiresTfa),"canFiatTip"in b&&a(4,D=b.canFiatTip),"hasOauth"in b&&a(5,U=b.hasOauth)},t.$$.update=()=>{t.$$.dirty[0]&64&&(B.amount.reset(),Z({currency:j[m]},{requestPolicy:"network-only"})),t.$$.dirty[0]&16777216&&a(8,e=Number(d==null?void 0:d.info.currency.tipMin.value)||0),t.$$.dirty[0]&8388608&&B.amount.reset(),t.$$.dirty[0]&6291456&&a(7,i=u||f),t.$$.dirty[0]&1572864&&(l==null?void 0:l.type)==="confirmCodeAlreadySent"&&Q("complete",G)},[q,C,P,E,D,U,m,i,e,p,z,B,ae,H,ie,T,s,o,h,G,l,f,u,r,d,de]}class Mn extends x{constructor(n){super(),ee(this,n,In,An,ne,{disabled:0,enableTfaOnly:1,initialCurrency:16,isPublic:17,amount:18,name:2,requiresTfa:3,canFiatTip:4,hasOauth:5},null,[-1,-1])}}function Ln(t){let n,a=t[2]._(N.code)+"",e;return{c(){n=ue("span"),e=I(a),this.h()},l(i){n=oe(i,"SPAN",{slot:!0});var l=me(n);e=M(l,a),l.forEach(y),this.h()},h(){se(n,"slot","label")},m(i,l){S(i,n,l),fe(n,e)},p(i,l){l&4&&a!==(a=i[2]._(N.code)+"")&&L(e,a)},d(i){i&&y(n)}}}function Gn(t){let n=t[2]._(N.submit)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&4&&n!==(n=e[2]._(N.submit)+"")&&L(a,n)},d(e){e&&y(a)}}}function Bn(t){let n=t[2]._(N.newCode)+"",a;return{c(){a=I(n)},l(e){a=M(e,n)},m(e,i){S(e,a,i)},p(e,i){i&4&&n!==(n=e[2]._(N.newCode)+"")&&L(a,n)},d(e){e&&y(a)}}}function Rn(t){let n,a,e,i,l,f;return n=new Pe({props:{autocomplete:"off","data-test":"email-code",name:"emailCode",required:!0,$$slots:{label:[Ln]},$$scope:{ctx:t}}}),e=new _e({props:{"data-test":"withdraw-complete",$$slots:{default:[Gn]},$$scope:{ctx:t}}}),l=new Ee({props:{align:"center",type:"button",variant:"subtle-link",disabled:t[3],$$slots:{default:[Bn]},$$scope:{ctx:t}}}),l.$on("click",t[5]),{c(){F(n.$$.fragment),a=J(),F(e.$$.fragment),i=J(),F(l.$$.fragment)},l(u){O(n.$$.fragment,u),a=K(u),O(e.$$.fragment,u),i=K(u),O(l.$$.fragment,u)},m(u,r){V(n,u,r),S(u,a,r),V(e,u,r),S(u,i,r),V(l,u,r),f=!0},p(u,r){const d={};r&516&&(d.$$scope={dirty:r,ctx:u}),n.$set(d);const m={};r&516&&(m.$$scope={dirty:r,ctx:u}),e.$set(m);const k={};r&8&&(k.disabled=u[3]),r&516&&(k.$$scope={dirty:r,ctx:u}),l.$set(k)},i(u){f||(_(n.$$.fragment,u),_(e.$$.fragment,u),_(l.$$.fragment,u),f=!0)},o(u){g(n.$$.fragment,u),g(e.$$.fragment,u),g(l.$$.fragment,u),f=!1},d(u){w(n,u),u&&y(a),w(e,u),u&&y(i),w(l,u)}}}function Un(t){let n,a;return n=new pe({props:{disabled:t[1],$$slots:{default:[Rn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,[i]){const l={};i&2&&(l.disabled=e[1]),i&527&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function jn(t,n,a){let e,i;v(t,ve,c=>a(2,e=c));let{tipValues:l}=n;const f=re(),u=De().shape({emailCode:te().length(6).required()});let r={emailCode:""};const{isSubmitting:d}=Te({initialValues:r,validationSchema:u,onSubmit:async c=>{try{await Me({...c,...l})&&f("complete")}catch(q){console.error(q)}}});v(t,d,c=>a(3,i=c));let m=!1;const k=async()=>{try{a(1,m=!0),await Le(l)}catch(c){console.error(c)}finally{a(1,m=!1)}};return t.$$set=c=>{"tipValues"in c&&a(0,l=c.tipValues)},[l,m,e,i,d,k]}class Qn extends x{constructor(n){super(),ee(this,n,jn,Un,ne,{tipValues:0})}}function zn(t){let n,a;return n=new Qn({props:{tipValues:t[9].values}}),n.$on("complete",t[11]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&512&&(l.tipValues=e[9].values),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Yn(t){let n,a;return n=new Mn({props:{disabled:t[0],requiresTfa:t[6],enableTfaOnly:t[1],initialCurrency:t[2],name:t[5],amount:t[4],isPublic:t[3],hasOauth:t[8],canFiatTip:t[7]}}),n.$on("complete",t[10]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.disabled=e[0]),i&64&&(l.requiresTfa=e[6]),i&2&&(l.enableTfaOnly=e[1]),i&4&&(l.initialCurrency=e[2]),i&32&&(l.name=e[5]),i&16&&(l.amount=e[4]),i&8&&(l.isPublic=e[3]),i&256&&(l.hasOauth=e[8]),i&128&&(l.canFiatTip=e[7]),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Hn(t){let n,a,e,i;const l=[Yn,zn],f=[];function u(r,d){return r[9].name==="tip"?0:r[9].name==="verification"?1:-1}return~(n=u(t))&&(a=f[n]=l[n](t)),{c(){a&&a.c(),e=R()},l(r){a&&a.l(r),e=R()},m(r,d){~n&&f[n].m(r,d),S(r,e,d),i=!0},p(r,[d]){let m=n;n=u(r),n===m?~n&&f[n].p(r,d):(a&&(W(),g(f[m],1,1,()=>{f[m]=null}),X()),~n?(a=f[n],a?a.p(r,d):(a=f[n]=l[n](r),a.c()),_(a,1),a.m(e.parentNode,e)):a=null)},i(r){i||(_(a),i=!0)},o(r){g(a),i=!1},d(r){~n&&f[n].d(r),r&&y(e)}}}function Jn(t,n,a){let{disabled:e}=n,{enableTfaOnly:i}=n,{initialCurrency:l}=n,{isPublic:f}=n,{amount:u}=n,{name:r}=n,{requiresTfa:d=!1}=n,{canFiatTip:m=!1}=n,{hasOauth:k=!1}=n,c={name:"tip"};const q=s=>{a(9,c={name:"verification",values:s.detail})};function C(s){ke.call(this,t,s)}return t.$$set=s=>{"disabled"in s&&a(0,e=s.disabled),"enableTfaOnly"in s&&a(1,i=s.enableTfaOnly),"initialCurrency"in s&&a(2,l=s.initialCurrency),"isPublic"in s&&a(3,f=s.isPublic),"amount"in s&&a(4,u=s.amount),"name"in s&&a(5,r=s.name),"requiresTfa"in s&&a(6,d=s.requiresTfa),"canFiatTip"in s&&a(7,m=s.canFiatTip),"hasOauth"in s&&a(8,k=s.hasOauth)},[e,i,l,f,u,r,d,m,k,c,q,C]}class Kn extends x{constructor(n){super(),ee(this,n,Jn,Hn,ne,{disabled:0,enableTfaOnly:1,initialCurrency:2,isPublic:3,amount:4,name:5,requiresTfa:6,canFiatTip:7,hasOauth:8})}}function Wn(t){let n,a;return n=new Ie({props:{loading:t[7],canFiatTip:t[4],hasOauth:t[5],enableTfaOnly:t[2],requiresTfa:t[3],name:t[0],currencyField:j[t[6]]}}),n.$on("min",t[23]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&128&&(l.loading=e[7]),i&16&&(l.canFiatTip=e[4]),i&32&&(l.hasOauth=e[5]),i&4&&(l.enableTfaOnly=e[2]),i&8&&(l.requiresTfa=e[3]),i&1&&(l.name=e[0]),i&64&&(l.currencyField=j[e[6]]),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Xn(t){let n,a;return n=new pe({props:{disabled:t[7]||t[1],"data-test":"tip-form",$$slots:{default:[Wn]},$$scope:{ctx:t}}}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,[i]){const l={};i&130&&(l.disabled=e[7]||e[1]),i&1073742333&&(l.$$scope={dirty:i,ctx:e}),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function Zn(t,n,a){let e,i,l,f,u,r,d,m,k;v(t,qe,T=>a(21,u=T));let{initialCurrency:c}=n,{amount:q="0"}=n,{name:C=""}=n,{disabled:s=!1}=n,{enableTfaOnly:o=!1}=n,{isPublic:h=!1}=n,{requiresTfa:P=!1}=n,{canFiatTip:E=!1}=n,{hasOauth:D=!1}=n;const U=re();let{data:Q,loading:p,refetch:z}=Re.query({currency:c},{requestPolicy:"network-only"});v(t,Q,T=>a(22,r=T)),v(t,p,T=>a(19,l=T));let Z={currency:c,name:C,amount:q,isPublic:h,...P&&{tfaToken:""},...D&&{oauthToken:""}};const ce=Be({hasOauth:D,requiresTfa:P},{minTipGetter:()=>({original:e,converted:k(e)}),balancesGetter:()=>m});let{fields:Y,isSubmitting:G}=Te({initialValues:Z,validationSchema:ce,onSubmit:async(T,{reset:de})=>{const b=await Ge(T);if(!b)return;await Me(b)&&(U("complete",b),de())}});v(t,G,T=>a(20,f=T));let B=Y.currency.value;v(t,B,T=>a(6,d=T));const ae=we({currency:B});v(t,ae,T=>a(25,k=T));const H=Ce({currency:B});v(t,H,T=>a(24,m=T));const ie=()=>Y.amount.value.set(String(e));return t.$$set=T=>{"initialCurrency"in T&&a(16,c=T.initialCurrency),"amount"in T&&a(17,q=T.amount),"name"in T&&a(0,C=T.name),"disabled"in T&&a(1,s=T.disabled),"enableTfaOnly"in T&&a(2,o=T.enableTfaOnly),"isPublic"in T&&a(18,h=T.isPublic),"requiresTfa"in T&&a(3,P=T.requiresTfa),"canFiatTip"in T&&a(4,E=T.canFiatTip),"hasOauth"in T&&a(5,D=T.hasOauth)},t.$$.update=()=>{t.$$.dirty&64&&(Y.amount.reset(),z({currency:j[d]},{requestPolicy:"network-only"})),t.$$.dirty&4194304&&a(8,e=Number(r==null?void 0:r.info.currency.tipMin.value)||0),t.$$.dirty&2097152&&Y.amount.reset(),t.$$.dirty&1572864&&a(7,i=f||l)},[C,s,o,P,E,D,d,i,e,Q,p,Y,G,B,ae,H,c,q,h,l,f,u,r,ie]}class $n extends x{constructor(n){super(),ee(this,n,Zn,Xn,ne,{initialCurrency:16,amount:17,name:0,disabled:1,enableTfaOnly:2,isPublic:18,requiresTfa:3,canFiatTip:4,hasOauth:5})}}function xn(t){let n,a;return n=new $n({props:{disabled:t[0],requiresTfa:t[8],enableTfaOnly:t[1],initialCurrency:t[2],name:t[5],amount:t[4],isPublic:t[3],canFiatTip:t[7],hasOauth:t[6].hasOauth}}),n.$on("complete",t[19]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.disabled=e[0]),i&256&&(l.requiresTfa=e[8]),i&2&&(l.enableTfaOnly=e[1]),i&4&&(l.initialCurrency=e[2]),i&32&&(l.name=e[5]),i&16&&(l.amount=e[4]),i&8&&(l.isPublic=e[3]),i&128&&(l.canFiatTip=e[7]),i&64&&(l.hasOauth=e[6].hasOauth),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function ea(t){let n,a;return n=new Kn({props:{disabled:t[0],enableTfaOnly:t[1],initialCurrency:t[2],isPublic:t[3],amount:t[4],name:t[5],requiresTfa:t[8],canFiatTip:t[7],hasOauth:t[6].hasOauth}}),n.$on("complete",t[18]),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p(e,i){const l={};i&1&&(l.disabled=e[0]),i&2&&(l.enableTfaOnly=e[1]),i&4&&(l.initialCurrency=e[2]),i&8&&(l.isPublic=e[3]),i&16&&(l.amount=e[4]),i&32&&(l.name=e[5]),i&256&&(l.requiresTfa=e[8]),i&128&&(l.canFiatTip=e[7]),i&64&&(l.hasOauth=e[6].hasOauth),n.$set(l)},i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function na(t){let n,a;return n=new We({}),{c(){F(n.$$.fragment)},l(e){O(n.$$.fragment,e)},m(e,i){V(n,e,i),a=!0},p:He,i(e){a||(_(n.$$.fragment,e),a=!0)},o(e){g(n.$$.fragment,e),a=!1},d(e){w(n,e)}}}function aa(t){let n,a,e,i;const l=[na,ea,xn],f=[];function u(r,d){return r[9]?0:!r[8]&&!r[6].hasOauth?1:2}return n=u(t),a=f[n]=l[n](t),{c(){a.c(),e=R()},l(r){a.l(r),e=R()},m(r,d){f[n].m(r,d),S(r,e,d),i=!0},p(r,[d]){let m=n;n=u(r),n===m?f[n].p(r,d):(W(),g(f[m],1,1,()=>{f[m]=null}),X(),a=f[n],a?a.p(r,d):(a=f[n]=l[n](r),a.c()),_(a,1),a.m(e.parentNode,e))},i(r){i||(_(a),i=!0)},o(r){g(a),i=!1},d(r){f[n].d(r),r&&y(e)}}}let ia=Fe(Ae);const Re=Fe(cn);function ta(t,n,a){let e,i,l,f,u,r,d,m,k;v(t,be,p=>a(15,r=p)),v(t,an,p=>a(16,d=p)),v(t,tn,p=>a(17,m=p));let{disabled:c=!1}=n,{enableTfaOnly:q=!1}=n,{initialCurrency:C=fn}=n,{isPublic:s=!1}=n,{amount:o="0"}=n,{name:h=""}=n;const{meta:P}=sn();v(t,P,p=>a(6,f=p));let{data:E,loading:D}=ia.query({},{requestPolicy:"network-only"});v(t,E,p=>a(14,u=p)),v(t,D,p=>a(9,k=p));function U(p){ke.call(this,t,p)}function Q(p){ke.call(this,t,p)}return t.$$set=p=>{"disabled"in p&&a(0,c=p.disabled),"enableTfaOnly"in p&&a(1,q=p.enableTfaOnly),"initialCurrency"in p&&a(2,C=p.initialCurrency),"isPublic"in p&&a(3,s=p.isPublic),"amount"in p&&a(4,o=p.amount),"name"in p&&a(5,h=p.name)},t.$$.update=()=>{var p,z,Z;t.$$.dirty&196608&&a(13,e=m||((p=d==null?void 0:d.publicChats)==null?void 0:p[0])),t.$$.dirty&40960&&!r&&e&&be.set(e.id),t.$$.dirty&16384&&a(8,i=((z=u==null?void 0:u.self)==null?void 0:z.hasTfaEnabled)&&!((Z=u==null?void 0:u.self)!=null&&Z.isTfaSessionValid)),t.$$.dirty&64&&a(7,l=f.roles.includes(Ke.fiatTip))},[c,q,C,s,o,h,f,l,i,k,P,E,D,e,u,r,d,m,U,Q]}class Aa extends x{constructor(n){super(),ee(this,n,ta,aa,ne,{disabled:0,enableTfaOnly:1,initialCurrency:2,isPublic:3,amount:4,name:5})}}export{Aa as S,Da as a,Ea as c};
