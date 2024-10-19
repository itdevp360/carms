<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CARFormProcessorController;
use App\Http\Controllers\CARFormOwnerController;
use App\Http\Controllers\CARFormDepartmentHeadController;
use App\Http\Controllers\CARFormApproverController;
use App\Http\Controllers\VerificationProcessorController;
use App\Http\Controllers\VerificationApproverController;
use App\Http\Controllers\OtherVerificationProcessorController;
use App\Http\Controllers\RFAVerificationProcessorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CalendarController;

use Inertia\Inertia;
use Illuminate\Http\Request;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified', 'web'])->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');

    Route::prefix('processor')->group(function() { 
        Route::resource('car_form_processors', CARFormProcessorController::class);
        Route::get('car_form_processors/{id?}', [CARFormProcessorController::class, 'index'])->name('car_form_processors.selected');
        Route::resource('car_form_approver', CARFormApproverController::class);
        Route::resource('verification_processors', VerificationProcessorController::class);
        Route::resource('otherVerificationProcessor', OtherVerificationProcessorController::class);
        Route::resource('RFAVerificationProcessor', RFAVerificationProcessorController::class);
        Route::get('car_form_approver/{status?}/{id?}', [CARFormApproverController::class, 'index'])->name('car_form_approver.selected');
    });
    Route::prefix('owner')->group(function() {
        Route::resource('car_form_owner', CARFormOwnerController::class);
        Route::get('car_form_owner/{status?}/{id?}', [CARFormOwnerController::class, 'index'])->name('car_form_owner.selected');
    });
    Route::prefix('department_head')->group(function() {
        Route::resource('car_form_department_head', CARFormDepartmentHeadController::class);
        Route::get('car_form_department_head/{status?}/{id?}', [CARFormDepartmentHeadController::class, 'index'])->name('car_form_department_head.selected');
    });
    Route::prefix('approver')->group(function() {
        Route::resource('verification_approver', VerificationApproverController::class);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

if (!request()->isSecure() && !request()->ip() == "192.168.2.32") {
	URL::forceScheme('https');
}
if (request()->ip() == "::1") {
	URL::forceScheme('https');
}

require __DIR__.'/auth.php';
