<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/user', [UsersController::class, 'getUser'])->name('user');
    Route::post('/user/{user_id}', [UsersController::class, 'update'])->name('user.update');
    Route::post('/location', [LocationController::class, 'store'])->name('location.store');
    Route::get('/location', [LocationController::class, 'index'])->name('location.index');
    Route::delete('/location/{location}', [LocationController::class, 'destroy'])->name('location.destroy');
});

require __DIR__.'/auth.php';
