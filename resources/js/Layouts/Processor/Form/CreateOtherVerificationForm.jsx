import AddFeedback from "@/Components/AddFeedback";
import ModalForm from "@/Components/ModalForm";
import SelectErrorInputLabel from "@/Components/SelectErrorInputLabel";
import TextAreaErrorInputLabel from "@/Components/TextAreaErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import VerificationFeedback from "@/Components/VerificationFeedback";
import { handleOtherVerificationSubmit } from "@/Hooks/handleOtherVerificationSubmit";
import { otherVerificationFormData } from "@/Hooks/otherVerificationFormData";
import { useEffect } from "react";
import { useState } from "react";
import { FaComments, FaFileCircleQuestion, FaHashtag, FaInbox, FaUser } from "react-icons/fa6";

export function CreateOtherVerificationForm({form, users, closingModal ,buttonLabel = "", secondButtonLabel = ""}){
  const lastVerification = form.verification.at(-1);
  const disabled = lastVerification?.status === "Review" || lastVerification?.status === "Revised";
  const hasFeedback = lastVerification.status === "Revision";
  const {data, setData, post, put, errors, processing,} = otherVerificationFormData(form);
  const {handleOtherVerification, handleUpdateOtherVerification } = handleOtherVerificationSubmit(post, closingModal, data, put, form)
  const [openFeedback, setOpenFeedback] = useState({
    feedback_correction_implemented_still_implemented: false,
    feedback_corrective_action_effective: false,
    feedback_others_verification: false,
  });
  const Feedback = () => {
    if(lastVerification.status === "Revised" || hasFeedback){
      const feedbacks = lastVerification.status === "Revision" ? form.feedback_approver : form.feedbackApprover;
      console.log(feedbacks);
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
  return(
    <>
      <ModalForm handleSubmit={lastVerification.status === "Approved" ? handleOtherVerification : handleUpdateOtherVerification}>
        <TextErrorInputLabel 
          name="car_form_number"
          value={form.car_form_number}
          icon={<FaHashtag size={18} className="items-center"/>}
          className="bg-[#f4f4f4]"
          disabled={true}
          label="CAR Reference Number"
        />
        <TextAreaErrorInputLabel
          name="correction_implemented_still_implemented"
          divClassName="mt-4"
          value={data.correction_implemented_still_implemented} 
          icon={<FaComments size={18} className="items-center"/>}
          label="Is the corrective action still implemented?"
          onChange={(e) => setData("correction_implemented_still_implemented", e.target.value)}
          error={errors.correction_implemented_still_implemented}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_correction_implemented_still_implemented)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_correction_implemented_still_implemented)}
        />
        {disabled && !openFeedback.feedback_correction_implemented_still_implemented && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_correction_implemented_still_implemented: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_correction_implemented_still_implemented && (
          <VerificationFeedback 
            form={form}
            name="feedback_correction_implemented_still_implemented"
            label="Corrective action still implemented"
            value={data.feedback.feedback_correction_implemented_still_implemented}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_correction_implemented_still_implemented: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_correction_implemented_still_implemented: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_correction_implemented_still_implemented: ""
                }
              })
            }}
          />
        )}
        <TextAreaErrorInputLabel
          name="corrective_action_effective"
          divClassName="mt-4"
          value={data.corrective_action_effective} 
          icon={<FaComments size={18} className="items-center"/>}
          label="Is the corrective action effective? (i.e. Test by reviewing evidence and records/documented info, demonstration of improvements, awareness of interested parties, etc.) Has the nonconformity reoccurred?"
          onChange={(e) => setData("corrective_action_effective", e.target.value)}
          error={errors.corrective_action_effective}
          className={`${(disabled || (hasFeedback && !openFeedback.feedback_corrective_action_effective)) && "bg-[#f4f4f4]"}`}
          disabled={disabled || (hasFeedback && !openFeedback.feedback_corrective_action_effective)}
        />
        {disabled && !openFeedback.feedback_corrective_action_effective && (
          <div className="grid grid-cols-12 flex items-center">
            <AddFeedback onClick={() => setOpenFeedback({...openFeedback, feedback_corrective_action_effective: true,})}/>
          </div>
        )}
        {(disabled || hasFeedback) && openFeedback.feedback_corrective_action_effective && (
          <VerificationFeedback 
            form={form}
            name="feedback_corrective_action_effective"
            label="Corrective action effective"
            value={data.feedback.feedback_corrective_action_effective}
            onChange={(e)=> setData({
              ...data, feedback: {
                ...data.feedback,
                feedback_corrective_action_effective: e.target.value
              }
            })}
            onClick={()=>{
              setOpenFeedback({
                ...openFeedback,
                feedback_corrective_action_effective: false,
              });
              setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_corrective_action_effective: ""
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
          label="Others:"
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
              disabled={processing}
              onClick={() => {
                setData('status', "Revision");
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
              {secondButtonLabel}
            </button>
          )}
          <span></span>
          <button
            disabled={processing}
            onClick={() => {
              if(lastVerification.status === "Review" || lastVerification.status === "Revised" ){
                if(lastVerification.otherVerification.conclusion !== "For Closure"){
                  setData('status', "Approved");
                }else {
                  setData('status', "Closed");
                }
              }else if(lastVerification.status === "Revision"){
                setData('status', "Revised");
              }else {
                setData('status', 'Review');
              }
            }}
            className="bg-[#ffaf54d6] hover:bg-[#f99d35d6] px-4 py-2 rounded"
            >
            {buttonLabel}
          </button>
        </div>
      </ModalForm>
    </>
  );
}