<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOtherVerificationRequest extends FormRequest
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
            'car_form_id' => ['required',],
            'status' => ['required',],
            'person_responsible_id' => ['required',],
            'approver_id' => ['required',],
            'correction_implemented_still_implemented' => ['required',],
            'corrective_action_effective' => ['required',],
            'others_verification' => ['required',],
            'conclusion' => ['required',],
            'other_conclusion' => ['nullable', 'required_if:conclusion,others'],
            'feedback'=>['array', 'nullable'],
        ];
    }
}
