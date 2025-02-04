<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Test;

class CheckTestCompletion
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
        $testId = $request->route('id'); // Assuming the test ID is passed as 'id' in the route
        $test = Test::with(['users' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])->findOrFail($testId);

        if ($test->users->isNotEmpty() && $test->users->first()->pivot->completed) {
            return redirect()->route('tests.index')->with('error', 'You have already completed this test.');
        }

        return $next($request);
    }
}
