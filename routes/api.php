<?php

use App\Http\Controllers\Api\MissatgeController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;

Route::get('/events', [EventController::class, 'index']);

Route::get('/tasks', [TaskController::class, 'index']);

Route::post('/registrations', [RegistrationController::class, 'store']);

Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/projects/{id}', function ($id) {
    return \App\Models\Project::findOrFail($id);
});

Route::get('/misatges/{id}', function ($id) {
    return \App\Models\Missatge::findOrFail($id);
});

Route::put('/projects/{id}', [ProjectController::class, 'update']);