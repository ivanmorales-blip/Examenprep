<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
public function index()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json([], 401);
    }

    return response()->json($user->projects);
}

public function store(Request $request)
{
    try {
        $project = Project::create([
            'name' => $request->name,
            'descripcio' => $request->descripcio,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'user_id' => auth()->id(),
        ]);

        return response()->json($project);

    } catch (\Throwable $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ], 500);
    }
}

public function update(Request $request, $id)
{
    $project = Project::findOrFail($id);

    $project->update([
        'name' => $request->name,
        'descripcio' => $request->descripcio,
        'fecha_inicio' => $request->fecha_inicio,
        'fecha_fin' => $request->fecha_fin,
    ]);

    return response()->json($project);
}

}