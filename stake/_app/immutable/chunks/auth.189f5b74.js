import{n as s,e as d}from"./index.36a91d4c.js";import{g as m}from"./utils.a61f0d73.js";import{U as r,a as u}from"./UserAuthenticatedSession.generated.7a0af0ae.js";import{g as c}from"./index.9181a536.js";import{f as l,m as k}from"./loadHelpers.abbaab45.js";const f={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"CompleteEnableUserTfa"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"enableTfaKey"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"sessionName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"completeEnableUserTfa"},arguments:[{kind:"Argument",name:{kind:"Name",value:"enableTfaKey"},value:{kind:"Variable",name:{kind:"Name",value:"enableTfaKey"}}},{kind:"Argument",name:{kind:"Name",value:"sessionName"},value:{kind:"Variable",name:{kind:"Name",value:"sessionName"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAuthenticatedSession"}}]}}]}},...r.definitions]},N={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"InfoRoles"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"info"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"roles"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"include"}},{kind:"Field",name:{kind:"Name",value:"exclude"}},{kind:"Field",name:{kind:"Name",value:"modify"}}]}}]}}]}}]},v={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"InitialUserRequest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAuth"}}]}}]}},...u.definitions]};async function g(n){var o,e,i;if(n.isAuthenticated){const[a,t]=await Promise.all([l({doc:v,variables:{},load:n}),l({doc:N,variables:{},load:n})]);return a!=null&&a.user&&((o=t==null?void 0:t.info)!=null&&o.roles)?{...a,includedRoles:c({infoRoles:((e=t==null?void 0:t.info)==null?void 0:e.roles)||[],userRoles:(i=a==null?void 0:a.user)==null?void 0:i.roles}).include}:null}return null}const D=async n=>{const o=e=>k(f,e);try{const e=await o({enableTfaKey:n,sessionName:m()}),i=e==null?void 0:e.completeEnableUserTfa;i&&s.next({type:"twoFactor",subtype:"enable",userAuthenticatedSession:{...i,session:{...i.session,user:{...i.session.user,hasTfaEnabled:!0}}}})}catch(e){e&&d.next({type:(e==null?void 0:e.errorType)||"errorExchange",error:e})}},F=n=>{s.next({type:"firstUserResponse",user:n})};export{N as I,D as e,F as i,g as l};
