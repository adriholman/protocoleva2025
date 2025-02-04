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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('enterprises', [EnterpriseController::class, 'index'])->name('enterprises.index');
    Route::get('enterprises/create', [EnterpriseController::class, 'create'])->name('enterprises.create');
    Route::post('enterprises', [EnterpriseController::class, 'store'])->name('enterprises.store');
    Route::get('enterprises/{enterprise}', [EnterpriseController::class, 'show'])->name('enterprises.show');
    Route::get('enterprises/{enterprise}/edit', [EnterpriseController::class, 'edit'])->name('enterprises.edit');
    Route::patch('enterprises/{enterprise}', [EnterpriseController::class, 'update'])->name('enterprises.update');
    Route::delete('enterprises/{enterprise}', [EnterpriseController::class, 'destroy'])->name('enterprises.destroy');
});

// Routes accessible by admin, director, and evaluator
Route::middleware(['auth', 'role:admin,director,evaluator'])->group(function () {
    Route::get('tests', [TestController::class, 'index'])->name('tests.index');
});

// Routes accessible by both admin and director
Route::middleware(['auth', 'role:admin,director'])->group(function () {
    Route::get('tests/create', [TestController::class, 'create'])->name('tests.create');
    Route::post('tests', [TestController::class, 'store'])->name('tests.store');
    Route::get('tests/{test}', [TestController::class, 'show'])->name('tests.show');
    Route::get('tests/{test}/edit', [TestController::class, 'edit'])->name('tests.edit');
    Route::patch('tests/{test}', [TestController::class, 'update'])->name('tests.update');
    Route::delete('tests/{test}', [TestController::class, 'destroy'])->name('tests.destroy');
    Route::post('tests/{test}/toggle-ready', [TestController::class, 'toggleReady'])->name('tests.toggleReady');
    Route::get('tests/{id}/invite', [TestController::class, 'invite'])->name('tests.invite');
    Route::post('tests/{id}/send-invites', [TestController::class, 'sendInvites'])->name('tests.sendInvites');

    Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::patch('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});

// Evaluator routes
Route::middleware(['auth', 'role:evaluator'])->group(function () {
    Route::get('tests/{id}/complete', [TestController::class, 'complete'])->name('tests.complete');
    Route::post('tests/{id}/submit', [TestController::class, 'submit'])->name('tests.submit');
});

// Test completion middleware
Route::middleware(['auth', 'role:evaluator', 'checkTestCompletion'])->group(function () {
    Route::get('tests/{id}/complete', [TestController::class, 'complete'])->name('tests.complete');
    Route::post('tests/{id}/submit', [TestController::class, 'submit'])->name('tests.submit');
});

require __DIR__.'/auth.php';
