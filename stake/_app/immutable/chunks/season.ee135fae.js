var g=(t=>(t.none="none",t.xmas="xmas",t.halloween="halloween",t.birthday="birthday",t.primediceBirthday="primediceBirthday",t.thanksgiving="thanksgiving",t))(g||{});const f=()=>{const t=new Date,r=new Date(t.getFullYear(),0,0),i=t.getTime()-r.getTime()+(r.getTimezoneOffset()-t.getTimezoneOffset())*60*1e3,n=1e3*60*60*24,e=Math.floor(i/n);return e===221?"birthday":e>=302&&e<=306?"halloween":e>=327&&e<=329?"thanksgiving":e>=346&&e<=364?"xmas":"none"},h=f();function o(t){return(t==null?void 0:t[h])||(t==null?void 0:t.none)}export{g as S,o as a,f as g};