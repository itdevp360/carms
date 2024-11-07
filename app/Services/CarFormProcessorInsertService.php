<?php

namespace App\Services;

use App\Models\CARFormProcessor;
use App\Models\Managers;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class CarFormProcessorInsertService
{
  public function setCarRefNumber(CarFormProcessor $carFormProcessor)
  {
    $query = CarFormProcessor::query();

    if (in_array($carFormProcessor->source, ['Internal Audit', 'Non Audit', 'Voice of Customer', 'Request For Action'])) {
        $query->where('source', $carFormProcessor->source);
    } else {
        $query->whereNotIn('source', ['Internal Audit', 'Non Audit', 'Voice of Customer', 'Request For Action']);
    }

    $lastCarFormNumber = $query->max('car_form_number');

    if ($lastCarFormNumber) {
        $numericPart = (int) filter_var($lastCarFormNumber, FILTER_SANITIZE_NUMBER_INT);
        $nextNumber = $numericPart + 1;
    } else {
        $nextNumber = 1;
    }

    $carFormProcessor->car_form_number = str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
  }

  public function setIssueType(CarFormProcessor $carFormProcessor)
  {
    if (!isset($carFormProcessor->issue_type)) {
      $carFormProcessor->issue_type = 'First Issue';
    }else {
      $carFormProcessor->issue_type = $carFormProcessor->issue_type;
    }
  }

  public function setDepartmentHeadId(CarFormProcessor $carFormProcessor)
  {
    $user = User::with('roles')->findOrFail($carFormProcessor->receiver_id);

    if (!$user->roles->contains('name', 'Department Head')) {
        $manager = Managers::where('manager_department', $carFormProcessor->concerned_department)->first();
        $carFormProcessor->department_head_id = $manager ? $manager->user_id : null;
    } else {
        $carFormProcessor->department_head_id = 1;
    }
  }
  public function setCreatedBy(CarFormProcessor $carFormProcessor)
  {
    $carFormProcessor->created_by = Auth::id();
  }

  public function generateCarFormNumber($model, $carFormNumber)
  {
    if($model->concerned_department === "IH Lab"){
      $concernedDepartmentPrefix = "LAB";
    }else if($model->concerned_department === "IH WEM"){
      $concernedDepartmentPrefix = "WEM";
    }else {
      $concernedDepartmentPrefix = strtoupper(substr($model->concerned_department ?? '', 0, 3));
    }
    
    $sourcePrefix = in_array($model->source, ['Internal Audit', 'Non Audit', 'Voice of Customer', 'Request For Action'])
        ? strtoupper(implode('', array_map(fn($word) => $word[0], explode(' ', $model->source))))
        : 'EA';

    $dateCreated = $model->created_at->format('mdy');
    $lastEntryForm = str_pad($carFormNumber, 4, '0', STR_PAD_LEFT);

    return "{$sourcePrefix}-{$dateCreated}-{$lastEntryForm}-{$concernedDepartmentPrefix}";
  }
}