<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\AdminRegistrationController;

Route::get('/events', [EventController::class, 'index']);

Route::post('/registrations', [RegistrationController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/registrations', [AdminRegistrationController::class, 'index']);
});