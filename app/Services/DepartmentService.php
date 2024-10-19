<?php

namespace App\Services;

use App\Models\Department;

class DepartmentService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function create($department, $userId)
    {
        Department::create([
            'user_id' => $userId,
            'users_department' => $department,
        ]);
        
    }
}
