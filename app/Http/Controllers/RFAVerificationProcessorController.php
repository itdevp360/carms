<?php

namespace App\Http\Controllers;

use App\Models\RequestForActionVerification;
use App\Models\Verification;

use App\Http\Requests\StoreRFAVerificationRequest;
use App\Http\Requests\UpdateRFAVerificationRequest;

use App\Services\VerificationProcessorService;

class RFAVerificationProcessorController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRFAVerificationRequest $request, VerificationProcessorService $verification)
    {
        $data = $request->validated();
        $verificationForm = Verification::create($data);
        $form = $verification->creatingVerification($verificationForm->id, $data, RequestForActionVerification::class);   
        $verificationCount = $verification->getStage(Verification::where('car_form_id', $data['car_form_id'])->count());
        $this->updatingStatusVerification($data, $verificationCount);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRFAVerificationRequest $request, $id, VerificationProcessorService $verification)
    {
        $data = $request->validated();
        $verification->updatingRFAVerification($data, $id);
        if($data['status'] === "Approved" || $data['status'] === "Review"){
            $verification->creatingVerification($id, $data, RequestForActionVerification::class);
        }else if($data['status'] === "Closed"){
            $this->updatingStatusVerification($data, "Closed");
        }
    }
}
