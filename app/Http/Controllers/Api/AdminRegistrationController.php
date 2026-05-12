<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;

class AdminRegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = Registration::with('event');

        if ($request->event_name) {
            $query->whereHas('event', function ($q) use ($request) {
                $q->where(
                    'name',
                    'like',
                    '%' . $request->event_name . '%'
                );
            });
        }

        if ($request->date) {
            $query->whereHas('event', function ($q) use ($request) {
                $q->where('date', $request->date);
            });
        }

        return response()->json(
            $query->get()
        );
    }
}