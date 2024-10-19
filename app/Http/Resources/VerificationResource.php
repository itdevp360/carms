<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VerificationResource extends JsonResource
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
            'car_form_id' => $this->car_form_id,
            'verification_stage' => $this->verification_stage,
            'status' => $this->status,
            'approver_id' => new UserResource($this->approvedBy),
            'creatorId' => new UserResource($this->creatorId),
            'firstVerification' => new FirstVerificationResource($this->firstVerification),
            'otherVerification' => new OtherVerificationResource($this->otherVerification),
            'rfaVerification' => RequestForActionVerificationResource::collection($this->rfaVerification),
            'updated_at' => (new Carbon($this->updated_at))->format('M, d Y'),
        ];
    }
}
