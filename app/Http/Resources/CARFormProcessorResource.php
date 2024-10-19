<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CARFormProcessorResource extends JsonResource
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
            'car_form_number' => $this->car_form_number,
            'issue_type' => $this->issue_type,
            'source' => $this->source,
            'nonconformance_classification' => $this->nonconformance_classification,
            'nonconformance_observation' => $this->nonconformance_observation,
            'auditor_initiator' => $this->auditor_initiator,
            'date_reported_to_ims' => (new Carbon($this->date_reported_to_ims))->format('M, d Y'),
            'created_at' => (new Carbon($this->created_at))->format('M, d Y'),
            'updated_at' => (new Carbon($this->updated_at))->format('M, d Y'),
            'concerned_department' => $this->concerned_department,
            'status' => $this->status,
            'created_by' => new UserResource($this->createdBy),
            'approver_id' => new UserResource($this->approvedBy),
            'receiver_id' => new UserResource($this->receivedBy),
            'department_head_id' => new UserResource($this->dptHead),
            'rootCauseAnalysis' => RootCauseResource::collection($this->rootCauseAnalysis),
            'carFormOwner' => new CarFormOwnerResource($this->carFormOwner),
            'riskAssessment' => ClassificationResource::collection($this->riskAssessment),
            'feedbackManager' => FeedbackResource::collection($this->feedbackManager),
            'feedbackApprover' => FeedbackResource::collection($this->feedbackApprover),
            'verification' => VerificationResource::collection($this->verification),
        ];
    }
}
