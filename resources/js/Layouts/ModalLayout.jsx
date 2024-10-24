import Modal from "@/Components/Modal";
import ModalForm from "@/Components/ModalForm";
import PageTab from "@/Components/PageTab";
import PageTabGroup from "@/Components/PageTabGroup";
import PageTablist from "@/Components/PageTablist";
import PageTabPanel from "@/Components/PageTabPanel";
import PageTabPanels from "@/Components/PageTabPanels";
import { FaFolderPlus } from "react-icons/fa6";
import CorrectionTabLayout from "./CorrectionTabLayout";
import { useFormData } from "@/Hooks/useFormData";
import { SameAsCorrection } from "@/Hooks/SameAsCorrection";
import TwoButtonsModal from "@/Components/TwoButtonsModal";
import { useSelectedTabIndex } from "@/Hooks/useSelectedTabIndex";
import RootCauseANalysisTabLayout from "./RootCauseAnalysisTabLayout";
import { RootCauseCheckBox } from "@/Hooks/RootCauseCheckBox";
import CorrectiveActionLayout from "./CorrectiveActionLayout";
import RiskAssessmentTabLayout from "./RiskAssessmentTabLayout";
import { handleSubmit } from "@/Hooks/handleSubmit";
import { useEffect, useState } from "react";

function ButtonLayout({processing, setData, roles, data, selectedForm, selectedTabIndex}){
  return (
    <>
      {(selectedForm.status === "For Submission" || selectedForm.status === "Revision" || selectedForm.status === "Draft")  ? (
        <TwoButtonsModal 
          selectedTabIndex={selectedTabIndex}
          form={selectedForm}
          processing={processing}
          firstButton="Update CAR Forms"
          secondButton="Saved to Drafts"
          firstButtonClick={() => setData({...data, 
            status: roles.includes("Department Head") 
              ? selectedForm.status === "Revision" 
                ? "Approver's Revised" 
                : "Approver's Review" 
              : selectedForm.status === "Revision" 
                ? "Manager's Revised" 
                : "Manager's Review"
              }
            )
          }
          secondButtonClick={() => {setData({...data, status: selectedForm.status === "Revision" ? "Revision" : "Draft"})}}
        />
      ) : (selectedForm.status === "Manager's Review" || selectedForm.status === "Manager's Revised") ? (
            <TwoButtonsModal 
              selectedTabIndex={selectedTabIndex}
              form={selectedForm}
              processing={processing}
              firstButton="Return to Owner"
              secondButton="Approve"
              firstButtonClick={() => {setData({...data, status: "Revision"})}}
              secondButtonClick={() => {setData({...data, status: "Approver's Review"})}}
            />
        ) : (
          <TwoButtonsModal 
            selectedTabIndex={selectedTabIndex}
            form={selectedForm}
            processing={processing}
            firstButton="Return to Owner"
            secondButton="Approve"
            firstButtonClick={() => {setData({...data, status: "Revision"})}}
            secondButtonClick={() => {setData({...data, status: "Approved"})}}
          />
        )
      }
    </>
  );
}

export default function ModalLayout({title, openModal, closingModal, selectedForm, roles, forms}){
  const {selectedTabIndex, setSelectedTabIndex} = useSelectedTabIndex();
  const { data, setData, post, put, errors, processing } = useFormData(selectedForm);
  const { sameCorrection, setSameCorrection } = SameAsCorrection({setData, data});
  const { checked, setChecked, handleCheckboxChange } = RootCauseCheckBox(setData);
  const {handleSubmitPending, handleUpdateSubmit, handleDepartmentHeadSubmit, handleApproverSubmit} = handleSubmit(data, post, put, closingModal, selectedForm);
  const [openFeedback, setOpenFeedback] = useState({
    feedback_correction: false,
    feedback_consequence: false,
    feedback_deal_consequence: false,
    feedback_root_cause_analysis: false,
    feedback_corrective_action: false,
    feedback_potential_nonconformity: false,
    feedback_risk_assessment: false,
  });
  const RootCauseAnalysisValue = () => {
    const rootCauseDatas = selectedForm.rootCauseAnalysis;
    const rootCauseDataFormat = { ...data.root_cause_analysis };
    const checkedRootCause = { ...checked };
  
    rootCauseDatas.forEach((rootCauseData) => {
      if (rootCauseData.type in rootCauseDataFormat) {
        const existingValue = rootCauseDataFormat[rootCauseData.type].some((item) => item.value === rootCauseData.value);
  
        if (!existingValue) {
          rootCauseDataFormat[rootCauseData.type] = [
            ...rootCauseDataFormat[rootCauseData.type],
            { value: rootCauseData.value }
          ];
        }
        checkedRootCause[rootCauseData.type] = true;
      }
    });
  
    setData({
      ...data,
      root_cause_analysis: rootCauseDataFormat,
    });
    
    setChecked(checkedRootCause);
  };
  const FeedbackManager = () => {
    if(selectedForm.status === "Revision" || selectedForm.status === "Manager's Revised" || selectedForm.status === "Approver's Revised"){
      const managersFeedbacks = selectedForm.feedbackManager;
      const approversFeedbacks = selectedForm.feedbackApprover;
      const feedbackTransformed = { ...data.feedback };
      const checkedFeedbackManager = { ...openFeedback };
    
      const updateFeedback = (feedbacks) => {
        feedbacks.forEach((feedback) => {
          if (feedback.element_type in feedbackTransformed) {
            feedbackTransformed[feedback.element_type] = feedback.feedback;
            checkedFeedbackManager[feedback.element_type] = true;
          }
        });
      };
    
      if (!approversFeedbacks || approversFeedbacks.length === 0) {
        updateFeedback(managersFeedbacks);
      } else {
        updateFeedback(approversFeedbacks);
      }
    
      setOpenFeedback(checkedFeedbackManager);
      setData({
        ...data,
        feedback: feedbackTransformed,
      });
    }
  };
  
  useEffect(() => {
    if(selectedForm){
      FeedbackManager();
    }
  }, []);
  return (
    <Modal show={openModal} onClose={closingModal} maxWidth="5xl">
      <div className='p-8 flex items-center'>
        <FaFolderPlus size={28} />
        <h2 className='text-2xl ms-2'>{title}</h2>
      </div>
      <hr className="h-0.5 bg-[#949494] border-none"/>
      <ModalForm 
        handleSubmit={
          selectedForm.status === "For Submission" 
          ? handleSubmitPending 
          : selectedForm.status === "Manager's Review" || selectedForm.status === "Manager's Revised" 
            ? handleDepartmentHeadSubmit 
            : selectedForm.status === "Approver's Review" || selectedForm.status === "Approver's Revised" 
              ? handleApproverSubmit 
              : handleUpdateSubmit
        }
      >
        <PageTabGroup setSelectedIndex={setSelectedTabIndex}>
          <PageTablist className="pt-4">
            <PageTab className="px-5 text-base">
              Correction
            </PageTab>
            {selectedForm.source !== "Request For Action" && (
              <>
                <PageTab className="px-5 text-base" onClick={RootCauseAnalysisValue}>
                  Root Cause Analysis
                </PageTab>
                <PageTab className="px-5 text-base" onClick={RootCauseAnalysisValue}>
                  Corrective Action
                </PageTab>
                <PageTab className="px-5 text-base">
                  Risk Assessment
                </PageTab>
              </>
            )}
          </PageTablist>
          <PageTabPanels>
            <PageTabPanel>
              <div className="px-8 py-4">
                <CorrectionTabLayout 
                  form={selectedForm}
                  data={data}
                  setData={setData}
                  errors={errors}
                  sameCorrection={sameCorrection}
                  setSameCorrection={setSameCorrection}
                  openFeedback={openFeedback}
                  setOpenFeedback={setOpenFeedback}
                />
              </div>
            </PageTabPanel>
            {selectedForm.source !== "Request For Action" && (
              <>
                <PageTabPanel>
                  <div className="px-8 py-4">
                    <RootCauseANalysisTabLayout 
                      form={selectedForm}
                      checked={checked}
                      handleCheckboxChange={handleCheckboxChange}
                      data={data}
                      setData={setData}
                      errors={errors}
                      openFeedback={openFeedback}
                      setOpenFeedback={setOpenFeedback}
                    />
                  </div>
                </PageTabPanel>
                <PageTabPanel>
                  <div className="px-8 py-4">
                    <CorrectiveActionLayout
                      forms={forms}
                      userForm={selectedForm}
                      data={data}
                      setData={setData}
                      errors={errors}
                      checked={checked}
                      openFeedback={openFeedback}
                      setOpenFeedback={setOpenFeedback}
                    />
                  </div>
                </PageTabPanel>
                <PageTabPanel>
                  <div className="px-8 py-4">
                    <RiskAssessmentTabLayout 
                      form={selectedForm}
                      data={data}
                      setData={setData}
                      errors={errors}
                      openFeedback={openFeedback}
                      setOpenFeedback={setOpenFeedback}
                    />
                  </div>
                </PageTabPanel>
              </>
            )}
          </PageTabPanels>
        </PageTabGroup>
        <ButtonLayout 
          processing={processing}
          setData={setData}
          roles={roles}
          data={data}
          selectedForm={selectedForm}
          selectedTabIndex={selectedTabIndex}
        />
      </ModalForm>
    </Modal>
  );
}