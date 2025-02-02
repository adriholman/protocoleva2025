<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\EnterpriseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestController;

// Redirect the root URL to the login page
Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Restrict access to the register route
Route::get('/register', function () {
    abort(404);
})->name('register');

Route::post('/register', function () {
    abort(404);
});

Route::middleware('auth')->group(function () {
    Route::resource('users', UserController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('tests', TestController::class);
    Route::post('tests/{test}/toggle-ready', [TestController::class, 'toggleReady'])->name('tests.toggleReady');
    Route::get('/tests/{id}/complete', [TestController::class, 'complete'])->name('tests.complete');
    Route::post('/tests/{id}/submit', [TestController::class, 'submit'])->name('tests.submit');
    Route::get('/tests/{id}/invite', [TestController::class, 'invite'])->name('tests.invite');
    Route::post('/tests/{id}/send-invites', [TestController::class, 'sendInvites'])->name('tests.sendInvites');
    Route::resource('projects', ProjectController::class);
    Route::resource('enterprises', EnterpriseController::class);
});

require __DIR__.'/auth.php';
