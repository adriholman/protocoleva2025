<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

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
        //Route::aliasMiddleware('admin', \App\Http\Middleware\EnsureUserIsAdmin::class);
        //Route::aliasMiddleware('director', \App\Http\Middleware\EnsureUserIsDirector::class);
        //Route::aliasMiddleware('evaluator', \App\Http\Middleware\EnsureUserIsEvaluator::class);
        Route::aliasMiddleware('role', \App\Http\Middleware\EnsureUserHasRole::class);
    }
}
