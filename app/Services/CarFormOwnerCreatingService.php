<?php

namespace App\Services;

use App\Models\CARFormProcessor;
use App\Models\RootCause;
use App\Models\Classification;

class CarFormOwnerCreatingService
{
  public function createRootCauseAnalysis($data, $form){
    RootCause::where('car_form_id', $form->car_form_id)->delete();
    if(!empty($data['root_cause_analysis'])){
      foreach($data['root_cause_analysis'] as $category => $analysis){
        $index = 1;
        if(!empty($analysis)){
          foreach($analysis as $entry){
            if(!empty($entry['value'])){
              RootCause::create([
                'car_form_id' => $form->car_form_id,
                'stage' => $index,
                'value' => $entry['value'],
                'type' => $category,
              ]);
              $index++;
            }
          }
        }
      }
    }
  }

  public function updatingStatus($form, $data){
    $processorForm = CarFormProcessor::findOrFail($form->car_form_id);
    $processorForm->status = $data['status'];
    $processorForm->save();
  }

  public function createRiskAssessment($data, $form){
    Classification::where('car_form_id', $form->car_form_id)->delete();
    $index = 1;
    if(!empty($data['risk_assessment']) || $data['risk_assessment'] != null){
      foreach($data['risk_assessment'] as $riskAssessment){
        if(!empty($riskAssessment['risk']) || $riskAssessment['risk'] != null){
          Classification::create([
            'car_form_id' => $form->car_form_id,
            'stage' => $index,
            'risk' => $riskAssessment['risk'],
            'weakness' => $riskAssessment['weakness'],
            'threat' => $riskAssessment['threat'] ?? null,
            'p' => $riskAssessment['p'],
            's' => $riskAssessment['s'],
            'r' => $riskAssessment['r'],
            'classification' => $riskAssessment['classification'],
          ]);
        }
        $index++;
      }
    }
  }
}
