import { useForm } from "@inertiajs/react";

export function otherVerificationFormData(form = {}) {
  const lastVerification = form?.verification?.at(-1).status === "Revision" ? form?.verification.at(-1).other_verification : form?.verification?.at(-1)?.otherVerification;
  const createNewVerification = (form?.verification?.at(-1).status === "Review" || 
  form?.verification?.at(-1).status === "Revised" ||
  form?.verification?.at(-1).status === "Revision");

  const { data, setData, post, put, errors, processing, reset } = useForm({
    car_form_id: form?.id,
    person_responsible_id: ["Verification"].some(status => form.status.includes(status)) ? form?.receiver_id : form?.receiver_id?.id,
    status: "",
    approver_id: createNewVerification
        ? form?.verification?.at(-1).status === "Revision" 
          ? form?.verification?.at(-1)?.approver_id 
          : form?.verification?.at(-1)?.approver_id?.id 
        : "",
    correction_implemented_still_implemented: createNewVerification ? lastVerification?.correction_implemented_still_implemented || "" : "",
    corrective_action_effective: createNewVerification ? lastVerification?.corrective_action_effective || "" : "",
    others_verification: createNewVerification ? lastVerification?.others_verification || "" : "",
    conclusion: createNewVerification ?
      ["For Further Verification", "For Closure", "Corrective Action not Effective"].includes(lastVerification?.conclusion)
        ? lastVerification?.conclusion
        : lastVerification?.conclusion === null || lastVerification?.conclusion === undefined
          ? "" 
          : "others" : "",
    other_conclusion: createNewVerification ?
      !["For Further Verification", "For Closure", "Corrective Action not Effective"].includes(lastVerification?.conclusion)
        ? lastVerification?.conclusion
        : "" : "",
    feedback: {
      feedback_correction_implemented_still_implemented: "",
      feedback_corrective_action_effective: "",
      feedback_others_verification: "",
    },
  });

  return { data, setData, post, put, errors, processing, reset };
}
