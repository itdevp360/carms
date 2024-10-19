<?php

namespace App\Http\Controllers;

use App\Models\CARFormProcessor;
use App\Models\User;
use App\Models\Codetable;

use App\Http\Resources\UserResource;
use App\Http\Resources\CodetableResource;
use App\Http\Resources\CARFormProcessorResource;

use App\Http\Requests\StoreCARFormProcessorRequest;
use App\Http\Requests\UpdateCARFormProcessorRequest;

use App\Services\CreateRelatedToCarService;

use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Carbon\Carbon;

use App\Jobs\SendEmailForSubmissionJobs;

class CARFormProcessorController extends Controller
{
    public function __construct()
    {
        $this->authorize('Processor');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get();
        $form = CARFormProcessor::with([
            'verification',
            'verification.rfaVerification',
            'verification.otherVerification',
            'verification.firstVerification',
            'verification.approvedBy',
            'feedbackManager',
            'feedbackApprover',
            'carFormOwner',
            'receivedBy',
            'delayForms',
        ])
        ->latest('updated_at')
        ->get();
        $codetable = Codetable::orderBy('description1', 'asc')->get();
        return inertia('Processor/CarFormProcessor/CarFormProcessor', [
            'users' => UserResource::collection($users),
            'codetables' => CodetableResource::collection($codetable),
            'forms' => $form,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCARFormProcessorRequest $request, CreateRelatedToCarService $createRelatedToCar)
    {
        $data = $request->validated();
        $form = CarFormProcessor::create($data);
        $this->handleSource($form, $data);
        $createRelatedToCar->create($data, $form);
        SendEmailForSubmissionJobs::dispatch($form);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(CARFormProcessor $cARFormProcessor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CARFormProcessor $cARFormProcessor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCARFormProcessorRequest $request, CARFormProcessor $cARFormProcessor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CARFormProcessor $cARFormProcessor)
    {
        //
    }
}
