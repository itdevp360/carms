<?php

namespace App\Services;

use App\Models\Roles;

class RoleService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create($role, $userId)
    {
        Roles::create([
            'user_id' => $userId,
            'users_roles' => $role,
        ]);
        
    }
}
