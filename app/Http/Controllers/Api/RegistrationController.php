<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'event_id' => 'required|exists:events,id',
            'document' => 'required|mimes:jpg,jpeg,png,pdf'
        ]);

        $file = $request->file('document');

        $extension = $file->getClientOriginalExtension();

        $filename =
            $request->email .
            '.' .
            $request->event_id .
            '.' .
            $extension;

        $path = $file->storeAs(
            'documents',
            $filename,
            'public'
        );

        $registration = Registration::create([
            'name' => $request->name,
            'email' => $request->email,
            'event_id' => $request->event_id,
            'document_path' => $path
        ]);

        return response()->json([
            'message' => 'Registration created',
            'registration' => $registration
        ]);
    }
}