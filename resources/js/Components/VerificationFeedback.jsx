import { FaComments } from "react-icons/fa6";
import InputLabel from "./InputLabel";
import TextareaInput from "./TextareaInput";

export default function VerificationFeedback({name = "", label = "", value, onChange = ()=>{}, onClick = ()=>{}, buttonClassName = "", form, className}){
  return (
    <>
      <div className="mt-2">
        <InputLabel htmlFor={name} value={`Feedback in ${label}`} />
        <TextareaInput
          name={name}
          value={value}
          onChange={onChange}
          prefixIcon={<FaComments size={18} className={`items-center ${(form.verification.at(-1).status !== "Review" && form.verification.at(-1).status !== "Revised") && "text-gray-700"}`} />}
          className={`mt-1 block w-full input-field ${(form.verification.at(-1).status !== "Review" && form.verification.at(-1).status !== "Revised") && "bg-red-200 text-red-700"} ` + className}
          disabled={form.verification.at(-1).status !== "Review" && form.verification.at(-1).status !== "Revised"}
        ></TextareaInput>
      </div>
      {(
          form.verification.at(-1).status === "Review" || 
          form.verification.at(-1).status === "Revised") && (
        <div className="grid gap-1 grid-cols-12 mt-4 flex items-end">
          <span 
            onClick={onClick}
            className={`flex items-center justify-center cursor-pointer py-2 rounded bg-red-500 mb-2 hover:bg-red-600 ` + buttonClassName}>
            Delete
          </span>
        </div>
      )}
    </>
  );
}