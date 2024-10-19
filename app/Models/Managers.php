<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Managers extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'manager_department',
    ];

    public $timestamps = false;
    
    public function userIdManagerDeparment(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
