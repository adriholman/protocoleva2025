<?php

namespace App\Http\Controllers;

use App\Models\Enterprise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class EnterpriseController extends Controller
{
    public function index()
    {
        $enterprises = Enterprise::all();
        return Inertia::render('Enterprises/Index', [
            'enterprises' => $enterprises,
        ]);
    }

    public function create()
    {
        return Inertia::render('Enterprises/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'required|string|email|max:255|unique:enterprises',
            'website' => 'nullable|string',
            'nif' => 'required|string|max:255|unique:enterprises',
            'phone' => 'nullable|string|max:255',
        ]);

        Enterprise::create($request->all());

        return redirect()->route('enterprises.index')->with('success', 'Enterprise created successfully.');
    }

    public function show(Enterprise $enterprise)
    {
        return Inertia::render('Enterprises/Show', [
            'enterprise' => $enterprise,
        ]);
    }

    public function edit(Enterprise $enterprise)
    {
        return Inertia::render('Enterprises/Edit', [
            'enterprise' => $enterprise,
        ]);
    }

    public function update(Request $request, Enterprise $enterprise)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'email' => 'required|string|email|max:255|unique:enterprises,email,' . $enterprise->id,
            'website' => 'nullable|string',
            'nif' => 'required|string|max:255|unique:enterprises,nif,' . $enterprise->id,
            'phone' => 'nullable|string|max:255',
        ]);

        $enterprise->update($request->all());

        return redirect()->route('enterprises.index')->with('success', 'Enterprise updated successfully.');
    }

    public function destroy(Enterprise $enterprise)
    {
        $enterprise->delete();

        return redirect()->route('enterprises.index')->with('success', 'Enterprise deleted successfully.');
    }
}
