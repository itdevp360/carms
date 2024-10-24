<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;

use App\Mail\SendEmailApproversReview;

use App\Models\CARFormProcessor;

class SendEmailApproversReviewJobs implements ShouldQueue
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
        $dueDate = Carbon::now()->addDays(3);
        if ($dueDate->isWeekend()) {
            $dueDate = $dueDate->next(Carbon::MONDAY);
        }
        $details = [
            'receiver_name' => $form->approvedBy->name,
            'car_form_number' => $form->car_form_number,
            'label' => $form->source === "Request For Action" 
                ? "Request For Action (RFA)" 
                : "Corrective Action Request (CAR)",
            'subject' => $form->source === "Request For Action" 
                ? "[No Reply] ". $form->car_form_number .", Deadline: ".$dueDate->format('M d, Y')." (Approver's Review)" 
                : "[No Reply] CAR Ref. #: ". $form->car_form_number .", Deadline: ".$dueDate->format('M d, Y')." (Approver's Review)",
            'id' => $form->id,
            'status' => $form->status,
        ];
        Mail::to($form->approvedBy->email)->cc($form->emailCc->pluck('email')->toArray())->send(new SendEmailApproversReview($details));
    }
}
