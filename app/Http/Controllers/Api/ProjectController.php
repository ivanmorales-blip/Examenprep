<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
public function index()
{

    $userId = Auth::id();

    $projectes = Project::select('name', 'id', 'descripcio')->get();
    
    //where('user_id', $userId)->get();

    return response()->json($projectes);
}

public function store(Request $request)
{
    $userId = session('user_id');

    if (!$userId) {
        return response()->json(['error' => 'no user'], 401);
    }

    $pedido = Project::create([
        'name' => now(),
        'descripcio' => $request->descripcio,
        'fecha_inicio' => $request->fechainici,
        'fecha_fin' => $request->fechafi,
        'user_id' => $userId,
    ]);
}

public function update(Request $request, $id)
{
    $projecto = Project::findOrFail($id);

    $projecto->update([
        'name' => now(),
        'descripcio' => $request->descripcio,
        'fecha_inicio' => $request->fechainici,
        'fecha_fin' => $request->fechafi,
    ]);

}


}