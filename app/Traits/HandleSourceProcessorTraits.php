<?php

namespace App\Traits;

trait HandleSourceProcessorTraits
{
  public function handleSource($form, $data)
  {
    $form['source'] = $data['source'] == 'others' ? $data['other_source'] : $data['source'];
    $form->save();
  }
}
