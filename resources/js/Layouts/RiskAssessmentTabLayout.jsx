import AddFeedback from "@/Components/AddFeedback";
import Feedback from "@/Components/Feedback";
import NumberErrorInputLabel from "@/Components/NumberErrorInputLabel";
import TextErrorInputLabel from "@/Components/TextErrorInputLabel";
import { FaHashtag, FaInbox } from "react-icons/fa6";

const managerRevised = "Manager's Revised";
const approverRevised = "Approver's Revised";
const approverReview = "Approver's Review";
const managerReview = "Manager's Review";
const revision = "Revision";

export default function RiskAssessmentTabLayout({data, setData , errors, form, setOpenFeedback, openFeedback}){
  const handleRemoveAssessment = (index) =>{
    const assessment = [...data.risk_assessment];
    assessment.splice(index,1);
    setData('risk_assessment', assessment);
  };
  const handleAddAssessment = () => {
    setData('risk_assessment', [
      ...data.risk_assessment,
      {
        risk: "",
        weakness: "",
        threat: "",
        p: "",
        s: "",
        r: "",
        classification: "",
      },
    ]);
  };

  const getClassificationBgColor = (classification) => {
    switch (classification) {
      case "Low Risk Region":
        return "bg-green-600 text-white";
      case "Minor Risk Region":
        return "bg-yellow-500 text-black";
      case "Moderate Risk Region":
        return "bg-[#ef8d4c] text-black";
      case "High Risk Region":
        return "bg-orange-500 text-black";
      case "Extreme Risk Region":
        return "bg-red-500 text-black";
      default:
        return "";
    }
  };

  const handleChangeAssessment = (index, field, value) => {
    const newAssessment = [...data.risk_assessment];
    newAssessment[index][field] = value;
    if (field === 'p' || field === 's') {
      const p = parseFloat(newAssessment[index].p || 0);
      const s = parseFloat(newAssessment[index].s || 0);
      newAssessment[index].r = p * s;
    }
    const r = parseFloat(newAssessment[index].r || 0);
    if (r >= 1 && r <= 6) {
      newAssessment[index].classification = "Low Risk Region";
    } else if (r >= 7 && r <= 9) {
      newAssessment[index].classification = "Minor Risk Region";
    } else if (r >= 10 && r <= 14) {
      newAssessment[index].classification = "Moderate Risk Region";
    } else if (r >= 15 && r <= 19) {
      newAssessment[index].classification = "High Risk Region";
    } else if (r >= 20) {
      newAssessment[index].classification = "Extreme Risk Region";
    }
    setData('risk_assessment', newAssessment);
  };
  return (
    <>
      {data.risk_assessment.map((assessment, index) => (
        <div key={`riskAssessment-${index}`}>
          <div className="border p-4 rounded mt-4">
            <TextErrorInputLabel
              name={`risk_${index}`}
              value={assessment.risk}
              icon={<FaInbox size={18} className="items-center"/>}
              label="Risk"
              placeholder="Enter the Risk"
              required={data.status !== "Draft"}
              onChange={(e) =>  handleChangeAssessment(index, 'risk', e.target.value)}
              error={errors.risk_assessment?.[index].risk}
              className={`${(
                (form.status === managerReview || form.status === managerRevised || form.status === approverReview || form.status === approverRevised) ||
                (form.status === revision && !openFeedback.feedback_risk_assessment)) && 
                "bg-[#f4f4f4]"
              }`}
              disabled={
                (form.status === managerReview || form.status === managerRevised) || 
                (form.status === revision && !openFeedback.feedback_risk_assessment) || 
                form.status === approverReview || 
                form.status === approverRevised
              }
            />
            <TextErrorInputLabel
              name={`weakness_${index}`}
              value={assessment.weakness}
              icon={<FaInbox size={18} className="items-center"/>}
              label="Weaknesses"
              placeholder="Enter the Weaknesses"
              required={assessment.status !== "Draft"}
              onChange={(e) =>  handleChangeAssessment(index, 'weakness', e.target.value)}
              error={errors.risk_assessment?.[index].weakness}
              className={`${(
                (form.status === managerReview || form.status === managerRevised) ||
                (form.status === revision && !openFeedback.feedback_risk_assessment) || 
                form.status === approverReview || 
                form.status === approverRevised) && 
                "bg-[#f4f4f4]"
              }`}
              disabled={
                (form.status === managerReview || form.status === managerRevised) || 
                (form.status === revision && !openFeedback.feedback_risk_assessment) || 
                form.status === approverReview || 
                form.status === approverRevised
              }
            />
            <TextErrorInputLabel
              name={`threat_${index}`}
              value={assessment.threat}
              icon={<FaInbox size={18} className="items-center"/>}
              label="Threat"
              placeholder="Enter the Threat"
              onChange={(e) => handleChangeAssessment(index, 'threat', e.target.value)}
              error={errors.risk_assessment?.[index].threat}
              className={`${(
                (form.status === managerReview || form.status === managerRevised) ||
                (form.status === revision && !openFeedback.feedback_risk_assessment) || 
                form.status === approverReview || 
                form.status === approverRevised) && 
                "bg-[#f4f4f4]"
              }`}
              disabled={
                (form.status === managerReview || form.status === managerRevised) || 
                (form.status === revision && !openFeedback.feedback_risk_assessment) || 
                form.status === approverReview || 
                form.status === approverRevised
              }
            />
            <div className="grid gap-1 grid-cols-12 mt-4">
              <NumberErrorInputLabel
                divClassName="col-span-2"
                name={`p_${index}`}
                value={assessment.p}
                icon={<FaHashtag size={18} className="items-center"/>}
                label="P"
                onChange={(e) => handleChangeAssessment(index, 'p', e.target.value)}
                error={errors.risk_assessment?.[index].p}
                required={assessment.status !== "Draft"}
                className={`${(
                  (form.status === managerReview || form.status === managerRevised) ||
                  (form.status === revision && !openFeedback.feedback_risk_assessment)|| 
                  form.status === approverReview || 
                  form.status === approverRevised) && 
                  "bg-[#f4f4f4]"
                }`}
                disabled={
                  (form.status === managerReview || form.status === managerRevised) || 
                  (form.status === revision && !openFeedback.feedback_risk_assessment)|| 
                  form.status === approverReview || 
                  form.status === approverRevised
                }
              />
              <NumberErrorInputLabel
                divClassName="col-span-2"
                name={`s_${index}`}
                value={assessment.s}
                icon={<FaHashtag size={18} className="items-center"/>}
                label="S"
                onChange={(e) => handleChangeAssessment(index, 's', e.target.value)}
                error={errors.risk_assessment?.[index].s}
                required={assessment.status !== "Draft"}
                className={`${(
                  (form.status === managerReview || form.status === managerRevised) ||
                  (form.status === revision && !openFeedback.feedback_risk_assessment)|| 
                  form.status === approverReview || 
                  form.status === approverRevised) && 
                  "bg-[#f4f4f4]"
                }`}
                disabled={
                  (form.status === managerReview || form.status === managerRevised) || 
                  (form.status === revision && !openFeedback.feedback_risk_assessment)|| 
                  form.status === approverReview || 
                  form.status === approverRevised
                }
              />
              <NumberErrorInputLabel
                divClassName="col-span-2"
                name={`r_${index}`}
                value={assessment.r}
                icon={<FaHashtag size={18} className="items-center"/>}
                label="R"
                onChange={(e) =>  handleChangeAssessment(index, 'r', e.target.value)}
                error={errors.risk_assessment?.[index].r}
                disabled={true}
                className="bg-[#f4f4f4]"
              />
              <TextErrorInputLabel
                divClassName="col-span-6"
                name={`classification_${index}`}
                value={assessment.classification}
                icon={<FaInbox size={18} className={`items-center ${getClassificationBgColor(assessment.classification)}`}/>}
                label="Classification"
                placeholder="Enter the Classification"
                onChange={(e) => handleChangeAssessment(index, 'classification', e.target.value)}
                error={errors.risk_assessment?.[index].classification}
                className={`mt-1 block w-full input-field ${getClassificationBgColor(assessment.classification)}`}
                disabled={true}
              />
            </div>
          </div>
          {(form.status === "For Submission" || form.status === "Draft" || (form.status === revision && openFeedback.feedback_risk_assessment))&&(<div className="flex justify-start">
            {data.risk_assessment.length - 1 === index && (<div className="my-4 me-4">
              <span onClick={() => handleAddAssessment()} className="rounded bg-[#ffaf54d6] hover:bg-[#f99d35d6] px-6 py-2 cursor-pointer">Add</span>
            </div>)}
            {data.risk_assessment.length !== 1 && (<div className="mt-4">
              <span onClick={() => handleRemoveAssessment(index)} className="rounded bg-red-500 hover:bg-red-600 px-6 py-2 cursor-pointer">Delete</span>
            </div>)}
          </div>)}
        </div>
      ))}
      {((form.status === managerReview || 
          form.status === managerRevised || 
          form.status === approverReview || 
          form.status === approverRevised) && !openFeedback.feedback_risk_assessment) && (
        <div className="grid gap-1 grid-cols-12 mt-4">
          <AddFeedback onClick={()=>{setOpenFeedback({...openFeedback, feedback_risk_assessment: true,})}}/>
        </div>
      )}
      {(form.status === managerReview || form.status === managerRevised || form.status === revision || form.status === approverReview || form.status === approverRevised) && openFeedback.feedback_risk_assessment && (
        <Feedback
          form={form}
          name="feedback_risk_assessment" 
          label="Risk Assessment" 
          value={data.feedback.feedback_risk_assessment} 
          onChange={(e) => setData({
            ...data,
            feedback: {
              ...data.feedback,
              feedback_risk_assessment: e.target.value
            }
          })} 
          onClick={()=>{
            setOpenFeedback({
              ...openFeedback, 
              feedback_risk_assessment: false,
            });
            setData({
              ...data,
              feedback: {
                ...data.feedback,
                feedback_risk_assessment: ""
              }
            });
          }}
        />
      )}
    </>
  );
}