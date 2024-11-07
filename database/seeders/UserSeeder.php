<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $processor = User::factory()->create([
            'name' => 'Steven Scad Guinto',
            'email' => 'ssgguinto.p360@gmail.com',
            'password' => bcrypt('people360'),
            'email_verified_at' => time(),
        ]);
        $processor->roles()->attach(1);
        $processor->roles()->attach(2);
        $processor->roles()->attach(3);
        $processor->roles()->attach(4);

        // $approver = User::factory()->create();
        // $approver->roles()->attach(1);
        
        // $dept_head = User::factory()->create();
        // $dept_head->roles()->attach(2);
        
        // $process_owner = User::factory()->create();
        // $process_owner->roles()->attach(4);

    }
}
