<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CARFormProcessor;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user && $user->roles()->where('name', 'Processor')->exists()) {
            $dataCount = CARFormProcessor::all();
        }else if ($user && $user->roles()->where('name', 'Department Head')->exists()) {
            $dataCount = CARFormProcessor::where('department_head_id', $user->id)->get();
        }else if ($user && $user->roles()->where('name', 'Approver')->exists()) {
            $dataCount = CARFormProcessor::where('approver_id', $user->id)->get();
        }else if ($user && $user->roles()->where('name', 'Process Owner')->exists()) {
            $dataCount = CARFormProcessor::where('receiver_id', $user->id)->get();
        }

        return inertia('Dashboard', [
            'dataCount' => $dataCount,
        ]);
    }
}
