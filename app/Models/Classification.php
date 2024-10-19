<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classification extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'stage',
        'risk',
        'weakness',
        'threat',
        'p',
        's',
        'r',
        'classification',
    ];
    
    public function carForm()
    {
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
