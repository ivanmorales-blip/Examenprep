<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
public function run(): void
{
    $this->call([
        EventSeeder::class,
    ]);

    // 1. Create user
    $user = User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    // 2. Create project linked to user
    $project = Project::firstOrCreate([
        'name' => 'Test',
        'descripcio' => 'Test',
        'fecha_inicio' => now(),
        'fecha_fin' => now(),
        'user_id' => $user->id,
    ]);

    // 3. Create tasks linked to project
    Task::firstOrCreate([
        'descripcio' => 'Test Task 1',
        'completada' => 1,
        'id_project' => $project->id,
    ]);

    Task::firstOrCreate([
        'descripcio' => 'Test Task 2',
        'completada' => 1,
        'id_project' => $project->id,
    ]);
}
}