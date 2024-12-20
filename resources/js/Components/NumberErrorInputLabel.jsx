import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

export default function NumberErrorInputLabel({name = "", value, icon, disabled = false, 
  error = "", placeholder = "", 
  label, required = false, className = "", divClassName = "", 
  onChange = () => {}}){
  return (
    <div className={divClassName}>
      <InputLabel htmlFor={name} value={label} />
      <TextInput
        name={name}
        value={value}
        prefixIcon={icon}
        className={"mt-1 block w-full input-field " + className}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        type="number"
        max="5"
        min="1"
      />
      <InputError message={error} className="mt-2" />
    </div>
  );
}