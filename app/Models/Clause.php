<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clause extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_id',
        'clause_value',
        'sub_clause_value',
    ];

    public function references(){
        return $this->belongsTo(Reference::class, 'reference_id');
    }
}
