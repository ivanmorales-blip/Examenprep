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
        // User::factory(10)->create();
        $this->call([
            EventSeeder::class,
        ]);
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@examplm.com',
        ]);

        Project::firstOrCreate([
            'name' => 'Test',
            'descripcio' => 'Test',
            'fecha_inicio' => now(),
            'fecha_fin'=> now(),
            'user_id' => 2,
        ]);

        Task::firstOrCreate([
            'descripcio' => 'Test',
            'completada' => 1,
            'project_id' => 2,
        ]);

        Task::firstOrCreate([
            'descripcio' => 'Test',
            'completada' => 1,
            'project_id' => 1,
        ]);
    }
}
