<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'surname' => 'required',
            'image' => 'required|image',
        ]);

        $path = $request->file('image')->store('uploads', 'public');

        $person = Person::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'image' => $path,
        ]);

        return response()->json([
            'message' => 'Person created',
            'person' => $person,
        ]);
    }

    public function index()
    {
        return response()->json(
            Person::latest()->get()
        );
    }
}