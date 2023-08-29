import{K as u}from"./KuratorCollection.generated.fd7727c5.js";import{c as o}from"./get.2b2397e6.js";import{f as a}from"./loadHelpers.abbaab45.js";import{d as t}from"./index.d67a6375.js";import{p as d}from"./stores.53eae6ef.js";const r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"FixtureCount"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"SportSearchEnum"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"fixtureCount"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}}]}]}}]},c={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"PromotionMeta"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"isAuthenticated"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}},defaultValue:{kind:"BooleanValue",value:!1}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"activeRaffles"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"linkText"}},{kind:"Field",name:{kind:"Name",value:"linkUrl"}},{kind:"Field",name:{kind:"Name",value:"raffleUser"},directives:[{kind:"Directive",name:{kind:"Name",value:"include"},arguments:[{kind:"Argument",name:{kind:"Name",value:"if"},value:{kind:"Variable",name:{kind:"Name",value:"isAuthenticated"}}}]}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ticketCount"}}]}}]}},{kind:"Field",name:{kind:"Name",value:"activeRaces"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"linkText"}},{kind:"Field",name:{kind:"Name",value:"linkUrl"}},{kind:"Field",name:{kind:"Name",value:"status"}},{kind:"Field",name:{kind:"Name",value:"userPosition"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"position"}}]}}]}}]}}]},v={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"SportSidebar"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sportList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"100"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"type"}}]}},{kind:"Field",name:{kind:"Name",value:"tournamentList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"5"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"category"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"sport"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}}]}}]}}]}}]},p={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"TopSportSidebar"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NamedType",name:{kind:"Name",value:"SportSearchEnum"}},defaultValue:{kind:"EnumValue",value:"popular"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sportList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"5"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"tournamentList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"3"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"category"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"countryCode"}},{kind:"Field",name:{kind:"Name",value:"slug"}}]}}]}}]}}]}}]},S=o(`
  *[_type == 'sponsorship'
    && (((!defined(i18n_lang) && __i18n_lang == $lang) || i18n_lang == $lang)) 
    && isDisplayed != false
    && !(_id in path("drafts.**"))] | order(orderRank) {
      _id,
      title,
      slug {
        current
      },
      icon
    }
`),N=o(`
  *[_type == 'sponsorship'
    && (((!defined(i18n_lang) && __i18n_lang == "en") || i18n_lang == "en")) 
    && isDisplayed != false
    && !($lang in __i18n_refs[]._key)
    && !(_id in path("drafts.**"))] | order(orderRank) {
      _id,
      title,
      slug {
        current
      },
      icon
    }
`),h=t([d],([e])=>{var n,i;return((i=(n=e.data)==null?void 0:n.leftSidebar)==null?void 0:i.sportSidebar)||null}),_=e=>a({doc:v,load:e,variables:{}}),D=t([d],([e])=>{var n,i;return((i=(n=e.data)==null?void 0:n.leftSidebar)==null?void 0:i.topSportSidebar)||null}),V=e=>a({doc:p,load:e,variables:{}}),L=t([d],([e])=>{var n,i;return((i=(n=e.data)==null?void 0:n.leftSidebar)==null?void 0:i.fixtureCount)||null}),x=(e,n)=>a({load:e,variables:n,doc:r}),A=t([d],([e])=>{var n,i;return((i=(n=e.data)==null?void 0:n.leftSidebar)==null?void 0:i.casinoLinks)||null}),C=(e,n)=>a({doc:u,variables:n,load:e}),T=t([d],([e])=>{var n,i;return((i=(n=e.data)==null?void 0:n.leftSidebar)==null?void 0:i.promotion)||null}),q=(e,n)=>a({doc:c,load:e,variables:n}),I=async e=>{var n;try{const i=S(e,{}).then(l=>l??[]).catch(()=>[]),m=N(e,{}).then(l=>l??[]).catch(()=>[]),[k,s]=await Promise.all([i,((n=e.data)==null?void 0:n.session.locale)!=="en"?m:[]]);return k.concat(s)}catch{return[]}};export{A as a,T as b,C as c,L as d,D as e,x as f,h as g,I as l,q as p,_ as s,V as t};
