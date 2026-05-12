<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\RegistrationController;

/*
|--------------------------------------------------------------------------
| Public API (no session redirects, no auth)
|--------------------------------------------------------------------------
*/

Route::get('/events', [EventController::class, 'index']);

Route::post('/registrations', [RegistrationController::class, 'store']);