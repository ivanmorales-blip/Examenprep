<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;

class EventController extends Controller
{
public function index()
{
    $projectes = Auth::user()
        ->projects()
        ->select('id', 'name', 'descripcio')
        ->get();

    return response()->json($projectes);
}

}