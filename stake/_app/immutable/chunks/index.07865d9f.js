import{d as B,w as c}from"./index.d67a6375.js";import{A as u,x as p,o as v}from"./index.36a91d4c.js";import{M as f}from"./MyBetList.generated.ce8df499.js";import{b as h}from"./index.1eae4dfb.js";import{f as y}from"./loadHelpers.abbaab45.js";import{G as n}from"./index.03b5aaf0.js";const G=(()=>{const a=c([]),o=c([]),r=c([]),l=B([o,a],([s,t])=>s.filter(e=>t.includes(e.id)===!1)),d=s=>{s.bet.__typename!=="SportBet"&&h.addStat(u(s)),o.update(t=>t.some(i=>i.id===s.id)?t:[s,...t].slice(0,50))},m=s=>{const t=n(a),e=t.find(i=>i.id===s);a.set(t.filter(i=>i.id!==s)),e?(d(e),r.set(n(r).filter(i=>i!==s))):r.update(i=>[...i,s])};return{...l,rawBetList:o,addActiveBet:s=>{const t=n(r).includes(s.id);a.update(e=>[...e,s]),t&&m(s.id)},removeActiveBet:m,addBetToRawBetList:d,load:async({load:s,isAuthenticated:t})=>{if(t)try{const e=await y({doc:f,variables:{limit:50},load:s});return p&&e!=null&&e.user&&o.set(e==null?void 0:e.user.houseBetList),e}catch{Promise.resolve()}else Promise.resolve()},init:async()=>{var e,i;const t=await v().query(f,{limit:50}).toPromise();(e=t==null?void 0:t.data)!=null&&e.user&&o.set((i=t==null?void 0:t.data)==null?void 0:i.user.houseBetList)}}})();export{G as m};