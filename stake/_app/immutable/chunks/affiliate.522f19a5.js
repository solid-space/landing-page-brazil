import{T as d,o as l}from"./index.36a91d4c.js";import{g as n}from"./index.d274af24.js";const r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"TrackCampaignHit"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"trackCampaignHit"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}}]}]}}]},i=d.namespace("affiliate"),u=async(e,a)=>{const t=l(),o=i.has("code")?Date.now()>i.get("code").expiry:!1,c=!(k()===e)&&!o,s=Date.now()+n*15;i.set("code",{code:e,expiry:s}),m(a),c&&await t.mutation(r,{code:e}).toPromise()},m=async e=>{if(!e){i.set("clickId",{clickId:void 0});return}const a=Date.now()+n*15;i.set("clickId",{clickId:e,expiry:a})},k=()=>{var e;return i.has("code")?(e=i.get("code"))==null?void 0:e.code:void 0},v=()=>{var e;return i.has("clickId")?(e=i.get("clickId"))==null?void 0:e.clickId:void 0};export{v as a,k as g,u as r};