<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RootCauseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stage' => 1,
            'value' => fake()->realText(),
            'type' => fake()->randomElement([
                'measurement', 
                'method', 
                'materials',
                'motherNature',
                'others',
                'manpower',
                'machinery',
            ]),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
