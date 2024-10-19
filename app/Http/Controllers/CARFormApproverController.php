<?php

namespace App\Http\Controllers;

use App\Models\CarFormProcessor;

use App\Http\Requests\StoreCarFormApproverRequest;
use App\Http\Requests\UpdateCarFormApproverRequest;

use App\Http\Resources\CARFormProcessorResource;

use App\Services\FeedbackManagerService;

use App\Jobs\SendEmailRevisionJobs;
use App\Jobs\SendEmailApprovedJobs;

class CARFormApproverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = CarFormProcessor::where('department_head_id', auth()->user()->id)
        ->whereIn('status', ["Approver's Review", "Approver's Revised"])
        ->with('feedbackApprover','rootCauseAnalysis', 'carFormOwner', 'riskAssessment')
        ->latest('updated_at')
        ->get();
        return inertia('CarFormApproverReview/ApproverReviewForm', [
            'forms' => CARFormProcessorResource::collection($forms),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCARFormApproverRequest $request, FeedbackManagerService $feedback)
    {
        $data = $request->validated();
        $form = $feedback->createFeedbackApprover($data);
        $this->updatingStatus($form, $data);
        $data['status'] === "Revision" && SendEmailRevisionJobs::dispatch($data['car_form_id']);
        $data['status'] === "Approved" && SendEmailApprovedJobs::dispatch($data['car_form_id']);
    }
}
