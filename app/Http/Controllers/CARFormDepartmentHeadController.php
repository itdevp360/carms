<?php

namespace App\Http\Controllers;

use App\Models\CARFormProcessor;

use App\Http\Resources\CARFormProcessorResource;

use App\Services\FeedbackManagerService;

use App\Http\Requests\StoreCARFormDepartmentHeadRequest;

use App\Jobs\SendEmailRevisionJobs;
use App\Jobs\SendEmailApproversReviewJobs;
use App\Jobs\SendEmailApproversRevisedJobs;

class CARFormDepartmentHeadController extends Controller
{
    public function __construct()
    {
        $this->authorize('Department Head');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = CarFormProcessor::where('department_head_id', auth()->user()->id)
        ->whereIn('status', ["Manager's Review", "Manager's Revised"])
        ->with('feedbackManager','rootCauseAnalysis', 'carFormOwner', 'riskAssessment')
        ->latest('updated_at')
        ->get();
        return inertia('ReviewCarForm/ReviewForm', [
            'forms' => CARFormProcessorResource::collection($forms),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCARFormDepartmentHeadRequest $request, FeedbackManagerService $feedbackManager)
    {
        $data = $request->validated();
        $form = $feedbackManager->createFeedbackManager($data);
        $this->updatingStatus($form, $data);
        $data['status'] === "Revision" && SendEmailRevisionJobs::dispatch($data['car_form_id']);
        $data['status'] === "Approver's Review" && SendEmailApproversReviewJobs::dispatch($data['car_form_id']);
        $data['status'] === "Approver's Revised" && SendEmailApproversRevisedJobs::dispatch($data['car_form_id']);
    }
}
