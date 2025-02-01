<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Enterprise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('enterprise')->get();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        $enterprises = Enterprise::all();
        return Inertia::render('Projects/Create', [
            'enterprises' => $enterprises,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'enterprise_id' => 'required|exists:enterprises,id',
            'test_limit' => 'required|integer',
        ]);

        Project::create($request->all());

        return Redirect::route('projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    public function edit(Project $project)
    {
        $enterprises = Enterprise::all();
        return Inertia::render('Projects/Edit', [
            'project' => $project,
            'enterprises' => $enterprises,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'enterprise_id' => 'required|exists:enterprises,id',
            'test_limit' => 'required|integer',
        ]);

        $project->update($request->all());

        return Redirect::route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return Redirect::route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
