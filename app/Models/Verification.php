<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

use App\Services\VerificationProcessorService;
use Illuminate\Support\Facades\Ordinal;

use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Verification extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'verification_stage',
        'status',
        'person_responsible_id',
        'creator_id',
        'approver_id',
    ];

    public function carForm(): BelongsTo
    {
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
    public function firstVerification(): HasOne
    {
        return $this->hasOne(FirstVerification::class, 'verification_id');
    }
    public function otherVerification(): HasOne
    {
        return $this->hasOne(OtherVerification::class, 'verification_id');
    }
    public function rfaVerification(): HasMany
    {
        return $this->hasMany(RequestForActionVerification::class, 'verification_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
    public function creatorId(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
    public function verificationStage(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => (new VerificationProcessorService())->getStage($value),
            // set: fn($value, array $attributes) => Verification::where('car_form_id', $attributes['car_form_id'])->max('verification_stage') + 1,
        );
    }
}
