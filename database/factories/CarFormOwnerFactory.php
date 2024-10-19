<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarFormOwner>
 */
class CarFormOwnerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'correction' => fake()->realText(),
            'date_correction' => fake()->dateTimeBetween('now', '+1 year'),
            'consequence' => fake()->realText(),
            'deal_consequence' => fake()->realText(),
            'date_deal_consequence' => fake()->dateTimeBetween('now', '+1 year'),
            'corrective_action' => fake()->realText(),
            'date_corrective_action' => fake()->dateTimeBetween('now', '+1 year'),
            'similar_nonconformity' => fake()->randomElement(['no', fake()->sentence()]),
            'potential_nonconformity' => fake()->randomElement(['no', fake()->sentence()]),
            'date_potential_nonconformity' => fake()->dateTimeBetween('now', '+1 year'),
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
