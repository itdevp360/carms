<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DelayForms extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'submission_delay',
        'manager_approval_delay',
        'ims_approval_delay',
    ];

    public function carForm(): BelongsTo
    {
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
