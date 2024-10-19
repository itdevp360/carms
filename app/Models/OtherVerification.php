<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OtherVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'verification_id',
        'correction_implemented_still_implemented',
        'corrective_action_effective',
        'others_verification',
        'conclusion',
    ];

    public function verification(): BelongsTo
    {
        return $this->belongsTo(Verification::class, 'verification_id');
    }
}
