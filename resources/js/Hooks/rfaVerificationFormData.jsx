import { useForm } from "@inertiajs/react";

export function rfaVerificationFormData(form = {}) {
  const lastVerification = form?.verification?.at(-1);
  const lastRfaVerification = lastVerification?.rfaVerification?.at(-1) || {}; 

  const createNewVerification = lastVerification && (
    lastVerification.status === "Review"
  );

  const defaultCloseOutFollowUp = lastRfaVerification?.close_out_follow_up ?? 0;

  const { data, setData, post, put, errors, processing } = useForm({
    car_form_id: form?.id, 
    person_responsible_id: (form?.status === "Approved" || lastVerification?.status === "Approved") ? form?.receiver_id : form?.receiver_id?.id, 
    status: "", 
    approver_id: lastVerification?.status === "Approved" ? lastVerification?.approver_id : lastVerification?.approver_id?.id || "",
    result_of_the_action: createNewVerification
      ? lastRfaVerification?.result_of_the_action || "" 
      : "",
    close_out_follow_up: createNewVerification
      ? defaultCloseOutFollowUp
      : "",
  });

  return { data, setData, post, put, errors, processing };
}
