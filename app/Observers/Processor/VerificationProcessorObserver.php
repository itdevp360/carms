<?php

namespace App\Observers\Processor;

use App\Models\Verification;

use App\Services\VerificationProcessorService;

class VerificationProcessorObserver
{
    public function __construct(VerificationProcessorService $verificationProcessorService)
    {
        $this->verificationProcessorService = $verificationProcessorService;
    }
    /**
     * Handle the Verification "created" event.
     */
    public function creating(Verification $verification): void
    {
        $this->verificationProcessorService->setCreatorId($verification);
        $this->verificationProcessorService->setVerificationStage($verification);
    }

    /**
     * Handle the Verification "updated" event.
     */
    public function updated(Verification $verification): void
    {
        //
    }

    /**
     * Handle the Verification "deleted" event.
     */
    public function deleted(Verification $verification): void
    {
        //
    }

    /**
     * Handle the Verification "restored" event.
     */
    public function restored(Verification $verification): void
    {
        //
    }

    /**
     * Handle the Verification "force deleted" event.
     */
    public function forceDeleted(Verification $verification): void
    {
        //
    }
}
