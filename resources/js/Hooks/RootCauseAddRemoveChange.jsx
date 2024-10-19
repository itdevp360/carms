export function RootCauseAddRemoveChange(data, setData, category){
  const handleValueChange = (index, event) => {
    const values = [...(data.root_cause_analysis[category.name] || [])];
    values[index].value = event.target.value;
    setData("root_cause_analysis", { ...data.root_cause_analysis, [category.name]: values });
  };

  const handleAddField = () => {
    const newFields = [...(data.root_cause_analysis[category.name] || []), { value: "" }];
    setData("root_cause_analysis", { ...data.root_cause_analysis, [category.name]: newFields });
  };

  const handleRemoveField = (index) => {
    const newFields = (data.root_cause_analysis[category.name] || []).filter((_, i) => i !== index);
    setData("root_cause_analysis", { ...data.root_cause_analysis, [category.name]: newFields });
  };
  return {handleValueChange, handleAddField, handleRemoveField}
}