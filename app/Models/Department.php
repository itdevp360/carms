<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'users_department',
    ];
    
    public $timestamps = false;

    public function userIdDeparment(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
