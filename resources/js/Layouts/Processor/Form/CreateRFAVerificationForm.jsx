import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import ModalForm from "@/Components/ModalForm";
import SelectErrorInputLabel from "@/Components/SelectErrorInputLabel";
import TextAreaErrorInputLabel from "@/Components/TextAreaErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import { handleRFAVerificationSubmit } from "@/Hooks/handleRFAVerificationSubmit";
import { rfaVerificationFormData } from "@/Hooks/rfaVerificationFormData";
import { FaComments, FaHashtag, FaUser } from "react-icons/fa6";

export function CreateRFAVerificationForm({ form, users, buttonLabel, secondButtonLabel = "", closingModal }) {
  const lastVerification = form.verification?.at(-1);
  const rfaVerification = lastVerification?.status === "Approved" ? lastVerification?.rfa_verification?.length : lastVerification?.rfaVerification?.length;
  const rfaMap = lastVerification?.status === "Approved" ? lastVerification.rfa_verification : lastVerification.rfaVerification;
  const { data, setData, post, put, errors, processing } = rfaVerificationFormData(form);
  const {handleNewRFAVerification, handleRFAVerification} = handleRFAVerificationSubmit(post, closingModal, put, form);
  return (
    <>
      <ModalForm handleSubmit={form.verification?.length === 0 ? handleNewRFAVerification : handleRFAVerification} className="h-auto">
        <TextErrorInputLabel
          name="car_form_number"
          value={form.car_form_number}
          icon={<FaHashtag size={18} className="items-center" />}
          className="bg-[#f4f4f4]"
          disabled={true}
          label="CAR Reference Number"
        />

        {/* Check if lastVerification and rfaVerification exist before mapping */}
        {rfaVerification > 0 && rfaMap.map((verification, index) => (
          <div key={index} className="mt-4">
            <TextAreaErrorInputLabel
              name={`result_of_the_action_${index}`}
              divClassName="mt-4"
              value={verification.result_of_the_action || ""}
              icon={<FaComments size={18} className="items-center" />}
              label={`Result of Verification`}
              className={`bg-[#f4f4f4]`} 
              disabled={true} 
            />
            <div className="flex justify-evenly mt-4">
              {/* For Follow Up */}
              <div className="flex items-center">
                <InputLabel value="For Follow Up" className="me-2 text-[16px] font-semibold" />
                <input
                  type="radio"
                  name={`close_out_follow_up_${index}`}
                  className="border-2"
                  checked={verification.close_out_follow_up === 0}
                  disabled={true}
                />
              </div>
              {/* For Close Out */}
              <div className="flex items-center">
                <InputLabel value="For Close Out" className="me-2 text-[16px] font-semibold" />
                <input
                  type="radio"
                  name={`close_out_follow_up_${index}`}
                  className="border-2"
                  checked={verification.close_out_follow_up === 1} 
                  disabled={true}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Editable TextArea for the latest verification */}
        {lastVerification?.status !== "Review" && lastVerification?.status !== "Revised" && (
          <>
            <TextAreaErrorInputLabel
              name="result_of_the_action"
              divClassName="mt-4"
              value={data.result_of_the_action}
              icon={<FaComments size={18} className="items-center" />}
              label="Result of Verification"
              onChange={(e) => setData("result_of_the_action", e.target.value)}
              error={errors.result_of_the_action}
            />
    
            <div className="flex justify-evenly mt-4">
              {/* For Follow Up */}
              <div className="flex items-center">
                <InputLabel value="For Follow Up" className="me-2 text-[16px] font-semibold" />
                <input
                  type="radio"
                  name="close_out_follow_up"
                  value={0}
                  className="border-2"
                  checked={data.close_out_follow_up === 0}
                  onChange={(e) => setData("close_out_follow_up", parseInt(e.target.value))}
                />
              </div>
              {/* For Close Out */}
              <div className="flex items-center">
                <InputLabel value="For Close Out" className="me-2 text-[16px] font-semibold" />
                <input
                  type="radio"
                  name="close_out_follow_up"
                  value={1}
                  className="border-2"
                  checked={data.close_out_follow_up === 1} 
                  onChange={(e) => setData("close_out_follow_up", parseInt(e.target.value))}
                />
              </div>
            </div>
            <InputError message={errors.close_out_follow_up} className="mt-2" />
            {!lastVerification?.approver_id && (
              <SelectErrorInputLabel
                divClassName="mt-4"
                name="approver_id"
                value={data.approver_id}
                icon={<FaUser size={18} className={`items-center`}/>}
                label="Name of Approver"
                onChange={(e) => setData("approver_id", e.target.value)}
                error={errors.approver_id}
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
            )}
          </>
        )}

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
              if(data.close_out_follow_up === 1){
                setData('status', "Review");
              } else {
                setData('status', "Approved");
              }
              if (lastVerification?.status === "Review") {
                setData('status', "Closed")
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
