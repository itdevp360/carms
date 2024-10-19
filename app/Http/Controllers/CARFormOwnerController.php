<?php

namespace App\Http\Controllers;

use App\Models\CarFormOwner;
use App\Models\CARFormProcessor;

use App\Http\Resources\CARFormProcessorResource;
use App\Http\Resources\CARFormOwnerResource;

use App\Http\Requests\StoreCARFormOwnerRequest;
use App\Http\Requests\UpdateCARFormOwnerRequest;

use App\Services\CarFormOwnerCreatingService;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Jobs\SendEmailManagersReviewJobs;
use App\Jobs\SendEmailManagersRevisedJobs;
use App\Jobs\SendEmailApproversReviewJobs;
use App\Jobs\SendEmailApproversRevisedJobs;

class CARFormOwnerController extends Controller
{
    public function __construct()
    {
        $this->authorizeMultipleRoles(['Process Owner', 'Department Head', 'Processor']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $forms = CarFormProcessor::where('receiver_id', auth()->user()->id)
        ->whereIn('status', ['For Submission', 'Revision', 'Draft'])
        ->latest('updated_at')
        ->with(['feedbackManager', 'rootCauseAnalysis', 'carFormOwner', 'riskAssessment'])
        ->get();

        return inertia('PendingCarForm/PendingForm', [
            'forms' => CARFormProcessorResource::collection($forms),
        ]);

    }

    public function store(StoreCARFormOwnerRequest $request, CarFormOwnerCreatingService $formOwnerCreating)
    {
        $data = $request->validated();
        $form = CarFormOwner::create($data);
        $this->handleNonconformities($form, $data);
        $this->updatingStatus($form, $data);
        $formOwnerCreating->createRootCauseAnalysis($data, $form);
        $formOwnerCreating->createRiskAssessment($data, $form);
        $data['status'] === "Manager's Review" && SendEmailManagersReviewJobs::dispatch($form->car_form_id);
        $data['status'] === "Approver's Review" && SendEmailApproversReviewJobs::dispatch($form->car_form_id);
        $data['status'] === "Approver's Revised" && SendEmailApproversRevisedJobs::dispatch($form->car_form_id);
    }
    
    public function update(UpdateCARFormOwnerRequest $request, CarFormOwner $carFormOwner, CarFormOwnerCreatingService $formOwnerCreating)
    {
        $data = $request->validated();
        $carFormOwner->update($data);
        $this->handleNonconformities($carFormOwner, $data);
        $this->updatingStatus($carFormOwner, $data);
        $formOwnerCreating->createRootCauseAnalysis($data, $carFormOwner);
        $formOwnerCreating->createRiskAssessment($data, $carFormOwner);
        $data['status'] === "Manager's Review" && SendEmailManagersReviewJobs::dispatch($data['car_form_id']);
        $data['status'] === "Manager's Revised" && SendEmailManagersRevisedJobs::dispatch($data['car_form_id']);
        $data['status'] === "Approver's Review" && SendEmailApproversReviewJobs::dispatch($data['car_form_id']);
        $data['status'] === "Approver's Revised" && SendEmailApproversRevisedJobs::dispatch($data['car_form_id']);
    }
}
