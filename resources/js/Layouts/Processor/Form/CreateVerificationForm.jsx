import TextAreaErrorInputLabel from "@/Components/TextAreaErrorInputLabel";
import SelectErrorInputLabel from "@/Components/SelectErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import { FaComments, FaFileCircleQuestion, FaHashtag, FaInbox, FaUser } from "react-icons/fa6";
import ModalForm from "@/Components/ModalForm";
import { firstVerificationFormData } from "@/Hooks/verificationFormData";
import { handleVerificationSubmit } from "@/Hooks/handleVerificationSubmit";
import AddFeedback from "@/Components/AddFeedback";
import { useState } from "react";
import VerificationFeedback from "@/Components/VerificationFeedback";
import { useEffect } from "react";

export default function CreateVerificationForm({form, users = {}, closingModal, buttonLabel = "", secondButtonLabel = ""}) {
  const disabled = form.verification[0]?.status === "Review" || form.verification[0]?.status === "Revised";
  const hasFeedback = form.verification[0]?.status === "Revision";
  const { data, setData, errors, post, put, processing } = firstVerificationFormData(form);
  const { handleFirstVerificationSubmit, handleUpdateFirstVerificationSubmit } = handleVerificationSubmit(post, closingModal, put, form, data);
  const [openFeedback, setOpenFeedback] = useState({
    feedback_correction_implemented: false,
    feedback_consequence_dealt: false,
    feedback_corrective_action_implemented: false,
    feedback_potential_nonconformity_verification: false,
    feedback_others_verification: false,
  });

  const Feedback = () => {
    if(form.verification[0]?.status === "Revised" || hasFeedback){
      const feedbacks = form.verification[0]?.status === "Revision" ? form.feedback_approver : form.feedbackApprover;
      const feedbackFormat = {...data.feedback};
      const checkedboxFeedback = {...openFeedback};

      feedbacks.forEach((feedback) => {
        if(feedback.element_type in feedbackFormat){
          feedbackFormat[feedback.element_type] = feedback.feedback;
          checkedboxFeedback[feedback.element_type] = true;
        }
      });
      setOpenFeedback(checkedboxFeedback);
      setData({...data, feedback: feedbackFormat});
    }
  }
  useEffect(() => {
    if(form){
      Feedback();
    }
  }, []);
  return (
    <>
      <ModalForm 
        handleSubmit={
          (!form.verification.length > 0)
            ? handleFirstVerificationSubmit
            : handleUpdateFirstVerificationSubmit 
        }
      >
        <TextErrorInputLabel 
          name="car_form_number"
          value={form.car_form_number}
          icon={<FaHashtag size={18} className="items-center"/>}
          className="bg-[#f4f4f4]"
          disabled={true}
          label="CAR Reference Number"
        />
        <TextAreaErrorInputLabel
          name="correction_implemented"
          divClassName="mt-4"
          value={data.correction_implemented} 
          icon={<FaComments size={18} className="items-center"/>}
          label="Is the correction already Implemented?"
          onChange={(e) => setData("correction_implemented", e.target.value)}
          error={errors.correction_implemented}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_correction_implemented)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_correction_implemented)}
        />
        {disabled && !openFeedback.feedback_correction_implemented && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_correction_implemented: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_correction_implemented && (
          <VerificationFeedback 
            form={form}
            name="feedback_correction_implemented"
            label="Correction Implemented"
            value={data.feedback.feedback_correction_implemented}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_correction_implemented: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_correction_implemented: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_correction_implemented: ""
                }
              })
            }}
          />
        )}
        <TextAreaErrorInputLabel
          name="consequence_dealt"
          divClassName="mt-4"
          value={data.consequence_dealt}
          icon={<FaComments size={18} className="items-center"/>}
          label="Has the consequence/s been dealt with?"
          onChange={(e) => setData("consequence_dealt", e.target.value)}
          error={errors.consequence_dealt}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_consequence_dealt)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_consequence_dealt)}
        />
        {disabled && !openFeedback.feedback_consequence_dealt && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_consequence_dealt: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_consequence_dealt && (
          <VerificationFeedback 
            form={form}
            name="feedback_consequence_dealt"
            label="Consequence Dealt"
            value={data.feedback.feedback_consequence_dealt}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_consequence_dealt: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_consequence_dealt: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_consequence_dealt: ""
                }
              })
            }}
          />
        )}
        <SelectErrorInputLabel
          divClassName="mt-4"
          name="corrective_action_implemented"
          value={data.corrective_action_implemented}
          icon={<FaFileCircleQuestion size={18} className={`items-center ${disabled && "text-black"}`}/>}
          label="Are the corrective actions implemented?"
          onChange={(e) => setData("corrective_action_implemented", e.target.value)}
          error={errors.corrective_action_implemented}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_corrective_action_implemented)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_corrective_action_implemented)}
        >
          <option value="">--Yes / No --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </SelectErrorInputLabel>
        {data.corrective_action_implemented === "no" && (
            <TextErrorInputLabel
            name="no_corrective_action_implemented"
            value={data.no_corrective_action_implemented}
            icon={<FaInbox size={18} className="items-center"/>}
            label="If No, why? Are there changes?"
            onChange={(e) => setData("no_corrective_action_implemented", e.target.value)}
            error={errors.yes_potential_nonconformity}
            className={`${disabled && "bg-[#f4f4f4]"}`}
            disabled={disabled}
          />
        )}
        {disabled && !openFeedback.feedback_corrective_action_implemented && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_corrective_action_implemented: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_corrective_action_implemented && (
          <VerificationFeedback 
            form={form}
            name="feedback_corrective_action_implemented"
            label="Corrective Action Implemented"
            value={data.feedback.feedback_corrective_action_implemented}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_corrective_action_implemented: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_corrective_action_implemented: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_corrective_action_implemented: ""
                }
              })
            }}
          />
        )}
        <TextAreaErrorInputLabel
          name="potential_nonconformity"
          divClassName="mt-4"
          value={data.potential_nonconformity}
          icon={<FaComments size={18} className="items-center"/>}
          label="Is the identified corrective action/s for the potential nonconformity implemented? (if applicable)"
          onChange={(e) => setData("potential_nonconformity", e.target.value)}
          error={errors.potential_nonconformity}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_potential_nonconformity_verification)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_potential_nonconformity_verification)}
        />
        {disabled && !openFeedback.feedback_potential_nonconformity_verification && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_potential_nonconformity_verification: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_potential_nonconformity_verification && (
          <VerificationFeedback 
            form={form}
            name="feedback_potential_nonconformity_verification"
            label="Potential nonconformity"
            value={data.feedback.feedback_potential_nonconformity_verification}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_potential_nonconformity_verification: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_potential_nonconformity_verification: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_potential_nonconformity_verification: ""
                }
              })
            }}
          />
        )}
        <TextAreaErrorInputLabel
          name="others_verification"
          divClassName="mt-4"
          value={data.others_verification}
          icon={<FaComments size={18} className="items-center"/>}
          label="Others"
          onChange={(e) => setData("others_verification", e.target.value)}
          error={errors.others_verification}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_others_verification)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_others_verification)}
        />
        
        {disabled && !openFeedback.feedback_others_verification && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_others_verification: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_others_verification && (
          <VerificationFeedback 
            form={form}
            name="feedback_others_verification"
            label="other verification"
            value={data.feedback.feedback_others_verification}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_others_verification: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_others_verification: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_others_verification: ""
                }
              })
            }}
          />
        )}
        <div className="grid gap-2 grid-cols-12">
          <div className="col-span-6">
            <SelectErrorInputLabel
              divClassName="mt-4"
              name="conclusion"
              value={data.conclusion}
              icon={<FaFileCircleQuestion size={18} className={`items-center ${(disabled || hasFeedback) && "text-black"}`}/>}
              label="Conclusion"
              onChange={(e) => setData("conclusion", e.target.value)}
              error={errors.conclusion}
              className={`${(disabled || hasFeedback) && "bg-[#f4f4f4] text-gray-700"}`}
              disabled={disabled || hasFeedback}
            >
              <option value="">-- Choose Conclusion --</option>
              <option value="For Further Verification">For Further Verification</option>
              <option value="For Closure">For Closure</option>
              <option value="Corrective Action not Effective">Corrective Action not Effective</option>
              <option value="others">Other</option>
            </SelectErrorInputLabel>
            {data.conclusion === "others" && (
                <TextErrorInputLabel
                name="other_conclusion"
                value={data.other_conclusion}
                icon={<FaInbox size={18} className="items-center"/>}
                label="Conclusion (Others)"
                onChange={(e) => setData("other_conclusion", e.target.value)}
                error={errors.other_conclusion}
                className={`${(disabled || hasFeedback) && "bg-[#f4f4f4]"}`}
                disabled={disabled || hasFeedback}
              />
            )}
          </div>
          <div className="col-span-6">
            <SelectErrorInputLabel
              divClassName="mt-4"
              name="approver_id"
              value={data.approver_id}
              icon={<FaUser size={18} className={`items-center ${(disabled || hasFeedback) && "text-black"}`}/>}
              label="Name of Approver"
              onChange={(e) => setData("approver_id", e.target.value)}
              error={errors.approver_id}
              className={`${(disabled || hasFeedback) && "bg-[#f4f4f4] text-gray-700"}`}
              disabled={disabled || hasFeedback}
            >
              <option value="">-- Select Name of Approver --</option>
              {users.data.filter(item => {
                return Array.isArray(item.rolesName) && item.rolesName.some(role => role.name === 'Approver');
              })
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </SelectErrorInputLabel>
          </div>
        </div>
        <div className="flex justify-between mt-4 pb-8">
          {secondButtonLabel !== "" && (
            <button
              onClick={() => {
                setData('status', "Revision");
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              disabled={processing}
              >
              {secondButtonLabel}
            </button>
          )}
          <span></span>
          <button
            onClick={() => {
              if(form.verification?.[0]){
                if ((form.verification[0].status === "Revised" || form.verification[0].status === "Review")){
                  if(form.verification[0].conclusion !== "For Closure"){
                    setData('status', "Approved");
                  }else {
                    setData('status', "Closed")
                  }
                }else if(form.verification[0].status === "Revision"){
                  setData('status', 'Revised')
                }
              }
            }}
            className="bg-[#ffaf54d6] hover:bg-[#f99d35d6] px-4 py-2 rounded"
            disabled={processing}
            >
            {buttonLabel}
          </button>
        </div>
      </ModalForm>
    </>
  );
}