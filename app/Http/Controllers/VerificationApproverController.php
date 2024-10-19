<?php

namespace App\Http\Controllers;

use App\Models\CarFormProcessor;
use App\Models\User;
use Illuminate\Http\Request;

use App\Http\Resources\CARFormProcessorResource;
use App\Http\Resources\UserResource;

class VerificationApproverController extends Controller
{
    public function __construct()
    {
        $this->authorize('Approver');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $form = CarFormProcessor::whereHas('verification', function ($query) {
            $query->whereIn('status', ["Review", 'Revised']);
        })
        ->with(['feedbackManager','rootCauseAnalysis', 'carFormOwner', 'riskAssessment', 'verification']) 
        ->latest('updated_at')
        ->get();
        
        $users = User::with('roles')->get();

        return inertia('VerificationApprover/VerificationApproverReview', [
            'forms' => CARFormProcessorResource::collection($form),
            'users' => UserResource::collection($users),
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CarFormProcessor $carFormProcessor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarFormProcessor $carFormProcessor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarFormProcessor $carFormProcessor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarFormProcessor $carFormProcessor)
    {
        //
    }
}
