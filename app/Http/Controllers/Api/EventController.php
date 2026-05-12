<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;

class EventController extends Controller
{
public function index()
{
    return Event::select('id', 'name', 'date', 'short_description')->get();
}
}