import{d as e,b as n,c as a,T as i,e as t,E as d,a as m,S as r}from"./EsportFixtureEventStatus.generated.31aefc25.js";import{S as l,a as o}from"./SportGroupTemplate.generated.de9eee3b.js";const s={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FixturePreview"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SportFixture"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"FragmentSpread",name:{kind:"Name",value:"SportFixtureLiveStreamExists"}},{kind:"Field",name:{kind:"Name",value:"status"}},{kind:"Field",name:{kind:"Name",value:"slug"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"provider"}},{kind:"Field",name:{kind:"Name",value:"marketCount"},arguments:[{kind:"Argument",name:{kind:"Name",value:"status"},value:{kind:"ListValue",values:[{kind:"EnumValue",value:"active"},{kind:"EnumValue",value:"suspended"}]}}]},{kind:"Field",name:{kind:"Name",value:"extId"}},{kind:"Field",name:{kind:"Name",value:"liveWidgetUrl"}},{kind:"Field",name:{kind:"Name",value:"widgetUrl"}},{kind:"Field",name:{kind:"Name",value:"data"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"__typename"}},{kind:"FragmentSpread",name:{kind:"Name",value:"SportFixtureDataMatch"}},{kind:"FragmentSpread",name:{kind:"Name",value:"SportFixtureDataOutright"}}]}},{kind:"Field",name:{kind:"Name",value:"tournament"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TournamentTreeNested"}}]}},{kind:"Field",name:{kind:"Name",value:"eventStatus"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportFixtureEventStatus"}},{kind:"FragmentSpread",name:{kind:"Name",value:"EsportFixtureEventStatus"}}]}}]}},...e.definitions,...n.definitions,...a.definitions,...i.definitions,...t.definitions,...d.definitions]},S={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SportGroupTemplates"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SportGroup"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportGroup"}},{kind:"Field",name:{kind:"Name",value:"templates"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"3"}},{kind:"Argument",name:{kind:"Name",value:"includeEmpty"},value:{kind:"BooleanValue",value:!0}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportGroupTemplate"}},{kind:"Field",name:{kind:"Name",value:"markets"},arguments:[{kind:"Argument",name:{kind:"Name",value:"limit"},value:{kind:"IntValue",value:"1"}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportMarket"}},{kind:"Field",name:{kind:"Name",value:"outcomes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SportMarketOutcome"}}]}}]}}]}}]}},...l.definitions,...o.definitions,...m.definitions,...r.definitions]};export{s as F,S};
