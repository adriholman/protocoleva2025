<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Log::info('Inserting default admin user');
        $roleId = DB::table('roles')->where('name', 'admin')->value('id');

        if ($roleId) {
            DB::table('users')->insert([
                'name' => 'Default Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'), // Change this to a secure password
                'role_id' => $roleId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        } else {
            Log::error('Admin role not found');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Log::info('Deleting default admin user');
        DB::table('users')->where('email', 'admin@example.com')->delete();
    }
};
