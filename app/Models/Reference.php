<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reference extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_form_id',
        'reference_value',
    ];

    public function carForm(){
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
    
    public function clauses(){
        return $this->hasMany(Clause::class);
    }
}
