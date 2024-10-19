<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'risk' => $this->risk,
            'weakness' => $this->weakness,
            'threat' => $this->threat,
            'p' => $this->p,
            's' => $this->s,
            'r' => $this->r,
            'classification' => $this->classification,
        ];
    }
}
