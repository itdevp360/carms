import React from 'react';
import { Accordion, AccordionTab } from "primereact/accordion";
import { BsFillChatSquareFill } from "react-icons/bs";
import {
  FaBuildingUser, FaCalendar, FaComment, FaFileCircleQuestion, FaHashtag,
  FaInbox, FaMagnifyingGlass, FaRegCircleQuestion, FaStar, FaUserTie
} from "react-icons/fa6";

const DetailsRow = ({ icon: Icon, label, value, colSpan = 3, iconSize = 16 }) => (
  <>
    <div className={`col-span-${colSpan} flex items-center mt-2 border-b-2 border-gray-300`}>
      <Icon className="text-gray-400 mr-2" size={iconSize} />
      <p className="text-base font-bold">{label}</p>
    </div>
    <div className={`col-span-${colSpan} flex items-center mt-2 border-b-2 border-gray-300`}>
      <p className="text-base">{value}</p>
    </div>
  </>
);

export default function FormAccordion({ forms, selectedIndex = null }) {
  const { car_form_owner = {} } = forms;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Accordion activeIndex={selectedIndex}>
      <AccordionTab header="View CAR Details" className="border border-gray-300">
        <div className="text-black grid gap-1 grid-cols-12">
          <DetailsRow icon={FaHashtag} label="CAR References Number: " value={forms.car_form_number} />
          <DetailsRow icon={FaStar} label="Status: " value={forms.status} />
          <DetailsRow icon={FaInbox} label="Source: " value={forms.source} />
          <DetailsRow icon={FaUserTie} label="Initiator: " value={forms.auditor_initiator} />
          <DetailsRow icon={FaCalendar} label="Date Reported to IMS: " value={formatDate(forms.date_reported_to_ims)} />
          <DetailsRow icon={FaBuildingUser} label="Concerned Department: " value={forms.concerned_department} />
          <DetailsRow icon={FaMagnifyingGlass} label="Non-conformance classification: " value={forms.nonconformance_classification} colSpan={6} />
          <DetailsRow icon={BsFillChatSquareFill} label="Description of CAR: " value={forms.nonconformance_observation} colSpan={6} />
          
          {forms.car_form_owner && (
            <>
              {car_form_owner.correction && (
                <DetailsRow icon={FaComment} label="Correction: " value={car_form_owner.correction} colSpan={6} />
              )}
              {forms.source !== "Request For Action" && (
                <>
                  {car_form_owner.consequence && (
                    <DetailsRow icon={FaComment} label="Consequence: " value={car_form_owner.consequence} colSpan={6} />
                  )}
                  {car_form_owner.deal_consequence && (
                    <DetailsRow icon={FaComment} label="How did you deal consequence: " value={car_form_owner.deal_consequence} colSpan={6} />
                  )}
                  {car_form_owner.corrective_action && (
                    <DetailsRow icon={FaComment} label="Corrective Action: " value={car_form_owner.corrective_action} colSpan={6} />
                  )}
                  
                  {car_form_owner.similar_nonconformity && (
                    <>
                      <DetailsRow icon={FaFileCircleQuestion} iconSize={25} label="Does a similar non-conformity exist?: " value={car_form_owner.similar_nonconformity === 'no' ? 'No' : 'Yes'} />
                      {car_form_owner.similar_nonconformity !== 'no' && (
                        <DetailsRow icon={FaInbox} iconSize={22} label="If yes, input CAR Reference No.: " value={car_form_owner.similar_nonconformity} />
                      )}
                    </>
                  )}
                  {car_form_owner.potential_nonconformity && (
                    <>
                      <DetailsRow icon={FaFileCircleQuestion} iconSize={35} label="Could a similar non-conformity potentially occur?: " value={car_form_owner.potential_nonconformity === 'no' ? 'No' : 'Yes'} />
                      {car_form_owner.potential_nonconformity !== 'no' && (
                        <DetailsRow icon={FaInbox} iconSize={50} label="If yes, identify the potential nonconformity and include corrective actions: " value={car_form_owner.potential_nonconformity} />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </AccordionTab>
      
      {/* Mapping over verifications */}
      {forms.verification?.map((verification, index) => (
        <AccordionTab key={`${verification.id} + ${index}`} header={`${verification.verification_stage}`} className="border border-gray-300">
          <div className="text-black grid gap-1 grid-cols-12">
            <DetailsRow icon={FaCalendar} label="Date Verified: " value={verification.status !== "Approved" ? "Not yet verified" : formatDate(verification.updated_at)} />
            <DetailsRow icon={FaUserTie} label="Verified By: " value={verification.approved_by.name} />
            {verification.rfa_verification && (
              <>
                {verification.rfa_verification.map((rfa, index) => (
                  <React.Fragment key={`rfa_${index}`}>
                    <DetailsRow icon={FaComment} label="Result of Verification: " value={rfa.result_of_the_action} colSpan={2} />
                    <DetailsRow icon={FaCalendar} label="Date Verified: " value={formatDate(rfa.created_at)} colSpan={2} />
                    <DetailsRow icon={FaRegCircleQuestion} label="Closed?: " value={rfa.close_out_follow_up === 0 ? "No" : "Yes" } colSpan={2} />
                  </React.Fragment>
                ))}
              </>
            )}
            {verification.first_verification && (
              <>
                <DetailsRow icon={FaComment} label="Correction Implemented: " value={verification.first_verification.correction_implemented} colSpan={6} />
                <DetailsRow icon={FaComment} label="Consequence Dealt: " value={verification.first_verification.consequence_dealt} colSpan={6} />
                <DetailsRow icon={FaComment} label="Corrective Action Implemented: " value={verification.first_verification.corrective_action_implemented} colSpan={6} />
                <DetailsRow icon={FaComment} label="Potential Non-Conformity: " value={verification.first_verification.potential_nonconformity} colSpan={6} />
                <DetailsRow icon={FaFileCircleQuestion} label="Other Verification: " value={verification.first_verification.others_verification} />
                <DetailsRow icon={FaFileCircleQuestion} label="Conclusion: " value={verification.first_verification.conclusion} />
              </>
            )}
            {verification.other_verification && (
              <>
                <DetailsRow icon={FaComment} label="Correction Still Implemented: " value={verification.other_verification.correction_implemented_still_implemented} colSpan={6} />
                <DetailsRow icon={FaComment} label="Corrective Action Effective: " value={verification.other_verification.corrective_action_effective} colSpan={6} />
                <DetailsRow icon={FaFileCircleQuestion} label="Other Verification: " value={verification.other_verification.others_verification} />
                <DetailsRow icon={FaFileCircleQuestion} label="Conclusion: " value={verification.other_verification.conclusion} />
              </>
            )}
            {forms.source !== "Request For Action" && (
              <DetailsRow icon={FaStar} label="Status: " value={verification.status} />
            )}
          </div>
        </AccordionTab>
      ))}
    </Accordion>
  );
}
