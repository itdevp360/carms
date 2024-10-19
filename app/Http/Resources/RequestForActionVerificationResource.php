<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Carbon\Carbon;

class RequestForActionVerificationResource extends JsonResource
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
            'result_of_the_action' => $this->result_of_the_action,
            'close_out_follow_up' => $this->close_out_follow_up,
            'created_at' => (new Carbon($this->created_at))->addWeeks(1)->format('M, d Y'),
        ];
    }
}
