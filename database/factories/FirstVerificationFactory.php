<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FirstVerification>
 */
class FirstVerificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'correction_implemented' => fake()->realText(),
            'consequence_dealt' => fake()->realText(),
            'corrective_action_implemented' => fake()->randomElement(['yes', fake()->sentence()]),
            'potential_nonconformity' => fake()->realText(),
            'others_verification' => fake()->sentence(),
            'conclusion' => fake()->randomElement([
                'For Further Verification',
                'For Closure',
                'Corrective Action not Effective',
                fake()->sentence(),
            ]),
        ];
    }
}
