const e={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Announcement"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Announcement"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"message"}},{kind:"Field",name:{kind:"Name",value:"colour"}},{kind:"Field",name:{kind:"Name",value:"location"}},{kind:"Field",name:{kind:"Name",value:"expired"}},{kind:"Field",name:{kind:"Name",value:"startTime"}},{kind:"Field",name:{kind:"Name",value:"endTime"}}]}}]},n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"CurrentAnnouncements"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"currentAnnouncements"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Announcement"}}]}}]}},...e.definitions]};export{e as A,n as C};
