import{w as d}from"./index.d67a6375.js";import{f as l}from"./loadHelpers.abbaab45.js";import{G as u}from"./index.03b5aaf0.js";function i(r){return async({cache:t,combine:n,load:s,variables:o})=>{r.store.update(e=>({...e,error:null,loading:!0}));try{const e=await l({doc:r.document,variables:{...r.previousVariables,...o},load:s,cache:t});if(e){const a=n(u(r.store).data,e);return r.store.update(c=>({...c,error:null,data:a})),a}else return r.store.update(a=>({...a,error:"Failed to fetch from server"})),null}catch{return null}finally{r.store.update(e=>({...e,loading:!1}))}}}function p(r){return async(t,n,s)=>{r.store.update(o=>({...o,error:null,loading:!0}));try{const o=await l({doc:r.document,variables:n,load:t,cache:s});r.previousVariables=n;const e=o;return r.store.update(a=>({...a,error:null,data:e})),e}catch(o){return r.store.update(e=>({...e,error:o})),null}finally{r.store.update(o=>({...o,loading:!1}))}}}function g(r){const t=d({loading:!1,error:null,data:null}),n={store:t,document:r,previousVariables:{}},s=i(n),o=p(n);return{...t,loadMore:s,fetch:o}}export{g as m};
