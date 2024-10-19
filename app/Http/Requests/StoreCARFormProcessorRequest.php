<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCARFormProcessorRequest extends FormRequest
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
            'issue_type' => ['required_unless:source,Request For Action', 'nullable'],
            'related_issue_type' => ['required_if:issue_type,Re-Issue', 'nullable'],
            'source' => ['required_without:other_source,others', 'nullable'],
            'other_source' => ['required_if:source,others', 'nullable'],
            'nonconformance_classification' => ['required'],
            'nonconformance_observation' => ['required', 'string'],
            'auditor_initiator' => ['required'],
            'date_reported_to_ims' => ['required', 'date'],
            'concerned_department' => ['required', 
                Rule::in([
                    'Testing',
                    'IH WEM',
                    'Consulting',
                    'OSHMS',
                    'HR',
                    'Sales',
                    'Marketing',
                    'FAD',
                    'IT',
                    'IMS',
                    'ESH',
                    'Top Management',
                    'IH Lab',
                ])
            ],
            'status' => ['required'],
            // 'created_by' => ['required', 'exists:users,id'],
            'approver_id' => ['required', 'exists:users,id'],
            'receiver_id' => ['required', 'exists:users,id'],
            'email_receiver' => ['required'],
            'groups' => ['array', 'nullable'],
            'groups.*.reference' => ['string', 'nullable'],
            'groups.*.isoClauses' => ['array', 'nullable'],
            'groups.*.isoClauses.*.clause' => ['string', 'nullable'],
            'groups.*.isoClauses.*.subClause' => ['string', 'nullable'],
            'email_cc' => ['array', 'nullable'],
            'email_cc.*.value' => ['nullable', 'email'],
        ];
    }
}
