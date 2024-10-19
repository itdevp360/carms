import AddFeedback from "@/Components/AddFeedback";
import Checkbox from "@/Components/Checkbox";
import Feedback from "@/Components/Feedback";
import InputError from "@/Components/InputError";
import TextareaInput from "@/Components/TextareaInput";
import { categories } from "@/constant";
import { RootCauseAddRemoveChange } from "@/Hooks/RootCauseAddRemoveChange";
import { FaCircleQuestion } from "react-icons/fa6";

const managerRevised = "Manager's Revised";
const approverRevised = "Approver's Revised";
const approverReview = "Approver's Review";
const managerReview = "Manager's Review";
const revision = "Revision";

function RootCauseCategoryFieldsLayout({category, data, setData, errors, form, openFeedback}){
  const {handleValueChange, handleAddField, handleRemoveField} = RootCauseAddRemoveChange(data, setData, category);
  return (
    <div className="mt-4">
      <p className="text-base font-bold">{category.label}</p>
      {data.root_cause_analysis[category.name].map((field, index) => (
        <div key={index} className="grid gap-20 grid-cols-12">
          <div className={`${(
            form.status === "For Submission" || 
            form.status === "Draft") 
              ? "col-span-11" 
              : (form.status === revision && !openFeedback.feedback_root_cause_analysis) ||
                  form.status === managerReview || 
                  form.status === managerRevised || 
                  form.status === approverReview || 
                  form.status === approverRevised
                ? "col-span-12" 
                : "col-span-11"}`}>
            <TextareaInput
              name={`${category.name}_${index}`}
              value={field.value}
              prefixIcon={<FaCircleQuestion size={18} className="items-center" />}
              className={`mt-1 block w-full input-field 
                ${(form.status === managerReview || 
                  form.status === managerRevised || 
                  form.status === approverReview || 
                  form.status === approverRevised) && "bg-[#f4f4f4]"} 
                ${(form.status === revision && !openFeedback.feedback_root_cause_analysis) && "bg-[#f4f4f4]"}`}
              disabled={
                (form.status === managerReview || form.status === managerRevised) || 
                (form.status === revision && !openFeedback.feedback_root_cause_analysis) || 
                form.status === approverReview || 
                form.status === approverRevised}
              onChange={(e) => handleValueChange(index, e)}
              required={data.status !== "Draft" && form.source !== "Request For Action"}
            />
            <InputError message={errors[`${category.name}Fields`]} className="mt-2" />
          </div>
          {(form.status === "For Submission" || form.status === "Draft" || (form.status === revision && openFeedback.feedback_root_cause_analysis))&&(
            <div className="flex items-center justify-end">
              <span onClick={() => handleRemoveField(index)} className="rounded bg-red-600 hover:bg-red-700 text-white px-3 py-2 cursor-pointer">
                Delete
              </span>
            </div>
          )}
        </div>
      ))}
      {((form.status === "For Submission" && form.status === "Draft") || (form.status === revision && openFeedback.feedback_root_cause_analysis)) && (
        <div className="mt-4">
          <span onClick={handleAddField} className="rounded bg-[#ffaf54d6] hover:bg-[#f99d35d6] px-6 py-2 cursor-pointer">
            Add
          </span>
        </div>
      )}
    </div>
  );
}
export default function RootCauseANalysisTabLayout({form, checked, handleCheckboxChange, data, setData, errors, setOpenFeedback, openFeedback }){
  return(
    <>
      <div className="flex justify-center">
        <p>{form.nonconformance_observation}</p>
      </div>
      <hr className="h-0.5 mt-4 bg-[#d2d2d2] border-none" />
      {((form.status === "For Submission" || form.status === "Draft") || (form.status === revision && openFeedback.feedback_root_cause_analysis)) && (
        <div className="grid gap-1 grid-cols-12 mt-4">
          {categories.map((category) => (
            <div key={category.name} className="col-span-3">
              <label className="flex items-center justify-center">
                <Checkbox
                  name={category.name}
                  checked={checked[category.name]}
                  onChange={handleCheckboxChange}
                />
                <span className="ms-2 text-gray-600">{category.label}</span>
              </label>
            </div>
          ))}
        </div>
      )}
      {categories.map((category) => (
        <div key={category.name}>
          {checked[category.name] && <RootCauseCategoryFieldsLayout category={category} data={data} setData={setData} errors={errors} form={form} openFeedback={openFeedback}/>}
        </div>
      ))}
      {((
        form.status === managerReview || 
        form.status === managerRevised || 
        form.status === approverReview || 
        form.status === approverRevised) && !openFeedback.feedback_root_cause_analysis) && (
        <div className="grid gap-1 grid-cols-12">
          <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_root_cause_analysis: true,})}}/>
        </div>
      )}
      {(
          form.status === managerReview || 
          form.status === managerRevised || 
          form.status === revision ||
          form.status === approverReview || 
          form.status === approverRevised) && openFeedback.feedback_root_cause_analysis && (
        <Feedback
          form={form}
          name="feedback_root_cause_analysis" 
          label="Root Cause Analysis" 
          value={data.feedback.feedback_root_cause_analysis} 
          onChange={(e) => setData({
            ...data,
            feedback: {
              ...data.feedback,
              feedback_root_cause_analysis: e.target.value
            }
          })} 
          onClick={()=>{
            setOpenFeedback({
              ...openFeedback, 
              feedback_root_cause_analysis: false,
            });
            setData({
              ...data,
              feedback: {
                ...data.feedback,
                feedback_root_cause_analysis: ""
              }
            });
          }}
        />
      )}
    </>
  );
}