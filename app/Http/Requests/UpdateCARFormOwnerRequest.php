<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCARFormOwnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'car_form_id' => ['required', 'exists:car_form_processors,id'],
            'correction' => ['nullable'],
            'date_correction' => ['nullable', 'date'],
            'consequence' => ['nullable'],
            'deal_consequence' => ['nullable'],
            'date_deal_consequence' => ['nullable', 'date'],
            'corrective_action' => ['nullable'],
            'date_corrective_action' => ['nullable', 'date'],
            'similar_nonconformity' => ['nullable'],
            'yes_similar_nonconformity' => ['nullable'],
            'potential_nonconformity' => ['nullable'],
            'yes_potential_nonconformity' => ['nullable'],
            'date_potential_nonconformity' => ['nullable', 'date'],
            'root_cause_analysis' => ['array', 'nullable'],
            'root_cause_analysis.manpower.*.value' => ['nullable'],
            'root_cause_analysis.machinery.*.value' => ['nullable'],
            'root_cause_analysis.method.*.value' => ['nullable'],
            'root_cause_analysis.material.*.value' => ['nullable'],
            'root_cause_analysis.motherNature.*.value' => ['nullable'],
            'root_cause_analysis.measurement.*.value' => ['nullable'],
            'root_cause_analysis.others.*.value' => ['nullable'],
            'risk_assessment' => ['array', 'nullable'],
            'status' => ['required', 
                Rule::in([
                    'Draft',
                    "Manager's Review",
                    "Approver's Review",
                    "Revised",
                    "Approver's Revised",
                ])
            ],
        ];
    }
}
