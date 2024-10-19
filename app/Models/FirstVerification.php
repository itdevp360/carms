<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FirstVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'verification_id',
        'correction_implemented',
        'consequence_dealt',
        'corrective_action_implemented',
        'potential_nonconformity',
        'others_verification',
        'conclusion',
    ];

    public function verification(): BelongsTo
    {
        return $this->belongsTo(Verification::class, 'verification_id');
    }
}
