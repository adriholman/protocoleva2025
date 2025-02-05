<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Enterprise;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'enterprise'])->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roleDisplayName' => $user->role->displayName,
                'enterprise' => $user->enterprise ? $user->enterprise->name : 'Sin empresa',
            ];
        });

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'roleDisplayName' => $role->displayName,
            ];
        });
        $enterprises = Enterprise::all();
        return Inertia::render('Users/Create', [
            'roles' => $roles,
            'enterprises' => $enterprises,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
            'enterprise_id' => 'nullable|exists:enterprises,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'enterprise_id' => $request->enterprise_id,
        ]);

        return Redirect::route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'roleDisplayName' => $role->displayName,
            ];
        });
        $enterprises = Enterprise::all();
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'enterprises' => $enterprises,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
            'enterprise_id' => 'nullable|exists:enterprises,id',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role_id' => $request->role_id,
            'enterprise_id' => $request->enterprise_id,
        ]);

        return Redirect::route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::route('users.index')->with('success', 'User deleted successfully.');
    }
}
