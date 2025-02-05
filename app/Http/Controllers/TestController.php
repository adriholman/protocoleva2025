<?php
namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Project;
use App\Models\GeneralQuestion;
use App\Models\ValueQuestion;
use App\Models\ValueAnswer;
use App\Models\GeneralAnswer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
/*     public function index()
    {
        $user = Auth::user();
        $tests = [];

        if ($user->role->name === 'admin') {
            // Admins can see all tests
            $tests = Test::with('project')->get();
        } elseif ($user->role->name === 'director') {
            // Directors can only see tests from their enterprise
            $tests = Test::with('project')
                ->whereHas('project', function ($query) use ($user) {
                    $query->where('enterprise_id', $user->enterprise_id);
                })
                ->get();
        } elseif ($user->role->name === 'evaluator') {
            // Evaluators can only see tests they were invited to
            $tests = Test::with([
                'project',
                'users' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                }
            ])
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();
        }

        return Inertia::render('Tests/Index', [
            'tests' => $tests,
            'csrf_token' => csrf_token(),
        ]);
    } */

    public function index()
    {
        $user = Auth::user();
        $tests = [];

        if ($user->role->name === 'admin') {
            // Admins can see all tests
            $tests = Test::with('project')->get();
        } elseif ($user->role->name === 'director') {
            // Directors can only see tests from their enterprise
            $tests = Test::with('project')
                ->whereHas('project', function ($query) use ($user) {
                    $query->where('enterprise_id', $user->enterprise_id);
                })
                ->get();
        } elseif ($user->role->name === 'evaluator') {
            // Evaluators can only see tests they were invited to
            $tests = Test::with([
                'project',
                'users' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                }
            ])
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();
        }

        return Inertia::render('Tests/Index', [
            'tests' => $tests->map(function ($test) {
                return [
                    'id' => $test->id,
                    'name' => $test->name,
                    'description' => $test->description,
                    'status' => $test->status,
                    'status_display_name' => $test->status_display_name,
                    'project' => $test->project ? $test->project->name : 'Sin proyecto',
                ];
            }),
            'csrf_token' => csrf_token(),
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        $projects = Project::where('enterprise_id', $user->enterprise_id)->get();

        return Inertia::render('Tests/Create', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'values' => 'required|string',
            'value_options' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'general_questions' => 'array',
            'general_questions.*.name' => 'required|string|max:255',
            'general_questions.*.options' => 'required|string',
        ]);

        // Check if the project has reached its test limit
        $project = Project::findOrFail($request->project_id);
        $testCount = $project->tests()->count();

        if ($testCount >= $project->test_limit) {
            return redirect()->back()->withErrors(['project_id' => 'Este proyecto ha alcanzado su límite de pruebas.']);
        }

        // Store the test with default status 'draft'
        $test = Test::create([
            'name' => $request->name,
            'description' => $request->description,
            'values' => $request->values,
            'value_options' => $request->value_options,
            'project_id' => $request->project_id,
            'status' => 'draft', // Set default status to 'draft'
        ]);

        if ($request->has('general_questions')) {
            foreach ($request->general_questions as $question) {
                $test->generalQuestions()->create($question);
            }
        }

        return Redirect::route('tests.index')->with('success', 'Test created successfully.');
    }

    public function show(Test $test)
    {
        $test->load(['project', 'generalQuestions', 'valueQuestions']);
        return Inertia::render('Tests/Show', [
            'test' => $test,
        ]);
    }

    public function edit(Test $test)
    {
        $user = Auth::user();
        $projects = Project::where('enterprise_id', $user->enterprise_id)->get();

        return Inertia::render('Tests/Edit', [
            'test' => $test->load('generalQuestions'),
            'projects' => $projects,
        ]);
    }

    public function update(Request $request, Test $test)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'values' => 'required|string',
            'value_options' => 'required|string',
            'project_id' => 'required|exists:projects,id',
            'general_questions' => 'array',
            'general_questions.*.name' => 'required|string|max:255',
            'general_questions.*.options' => 'required|string',
        ]);

        $test->update($request->only(['name', 'description', 'values', 'value_options', 'project_id']));

        $test->generalQuestions()->delete();
        if ($request->has('general_questions')) {
            foreach ($request->general_questions as $question) {
                $test->generalQuestions()->create($question);
            }
        }

        return Redirect::route('tests.index')->with('success', 'Test updated successfully.');
    }

    public function destroy(Test $test)
    {
        $test->delete();

        return Redirect::route('tests.index')->with('success', 'Test deleted successfully.');
    }

    public function complete($id)
    {
        $test = Test::with(['project', 'generalQuestions', 'valueQuestions'])->findOrFail($id);
        return Inertia::render('Tests/Complete', [
            'test' => $test,
        ]);
    }

    public function submit(Request $request, $id)
    {
        $request->validate([
            'general_answers' => 'required|array',
            'general_answers.*.question_id' => 'required|exists:general_questions,id',
            'general_answers.*.answer' => 'required|string',
            'value_answers' => 'required|array',
            'value_answers.*.question_id' => 'required|exists:value_questions,id',
            'value_answers.*.answer' => 'required|string',
        ]);

        $user = Auth::user();

        foreach ($request->general_answers as $answer) {
            GeneralAnswer::create([
                'user_id' => $user->id,
                'general_question_id' => $answer['question_id'],
                'answer' => $answer['answer'],
            ]);
        }

        foreach ($request->value_answers as $answer) {
            ValueAnswer::create([
                'user_id' => $user->id,
                'value_question_id' => $answer['question_id'],
                'answer' => $answer['answer'],
            ]);
        }

        return redirect()->route('tests.index')->with('success', 'Test completed successfully.');
    }

    public function invite($id)
    {
        $test = Test::findOrFail($id);
        $invitedUsers = DB::table('user_test')->where('test_id', $id)->pluck('user_id')->toArray();
        $users = User::whereNotIn('id', $invitedUsers)->get();

        return Inertia::render('Tests/Invite', [
            'test' => $test,
            'users' => $users,
        ]);
    }

    public function sendInvites(Request $request, $id)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        foreach ($request->user_ids as $userId) {
            DB::table('user_test')->insert([
                'user_id' => $userId,
                'test_id' => $id,
                'completed' => false,
            ]);
        }

        return redirect()->route('tests.index')->with('success', 'Users invited successfully.');
    }

    public function toggleStatus(Test $test)
    {
        if ($test->status === 'draft') {
            // Generate records in the value_question table
            $values = explode(',', $test->values);
            foreach ($values as $value) {
                ValueQuestion::create([
                    'test_id' => $test->id,
                    'name' => trim($value),
                ]);
            }
            $test->status = 'available';
        } elseif ($test->status === 'available') {
            $test->status = 'finished';
        }

        $test->save();

        return Redirect::route('tests.index')->with('success', 'Test status updated successfully.');
    }
}