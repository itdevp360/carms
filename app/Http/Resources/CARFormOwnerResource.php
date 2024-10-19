<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CARFormOwnerResource extends JsonResource
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
            'correction' => $this->correction,
            'date_correction' => $this->date_correction,
            'consequence' => $this->consequence,
            'deal_consequence' => $this->deal_consequence,
            'date_deal_consequence' => $this->date_deal_consequence,
            'corrective_action' => $this->corrective_action,
            'date_corrective_action' => $this->date_corrective_action,
            'similar_nonconformity' => $this->similar_nonconformity,
            'potential_nonconformity' => $this->potential_nonconformity,
            'date_potential_nonconformity' => $this->date_potential_nonconformity,
        ];
    }
}
