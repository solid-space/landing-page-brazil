import{c as m}from"./get.2b2397e6.js";import{w as l}from"./index.d67a6375.js";const d=m(`
* [_type == "hero" 
    && __i18n_lang == $lang
    && isDisplayed != false
    && references(*[_type == 'category' && slug.current == $category]._id)
    && (dateRange.start == null || dateTime(now()) >= dateTime(dateRange.start))
    && (dateRange.end == null || dateTime(now()) <= dateTime(dateRange.end))
    && !(_id in path("drafts.**"))] | order(orderRank)
    {
        ...,
        'backgroundImage': {
            'asset': backgroundImage.asset->{url, altText}
        },
        'tag': {
            'name': tag->name,
            'icon': tag->icon
        }
    }
`),p=m(`
* [_type == "hero" 
    && __i18n_lang == "en"
    && isDisplayed != false
    && !($lang in __i18n_refs[]._key)
    && references(*[_type == 'category' && slug.current == $category]._id)
    && (dateRange.start == null || dateTime(now()) >= dateTime(dateRange.start))
    && (dateRange.end == null || dateTime(now()) <= dateTime(dateRange.end))
    && !(_id in path("drafts.**"))] | order(orderRank)
    {
        ...,
        'backgroundImage': {
            'asset': backgroundImage.asset->{url, altText}
        },
        'tag': {
            'name': tag->name,
            'icon': tag->icon
        }
    }
`),u=l([]),y=e=>{const r=e.split("?")[1];return new URLSearchParams(r).get("type")},h=e=>{const r=e.reduce((n,a)=>{var s;const c=y(((s=a==null?void 0:a.buttonLink)==null?void 0:s.href)||"");return c==="race"||c==="giveaway"?n.map(t=>{var i,o,g;return t.type===c?{...t,imgUrl:((o=(i=a.backgroundImage)==null?void 0:i.asset)==null?void 0:o.url)||"",promoUrl:((g=a.link)==null?void 0:g.href)||""}:t}):n},[{type:"race",imgUrl:"",promoUrl:""},{type:"giveaway",imgUrl:"",promoUrl:""}]);u.set(r)},k=async(e,r)=>{var s;const n=d(e,{category:r}).then(t=>t??[]).catch(()=>[]),a=p(e,{category:r}).then(t=>t??[]).catch(()=>[]);return await Promise.all([n,(s=e==null?void 0:e.parent)==null?void 0:s.call(e).then(t=>t.session.locale!=="en"?a:[])]).then(([t,i])=>{const o=t.concat(i);return h(o),o})};export{k as l,u as p};
