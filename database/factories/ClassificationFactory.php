<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ClassificationFactory extends Factory
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
            'risk' => fake()->sentence(),
            'weakness' => fake()->sentence(),
            'threat' => fake()->sentence(),
            'p' => fake()->randomNumber(),
            's' => fake()->randomNumber(),
            'r' => fake()->randomNumber(),
            'classification' => fake()->randomElement([
                'Low Risk Region', 
                'Minor Risk Region', 
                'Moderate Risk Region',
                'Moderate Risk Region',
                'High Risk Region',
                'Extreme Risk Region',
            ]),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
