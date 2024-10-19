<?php

namespace App\Services;

use App\Models\Managers;

class DepartmentManagerService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function create($managerDepartment, $userId)
    {
        Managers::where('manager_department', $managerDepartment)->exists() 
            ? Managers::where('manager_department', $managerDepartment)->delete()
            : "";
        Managers::create([
            'user_id' => $userId,
            'manager_department' => $managerDepartment,
        ]);
        
    }
}
