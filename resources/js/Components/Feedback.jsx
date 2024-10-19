import { FaComments } from "react-icons/fa6";
import InputLabel from "./InputLabel";
import TextareaInput from "./TextareaInput";

export default function Feedback({name = "", label = "", value, onChange = ()=>{}, onClick = ()=>{}, buttonClassName = "", form, className}){
  return (
    <>
      <div className="mt-2">
        <InputLabel htmlFor={name} value={`Feedback in ${label}`} />
        <TextareaInput
          name={name}
          value={value}
          onChange={onChange}
          prefixIcon={<FaComments size={18} className={`items-center ${(form.status !== "Manager's Review" && form.status !== "Revised" && form.status !== "Approver's Review" && form.status !== "Approver's Revised") && "text-gray-700"}`} />}
          className={`mt-1 block w-full input-field ${(form.status !== "Manager's Review" && form.status !== "Revised" && form.status !== "Approver's Review" && form.status !== "Approver's Revised") && "bg-red-200 text-red-700"} ` + className}
          disabled={form.status !== "Manager's Review" && form.status !== "Revised" && form.status !== "Approver's Review" && form.status !== "Approver's Revised"}
        ></TextareaInput>
      </div>
      {(
          form.status === "Manager's Review" || 
          form.status === "Revised" || 
          form.status === "Approver's Review" || 
          form.status === "Approver's Revised") && (
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