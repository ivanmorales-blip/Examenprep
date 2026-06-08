<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Missatge;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MissatgeController extends Controller
{
public function index()
{
    $destinatario_id = auth()->id();

    if (!$destinatario_id) {
        return response()->json([], 401);
    }

    $missatges = Missatge::where('destinatario_id', $destinatario_id)->latest()->get();


    return response()->json($missatges);
}

public function enviados()
{
    $usuario_id = auth()->id();

    if (!$usuario_id) {
        return response()->json([], 401);
    }

    $missatges = Missatge::where('remitente_id', $usuario_id)->latest()->get();

    return response()->json($missatges);
}

public function user()
{
    $user = User::get();

    return response()->json($user);
}

public function store(Request $request)
{
    try {
        $missatge = Missatge::create([
        'remitente_id'=> auth()->id(),
        'destinatario_id'=> $request->destinatario,
        'asunto'=> $request->asunto,
        'mensaje'=> $request->mensaje,
        'leido'=> false,
        ]);

        return response()->json($missatge);

    } catch (\Throwable $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ], 500);
    }
}
}