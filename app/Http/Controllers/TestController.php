<?php
namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Project;
use App\Models\GeneralQuestion;
use App\Models\ValueQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class TestController extends Controller
{
    public function index()
    {
        $tests = Test::with('project')->get();
        return Inertia::render('Tests/Index', [
            'tests' => $tests,
            'csrf_token' => csrf_token(),
        ]);
    }

    public function create()
    {
        $projects = Project::all();
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

        $test = Test::create($request->only(['name', 'description', 'values', 'value_options', 'project_id']));

        if ($request->has('general_questions')) {
            foreach ($request->general_questions as $question) {
                $test->generalQuestions()->create($question);
            }
        }

        return Redirect::route('tests.index')->with('success', 'Test created successfully.');
    }

    public function show(Test $test)
    {
        $test->load(['generalQuestions', 'valueQuestions']);
        return Inertia::render('Tests/Show', [
            'test' => $test,
        ]);
    }

    public function edit(Test $test)
    {
        $projects = Project::all();
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

    public function toggleReady(Test $test)
    {
        if (!$test->is_ready) {
            // Generate records in the value_question table
            $values = explode(',', $test->values);
            foreach ($values as $value) {
                ValueQuestion::create([
                    'test_id' => $test->id,
                    'name' => trim($value),
                ]);
            }
        }

        $test->is_ready = !$test->is_ready;
        $test->save();

        return Redirect::route('tests.index')->with('success', 'Test readiness status updated successfully.');
    }
}