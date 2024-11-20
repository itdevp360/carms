<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

use App\Mail\SendEmailApproved;

use App\Models\CARFormProcessor;

class SendEmailClosedJobs implements ShouldQueue
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
            'receiver_name' => $form->receivedBy->name,
            'car_form_number' => $form->car_form_number,
            'label' => $form->source === "Request For Action" 
                ? "Request For Action (RFA)" 
                : "Corrective Action Request (CAR)",
            'subject' => $form->source === "Request For Action" 
                ? "[No Reply] ". $form->car_form_number ." (Closed)" 
                : "[No Reply] CAR Ref. #: ". $form->car_form_number ." (Closed)",
            'department' => $form->concerned_department,
        ];
        Mail::to($form->email_receiver)->cc($form->emailCc->pluck('email')->toArray(), $form->dptHead->email)->send(new SendEmailClosed($details));
    }
}
