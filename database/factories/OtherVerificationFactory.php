<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OtherVerification>
 */
class OtherVerificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'correction_implemented_still_implemented' => fake()->realText(),
            'corrective_action_effective' => fake()->realText(),
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
