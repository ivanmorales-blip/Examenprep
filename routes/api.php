<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;

/*
|--------------------------------------------------------------------------
| Public API (no session redirects, no auth)
|--------------------------------------------------------------------------
*/

Route::get('/events', [EventController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/tasks', [TaskController::class, 'index']);

Route::post('/registrations', [RegistrationController::class, 'store']);