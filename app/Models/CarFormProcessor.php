<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Services\CarFormProcessorInsertService;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarFormProcessor extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_number',
        'issue_type',
        'source',
        'nonconformance_classification',
        'nonconformance_observation',
        'auditor_initiator',
        'date_reported_to_ims',
        'concerned_department',
        'status',
        'created_by',
        'approver_id',
        'receiver_id',
        'email_receiver',
        'department_head_id',
    ];

    public function verification(): HasMany
    {
        return $this->hasMany(Verification::class, 'car_form_id');
    }

    public function rootCauseAnalysis(): HasMany
    {
        return $this->hasMany(RootCause::class, 'car_form_id');
    }
    
    public function feedbackManager(): HasMany
    {
        return $this->hasMany(FeedbackManager::class, 'car_form_id');
    }
    public function feedbackApprover(): HasMany
    {
        return $this->hasMany(FeedbackApprover::class, 'car_form_id');
    }

    public function riskAssessment(): HasMany
    {
        return $this->hasMany(Classification::class, 'car_form_id');
    }

    public function carFormOwner(): HasOne
    {
        return $this->hasOne(CarFormOwner::class, 'car_form_id');
    }

    public function delayForms(): HasOne
    {
        return $this->hasOne(DelayForms::class, 'car_form_id');
    }

    public function references(): HasMany
    {
        return $this->hasMany(Reference::class);
    }

    public function relatedCar(): HasMany
    {
        return $this->hasMany(RelatedCar::class);
    }
    
    public function emailCc(): HasMany
    {
        return $this->hasMany(EmailCc::class, 'car_form_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approver_id');
    }

    public function receivedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function dptHead(): BelongsTo
    {
        return $this->belongsTo(User::class, 'department_head_id');
    }

    public function carFormNumber(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (new CarFormProcessorInsertService())->generateCarFormNumber($this, $value),
        );
    }
}
