import Checkbox from "../Checkbox";

export default function CheckboxLabel({name, label, isChecked, handleCheckboxChange}){
  return(
    <label className="flex items-center justify-center">
      <Checkbox
        name={name}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="ms-2 text-gray-600">{label}</span>
    </label>
  );
}