<?php

namespace App\Services;

use App\Models\Verification;
use App\Models\FirstVerification;
use App\Models\OtherVerification;

use Illuminate\Support\Facades\Auth;

class VerificationProcessorService
{
  public function setCreatorId(Verification $verification)
  {
    $verification->creator_id = Auth::id();
  }

  public function setVerificationStage(Verification $verification)
  {
    $verification->verification_stage = Verification::where('car_form_id', $verification->car_form_id)
        ->max('verification_stage') + 1;
  }

  public function creatingVerification($id, $data, $modelClass)
  {
    $form = $modelClass::create(array_merge($data, [
      'verification_id' => $id
    ]));
    return $form;
  }

  public function getStage($value)
  {
    if ($value == 1) {
      return "1st Verification";
    }elseif ($value == 2) {
      return "2nd Verification";
    }elseif ($value == 3) {
      return "3rd Verification";
    }else{
      return $value. "th Verification";
    }
  }

  public function savingVerificationStatus($data, $id)
  {
    $verificationForm = Verification::findOrFail($id);
    $verificationForm->status = $data['status'];
    $verificationForm->save();

    return $verificationForm;
  }

  public function updatingFirstVerification($data, $id)
  {
    $verificationForm = $this->savingVerificationStatus($data, $id);
    
    $verificationForm->firstVerification->correction_implemented = $data['correction_implemented'];
    $verificationForm->firstVerification->consequence_dealt = $data['consequence_dealt'];
    $verificationForm->firstVerification->corrective_action_implemented = $data['corrective_action_implemented'] === "no" ? $data['no_corrective_action_implemented'] : $data['corrective_action_implemented'];
    $verificationForm->firstVerification->potential_nonconformity = $data['potential_nonconformity'];
    $verificationForm->firstVerification->others_verification = $data['others_verification'];
    $verificationForm->firstVerification->conclusion = $data['conclusion'] === "others" ? $data['other_conclusion'] : $data['conclusion'];
    $verificationForm->firstVerification->save();
  }
  public function updatingOtherVerification($data, $id)
  {
    $verificationForm = $this->savingVerificationStatus($data, $id);
    $verificationForm->otherVerification->update($data);
    $verificationForm->otherVerification->conclusion = $data['conclusion'] === "others" ? $data['other_conclusion'] : $data['conclusion'];
    $verificationForm->otherVerification->save();
  }
  public function updatingRFAVerification($data, $id)
  {
    $verificationForm = $this->savingVerificationStatus($data, $id);
  }
}
