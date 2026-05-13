<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
public function index()
{

    $userId = Auth::id();

    $projectes = Task::select('descripcio', 'id')->get();

    return response()->json($projectes);
}

}