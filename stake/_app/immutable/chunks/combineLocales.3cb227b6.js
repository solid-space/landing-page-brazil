const l="__i18n";function t({original:s,fallback:e}){const a=s.map(({_id:n})=>n.split(l)[0]),c=e.filter(({_id:n})=>n.includes(l)===!1&&a.includes(n)===!1);return[...s,...c]}export{t as c};
