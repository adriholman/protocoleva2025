<?php

namespace App\Http\Controllers;

use App\Models\Enterprise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Enterprises;
namespace App\Http\Controllers;

use App\Models\Enterprise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Enterprises;
class EnterpriseController extends Controller
{
    public function index()
    {
        $enterprises = Enterprises::all();
        return Inertia::render('Enterprises/Index', ['enterprises' => $enterprises]);
    }

    public function create()
    {
        return Inertia::render('Enterprises/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:enterprises,email',
            'nif' => 'required|string|unique:enterprises,nif',
        ]);

        Enterprises::create($request->all());

        return redirect()->route('enterprises.index')->with('success', 'Enterprise created successfully');
    }

    public function edit(Enterprises $enterprise)
    {
        return Inertia::render('Enterprises/Edit', ['enterprise' => $enterprise]);
    }

    public function update(Request $request, Enterprises $enterprise)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:enterprises,email,' . $enterprise->id,
            'nif' => 'required|string|unique:enterprises,nif,' . $enterprise->id,
        ]);

        $enterprise->update($request->all());

        return redirect()->route('enterprises.index')->with('success', 'Enterprise updated successfully');
    }

    public function destroy(Enterprises $enterprise)
    {
        $enterprise->delete();

        return redirect()->route('enterprises.index')->with('success', 'Enterprise deleted successfully');
    }
}
