<?php

use App\Http\Controllers\Api\PersonController;
use Illuminate\Support\Facades\Route;

Route::post('/people', [PersonController::class, 'store']);

Route::middleware('auth:sanctum')->get('/people', [PersonController::class, 'index']);