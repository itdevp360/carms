<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailCc extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'car_form_id',
        'email',
    ];

    public function carForm(){
        return $this->belongsTo(CarFormProcessor::class, 'car_form_id');
    }
}
