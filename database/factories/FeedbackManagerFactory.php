<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CarFormProcessor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FeedbackManager>
 */
class FeedbackManagerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'element_type' => fake()->randomElement([
                'feedback_correction',
                'feedback_consequence',
                'feedback_deal_consequence',
                'feedback_root_cause_analysis',
                'feedback_corrective_action',
                'feedback_potential_nonconformity',
                'feedback_risk_assessment',
            ]),
            'feedback' => fake()->realText(),
        ];
    }
}
