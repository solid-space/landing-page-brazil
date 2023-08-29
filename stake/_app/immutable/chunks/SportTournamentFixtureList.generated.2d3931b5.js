import{T as e}from"./TournamentTree.generated.b1800a68.js";import{F as n,S as a}from"./SportGroupTemplates.generated.3a0ebe57.js";const d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"SportTournamentFixtureList"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"sport"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"groups"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"tournamentLimit"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},defaultValue:{kind:"IntValue",value:"25"}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"fixtureCountLimit"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}},defaultValue:{kind:"IntValue",value:"20"}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"SportSearchEnum"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"slugSport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"sport"},value:{kind:"Variable",name:{kind:"Name",value:"sport"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"templates"},arguments:[{kind:"Argument",name:{kind:"Name",value:"group"},value:{kind:"Variable",name:{kind:"Name",value:"groups"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"extId"}}]}},{kind:"Field",name:{kind:"Name",value:"tournamentList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"Variable",name:{kind:"Name",value:"tournamentLimit"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TournamentTree"}},{kind:"Field",name:{kind:"Name",value:"fixtureCount"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}}]},{kind:"Field",name:{kind:"Name",value:"fixtureList"},arguments:[{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"Variable",name:{kind:"Name",value:"fixtureCountLimit"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FixturePreview"}},{kind:"Field",name:{kind:"Name",value:"groups"},arguments:[{kind:"Argument",name:{kind:"Name",value:"groups"},value:{kind:"ListValue",values:[{kind:"Variable",name:{kind:"Name",value:"groups"}}]}},{kind:"Argument",name:{kind:"Name",value:"status"},value:{kind:"ListValue",values:[{kind:"EnumValue",value:"active"},{kind:"EnumValue",value:"suspended"},{kind:"EnumValue",value:"deactivated"}]}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportGroupTemplates"}}]}}]}}]}}]}}]}},...e.definitions,...n.definitions,...a.definitions]};export{d as S};
