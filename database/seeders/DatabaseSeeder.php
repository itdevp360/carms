<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Codetable;
use App\Models\CarFormProcessor;
use App\Models\CarFormOwner;
use App\Models\RootCause;
use App\Models\Classification;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CodetableSeeder::class);

        // CarFormProcessor::factory()
        // ->count(100)
        // ->hasCarFormOwner()
        // ->hasRootCauseAnalysis(12)
        // ->hasRiskAssessment(2)
        // ->hasFeedbackManager()
        // ->create();
    }
}
