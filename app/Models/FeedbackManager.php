<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackManager extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'car_form_id',
        'element_type',
        'feedback',
    ];
    
    public $timestamps = false;

    public function carForm()
    {
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
