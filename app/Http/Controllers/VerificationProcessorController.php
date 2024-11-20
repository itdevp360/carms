<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\FirstVerification;

use App\Http\Requests\StoreVerificationRequest;
use App\Http\Requests\UpdateVerificationRequest;

use App\Services\VerificationProcessorService;
use App\Services\FeedbackManagerService;

use App\Jobs\SendEmailClosedJobs;

class VerificationProcessorController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVerificationRequest $request, VerificationProcessorService $firstVerification)
    {
        $data = $request->validated();
        $verificationForm = Verification::create($data);
        $form = $firstVerification->creatingVerification($verificationForm->id, $data, FirstVerification::class);
        $this->handleVerification($form, $data);
        $this->updatingStatusVerification($data, "1st Verification");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVerificationRequest $request, $id, VerificationProcessorService $firstVerification, FeedbackManagerService $feedback)
    {
        $data = $request->validated();
        $firstVerification->updatingFirstVerification($data, $id);
        $feedback->createFeedbackApprover($data);
        if($data['status'] === "Closed"){
            $this->updatingStatusVerification($data, "Closed");
            SendEmailClosedJobs::dispatch($data['car_form_id']);
        }
    }
}
