<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RequestForActionVerification>
 */
class RequestForActionVerificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'result_of_the_action' => fake()->realText(),
            'close_out_follow_up' => fake()->randomElement([1, 0]),
        ];
    }
}
