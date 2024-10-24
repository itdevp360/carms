<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Events\DelayFormsEvent;

use App\Models\CarFormProcessor;
use App\Models\DelayForms;

use Carbon\Carbon;

class SubmissionDelayListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DelayFormsEvent $event): void
    {
        $car_forms = CarFormProcessor::where(function ($query) {
            $query->where(function ($q) {
                $q->whereIn('status', ['For Submission', 'Draft'])
                  ->whereRaw("
                    CASE
                      WHEN WEEKDAY(DATE_ADD(created_at, INTERVAL 7 DAY)) >= 5 
                      THEN DATE_ADD(DATE_ADD(created_at, INTERVAL 7 DAY), INTERVAL (9 - WEEKDAY(DATE_ADD(created_at, INTERVAL 7 DAY))) DAY)
                      ELSE DATE_ADD(created_at, INTERVAL 7 DAY)
                    END < ?", [Carbon::now()]);
            })
            ->orWhere(function ($q) {
                $q->where('status', '=', 'Revision')
                  ->whereRaw("
                    CASE
                      WHEN WEEKDAY(DATE_ADD(updated_at, INTERVAL 3 DAY)) >= 5 
                      THEN DATE_ADD(DATE_ADD(updated_at, INTERVAL 3 DAY), INTERVAL (9 - WEEKDAY(DATE_ADD(updated_at, INTERVAL 3 DAY))) DAY)
                      ELSE DATE_ADD(updated_at, INTERVAL 3 DAY)
                    END < ?", [Carbon::now()]);
            });
        })
        ->get();

        foreach($car_forms as $form){
          DelayForms::updateOrCreate(
              ['car_form_id' => $form->id],
              [
                  'submission_delay' => Carbon::parse($form->status === "Revision" ? $form->updated_at : $form->created_at)->diffInWeekdays(Carbon::now()), // Set fields you want to update or insert
                  'manager_approval_delay' => 0,
                  'ims_approval_delay' => 0
              ]
          );
      }
    }
}
