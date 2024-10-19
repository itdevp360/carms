import AddFeedback from "@/Components/AddFeedback";
import Checkbox from "@/Components/Checkbox";
import DateErrorInputLabel from "@/Components/DateErrorInputLabel";
import Feedback from "@/Components/Feedback";
import TextAreaErrorInputLabel from "@/Components/TextAreaErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import { FaComments, FaHashtag, FaRegCalendar } from "react-icons/fa6";

const managerRevised = "Manager's Revised";
const approverRevised = "Approver's Revised";
const approverReview = "Approver's Review";
const managerReview = "Manager's Review";
const revision = "Revision";

export default function CorrectionTabLayout({form, sameCorrection, setSameCorrection, 
  data, setData , errors, setOpenFeedback, openFeedback}){
  return (
    <>
      <TextErrorInputLabel 
        name="car_form_number"
        value={form.car_form_number}
        icon={<FaHashtag size={18} className="items-center"/>}
        className="bg-[#f4f4f4]"
        disabled={true}
        label="CAR Reference Number"
      />
      <TextAreaErrorInputLabel 
        name="nonconformance_observation"
        value={form.nonconformance_observation}
        icon={<FaComments size={18} className="items-center"/>}
        className="bg-[#f4f4f4]"
        disabled={true}
        label="Nonconformance/Observation"
      />
      <div className="grid gap-1 grid-cols-12 mt-4 flex items-end">
        <TextAreaErrorInputLabel
          divClassName="col-span-7"
          name="correction"
          value={data.correction}
          icon={<FaComments size={18} className="items-center"/>}
          label="Correction"
          placeholder="Enter the Correction"
          required={data.status !== "Draft"}
          onChange={(e) => setData("correction", e.target.value)}
          error={errors.correction}
          className={`${(
            (form.status === managerReview || 
              form.status === managerRevised || 
              form.status === approverReview || 
              form.status === approverRevised) || 
            (form.status === revision && !openFeedback.feedback_correction)) 
            && "bg-[#f4f4f4]"}`}
          disabled={
            (form.status === managerReview || 
              form.status === managerRevised || 
              form.status === approverReview || 
              form.status === approverRevised) || 
            (form.status === revision && !openFeedback.feedback_correction)
          }
        />
        <DateErrorInputLabel
          divClassName="col-span-5"
          name="date_correction"
          value={data.date_correction}
          icon={<FaRegCalendar size={18} className="items-center"/>}
          label="Correction Date"
          onChange={(e) => setData("date_correction", e.target.value)}
          error={errors.date_correction}
          className={`${(
            (form.status === managerReview || 
              form.status === managerRevised || 
              form.status === approverReview || 
              form.status === approverRevised) || 
            (form.status === revision && !openFeedback.feedback_correction))
            && "bg-[#f4f4f4]"}`}
          disabled={(
            form.status === managerReview || 
            form.status === managerRevised || 
            form.status === approverReview || 
            form.status === approverRevised) || (form.status === revision && !openFeedback.feedback_correction)}
        />
        {((
            form.status === managerReview || 
            form.status === managerRevised || 
            form.status === approverReview || 
            form.status === approverRevised) && !openFeedback.feedback_correction) && (
          <div>
            <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_correction: true,})}}/>
          </div>
        )}
      </div>
      {(
        form.status === managerReview || 
        form.status === managerRevised || 
        form.status === revision || 
        form.status === approverReview || 
        form.status === approverRevised) && openFeedback.feedback_correction && (
        <Feedback 
          form={form}
          name="feedback_correction" 
          label="Correction" 
          value={data.feedback.feedback_correction} 
          onChange={(e) => setData({
            ...data,
            feedback: {
              ...data.feedback,
              feedback_correction: e.target.value
            }
          })} 
          onClick={()=>{
            setOpenFeedback({
              ...openFeedback, 
              feedback_correction: false,
            });
            setData({
              ...data,
              feedback: {
                ...data.feedback,
                feedback_correction: ""
              }
            });
          }}
        />
      )}
      {form.source !== "Request For Action" && (
        <>
          <div className="mt-4">
            <TextAreaErrorInputLabel
              name="consequence"
              value={data.consequence}
              placeholder="Enter the Consequence"
              icon={<FaComments size={18} className="items-center"/>}
              label="What is the Consequence? If none, explain why?"
              required={data.status !== "Draft"}
              onChange={(e) => setData("consequence", e.target.value)}
              error={errors.consequence}
              className={`${(
                (form.status === managerReview || 
                  form.status === managerRevised || 
                  form.status === approverReview || 
                  form.status === approverRevised) || 
                (form.status === revision && !openFeedback.feedback_consequence)) && 
                "bg-[#f4f4f4]"}`}
              disabled={
                (form.status === managerReview || 
                  form.status === managerRevised || 
                  form.status === approverReview || 
                  form.status === approverRevised) || 
                (form.status === revision && !openFeedback.feedback_consequence)
              }
            />
          </div>
          {((form.status === managerReview || 
            form.status === managerRevised || 
            form.status === approverReview || 
            form.status === approverRevised) && !openFeedback.feedback_consequence) && (
            <div className="grid gap-1 grid-cols-12">
              <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_consequence: true,})}}/>
            </div>
          )}
          {(
            form.status === managerReview || 
            form.status === managerRevised || 
            form.status === revision || 
            form.status === approverReview || 
            form.status === approverRevised
          ) && openFeedback.feedback_consequence && (
            <Feedback 
              form={form}
              name="feedback_consequence" 
              label="Consequence" 
              value={data.feedback.feedback_consequence} 
              onChange={(e) => setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_consequence: e.target.value
                }
              })} 
              onClick={()=>{
                setOpenFeedback({
                  ...openFeedback, 
                  feedback_consequence: false,
                });
                setData({
                  ...data,
                  feedback: {
                    ...data.feedback,
                    feedback_consequence: ""
                  }
                });
              }}
            />
          )}
          <div className="grid gap-1 grid-cols-12 mt-4 flex items-end">
            <TextAreaErrorInputLabel
              divClassName="col-span-7"
              name="deal_consequence"
              value={data.deal_consequence}
              icon={<FaComments size={18} className="items-center"/>}
              label="How did you deal with the consequence/s?"
              placeholder="Enter the Deal Consequence"
              required={data.status !== "Draft"}
              onChange={(e) => setData("deal_consequence", e.target.value)}
              error={errors.deal_consequence}
              className={`${(
                (form.status === managerReview || form.status === managerRevised ||
                  form.status === approverReview || 
                  form.status === approverRevised|| 
                  sameCorrection) || 
                (form.status === revision && !openFeedback.feedback_deal_consequence)) 
                && "bg-[#f4f4f4]"}`
              }
              disabled={
                (form.status === managerReview || 
                  form.status === managerRevised || 
                  form.status === approverReview || 
                  form.status === approverRevised) || 
                sameCorrection ||
                (form.status === revision && !openFeedback.feedback_deal_consequence)
              }
            />
            <DateErrorInputLabel
              divClassName="col-span-5"
              name="date_deal_consequence"
              value={data.date_deal_consequence}
              icon={<FaRegCalendar size={18} className="items-center"/>}
              label="Deal Consequence Date"
              onChange={(e) => setData("date_deal_consequence", e.target.value)}
              error={errors.date_deal_consequence}
              className={`${(
                (form.status === managerReview || form.status === managerRevised) || 
                (form.status === revision && !openFeedback.feedback_deal_consequence) || 
                sameCorrection || 
                form.status === approverReview || 
                form.status === approverRevised)  
                && "bg-[#f4f4f4]"
              }`}
              disabled={
                (form.status === managerReview || form.status === managerRevised) || 
                sameCorrection || 
                (form.status === revision && !openFeedback.feedback_deal_consequence) ||
                form.status === approverReview || 
                form.status === approverRevised
              }
            />
          </div>
          {(
            form.status === "For Submission" || form.status === "Draft" || 
            form.status === revision && openFeedback.feedback_deal_consequence
          ) && (
            <label className="flex items-center">
              <Checkbox
                name="sameAsCorrection"
                checked={sameCorrection}
                onChange={(e) => setSameCorrection(e.target.checked)}
              />
              <span className="ms-2 text-sm text-gray-600">Same As Correction</span>
            </label>
          )}
          {((form.status === managerReview || form.status === managerRevised || form.status === approverReview || form.status === approverRevised) && !openFeedback.feedback_deal_consequence) && (
            <div className="grid gap-1 grid-cols-12">
              <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_deal_consequence: true,})}}/>
            </div>
          )}
          {(form.status === managerReview || form.status === managerRevised || form.status === revision || form.status === approverReview || form.status === approverRevised) && openFeedback.feedback_deal_consequence && (
            <Feedback 
              form={form}
              name="feedback_deal_consequence" 
              label="Deal Consequence" 
              value={data.feedback.feedback_deal_consequence} 
              onChange={(e) => setData({
                ...data,
                feedback: {
                  ...data.feedback,
                  feedback_deal_consequence: e.target.value
                }
              })} 
              onClick={()=>{
                setOpenFeedback({
                  ...openFeedback, 
                  feedback_deal_consequence: false,
                });
                setData({
                  ...data,
                  feedback: {
                    ...data.feedback,
                    feedback_deal_consequence: ""
                  }
                });
              }}
            />
          )}
        </>
      )}
    </>
  );
}