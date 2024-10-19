<?php

namespace App\Services;

use App\Models\FeedbackManager;
use App\Models\FeedbackApprover;

class FeedbackManagerService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }
    
    public function createFeedbackManager($data){
        if($data['status'] === "Approver's Review"){
            return $data;
        }
        FeedbackManager::where('car_form_id', $data['car_form_id'])->delete();
        if(!empty($data['feedback'])){
            foreach($data['feedback'] as $feedback_category => $feedback_value){
                if(!empty($feedback_value)){
                    $form = FeedbackManager::create([
                        'car_form_id' => $data['car_form_id'],
                        'element_type' => $feedback_category,
                        'feedback' => $feedback_value,
                    ]);
                }
            }
        }
        return $form;
    }
    public function createFeedbackApprover($data){
        if($data['status'] === "Approved"){
            FeedbackApprover::where('car_form_id', $data['car_form_id'])->delete();
            return $data;
        }
        FeedbackApprover::where('car_form_id', $data['car_form_id'])->delete();
        if(!empty($data['feedback'])){
            foreach($data['feedback'] as $feedback_category => $feedback_value){
                if(!empty($feedback_value)){
                    $form = FeedbackApprover::create([
                        'car_form_id' => $data['car_form_id'],
                        'element_type' => $feedback_category,
                        'feedback' => $feedback_value,
                    ]);
                }
            }
        }
        return $form;
    }
}
