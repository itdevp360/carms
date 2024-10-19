import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextareaInput from "./TextareaInput";

export default function TextAreaErrorInputLabel({name, value, icon, disabled = false, 
  error = "", placeholder = "", 
  label, required = false, className = "", divClassName, onChange = () => {}}){
  return (
    <div className={divClassName}>
      <InputLabel htmlFor={name} value={label} />
      <TextareaInput
        name={name}
        value={value}
        prefixIcon={icon}
        className={"mt-1 block w-full input-field " + className}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      <InputError message={error} className="mt-2" />
    </div>
  );
}