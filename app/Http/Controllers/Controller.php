<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use App\Traits\HandleTraits;
use App\Traits\HandleSourceProcessorTraits;

abstract class Controller
{
    use HandleTraits, AuthorizesRequests, DispatchesJobs, ValidatesRequests, HandleSourceProcessorTraits;
}
