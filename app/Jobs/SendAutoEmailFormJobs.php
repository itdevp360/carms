<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;

use App\Mail\SendAutoEmailForm;

use App\Models\CARFormProcessor;

class SendAutoEmailFormJobs implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $now = Carbon::now();

        $carForms = CARFormProcessor::where(function ($query) use ($now) {
            $query->where(function ($q) use ($now) {
                $q->whereIn('status', ['For Submission', 'Draft'])
                ->whereRaw("DATE_ADD(created_at, INTERVAL 7 DAY) < ?", [$now])
                ->where(function ($q) use ($now) {
                    $q->whereRaw("DATEDIFF(DATE_ADD(created_at, INTERVAL 7 DAY), ?) = 3", [$now])
                        ->orWhereRaw("DATEDIFF(DATE_ADD(created_at, INTERVAL 7 DAY), ?) = 2", [$now])
                        ->orWhereRaw("DATEDIFF(DATE_ADD(created_at, INTERVAL 7 DAY), ?) = 1", [$now])
                        ->orWhereRaw("DATEDIFF(DATE_ADD(created_at, INTERVAL 7 DAY), ?) = 0", [$now]);
                });
            });
        })->get();

        foreach ($carForms as $carForm) {
            // Calculate days left until deadline
            $deadline = Carbon::parse($carForm->created_at)->addDays(7);
            $daysLeft = floor($deadline->diffInSeconds($now) / 86400);

            // Determine day label based on the days left
            if ($daysLeft == 0) {
                $day_label = "Today is";
            } else {
                $day_label = $daysLeft . " Day/s before the";
            }

            $details = [
                'receiver_name' => $carForm->receivedBy->name,
                'car_form_number' => $carForm->car_form_number,
                'redirect_link' => "",
                'reply_due_date' => $deadline->format('M d, Y'),
                'label' => $carForm->source === "Request For Action"
                    ? "Request For Action (RFA)"
                    : "Corrective Action Request (CAR)",
                // Dynamic subject with day label
                'subject' => $carForm->source === "Request For Action"
                    ? "[No Reply] " . $carForm->car_form_number . ", Deadline: " . $deadline->format('M d, Y') . " (REMINDER: " . $day_label . " Submission of CAR Form)"
                    : "[No Reply] CAR Ref. #: " . $carForm->car_form_number . ", Deadline: " . $deadline->format('M d, Y') . " (REMINDER: " . $day_label . " Submission of CAR Form)",
                'id' => $carForm->id,
                'status' => $carForm->status,
            ];

            // Send the email
            Mail::to($carForm->receivedBy->email)
                ->cc($carForm->emailCc->pluck('email')->toArray())
                ->send(new SendAutoEmailForm($details));
        }
    }
}
