function r(){const t=new Set;return{getSubscriptions:()=>t,next:e=>{t.forEach(n=>{n(e)})},subscribe:e=>(t.add(e),function(){t.delete(e)})}}export{r as c};
