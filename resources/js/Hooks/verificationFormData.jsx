import { useForm } from "@inertiajs/react";

export function firstVerificationFormData(form = {}){
  const verificationForm = form?.verification[0]?.status === "Revision" ? form?.verification[0]?.first_verification : form?.verification[0]?.firstVerification;
  
  const { data, setData, post, put, errors, processing, reset } = useForm({
    car_form_id: form?.id,
    person_responsible_id: (form.status === "Approved" || form?.verification[0]?.status === "Revision") ? form.receiver_id : form.receiver_id.id,
    status: "Review",
    approver_id: form?.verification[0]?.status === "Revision" ? form?.verification[0]?.approver_id : form?.verification[0]?.approver_id.id || "",
    correction_implemented: verificationForm?.correction_implemented || "",
    consequence_dealt: verificationForm?.consequence_dealt || "",
    corrective_action_implemented: 
      verificationForm?.corrective_action_implemented === "yes" 
        ? "yes" 
        : verificationForm?.corrective_action_implemented === null || 
          verificationForm?.corrective_action_implemented === undefined 
            ? "" : 'no',
    no_corrective_action_implemented: 
      verificationForm?.corrective_action_implemented !== "yes" 
        ? verificationForm?.corrective_action_implemented 
        : "",
    potential_nonconformity: verificationForm?.potential_nonconformity || "",
    others_verification: verificationForm?.others_verification || "",
    conclusion: 
    ["For Further Verification", "For Closure", "Corrective Action not Effective"].includes(verificationForm?.conclusion)
      ? verificationForm?.conclusion 
      : verificationForm?.conclusion === null || verificationForm?.conclusion === undefined
        ? "" 
        : "others",
    other_conclusion: 
      !["For Further Verification", "For Closure", "Corrective Action not Effective"].includes(verificationForm?.conclusion)
        ? verificationForm?.conclusion 
        : "",
    feedback: {
      feedback_correction_implemented: "",
      feedback_consequence_dealt: "",
      feedback_corrective_action_implemented: "",
      feedback_potential_nonconformity_verification: "",
      feedback_others_verification: "",
    },
  });
  return {data, setData, post, put, errors, processing, reset};
}