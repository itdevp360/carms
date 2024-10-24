import AddFeedback from "@/Components/AddFeedback";
import DateErrorInputLabel from "@/Components/DateErrorInputLabel";
import Feedback from "@/Components/Feedback";
import SelectErrorInputLabel from "@/Components/SelectErrorInputLabel";
import TextAreaErrorInputLabel from "@/Components/TextAreaErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import { FaComments, FaFileCircleQuestion, FaRegCalendar } from "react-icons/fa6";

const managerRevised = "Manager's Revised";
const approverRevised = "Approver's Revised";
const approverReview = "Approver's Review";
const managerReview = "Manager's Review";
const revision = "Revision";

function RootCauseLastValue ({checked, data}){
  const rootCauseAnalysisProperties = ['manpower', 'machinery', 'materials', 'method', 'motherNature', 'measurement', 'others'];
  return (
    <div className="grid gap-2 grid-cols-4 flex items center">
      {rootCauseAnalysisProperties.map((property) => (
        data.root_cause_analysis[property] && data.root_cause_analysis[property].length > 0 && checked[property] && (
          <div key={property} className="col-span-2 flex justify-center text-justify">
            <p className="text-base font-bold me-4">{property.charAt(0).toUpperCase() + property.slice(1)}:</p>
            <p>{data.root_cause_analysis[property][data.root_cause_analysis[property].length - 1].value}</p>
          </div>
        )
      ))}
    </div>
  );
}

export default function CorrectiveActionLayout({ forms, userForm, data, setData , errors, checked, setOpenFeedback, openFeedback}){
  return (
    <>
    <RootCauseLastValue data={data} checked={checked}/> 
      <div className="grid gap-1 grid-cols-12 mt-4 flex items-end">
        <TextAreaErrorInputLabel
          divClassName="col-span-7"
          name="corrective_action"
          value={data.corrective_action}
          icon={<FaComments size={18} className="items-center"/>}
          label="Corrective Action"
          placeholder="Enter the Corrective Action"
          required={data.status !== "Draft"}
          onChange={(e) => setData("corrective_action", e.target.value)}
          error={errors.corrective_action}
          className={`${(
            userForm.status === managerReview || 
            userForm.status === managerRevised || 
            userForm.status === approverReview || 
            userForm.status === approverRevised || 
            ((userForm.status === revision) && (!openFeedback.feedback_corrective_action && !openFeedback.feedback_root_cause_analysis))
          ) && 
            "bg-[#f4f4f4]"
          }`}
          disabled={
            userForm.status === managerReview || 
            userForm.status === managerRevised || 
            (userForm.status === revision && !openFeedback.feedback_corrective_action && !openFeedback.feedback_root_cause_analysis) ||
            userForm.status === approverReview || 
            userForm.status === approverRevised
          }
        />
        <DateErrorInputLabel
          divClassName="col-span-5"
          name="date_corrective_action"
          value={data.date_corrective_action}
          icon={<FaRegCalendar size={18} className="items-center"/>}
          label="Corrective Action Date"
          onChange={(e) => setData("date_corrective_action", e.target.value)}
          required={data.status !== "Draft"}
          error={errors.date_corrective_action}
          className={`${(
            userForm.status === managerReview || 
            userForm.status === managerRevised || 
            userForm.status === approverReview || 
            userForm.status === approverRevised || 
            (userForm.status === revision && (!openFeedback.feedback_corrective_action && !openFeedback.feedback_root_cause_analysis))
          ) && 
            "bg-[#f4f4f4]"
          }`}
          disabled={
            userForm.status === managerReview || 
            userForm.status === managerRevised || 
            (userForm.status === revision && (!openFeedback.feedback_corrective_action && !openFeedback.feedback_root_cause_analysis)) || 
            userForm.status === approverReview || 
            userForm.status === approverRevised
          }
        />
        {((
            userForm.status === managerReview || 
            userForm.status === managerRevised || 
            userForm.status === approverReview || 
            userForm.status === approverRevised) && !openFeedback.feedback_corrective_action) && (
          <div>
            <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_corrective_action: true,})}}/>
          </div>
        )}
      </div>
      {(
          userForm.status === managerReview || 
          userForm.status === managerRevised || 
          userForm.status === revision|| 
          userForm.status === approverReview || 
          userForm.status === approverRevised) && openFeedback.feedback_corrective_action && (
        <Feedback
          form={userForm}
          name="feedback_corrective_action" 
          label="Corrective Action" 
          value={data.feedback.feedback_corrective_action} 
          onChange={(e) => setData({
            ...data,
            feedback: {
              ...data.feedback,
              feedback_corrective_action: e.target.value
            }
          })}
          onClick={()=>{
            setOpenFeedback({
              ...openFeedback, 
              feedback_corrective_action: false,
            });
            setData({
              ...data,
              feedback: {
                ...data.feedback,
                feedback_corrective_action: ""
              }
            });
          }}
        />
      )}
      <div className="grid gap-1 grid-cols-12 mt-4">
        <div className="col-span-6">
          <SelectErrorInputLabel
            name="similar_nonconformity"
            value={data.similar_nonconformity}
            icon={<FaFileCircleQuestion size={18} className={`items-center ${(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised || (userForm.status === revision && !openFeedback.feedback_corrective_action)) && "bg-[#f4f4f4] text-black"}`}/>}
            label="Does a similar non-conformity exist?"
            required={data.status !== "Draft"}
            onChange={(e) => setData("similar_nonconformity", e.target.value)}
            error={errors.similar_nonconformity}
            className={`${(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised || (userForm.status === revision && !openFeedback.feedback_corrective_action)) && "bg-[#f4f4f4] text-black"}`}
            disabled={(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised || (userForm.status === revision && !openFeedback.feedback_corrective_action))}
          >
            <option value="">--Yes / No --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </SelectErrorInputLabel>
          {data.similar_nonconformity === "yes" && (
            <SelectErrorInputLabel
              name="yes_similar_nonconformity"
              value={data.yes_similar_nonconformity}
              icon={<FaFileCircleQuestion size={18} className={`items-center ${(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised) && "bg-[#f4f4f4] text-black"}`}/>}
              label="If yes, Select CAR Reference No."
              required={data.status !== "Draft"}
              onChange={(e) => setData("yes_similar_nonconformity", e.target.value)}
              error={errors.yes_similar_nonconformity}
              className={`${(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised) && "bg-[#f4f4f4] text-black"}`}
              disabled={(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised)}
            >
              <option value="">Choose CAR Reference No.</option>
              {forms.data.filter(form => form.concerned_department === userForm.concerned_department).map((form)=>
                <option key={form.id} value={form.car_form_number}>{form.car_form_number} - {form.nonconformance_observation}</option>
              )}
            </SelectErrorInputLabel>
          )}
        </div>
        <div className="col-span-6">
          <SelectErrorInputLabel
            name="potential_nonconformity"
            value={data.potential_nonconformity}
            icon={<FaFileCircleQuestion size={18} className={`items-center 
              ${((userForm.status === managerReview || userForm.status === managerRevised || 
                userForm.status === approverReview || 
                userForm.status === approverRevised) ||
                (userForm.status === revision && !openFeedback.feedback_potential_nonconformity)) && "bg-[#f4f4f4] text-black"}`}/>}
            label="Could a similar non-conformity potentially occur?"
            required={data.status !== "Draft"}
            onChange={(e) => setData("potential_nonconformity", e.target.value)}
            error={errors.potential_nonconformity}
            className={`${(
              (userForm.status === managerReview || userForm.status === managerRevised) ||
              (userForm.status === revision && !openFeedback.feedback_potential_nonconformity)|| 
              userForm.status === approverReview || 
              userForm.status === approverRevised) && 
              "bg-[#f4f4f4] text-black"
            }`}
            disabled={
              (userForm.status === managerReview || userForm.status === managerRevised) || 
              (userForm.status === revision && !openFeedback.feedback_potential_nonconformity)|| 
              userForm.status === approverReview || 
              userForm.status === approverRevised
            }
          >
            <option value="">--Yes / No --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </SelectErrorInputLabel>
          {data.potential_nonconformity === "yes" && (
            <>
              <TextErrorInputLabel
                name="yes_potential_nonconformity"
                value={data.yes_potential_nonconformity}
                icon={<FaFileCircleQuestion size={18} className="items-center"/>}
                label="Identify the potential nonconformity and include corrective actions"
                required={data.status !== "Draft"}
                onChange={(e) => setData("yes_potential_nonconformity", e.target.value)}
                error={errors.yes_potential_nonconformity}
                className={`${(
                  (userForm.status === managerReview || userForm.status === managerRevised) ||
                  (userForm.status === revision && !openFeedback.feedback_potential_nonconformity) || 
                  userForm.status === approverReview || 
                  userForm.status === approverRevised) && 
                  "bg-[#f4f4f4]"
                }`}
                disabled={
                  (userForm.status === managerReview || userForm.status === managerRevised) || 
                  (userForm.status === revision && !openFeedback.feedback_potential_nonconformity) || 
                  userForm.status === approverReview || 
                  userForm.status === approverRevised
                }
              />
              <DateErrorInputLabel
                name="date_potential_nonconformity"
                value={data.date_potential_nonconformity}
                icon={<FaRegCalendar size={18} className="items-center"/>}
                label="Potential Nonconformity Date"
                onChange={(e) => setData("date_potential_nonconformity", e.target.value)}
                required={data.status !== "Draft"}
                error={errors.date_potential_nonconformity}
                className={`${(
                  (userForm.status === managerReview || userForm.status === managerRevised) ||
                  (userForm.status === revision && !openFeedback.feedback_potential_nonconformity)|| 
                  userForm.status === approverReview || 
                  userForm.status === approverRevised) && 
                  "bg-[#f4f4f4]"
                }`}
                disabled={
                  (userForm.status === managerReview || userForm.status === managerRevised) || 
                  (userForm.status === revision && !openFeedback.feedback_potential_nonconformity)|| 
                  userForm.status === approverReview || 
                  userForm.status === approverRevised
                }
              />
              {((userForm.status === managerReview || userForm.status === managerRevised || userForm.status === approverReview || userForm.status === approverRevised) && !openFeedback.feedback_potential_nonconformity) && (
                <div className="grid gap-1 grid-cols-6 mt-4">
                  <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_potential_nonconformity: true,})}}/>
                </div>
              )}
              {(userForm.status === managerReview || userForm.status === managerRevised || userForm.status === revision || userForm.status === approverReview || userForm.status === approverRevised) && openFeedback.feedback_potential_nonconformity && (
                <Feedback
                  form={userForm}
                  name="feedback_potential_nonconformity" 
                  label="Potential Nonconformity" 
                  buttonClassName="col-span-2"
                  value={data.feedback.feedback_potential_nonconformity} 
                  onChange={(e) => setData({
                    ...data,
                    feedback: {
                      ...data.feedback,
                      feedback_potential_nonconformity: e.target.value
                    }
                  })} 
                  onClick={()=>{
                    setOpenFeedback({
                      ...openFeedback, 
                      feedback_potential_nonconformity: false,
                    });
                    setData({
                      ...data,
                      feedback: {
                        ...data.feedback,
                        feedback_potential_nonconformity: ""
                      }
                    });
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}