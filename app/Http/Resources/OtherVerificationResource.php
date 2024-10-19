<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherVerificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'verification_id' => $this->verification_id,
            'correction_implemented_still_implemented' => $this->correction_implemented_still_implemented,
            'corrective_action_effective' => $this->corrective_action_effective,
            'others_verification' => $this->others_verification,
            'conclusion' => $this->conclusion,
        ];
    }
}
