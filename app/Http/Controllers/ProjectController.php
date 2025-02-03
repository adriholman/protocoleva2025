<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Enterprise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $projects = [];

        if ($user->role->name === 'admin') {
            // Admins can see all projects
            $projects = Project::with('enterprise')->get();
        } elseif ($user->role->name === 'director') {
            // Directors can only see projects from their enterprise
            $projects = Project::with('enterprise')
                ->where('enterprise_id', $user->enterprise_id)
                ->get();
        }

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

        // Store the project
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
