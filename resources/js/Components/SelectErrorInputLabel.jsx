import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";

export default function SelectErrorInputLabel({name = "", value, icon, disabled = false, 
  error = "", placeholder = "", 
  label, required = false, className = "", divClassName = "", 
  onChange = () => {}, children}){
  return (
    <div className={divClassName}>
      <InputLabel htmlFor={name} value={label} />
      <SelectInput
        name={name}
        value={value}
        prefixIcon={icon}
        className={"mt-1 block w-full input-field " + className}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      >
        {children}
      </SelectInput>
      <InputError message={error} className="mt-2" />
    </div>
  );
}