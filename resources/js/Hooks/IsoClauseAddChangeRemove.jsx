export function IsoClauseAddChangeRemove(data, setData, codetables) {
  const handleAddGroup = () => {
    setData('groups',
       [...data.groups, 
        {reference: "", 
          isoClauses:[{
            clause: "", 
            subClause: ''
          }]
        },
      ]
    );
  }
  
  const handleRemoveGroup = (index) => {
    const newGroups = [...data.groups];
    newGroups.splice(index, 1);
    setData('groups', newGroups);
  }

  const handleReferenceChange = (index, value) => {
    const newGroups = [...data.groups];
    newGroups[index].reference = value;
    setData('groups', newGroups);
  }

  const handleAddIsoClause = (groupIndex) => {
    const newGroups = [...data.groups];
    newGroups[groupIndex].isoClauses.push({clause: "", subClause: ''});
    setData('groups', newGroups);
  }

  const handleRemoveIsoClause = (groupIndex, clauseIndex) => {
    const newGroups = [...data.groups];
    newGroups[groupIndex].isoClauses.splice(clauseIndex, 1);
    setData('groups', newGroups);
  }

  const handleClauseChange = (groupIndex, clauseIndex, field, value) => {
    const newGroups = [...data.groups];
    newGroups[groupIndex].isoClauses[clauseIndex][field] = value;
    setData('groups', newGroups);
    if(field === 'clause'){
      const reference = newGroups[groupIndex].reference;
      const isoClause = value;
      
      const isoReference = "SUB CLAUSE " + reference;
      const clauseSplit = isoClause.match(/^(Clause \d+)/);
      const isoClauseValue = isoClause && ("Sub " + clauseSplit[0]);

      const isoSubClauseOptions = codetables.data
        .filter(item => item.codename === isoReference && item.codevalue === isoClauseValue)
        .sort((a, b) => a.id - b.id);

      newGroups[groupIndex].isoClauses[clauseIndex].subClauseOptions = isoSubClauseOptions;
      setData('groups', newGroups);
    }
  }
  return {
    handleAddGroup,
    handleRemoveGroup,
    handleReferenceChange,  
    handleAddIsoClause,
    handleRemoveIsoClause,
    handleClauseChange
  }
}