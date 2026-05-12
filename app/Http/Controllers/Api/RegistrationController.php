<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{

public function store(Request $request)
{
    try {
        $file = $request->file('document') ?? $request->files->get('document');

        if (!$file) {
            return response()->json([
                'error' => 'File not found'
            ], 422);
        }

        $emailSafe = str_replace(['@', '.'], '_', $request->email);

        $filename = $emailSafe . '_' . $request->event_id . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('dni', $filename, 'public');

        // 🔥 THIS IS WHAT YOU WERE MISSING
        $registration = Registration::create([
            'name' => $request->name,
            'email' => $request->email,
            'event_id' => $request->event_id,
            'dni_path' => $path,
        ]);

        return response()->json([
            'ok' => true,
            'path' => $path,
            'db' => $registration
        ]);

    } catch (\Throwable $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'line' => $e->getLine()
        ], 500);
    }
}
}