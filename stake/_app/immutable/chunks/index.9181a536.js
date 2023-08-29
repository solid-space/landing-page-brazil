import{O as y}from"./index.36a91d4c.js";import{M as A,L as N,G as P}from"./index.03b5aaf0.js";import{l as r}from"./lodash.9552c526.js";import{i as T}from"./index.bda872f9.js";import{w as q}from"./index.d67a6375.js";const B=s=>s.reduce((e,o)=>({...e,[o.name]:o}),{}),b=(s,e)=>{const o=e[s].include||[],n=r.flatten(o.map(t=>b(t,e)));return[s,...n]},C=({userRoles:s,infoRoles:e})=>{const o=B(e),n=r.flatten(s.map(({name:a})=>b(a,o))),t=r.flatten(n.map(a=>o[a].exclude||[])),l=r.uniq(n.filter(a=>!t.includes(a))),i=r.uniq(r.flatten(l.map(a=>o[a].modify||[])));return{include:l,modify:i}},k=["frozen","banned","houseExcluded","suspended","abuser"],v=s=>{const e={isAuthenticated:!1,isReferred:!1,hasRole:!1,isMaxBetEnabled:!1,isSportsbookExcluded:!1,id:"",name:"",hasPassword:!1,hasEmailVerified:!1,roles:[],includedRoles:[],hasTfaEnabled:!1,hasOauth:!1,hasPhoneNumberVerified:!1};return(()=>{const n=q({...e,isAuthenticated:y(),...s||{}});return{...n,setUser:async t=>{var m,h;const{id:l,name:i,hasEmailVerified:a,intercomHash:R,isReferred:E,hasTfaEnabled:x,hasPassword:S,hasOauth:g,isMaxBetEnabled:w,isSportsbookExcluded:_,hasPhoneNumberVerified:U}=t,f=t.roles.map(c=>c.name),M=f.find(c=>!k.includes(c))!==void 0,O=(t==null?void 0:t.includedRoles)||C({infoRoles:((h=(m=P(T))==null?void 0:m.info)==null?void 0:h.roles)||[],userRoles:t==null?void 0:t.roles}).include,V={id:l,name:i,roles:f,hasRole:M,isReferred:E,includedRoles:O,intercomHash:R,hasPassword:S,hasEmailVerified:a,isAuthenticated:!0,hasTfaEnabled:x,hasOauth:g,isMaxBetEnabled:!!w,isSportsbookExcluded:_,hasPhoneNumberVerified:U};n.set(V)}}})()},p="__stores__meta",$=()=>{const e={meta:v()};return N(p,e),e},d=s=>{throw new Error(`Cannot ${s} session store before subscribing`)},u={subscribe:s=>{const e=G();return u.set=e.meta.set,u.setUser=e.meta.setUser,u.update=e.meta.update,e.meta.subscribe(s)},set:()=>d("set"),update:()=>d("update"),setUser:()=>d("update")},G=()=>A(p);export{G as a,$ as c,C as g,u as m};