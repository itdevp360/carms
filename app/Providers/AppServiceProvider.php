<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Models\CARFormProcessor;
use App\Models\Verification;

use App\Observers\Processor\CarFormProcessorObserver;
use App\Observers\Processor\VerificationProcessorObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        CARFormProcessor::observe(CarFormProcessorObserver::class);
        Verification::observe(VerificationProcessorObserver::class);
        // Model::unguard();
    }
}
