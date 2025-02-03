<?php

namespace App\Http\Middleware;

use Closure; // Import the correct Closure class
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EnsureUserIsEvaluator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        Log::info('User Object:', ['user' => $user]); // Log the user object

        if ($user && $user->role->name === 'evaluator') {
            $testId = $request->route('test');

            // Check if the user is invited to the test
            if ($testId && !$user->tests->contains($testId)) {
                return redirect('/dashboard')->with('error', 'You do not have access to this test.');
            }

            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have access to this page.');
    }
}
