<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CARFormProcessor;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class CalendarController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user && $user->roles()->where('name', 'Processor')->exists()) {
            $forms = CARFormProcessor::with(
                'receivedBy', 
                'approvedBy', 
                'dptHead', 
                'createdBy', 
                'carFormOwner', 
                'verification',
                'verification.rfaVerification',
            )->whereNot('status', 'Closed')
            ->get();
        }else if ($user && $user->roles()->where('name', 'Department Head')->exists()) {
            $forms = CARFormProcessor::where('department_head_id', $user->id)
            ->whereNot('status', 'Closed')
            ->orWhere('status', "Manager's Review")
            ->orWhere('status', "Manager's Revised")
            ->with('dptHead')
            ->get();
        }else if ($user && $user->roles()->where('name', 'Approver')->exists()) {
            $forms = CARFormProcessor::where('approver_id', $user->id)
            ->whereNot('status', 'Closed')
            ->orWhere('status', "Approver's Review")
            ->orWhere('status', "Approver's Revised")
            ->with('approvedBy')
            ->get();
        }else if ($user && $user->roles()->where('name', 'Process Owner')->exists()) {
            $forms = CARFormProcessor::where('receiver_id', $user->id)
            ->whereNot('status', 'Closed')
            ->orWhere('status', "For Submission")
            ->orWhere('status', "Revision")
            ->orWhere('status', "Draft")
            ->with('receivedBy')
            ->get();
        }

        return inertia('Calendar', [
            'forms' => $forms,
        ]);
    }
}
