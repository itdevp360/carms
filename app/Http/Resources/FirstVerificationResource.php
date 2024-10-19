<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FirstVerificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'verification_id' => $this->verification_id,
            'correction_implemented' => $this->correction_implemented,
            'consequence_dealt' => $this->consequence_dealt,
            'corrective_action_implemented' => $this->corrective_action_implemented,
            'potential_nonconformity' => $this->potential_nonconformity,
            'others_verification' => $this->others_verification,
            'conclusion' => $this->conclusion,
        ];
    }
}
