<?php

namespace App\Observers\Processor;

use App\Models\CarFormProcessor;

use App\Services\CarFormProcessorInsertService;

class CarFormProcessorObserver
{
    protected $carFormProcessorService;

    // Inject the service in the constructor
    public function __construct(CarFormProcessorInsertService $carFormProcessorService)
    {
        $this->carFormProcessorService = $carFormProcessorService;
    }
    /**
     * Handle the CarFormProcessor "created" event.
     */
    public function creating(CarFormProcessor $carFormProcessor): void
    {
        $this->carFormProcessorService->setCarRefNumber($carFormProcessor);
        $this->carFormProcessorService->setIssueType($carFormProcessor);
        $this->carFormProcessorService->setDepartmentHeadId($carFormProcessor);
        $this->carFormProcessorService->setCreatedBy($carFormProcessor);
    }

    /**
     * Handle the CarFormProcessor "updated" event.
     */
    public function updated(CarFormProcessor $carFormProcessor): void
    {
        //
    }

    /**
     * Handle the CarFormProcessor "deleted" event.
     */
    public function deleted(CarFormProcessor $carFormProcessor): void
    {
        //
    }

    /**
     * Handle the CarFormProcessor "restored" event.
     */
    public function restored(CarFormProcessor $carFormProcessor): void
    {
        //
    }

    /**
     * Handle the CarFormProcessor "force deleted" event.
     */
    public function forceDeleted(CarFormProcessor $carFormProcessor): void
    {
        //
    }
}
