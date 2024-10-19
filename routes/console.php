<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

use App\Jobs\SendAutoEmailFormJobs;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('app:delay-forms-command')->daily();
// Schedule::command('app:send-auto-email-form')->daily();
Schedule::job(new SendAutoEmailFormJobs)->daily();