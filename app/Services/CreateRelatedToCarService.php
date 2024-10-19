<?php

namespace App\Services;


use App\Models\RelatedCar;
use App\Models\Reference;
use App\Models\Clause;
use App\Models\EmailCc;
use App\Models\User;

class CreateRelatedToCarService
{
  public function create($data, $form)
  {
    $users = User::whereHas('department', function ($query) {
      $query->where('users_department', 'IMS');
    })
    ->orWhereHas('managerDepartment', function ($query) {
        $query->where('manager_department', 'IMS');
    })
    ->get();  
    
    foreach($users as $user){
      EmailCc::create([
        'car_form_id' => $form->id,
        'email' => $user->email
      ]);
    }
    if($data['source'] != 'Request For Action'){
      if(!empty($data['related_issue_type'])){
        RelatedCar::create([
            'car_form_id' => $form->id,
            'related_car' => $data['related_issue_type'],
        ]);
      }
      if(!empty($data['groups'])){
        foreach($data['groups'] as $group){
            $reference = Reference::create([
                'car_form_id' => $form->id,
                'reference_value' => $group['reference'],
            ]);
            foreach($group['isoClauses'] as $isoClause){
                Clause::create([
                    'reference_id' => $reference->id,
                    'clause_value' => $isoClause['clause'],
                    'sub_clause_value' => $isoClause['subClause'],
                ]);
            }
        }
      }
      if(!empty($data['email_cc'])){
        foreach($data['email_cc'] as $email){
            EmailCc::create([
                'car_form_id' => $form->id,
                'email' => $email['value'],
            ]);
        }
      }
    }
  }
}
