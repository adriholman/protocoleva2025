<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\CheckTestCompletion;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Register middleware
        Route::aliasMiddleware('role', \App\Http\Middleware\EnsureUserHasRole::class);
        Route::aliasMiddleware('checkTestCompletion', CheckTestCompletion::class);
    }
}
