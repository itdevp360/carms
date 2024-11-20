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
}
