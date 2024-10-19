<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use App\Models\FeedbackManager;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CARFormProcessor>
 */
class CARFormProcessorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_form_number' => $this->incrementingSourceNumber(),
            'issue_type' => fake()->randomElement(['First Issue', 'Re-Issue']),
            'source' => fake()->randomElement([
                'Internal Audit', 
                'Voice of Customer', 
                'Non Audit', 
                'Request For Action', 
                fake()->sentence(),
            ]),
            'nonconformance_classification' => fake()->sentence(),
            'nonconformance_observation' => fake()->realText(),
            'auditor_initiator' => fake()->name(),
            'date_reported_to_ims' => fake()->dateTimeBetween('now', '+1 year'),
            'concerned_department' => fake()->randomElement([
                'Consulting', 
                'ESH', 
                'FAD', 
                'HR', 
                'IH Lab',
                'IH WEM',
                'IMS',
                'IT',
                'Marketing',
                'OSHMS',
                'Sales',
                'Testing',
                'Top Management',
            ]),
            'status' => fake()->randomElement([
                'For Submission', 
                'Draft', 
                'Revision', 
                'Manager\'s Review', 
                'Manager\'s Revised',
                'Approver\'s Review',
                'Approver\'s Revised',
                'Approved',
                '1st Verification',
                '2nd Verification',
                '3rd Verification',
                'Closed',
            ]),
            'created_by' => 1,
            'approver_id' => 1,
            'receiver_id' => 1,
            'email_receiver' => 'ssgguinto.p360@gmail.com',
            'department_head_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    public function incrementingSourceNumber(): int
    {
        static $numbers = [
            'Internal Audit' => 1,
            'Voice of Customer' => 1,
            'Non Audit' => 1,
            'Request For Action' => 1,
            'External Audit' => 1,
        ];

        $source = $this->faker->randomElement(['Internal Audit', 'Voice of Customer', 'Non Audit', 'Request For Action', 'External Audit']);
        $numbers[$source]++;
        return $numbers[$source];
    }
}
