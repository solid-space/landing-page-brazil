import{w as i}from"./index.d67a6375.js";import{a as m}from"./index.9cf5ab9b.js";import{G as p}from"./index.03b5aaf0.js";import{e as E}from"./index.d274af24.js";const c={wagered:0,profit:0,bets:0,wins:0,losses:0,luck:1,payoutMultiplierSum:0,profitHistory:[0],currency:E,game:"",gamesHistory:{}},G=.01,M=({gamesHistory:t,newBet:r,totalProfit:s})=>{const o={luck:t[r.game].luck+r.payoutMultiplier,wagered:t[r.game].wagered+r.amount,profit:t[r.game].profit+r.profit,bets:t[r.game].bets+1,wins:t[r.game].wins+(r.betStatus==="win"?1:0),losses:t[r.game].losses+(r.betStatus==="lose"?1:0),profitHistory:[...t[r.game].profitHistory,s],currency:r.currency,game:r.game};return{...t,[r.game]:o}},D=({gamesHistory:t,newBet:r,totalProfit:s})=>{const o={luck:r.payoutMultiplier,wagered:r.amount,profit:r.profit,bets:1,wins:r.betStatus==="win"?1:0,losses:r.betStatus==="lose"?1:0,profitHistory:[0,s],currency:r.currency,game:r.game};return{...t,[r.game]:o}},k=({newBet:t,prevData:r})=>{const s=r.currency===(t==null?void 0:t.currency)?r:{...c,currency:p(m)},{wagered:o,profit:y,bets:l,wins:g,losses:n,profitHistory:f,payoutMultiplierSum:d,gamesHistory:u}=s,a=y+t.profit,b=[...f,a],e=d+t.payoutMultiplier,S=e/(l+1)/(1-G),H=t.game in u?M({newBet:t,gamesHistory:u,totalProfit:a}):D({newBet:t,gamesHistory:u,totalProfit:a});return{...s,luck:S,wagered:o+t.amount,profit:a,bets:l+1,wins:g+(t.betStatus==="win"?1:0),losses:n+(t.betStatus==="lose"?1:0),payoutMultiplierSum:e,profitHistory:b,currency:t.currency,game:t.game,gamesHistory:H}},_=i("all"),P=(()=>{const t=i("hide");return{...t,hide:()=>t.set("hide")}})(),A=(()=>{const t=i(c);return{...t,addStat:r=>{t.update(s=>k({newBet:r,prevData:s}))}}})(),R=i(null),v=()=>{A.set({...c,gamesHistory:{},currency:p(m)}),_.set("all")};export{A as b,_ as g,v as r,R as s,P as v};