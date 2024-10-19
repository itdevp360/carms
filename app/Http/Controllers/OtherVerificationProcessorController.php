<?php

namespace App\Http\Controllers;

use App\Models\Verification;
use App\Models\OtherVerification;

use App\Http\Requests\StoreOtherVerificationRequest;
use App\Http\Requests\UpdateOtherVerificationRequest;

use App\Services\VerificationProcessorService;
use App\Services\FeedbackManagerService;

class OtherVerificationProcessorController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOtherVerificationRequest $request, VerificationProcessorService $verification)
    {
        $data = $request->validated();
        $verificationForm = Verification::create($data);
        $form = $verification->creatingVerification($verificationForm->id, $data, OtherVerification::class);   
        $this->handleVerification($form, $data);
        $verificationCount = $verification->getStage(Verification::where('car_form_id', $data['car_form_id'])->count());
        $this->updatingStatusVerification($data, $verificationCount);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOtherVerificationRequest $request, $id, VerificationProcessorService $verification, FeedbackManagerService $feedback)
    {
        $data = $request->validated();
        $feedback->createFeedbackApprover($data);
        $verification->updatingOtherVerification($data, $id);
        if($data['status'] === "Closed"){
            $this->updatingStatusVerification($data, "Closed");
        }
    }
}
