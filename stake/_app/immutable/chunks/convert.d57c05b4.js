import{d as i}from"./index.d67a6375.js";import{b}from"./index.9c4fa75d.js";import{v as f,i as m,b as p,c as v}from"./index.9cf5ab9b.js";import{f as d}from"./currencies.bbaf1c4b.js";const y=({currency:r})=>i([p,r],([e,t])=>m(e,t)==="crypto"?t:e),C=({currency:r})=>i([p,r,v],([e,t,a])=>{var o,c;return((c=(o=a==null?void 0:a.rates)==null?void 0:o[t])==null?void 0:c[m(e,t)])||0}),l=({currency:r,formatFiat:e=d})=>{const t=y({currency:r}),a=C({currency:r});return i([f,t,a],([o,c,n])=>s=>o==="crypto"?s:Number(e(s*n,c)))},R=({currency:r,balanceType:e="available"})=>{const t=l({currency:r});return i([b,r,t],([a,o,c])=>{const n=a[o][e],s=c(n);return{original:n,converted:s}})};export{R as a,y as b,l as c};