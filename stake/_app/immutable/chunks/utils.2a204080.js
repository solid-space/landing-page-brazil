import{t}from"./currencies.bbaf1c4b.js";import{i as e}from"./index.b135e261.js";const a={cancelled:e._("Cancelled"),active:e._("Active"),cashout:e._("Cashed Out"),pending:e._("Pending"),rejected:e._("Rejected"),tie:e._("Void"),loss:e._("Loss"),win:e._("Win"),halfLoss:e._("Half Loss"),halfWin:e._("Half Win"),settled:e._("Settled"),adjusted:e._("Adjusted")},d=s=>{var n,i;if(((n=s==null?void 0:s.adjustments)==null?void 0:n.length)>0)return"adjusted";if(((i=s==null?void 0:s.outcomes)==null?void 0:i.length)===1){const[r]=s.outcomes;if(Math.round((1-(s==null?void 0:s.payoutMultiplier))/(1-r.odds)*10)===5)return"halfWin";if((s==null?void 0:s.payoutMultiplier)===.5)return"halfLoss"}return(s==null?void 0:s.payoutMultiplier)>1?"win":(s==null?void 0:s.payoutMultiplier)===1?"tie":"loss"},l=s=>{const n=d(s);return{win:{message:a.win,variant:"success"},halfWin:{message:a.halfWin,variant:"success"},tie:{message:a.tie,variant:"light"},loss:{message:a.loss,variant:"light"},halfLoss:{message:a.halfLoss,variant:"light"},adjusted:{message:a.adjusted,variant:"light"}}[n]},u={[t.cancelled]:()=>({message:a.cancelled,variant:"default"}),[t.cashout]:()=>({message:a.cashout,variant:"success"}),[t.rejected]:()=>({message:a.rejected,variant:"default"}),[t.rejectedOddsChanged]:()=>({message:a.rejected,variant:"default"}),[t.rejectedBetLimitExceeded]:()=>({message:a.rejected,variant:"default"}),[t.settled]:l,[t.settledManual]:l},f=s=>u[s.status]?u[s.status](s):null;export{f as a,d as g};
