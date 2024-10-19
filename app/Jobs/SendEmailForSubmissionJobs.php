<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;

use App\Mail\SendEmailForSubmission;

class SendEmailForSubmissionJobs implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public $form)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $details = [
            'receiver_name' => $this->form->receivedBy->name,
            'source' => $this->form->source,
            'car_form_number' => $this->form->source === "Request For Action" 
                ? "Request For Action form with ". $this->form->car_form_number
                : "CAR form with CAR No. ". $this->form->car_form_number,
            'redirect_link' => "",
            'reply_due_date' => Carbon::now()->addDays(7)->format('M d, Y'),
            'label' => $this->form->source === "Request For Action" 
                ? "Request For Action (RFA)" 
                : "Corrective Action Request (CAR)",
            'subject' => $this->form->source === "Request For Action" 
                ? "[No Reply] ". $this->form->car_form_number .", Deadline: ".Carbon::now()->addDays(7)->format('M d, Y')." (Pending)" 
                : "[No Reply] CAR Ref. #: ". $this->form->car_form_number .", Deadline: ".Carbon::now()->addDays(7)->format('M d, Y')." (Pending)",
            'id' => $this->form->id,
            'status' => $this->form->status,
        ];
        Mail::to($this->form->email_receiver)->cc($this->form->emailCc->pluck('email')->toArray())->send(new SendEmailForSubmission($details));
    }
}
