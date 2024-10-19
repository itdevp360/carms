<?php

namespace App\Traits;

use App\Models\CARFormProcessor;

trait HandleTraits
{
  public function handleNonconformities(&$model, $data)
  {
      $model['similar_nonconformity'] = $data['similar_nonconformity'] === 'yes' ? $data['yes_similar_nonconformity'] : $data['similar_nonconformity'];
      $model['potential_nonconformity'] = $data['potential_nonconformity'] === 'yes' ? $data['yes_potential_nonconformity'] : $data['potential_nonconformity'];
      $model->save();
  }

  public function updatingStatus($form, $data){
    $processorForm = CarFormProcessor::findOrFail($data['car_form_id']);
    $processorForm->status = $data['status'];
    $processorForm->save();
  }

  public function updatingStatusVerification($data, $status){
    $processorForm = CarFormProcessor::findOrFail($data['car_form_id']);
    $processorForm->status = $status;
    $processorForm->save();
  }
  public function handleVerification($form, $data)
  {
    if (isset($data['conclusion'])) {
      $form['conclusion'] = $data['conclusion'] == 'others' ? $data['other_conclusion'] : $data['conclusion'];
    }

    if (isset($data['corrective_action_implemented'])) {
      $form['corrective_action_implemented'] = $data['corrective_action_implemented'] == 'no' 
          ? $data['no_corrective_action_implemented'] 
          : $data['corrective_action_implemented'];
    }
    $form->save();
  }

  protected function authorizeMultipleRoles(array $roles)
    {
        $authorized = false;
        
        foreach ($roles as $role) {
            if (auth()->user()->can($role)) {
                $authorized = true;
                break;
            }
        }

        if (!$authorized) {
            abort(403, 'Unauthorized action.');
        }
    }
}
