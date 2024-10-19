<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestForActionVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'verification_id',
        'result_of_the_action',
        'close_out_follow_up',
    ];

    public function verification(): BelongsTo
    {
        return $this->belongsTo(Verification::class, 'verification_id');
    }
}
