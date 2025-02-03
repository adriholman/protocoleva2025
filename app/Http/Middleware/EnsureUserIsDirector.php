<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsDirector
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

        if ($user && $user->role->name === 'director') {
            $enterpriseId = $user->enterprise_id; // Assuming the user model has an enterprise_id field

            // Check if the project or test belongs to the user's enterprise
            $projectId = $request->route('project');
            $testId = $request->route('test');

            if ($projectId && !$user->enterprise->projects->contains($projectId)) {
                return redirect('/dashboard')->with('error', 'You do not have access to this project.');
            }

            if ($testId && !$user->enterprise->tests->contains($testId)) {
                return redirect('/dashboard')->with('error', 'You do not have access to this test.');
            }

            return $next($request);
        }

        return redirect('/dashboard')->with('error', 'You do not have access to this page.');
    }
}
