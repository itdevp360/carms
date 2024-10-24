<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;

use App\Mail\SendEmailApproved;

use App\Models\CARFormProcessor;

class SendEmailApprovedJobs implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public $formId)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $form = CARFormProcessor::findOrFail($this->formId);
        $details = [
            'receiver_name' => $form->createdBy->name,
            'car_form_number' => $form->car_form_number,
            'label' => $form->source === "Request For Action" 
                ? "Request For Action (RFA)" 
                : "Corrective Action Request (CAR)",
            'subject' => $form->source === "Request For Action" 
                ? "[No Reply] ". $form->car_form_number ." (Approved)" 
                : "[No Reply] CAR Ref. #: ". $form->car_form_number ." (Approved)",
            'department' => $form->concerned_department,
        ];
        Mail::to($form->createdBy->email)->cc($form->emailCc->pluck('email')->toArray())->send(new SendEmailApproved($details));
    }
}
