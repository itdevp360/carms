import { useForm } from '@inertiajs/react';
import { rootCauseAnalysisDefaultFormat } from '@/constant';

export function useFormData(selectedForm = {}) {
  const initialData = {
    car_form_id: selectedForm?.id || '',
    correction: selectedForm?.carFormOwner?.correction || '',
    date_correction: selectedForm?.carFormOwner?.date_correction || '',
    consequence: selectedForm?.carFormOwner?.consequence || '',
    deal_consequence: selectedForm?.carFormOwner?.deal_consequence || '',
    date_deal_consequence: selectedForm?.carFormOwner?.date_deal_consequence || '',
    corrective_action: selectedForm?.carFormOwner?.corrective_action || '',
    date_corrective_action: selectedForm?.carFormOwner?.date_corrective_action || '',
    similar_nonconformity: selectedForm?.carFormOwner?.similar_nonconformity === 'no' ? 'no' : selectedForm?.carFormOwner?.similar_nonconformity === null || selectedForm?.carFormOwner?.similar_nonconformity === undefined ? '' : 'yes',
    yes_similar_nonconformity: selectedForm?.carFormOwner?.similar_nonconformity === 'no' ? '' : selectedForm?.carFormOwner?.similar_nonconformity,
    potential_nonconformity: selectedForm?.carFormOwner?.potential_nonconformity === 'no' ? 'no' : selectedForm?.carFormOwner?.potential_nonconformity === null || selectedForm?.carFormOwner?.potential_nonconformity === undefined ? '' : 'yes',
    yes_potential_nonconformity: selectedForm?.carFormOwner?.potential_nonconformity === 'no' ? '' : selectedForm?.carFormOwner?.potential_nonconformity,
    date_potential_nonconformity: selectedForm?.carFormOwner?.potential_nonconformity !== 'no' ? selectedForm?.carFormOwner?.date_potential_nonconformity : '',
    root_cause_analysis: selectedForm?.carFormOwner?.root_cause_analysis || rootCauseAnalysisDefaultFormat,
    risk_assessment: selectedForm?.riskAssessment?.length > 0 ? selectedForm.riskAssessment : [{
      risk: '',
      weakness: '',
      threat: '',
      p: '',
      s: '',
      r: '',
      classification: '',
    }],
    status: selectedForm?.status || '',
    feedback: {
      feedback_correction: "",
      feedback_consequence: "",
      feedback_deal_consequence: "",
      feedback_root_cause_analysis: "",
      feedback_corrective_action: "",
      feedback_potential_nonconformity: "",
      feedback_risk_assessment: "",
    },
  };

  const { data, setData, post, put, errors, processing } = useForm(initialData);

  return {
    data,
    setData,
    post,
    put,
    errors,
    processing,
  };
}
