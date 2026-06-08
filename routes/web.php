<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Registration;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\MissatgeController;

Route::get('/projects', [ProjectController::class, 'index']);

        Route::get('/missatges', [MissatgeController::class, 'index']);

        Route::get('/enviados', [MissatgeController::class, 'enviados']);

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/register', function () {
    return Inertia::render('frontend/registre');
});

Route::get('/register/{event}', function ($event) {
    return Inertia::render('frontend/registre', [
        'eventId' => $event
    ]);
});

/*
|--------------------------------------------------------------------------
| Auth protected pages (Breeze session auth)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {



    Route::get('/user', [MissatgeController::class, 'user']);


        Route::get('/admin/dashboard', function () {
        return Inertia::render('backend/dashboard');
    });

            Route::get('/admin/addproject', function () {
        return Inertia::render('backend/projecteadd');
    });


        Route::get('/admin/missatgesdesortida', function () {
        return Inertia::render('backend/missatgesdesortida');
    });

    Route::post('/projects/add', [ProjectController::class, 'store']);

    Route::get('/admin/editproject/{id}', function ($id) {
        return Inertia::render('backend/projectedit', ['projectId' => $id]);
    });

    Route::post('/missatges/store', [MissatgeController::class, 'store']);


    Route::get('/admin/addmissatge', function () {
        return Inertia::render('backend/messageadd');
    });

    Route::get('/admin/addmissatge/{id}', function ($id)  {
        return Inertia::render('backend/messageadd', ['remitente_id' => $id]);
    });

    // Admin dashboard page (React/Inertia page)
    Route::get('/admin/registrations', function () {
        return Inertia::render('backend/registracions');
    });

    // API-like endpoint BUT using session auth (safe for your setup)
    Route::get('/admin/registrations/data', function () {
        return response()->json(
            Registration::with('event')->get()
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Breeze profile routes
    |--------------------------------------------------------------------------
    */
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';