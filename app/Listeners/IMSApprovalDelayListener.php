<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Events\DelayFormsEvent;

use App\Models\CarFormProcessor;
use App\Models\DelayForms;

use Carbon\Carbon;

class IMSApprovalDelayListener
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
                $q->whereIn('status', ["Approver's Review", "Approver's Revised"])
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
            $delay = new DelayForms;
            $delay->car_form_id = $form->id;
            $delay->submission_delay = 0;
            $delay->manager_approval_delay = 0;
            $delay->ims_approval_delay = Carbon::parse($form->updated_at)->diffInWeekdays(Carbon::now());
            $delay->save();
        }
    }
}
