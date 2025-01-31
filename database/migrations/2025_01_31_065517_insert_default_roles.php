<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Log::info('Starting to insert default roles');
        try {
            DB::table('roles')->insert([
                ['name' => 'admin', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'director', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'evaluator', 'created_at' => now(), 'updated_at' => now()],
            ]);
            Log::info('Default roles inserted successfully');
        } catch (\Exception $e) {
            Log::error('Error inserting default roles: ' . $e->getMessage());
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Log::info('Starting to delete default roles');
        try {
            DB::table('roles')->whereIn('name', ['admin', 'director', 'evaluator'])->delete();
            Log::info('Default roles deleted successfully');
        } catch (\Exception $e) {
            Log::error('Error deleting default roles: ' . $e->getMessage());
        }
    }
};
