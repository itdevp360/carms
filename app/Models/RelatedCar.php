<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelatedCar extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'related_car',
    ];
    
    public function carForm(){
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
