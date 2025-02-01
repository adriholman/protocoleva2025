<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\Project;
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
        ]);

        Test::create($request->all());

        return Redirect::route('tests.index')->with('success', 'Test created successfully.');
    }

    public function show(Test $test)
    {
        return Inertia::render('Tests/Show', [
            'test' => $test,
        ]);
    }

    public function edit(Test $test)
    {
        $projects = Project::all();
        return Inertia::render('Tests/Edit', [
            'test' => $test,
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
        ]);

        $test->update($request->all());

        return Redirect::route('tests.index')->with('success', 'Test updated successfully.');
    }

    public function destroy(Test $test)
    {
        $test->delete();

        return Redirect::route('tests.index')->with('success', 'Test deleted successfully.');
    }
}
