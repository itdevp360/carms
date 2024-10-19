<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarFormOwner extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'correction',
        'date_correction',
        'consequence',
        'date_consequence',
        'deal_consequence',
        'date_deal_consequence',
        'corrective_action',
        'date_corrective_action',
        'similar_nonconformity',
        'potential_nonconformity',
        'date_potential_nonconformity',
    ];

    public function carForm(): BelongsTo
    {
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
